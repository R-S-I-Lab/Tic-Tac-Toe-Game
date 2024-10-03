const container = document.getElementById("createGameHere");
const result = document.getElementById("result");
let turn = 0;

function addAttributes(element, attributes) {
    for (let i = 0; i < attributes.length; i += 2) {
        element.setAttribute(attributes[i], attributes[i + 1]);
    }
    return element;
}

function createGame() {
    const displayPlayers = addAttributes(document.createElement("div"),
        ["style", "font-size:25px; width:500px; text-align:right; margin-right:15px"]);
    container.appendChild(displayPlayers);
    const player1 = document.createElement("span");
    player1.innerHTML = "<strong>X - Player 1</strong> <br>";
    const player2 = document.createElement("span");
    player2.innerHTML = "<strong>O - Player 2</strong>";
    displayPlayers.appendChild(player1);
    displayPlayers.appendChild(player2);
    const gameField = addAttributes(document.createElement("div"),
        ["style", "display:grid; grid-template-columns:repeat(3, 100px)"]);
    container.appendChild(gameField);
    for (let i = 0; i < 3; ++i) {
        for (let j = 0, noButton = 0; j < 3; ++j, ++noButton) {
            const button = addAttributes(document.createElement("button"),
                ["type", "button", "class", "btn btn-outline-secondary", "style",
                "width:100px; height:100px; font-size:60px; color:black",
                    "onclick", "markButton(this)"]);
            gameField.appendChild(button);
        }
    }
}

function createRestartButton() {
    const button = addAttributes(document.createElement("button"),
        ["onclick", "window.location.reload()", "class", "btn btn-primary"]);
    button.innerText = "Restart";
    result.appendChild(button);
}

function checkWinner() {
    const element = document.getElementsByClassName("btn btn-outline-secondary");
    if ((element[0].innerHTML !== "" && element[0].innerHTML === element[1].innerHTML
            && element[0].innerHTML === element[2].innerHTML)
        || (element[3].innerHTML !== "" && element[3].innerHTML === element[4].innerHTML
            && element[3].innerHTML === element[5].innerHTML)
        || (element[6].innerHTML !== "" && element[6].innerHTML === element[7].innerHTML
            && element[6].innerHTML === element[8].innerHTML)
        || (element[0].innerHTML !== "" && element[0].innerHTML === element[3].innerHTML
            && element[0].innerHTML === element[6].innerHTML)
        || (element[1].innerHTML !== "" && element[1].innerHTML === element[4].innerHTML
            && element[1].innerHTML === element[7].innerHTML)
        || (element[2].innerHTML !== "" && element[2].innerHTML === element[5].innerHTML
            && element[2].innerHTML === element[8].innerHTML)
        || (element[0].innerHTML !== "" && element[0].innerHTML === element[4].innerHTML
            && element[0].innerHTML === element[8].innerHTML)
        || (element[2].innerHTML !== "" && element[2].innerHTML === element[4].innerHTML
            && element[2].innerHTML === element[6].innerHTML)) {
        if ((turn - 1) % 2) {
            result.innerHTML = "Player 2 wins<br>";
        } else {
            result.innerHTML = "Player 1 wins<br>";
        }
        createRestartButton();
    } else if (turn === 9) {
        result.innerHTML = "It's a draw<br>";
        createRestartButton();
    }
}

function markButton(button) {
    if (!(turn % 2)) {
        button.innerHTML = "<strong>X</strong>";
    } else {
        button.innerHTML = "<strong>O</strong>";
    }
    ++turn;
    button.setAttribute("disabled", "true");
    checkWinner();
}