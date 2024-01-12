function cellClicked(row, col) {
    let x = parseInt(prompt("Enter a value (1 - 9): "));
    console.log("Cell"+ row + col + "clicked");
    let cellID = "cell"+row+col;
    console.log("cell ID: ",cellID);

    if (x >0 && x < 10) {
        if (checkGrid(row, col, x)) {
            sudokuGrid[row][col] = x;
            document.getElementById(cellID).innerHTML = x;
            isEmpty = false;
            if (!checkForEmptyCells()) {
                console.log("Sudoku is Filled");
                resultPara.textContent = "Sudoku is Full";
            }
        }
        else {
            wrongChoices--;
            if (wrongChoices == -1) {
                endGame();
                resultPara.textContent = "Game Ended, Reload to Play Again";
            }
            else {
                resultPara.textContent = "Wrong Attempts Left: " + wrongChoices;
            }
        }
        randomGen = false;
    }
}

function endGame() {
    for (let index1 = 0; index1 < gridSize; index1++) {
        for (let index2 = 0; index2 < gridSize; index2++) {
            let currCell = "cell"+index1+index2;
            document.getElementById(currCell).onclick = emptyFunc();
        }
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
    let choice = selectDiff.options[selectDiff.selectedIndex].value;
    console.log(choice, typeof(choice));
    switch (choice) {
        case "easy":
            removalCount = 30;            
            break;
        case "medi":
            removalCount = 45;
            break;
        case "hard":
            removalCount = 60;
            break;
    }
    if (randomGen == true) {
        isEmpty = false;
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
        resultPara.textContent = "Wrong Attempts Left: " + wrongChoices;
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