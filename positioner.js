function positioner(inputString) {
    positioner.count++;
    let pointer = 0; // Position of inner pointer. Default position: 0
    let workspace = inputString; // Base string
    let direction = true; // Direction of search  in workspace  <-- FALSE | TRUE -->

    return {
        // Checks if input substring contains in base string in right direction
        has: function(substring) {
            return getIndexes(getTail(), getRegex(substring)).length > 0;
        },

        // Returns index of next word in right direction
        // Flag 'moving' set 'false' in case if pointer must not be changed.
        // In default flag 'moving' is true.
        next: function(substring, moving = true) {
            let indexes = getIndexes(getTail(), getRegex(substring)); // Get substring entry indexes

            // If not found substring
            if(indexes.length == 0) {
                return -1;
            }

            let index;
            let newPointer;
            if(direction) { // --->
                index = indexes[0]+pointer;
                newPointer = index + substring.length;
            } else { // <---
                index = workspace.length - indexes[indexes.length-1];
                newPointer = index;
            }

            // If 'moving' equals false, pointer will not be changed
            if(moving) {
                pointer = newPointer;
            }

            return index;
        },

        // Returns index of previous word in right direction.
        // (Similar to func 'next' for the opposite direction.)
        prev: function(substring) {
            let indexes = getIndexes(getHead(), getRegex(substring)); // Get substring entry indexes

            // If substring was not found
            if(indexes.length == 0) {
                return -1;
            }

            let index;
            // |qwerTy

            if(!direction) { // <---
                //index = indexes[0] + pointer;
                index = pointer - indexes[0];
                pointer = index - substring.length;
            } else { // -->
                index = indexes[indexes.length-1];
                pointer = index;
            }

            return index;;
        },

        // Replaces next entry of necessary word for another one.
        replace: function(from, to) {
            _replace(from, to);
        },

        // Replaces all of inputs of necessary word in base string for another one
        replaceAll: function(from, to) {
            _replace(from, to, 'g');
        },

        // Executes function 'next' for N arguments and returns array of results.
        nextBulk: function() {
            let vault = [];
            for(var i=0; i<arguments.length; i++) {
                vault[i] = this.next(arguments[i]);
            }
            return vault;
        },

        // Executes function 'prev' for N arguments and returns array of results.
        prevBulk: function() {
            let vault = [];
            for(var i=0; i<arguments.length; i++) {
                vault[i] = this.prev(arguments[i]);
            }
            return vault;
        },

        // Changes the direction's flag to the opposite and position of pointer
        changeSearchDirection: function() {
            direction = !direction;
            pointer = workspace.length - pointer;
        },

        // Changes search direction in right way
        searchFromStart: function() {
            if(!direction) {
                this.changeSearchDirection();
            }
        },

        // Changes search direction in right way
        searchFromEnd: function() {
            if(direction) {
                this.changeSearchDirection();
            }
        },

        // Resets position of pointer
        reset: function() {
            pointer = 0;
        },

        // Makes N steps forward in right direction
        forward: function(step) {
            pointer += step;

            let length = workspace.length;
            if(pointer > length)
                pointer = length;
        },

        // Makes N steps back in right direction
        back: function(step) {
            pointer -= step;

            if(pointer < 0)
                pointer = 0;
        },

        // Pastes substring in current position of pointer
        add: function(word) {
            let reverse = workspace.length - pointer;

            if(direction) {
                workspace = workspace.substring(0, pointer) + word + workspace.substring(pointer);
            } else {
                workspace = workspace.substring(0, reverse) + word + workspace.substring(reverse);
            }
            pointer += word.length;
        },

        // Removes N symbols in right direction
        remove: function(num) {
            let reverse = workspace.length - pointer;
            if(direction) {
                workspace = workspace.substring(0, pointer) + workspace.substring(pointer+num);
            } else {
                workspace = workspace.substring(0, reverse-num) + workspace.substring(reverse);
                //workspace = workspace.substring(0, pointer-num) + workspace.substring(pointer);
            }
        },

        // Returns current view of base string in message box
        getWorkspace: function() {
            return workspace;
        },

        getDirection: function() {
            return direction;
        },

        getPointer() {
            return pointer;
        }
    }

    // Returns the substring after pointer to the end of the base string in right direction
    // Direction = true  ->   HEAD | TAIL
    // Direction = false ->   TAIL | HEAD
    function getTail() {
        return direction ? workspace.substring(pointer) : workspace.substring(0, workspace.length - pointer);
    }

    function _replace(from, to, regExpFlag = '') {
        workspace = workspace.replace(new RegExp(from, regExpFlag), to);
    }

    // Returns the substring on left or right side of pointer which not used in search
    function getHead() {
        return direction ? workspace.substring(0, pointer) : workspace.substring(workspace.length - pointer);
    }

    // Returns array with indexes of found entry
    function getIndexes(string, regex) {
        var matches = [];
        var match;
        while (match = regex.exec(string)) {
            matches.push(match.index);
        }
        return matches;
    }

    // Prepares and returns template of search input word with static flags
    function getRegex(substring) {
        return new RegExp("(" + substring + ")", "gi");
    }
}

positioner.count = 0; // Initial value of amount of created objects

// Return count of created objects
positioner.getPositionersCount = function() {
    return this.count;
}
