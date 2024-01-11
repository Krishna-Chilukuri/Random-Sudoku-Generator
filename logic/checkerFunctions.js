function checkGrid(i, j, num){
    return checkInRow(i, num) && checkInCol(j, num) && checkInBox(i - i % gridRoot, j - j % gridRoot, num)
}

function checkInRow(row, num){
    for (let col = 0; col < gridSize; col++) {
        if (sudokuGrid[row][col] == num) {
            // console.log("FALSE FROM ROW CHECK");
            return false;
        }
    }
    return true;
}

function checkInCol(col, num){
    for (let row = 0; row < gridSize; row++) {
        if (sudokuGrid[row][col] == num) {
            // console.log("FALSE FROM COL CHECK");
            return false;
        }
    }
    return true;
}

function checkInBox(row, col, num) {
    for (let index1 = 0; index1 < gridRoot; index1++) {
        for (let index2 = 0; index2 < gridRoot; index2++) {
            if (sudokuGrid[row + index1][col + index2] == num) {
                // console.log("FALSE FROM BOX CHECK");
                return false;
            }            
        }
    }
    return true;
}