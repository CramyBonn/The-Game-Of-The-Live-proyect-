//Board code
let rows = 50  //Number of rows on the board
let columns = 50 //Number of columns on the board
let sides = 20 //The number of pixels in the cell

generateTheBoard()

function generateTheBoard(){
    let html = "<table cellpadding=0 cellspacing=0 id='board'>" //Whay it will do is eliminate the spaces and padding in the cells of the board
    
    //There are the rows you will go through
    for (let r = 0; r < rows; r++){     
        html += "<tr>"
            for (let c = 0; c < columns; c++){ 
                html += `<td id="cell-${c + "-" + r}">`
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