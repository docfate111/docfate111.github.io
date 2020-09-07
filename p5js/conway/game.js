function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
}  
let board;
let cols;
let rows;
let resolution = 10;  
function setup(){
    createCanvas(2000, 2000);
    cols = width / resolution;
    rows = height / resolution;
    // randomly populate the board
    board = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        board[i][j] = floor(random(2));
      }
    }
}
function draw(){
    background(0);
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x = i * resolution;
        let y = j * resolution;
        if (board[i][j] == 1){
          fill(255);
          stroke(0);
          rect(x, y, resolution - 1, resolution - 1);
        }
      }
    }
    board = gameoflife(board);
}
function gameoflife(board){
    ans = new Array();
    for(var i = 0; i < board.length; i++){
        curr = new Array();
        for(var j = 0; j < board[0].length; j++){
            var neighbors = countneighbors(board, i, j);
            if(board[i][j]==1){
                // Any live cell with fewer than two live neighbors dies, as if caused by under-population.
                if(neighbors<2){
                    curr.push(0);
                }else if(neighbors==2 || neighbors==3){
                //Any live cell with two or three live neighbors lives on to the next generation.
                    curr.push(1);
                }else{
                //Any live cell with more than three live neighbors dies, as if by over-population.
                    curr.push(0);
                }
            }else{
                // Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
                if(neighbors==3){
                    curr.push(1);
                }else{
                    curr.push(0);
                }
            }
        }
        ans.push(curr);
    }
    return ans;
}    
function countneighbors(board, x, y){
    var count = 0;
    for(var x_offset=-1;  x_offset<2; x_offset++){
        for(var y_offset=-1; y_offset<2; y_offset++){
            if(x_offset==0 && y_offset==0){
                // ignore self
                continue;
            }else if(x+x_offset<0 || y+y_offset<0 || x+x_offset>=board.length || y+y_offset>=board[0].length){
                // check out of bounds
                continue;
            }else{
                count += board[x+x_offset][y+y_offset];
            }
        }
    }      
    return count;
}
