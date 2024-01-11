function cellClicked(row, col) {
    randomGen = false;
    let x = parseInt(prompt("Enter a value (1 - 9): "));
    console.log("Cell"+ row + col + "clicked");
    let cellID = "cell"+row+col;
    console.log("cell ID: ",cellID);

    if (x >0 && x < 10 && checkGrid(row, col, x)) {
        sudokuGrid[row][col] = x;
        document.getElementById(cellID).innerHTML = x;
    }
}

function emptyFunc() {
    // console.log("Tried to click an already generated value");
    ;
}

function fillInScreen(){
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            let cellID = "cell"+row+col;
            if (sudokuGrid[row][col] != 0){
                document.getElementById(cellID).innerHTML=sudokuGrid[row][col];
                document.getElementById(cellID).onclick = emptyFunc();
            }
        }        
    }
}

function generateSudoku(){
    if (randomGen == true) {
        generateDiagonalElements();
        for (let index = 0; index < sudokuGrid.length; index++) {
            const element = sudokuGrid[index];
            console.log(element);
        }
        console.log("=====================================");
        generateNonDiagonalElements(0, gridRoot);
        for (let index = 0; index < sudokuGrid.length; index++) {
            const element = sudokuGrid[index];
            console.log(element);
        }
        console.log("=====================================");
        removeElements(removalCount);
        for (let index = 0; index < sudokuGrid.length; index++) {
            const element = sudokuGrid[index];
            console.log(element);
        }

        fillInScreen();   
    }
}

function fillElement(row, col) {
    let num = 0;
    for (let index1 = 0; index1 < gridRoot; index1++) {
        for (let index2 = 0; index2 < gridRoot; index2++) {
            while (true) {
                num = Math.floor(Math.random() * gridSize + 1);
                if (checkInBox(row, col, num)) {
                    break                    
                }
            }
            sudokuGrid[row + index1][col + index2] = num;
        }
    }
}

function generateDiagonalElements() {
    for (let index = 0; index < gridSize; index += gridRoot) {
        fillElement(index, index);        
    }
}

function generateNonDiagonalElements(i, j) {
    // console.log(i + " " +j);
    if (i == gridSize - 1 && j == gridSize) {
        return true;        
    }
    if (j == gridSize) {
        i++;
        j = 0;        
    }
    if (sudokuGrid[i][j] != 0) {
        return generateNonDiagonalElements(i, j + 1);
    }
    for (let index = 0; index < numList.length; index++) {
        const num = numList[index];
        if (checkGrid(i, j, num)) {
            sudokuGrid[i][j] = num;
            // console.log(i + " " +j+ " filled");
            if (generateNonDiagonalElements(i, j + 1)) {
                console.log(i + " " +j+ " filled");
                return true;                
            }
            sudokuGrid[i][j] = 0;
        }        
    }
}

function removeElements(removalCount){
    while (removalCount > 0) {
        randRow = Math.floor(Math.random() * gridSize);
        randCol = Math.floor(Math.random() * gridSize);
        if (sudokuGrid[randRow][randCol] != 0) {
            sudokuGrid[randRow][randCol] = 0;
            removalCount--;
        }
    }
}

// sudokuGrid =