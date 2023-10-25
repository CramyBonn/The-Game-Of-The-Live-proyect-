//Board code
let rows = 50  //Number of rows on the board
let columns = 50 //Number of columns on the board
let sides = 20 //The number of pixels in the cell

let mirror = []

let playStatus = false; //Variable to control the speed of the board


document.addEventListener("keydown", (e) => {
    e.preventDefault();
    switch (e.keyCode) {
        case 39: // Right key
            nextState();
            break;
        case 9: // Tab key
            exchangePlay();
            break;
        case 8:
            clean(); // Eararse key    
        default:
            break;
    }
});

setInterval(() => {
    if (playStatus) {
        nextState()
    }
}, 1000 / 60);


//Here is the instructions sections
const instructions = document.getElementById("instructions");

const closeInstructions = document.getElementById("close-instructions"); 

closeInstructions.addEventListener("click", () => {
    instructions.style.display = "none";
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

function exchangePlay() {
    playStatus = !playStatus;
    if (playStatus) {
        document.body.style.background = "white";
        document.getElementById("btn1").innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        document.body.style.background = "#f0f0ff";
        document.getElementById("btn1").innerHTML = '<i class="fa-solid fa-play"></i>';
    }
    console.log("Exchange Play:", playStatus, document.body.style.background);
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

function clean() {
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < columns; r++) {
            let cell = document.getElementById(`cell-${c + "-" + r}`);
            cell.style.background = "";
        }
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
    for (let i = -1; i <= 1;i++){
        for (let j = -1; j <= 1;j++){
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
        for (let r = 0; r < rows; r++){
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

  //Zoom buttons
  document.getElementById("zoom-in").addEventListener("click", function () {
    resizeCellSize(1.2); // Aumentar el tamaño de las celdas en un 20%
});

document.getElementById("zoom-out").addEventListener("click", function () {
    resizeCellSize(0.8); // Disminuir el tamaño de las celdas en un 20%
});

function resizeCellSize(scale) {
    sides *= scale; // Aumentar o disminuir el tamaño de las celdas
    let board = document.getElementById("board");

    // Recalcular el ancho y alto del tablero basado en las nuevas dimensiones de las celdas
    board.style.width = sides * columns + "px";
    board.style.height = sides * rows + "px";
}

//Karla, remember to put the code in English and specify what it is for.
var cantidadGeneraciones = 0; // Mayor para relantizar la vida 
