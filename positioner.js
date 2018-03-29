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
        // (That is same like func 'next' for the opposite direction.)
        prev: function(substring) {
            let indexes = getIndexes(getHead(), getRegex(substring)); // Get substring entry indexes

            // If substring was not found
            if(indexes.length == 0) {
                return -1;
            }

            let index;
            if(!direction) { // <---
                index = indexes[0]+pointer;
                pointer = index - substring.length;
            } else { // -->
                index = indexes[indexes.length-1];
                pointer = index;
            }

            return index;;
        },

        // Replaces next entry of necessary word for another one.
        // Returns:
        //      1 - if word have been changed;
        //      0 - in the opposite case.
        replace: function(from, to) {
            // Call function 'next' with flag of moving = false to not move pointer
            let indexStart = this.next(from, false); // Get start index of necessary word

            // Check if the necessary word contains in base string
            if(indexStart != -1) {
                let indexEnd = indexStart + from.length; // Get end index of necessary word

                // Repace base string with 3 parts: head + new word + tail
                workspace = workspace.substring(0, indexStart) + to + workspace.substring(indexEnd);
                return 1;
            }
            return 0;
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
                prointer = length;
        },

        // Makes N steps back in right direction
        back: function(step) {
            pointer -= step;

            if(pointer < 0)
                prointer = 0;
        },

        // Pastes substring in current position of pointer
        add: function(substring) {
            workspace = workspace.substring(0, pointer) + substring + workspace.substring(pointer);
            if(direction) {
                pointer += substring.length;
            }
        },

        // Removes N symbols in right direction
        remove: function(num) {
            if(direction) {
                workspace = workspace.substring(0, pointer) + workspace.substring(pointer+num);
            } else {
                workspace = workspace.substring(0, pointer).slice(0, -num) + workspace.substring(pointer);
            }
        },

        // Show current view of base string in message box
        showString: function() {
            alert(workspace);
        }
    }

    // Returns the substring after pointer to the end of the base string in right direction
    // Direction = true  ->   HEAD | TAIL
    // Direction = false ->   TAIL | HEAD
    function getTail() {
        return direction ? workspace.substring(pointer) : workspace.substring(0, workspace.length - pointer);
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
