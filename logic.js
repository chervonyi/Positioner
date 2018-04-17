var pos;

function insertText() {
    var textField = document.getElementById('text');
    pos = positioner(textField.value);
    updateTable();
    updateDirection();

    printResult("");
}

function updateTable() {
    var workspace = pos.getWorkspace();
    var table = document.getElementById('table');
    var letterArray = table.rows[0];
    var cell = letterArray.insertCell(0);

    for(var i = 0; i < workspace.length; i++) {
        cell = letterArray.insertCell(i);

        cell.innerHTML = workspace.charAt(i);
    }

    while(letterArray.cells.length > workspace.length) {
        letterArray.deleteCell(-1);

    }
    updatePointer();
}

function updatePointer() {
    let pointer = pos.getPointer();
    let length = pos.getWorkspace().length;
    var table = document.getElementById('table');

    if (pos.getDirection()) {
        for (let i = 0; i < length; i++) {
            if (pointer == (i + 1) && pointer == length) {
                table.rows[0].cells[i].className = "pointerRight";
            } else if (pointer == i) {
                table.rows[0].cells[i].className = "pointerLeft";
            } else {
                table.rows[0].cells[i].className = "";
            }
            table.rows[0].cells[i].setAttribute("id", "cell_" + i);
        }
    } else {
        for (let i = 0; i <= length; i++) {
            if (pointer == 0) {
                table.rows[0].cells[i+1].className = "pointerRight";
            }
            if (pointer == (length - i)) {
                table.rows[0].cells[i].className = "pointerLeft";
            } else {
                table.rows[0].cells[i].className = "";
            }
            table.rows[0].cells[i].setAttribute("id", "cell_" + i);
        }
    }
}

function updateDirection() {
    var top = document.getElementById('top');
    var bottom = document.getElementById('bottom');

    if (pos.getDirection()) {
        top.className = "stripe-right-top";
        bottom.className = "stripe-right-bottom";
    } else {
        top.className = "stripe-right-bottom";
        bottom.className = "stripe-right-top";
    }
}

function printResult(message) {
    let tmp = "";
    if (message === "") {
        return;
    }
    if (message == -1) {
        tmp = "Substring was not found!";
    } else if (message === true) {
        tmp = "Substring was found!";
    } else if (message === false) {

        tmp = "Substring was not found!";
    } else {
        tmp = "Position = " + message;
    }

    document.getElementById('result').innerHTML = tmp;
}

function changeDirectionToFalse () {
    if (pos.getDirection()) changeDirection();
}

function changeDirectionToTrue () {
    if (!pos.getDirection()) changeDirection();
}

function changeDirection () {
    pos.changeSearchDirection();
    updateDirection();
    updatePointer();
}

function has () {
    var input = document.getElementById('wordMain');
    if (input.value) {
        printResult(pos.has(input.value));
    }
    clearTextFields();
}

function next () {
    var input = document.getElementById('wordMain');
    if (input.value) {
        printResult(pos.next(input.value));
        updatePointer();
    }
    clearTextFields();
}

function prev () {
    var input = document.getElementById('wordMain');
    if (input.value) {
        printResult(pos.prev(input.value));
        updatePointer();
    }
    clearTextFields();
}

function add () {
    var input = document.getElementById('wordMain');
    if (input.value) {
        pos.add(input.value);
        updateTable();
    }
    clearTextFields();
}

function replace () {
    var inputMain = document.getElementById('wordMain').value;
    var inputAdd = document.getElementById('wordAdditional').value;

    if(inputMain.length == 0 || inputAdd.length == 0) {
        return -1;
    }

    pos.replace(inputMain, inputAdd);
    updateTable();
    clearTextFields();
}

function replaceAll () {
    var inputMain = document.getElementById('wordMain').value;
    var inputAdd = document.getElementById('wordAdditional').value;

    if(inputMain.length == 0 || inputAdd.length == 0) {
        return -1;
    }

    pos.replaceAll(inputMain, inputAdd);
    updateTable();
    clearTextFields();
}

function resetPointer () {
    pos.reset();
    updatePointer();
}

function forward () {
    var step = document.getElementById('step').value;
    step = parseInt(step);
    pos.forward(step);
    updatePointer();
}

function back () {
    var step = document.getElementById('step').value;
    step = parseInt(step);
    pos.back(step);
    updatePointer();
}

function remove () {
    var step = document.getElementById('step').value;
    step = parseInt(step);
    pos.remove(step);
    updateTable();
}

function example() {
    let vault = ["How are you doing?",
    "See you tomorrow",
    "Thank you very much",
    "Hello world!",
    "Big Brother is watching you",
    "War is Peace",
    "Freedom is Slavery",
    "Ignorance is Strength"];

    let randNum = getRandomInt(0, vault.length - 1);
    document.getElementById('text').value = vault[randNum];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function supervisorMainInput() {
    var inputMain = document.getElementById('wordMain').value;
    var simpleButtons = document.getElementsByClassName('simple');

    if(!inputMain) {
        for(let i = 0; i < simpleButtons.length; i++) {
            simpleButtons[i].className += " not-active";
            simpleButtons[i].disabled = true;
        }
    } else {
        for(let i = 0; i < simpleButtons.length; i++) {
            simpleButtons[i].className = "option-button simple";
            simpleButtons[i].disabled = false;
        }

    }
    supervisorAddInput();
}

function supervisorAddInput() {
    var inputMain = document.getElementById('wordMain').value;
    var inputAdd = document.getElementById('wordAdditional').value;
    var difButtons = document.getElementsByClassName('difficult');

    if(inputMain && inputAdd) {
        for(let i = 0; i < difButtons.length; i++) {
            difButtons[i].className = "option-button difficult";
            difButtons[i].disabled = false;
        }
    } else {
        for(let i = 0; i < difButtons.length; i++) {
            difButtons[i].className += " not-active";
            difButtons[i].disabled = true;
        }
    }
}

function test(event) {
    let id = event.target.id;
    let newPointer = id.substring(5); // Get id of cell. E-g: "cell_2"

    moveTo(newPointer);
    updatePointer();
}

function moveTo(newPointer) {
    let max = pos.getWorkspace().length;
    let currentPointer = pos.getPointer();
    let step;
    if (pos.getDirection()) {
        step = newPointer - currentPointer;
    } else {
        step = (max - newPointer) - currentPointer - 1;
    }

    if (step > 0) {
        pos.forward(step);
    } else if(step == 0) {
        if (currentPointer == max)
            pos.back(1);
        else
            pos.forward(1);
    } else {
        pos.back(Math.abs(step));
    }
}

function clearTextFields() {
    document.getElementById('wordMain').value = "";
    document.getElementById('wordAdditional').value = "";
}
