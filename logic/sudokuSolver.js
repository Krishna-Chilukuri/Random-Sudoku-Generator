function solveSudoku(row, col) {
    if (row == gridSize - 1 && col == gridSize) {
        return true;
    }
    if (col == gridSize) {
        row++;
        col = 0;
    }
    if(sudokuGrid[row][col] != 0) {
        return solveSudoku(row, col + 1);
    }

    for (let index = 1; index < 10; index++) {
        if(checkGrid(row, col, index)) {
            sudokuGrid[row][col] = index;
            if (solveSudoku(row, col + 1)) {
                return true;
            }
        }
        sudokuGrid[row][col] = 0;
    }
    return false;
}

function sudokuSolver() {
    solveSudoku(0, 0);
    console.log("=======================");
    for (let index = 0; index < sudokuGrid.length; index++) {
        const row = sudokuGrid[index];
        console.log(row);
    }
    console.log("=======================");
    fillInScreen();
}




//     fillInScreen();
//     console.log("=======================");
//     for (let index = 0; index < sudokuGrid.length; index++) {
//         const row = sudokuGrid[index];
//         console.log(row);
//     }
//     console.log("=======================");
// }