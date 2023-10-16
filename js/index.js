//Board code
let rows = 50  //Number of rows on the board
let columns = 50 //Number of columns on the board
let sides = 20 //The number of pixels in the cell

let mirror = []

document.addEventListener("keydown", (e)=>{
    e.preventDefault()
    switch (e.keyCode) {
        case 39: // RIght key
            nextState()
            break;
        default:
            break;
    }
})

generateTheBoard()

function generateTheBoard(){
    let html = "<table cellpadding=0 cellspacing=0 id='board'>" //Whay it will do is eliminate the spaces and padding in the cells of the board
    
    //There are the rows you will go through
    for (let r = 0; r < rows; r++){     
        html += "<tr>"
            for (let c = 0; c < columns; c++){ 
                html += `<td id="cell-${c + "-" + r}" onmouseup="cellState(${c}, ${r})">`
                html += "</td>"
            }
        html += "</tr>"
    }
    html += "</table>"

    let boardContainer = document.getElementById("containerBoard")
    boardContainer.innerHTML = html
    let board = document.getElementById("board")
    //What this will do is customize the width and height of the board.
    board.style.width  = sides*columns+"px"
    board.style.height = sides*rows+"px"
}

//Here the state of the cell will change from alive to dead.
function cellState(c, r){
    let cell = document.getElementById(`cell-${c + "-" + r}`)
    if (cell.style.background != "black"){
        cell.style.background = "black"
    } else {
        cell.style.background = ""
    }
}

//Here the mirror of the board
function mirrorCells(){
    mirror=[]
    for (let c = 0; c < columns; c++){
        mirror.push([])
        for (let r = 0; r < columns; r++){
            let cell = document.getElementById(`cell-${c + "-" + r}`)
            mirror[c][r] = cell.style.background == "black"
        }
    }
}

//This is a live cell counter

function liveCell(c, r){
    let live = 0
    for (let i = -1; i < 1;i++){
        for (let j = -1; j < 1;j++){
            if (i == 0 && j == 0)
                continue
            try {
                if (mirror[c + i][r + j])
                live++
            } catch(e) {}
            if (live > 3){ //Remember that more than 3 living cells is equal to dying from overpopulation
                return live
            }
        }
    }
    return live
}

function nextState(){
    mirrorCells()
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < columns; r++){
            let live = liveCell(c, r)
            let cell = document.getElementById(`cell-${c + "-" + r}`)
            if(mirror[c][r]){// Cell is live
                if(live <2 || live >3)
                cell.style.background = "" //Death due to overpopulation or loneliness
            }else {// cell is death
                if (live == 3)
                    cell.style.background = "black"
            }
        }
    }
}

//Here is the instructions sections

const instructions = document.getElementById("instructions");

const closeInstructions = document.getElementById("close-instructions"); 

closeInstructions.addEventListener("click", () => {
    instructions.style.display = "none";
})
