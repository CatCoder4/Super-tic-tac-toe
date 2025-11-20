const cells = document.querySelectorAll(".cell")
const Outercells = document.querySelectorAll(".cellContainer")
const statusText = document.querySelector("#TurnStatus")
const RestartButton = document.querySelector("#restart")
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let options = [["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""]]
let OuterOptions = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X";
let currentGame = 4
let running = false
let OutercellsHtml = null
Outercells.forEach(cell => {
    OutercellsHtml = cell.innerHTML
})


initializeGame()

function initializeGame() {
    running = true
    cells.forEach(cell => {
        cell.addEventListener("click", cellCLicked)
    })
    RestartButton.addEventListener("click", restartGame)
    statusText.textContent = currentPlayer + "'s turn \n game: " + (currentGame + 1)
}

function cellCLicked() {
    const cellIndex = this.getAttribute('cellIndex')
    const CellGame = this.parentElement.getAttribute("containerIndex")

    if(options[CellGame][cellIndex] != "" || !running) {
        return
    }

    if(currentGame == "any") {
        currentGame = CellGame
        updateCell(this, cellIndex)
        CheckInnerWin(cellIndex)
    }
    
    if (CellGame == currentGame) {
        updateCell(this, cellIndex)
        CheckInnerWin(cellIndex)
    }
}

function updateCell(cell, index) {
    options[currentGame][index] = currentPlayer
    cell.textContent = currentPlayer
}

function changePLayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X"
    if (currentGame == "any") {
        statusText.textContent = currentPlayer + "'s turn \n game: " + currentGame
    }
    else {
        statusText.textContent = currentPlayer + "'s turn \n game: " + (currentGame + 1)
    }
}

function setGame(index) {
    if (OuterOptions[index] != "") {
        currentGame = "any"
    }
    else {
        currentGame = Number(index)
    }
}

function CheckInnerWin(index) {
    let roundWon = false

    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        const cellA = options[currentGame][condition[0]]
        const cellB = options[currentGame][condition[1]]
        const cellC = options[currentGame][condition[2]]

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true
            break
        }
    }
    
    if (roundWon == true) {
        Outercells.forEach(cell => {
            if (cell.getAttribute("containerIndex") == currentGame) {
                OuterOptions[currentGame] = currentPlayer
                cell.innerHTML = currentPlayer
                cell.style.fontSize = "105px"
            }
        })
        setGame(index)
        checkOuterWin()
    }
    else if(CheckOptions()) {
        Outercells.forEach(cell => {
            if (cell.getAttribute("containerIndex") == currentGame) {
                OuterOptions[currentGame] = currentPlayer
                cell.innerHTML = "D"
                cell.style.fontSize = "120px"
            }
        })
        setGame(index)
        checkOuterWin()
    }
    else {
        setGame(index)
        changePLayer()
    }
}

function checkOuterWin() {
    won = false

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i]
        const cellA = OuterOptions[condition[0]]
        const cellB = OuterOptions[condition[1]]
        const cellC = OuterOptions[condition[2]]
        console.log(cellA, cellB, cellC)

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            won = true
            break
        }
    }

    if (won == true) {
        statusText.textContent = currentPlayer + " wins!"
        running = false
    }
    else if(!OuterOptions.includes("")) {
        statusText.textContent = "draw!"
        running = false
    }
    else {
        changePLayer()
    }
}

function CheckOptions() {
    let empty = true
    for (i = 0; i < options.length; i++) {
        if (options[i].includes("")) {
            empty = false
        }
    }
    return empty
}

function restartGame() {
    currentPlayer = "X"
    options = [["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""],
                ["", "", "", "", "", "", "", "", ""]]
    currentGame = 4
    statusText.textContent = currentPlayer + "'s turn \n game: " + (currentGame + 1)
    cells.forEach(cell => cell.textContent = "")
    Outercells.forEach(cell => cell.innerHTML = OutercellsHtml)
    running = true
}