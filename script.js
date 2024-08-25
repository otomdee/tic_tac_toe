//generate board
const boardGenerate = () => {
    //square object factory
    const squareGenerate = (index, state) => {
        return {index, state};
    }
    const board = [];
    for (let i = 0; i < 3; i++) {
        board[i] = [];
        for (let j = 0; j <3; j++) {
            board[i].push(squareGenerate(((3 * i) + j), 0));
        }
    }
    let nextMove = 1;
    return {board, nextMove};
}

//player objects factory
const playerGenerate = (playerIndex) => {
    played = [];
    return {playerIndex, played,
        move(row, column) {
            this.played.push((row * 3) + column);
            return {row, column};
        }
    };
}

const gameState = (board, player, move) => {
    //take a current board, a player and a move, changes the board
    if (board.board[move.row][move.column].state === 0) {
    board.board[move.row][move.column].state = player.playerIndex;
    }
}

const winLogic = (board) => {
    //takes a board, returns true if the last move was a winning move
    let winToggle = false;
    for (let i = 0; i < 3; i++) {
        //check rows || check columns
        if (board.board[i][0].state === board.board[i][1].state 
            && board.board[i][1].state === board.board[i][2].state 
            && board.board[i][0].state > 0
        ) {
            winToggle = true;
          }
        else if (board.board[0][i].state === board.board[1][i].state 
            && board.board[1][i].state === board.board[2][i].state
            && board.board[0][i].state > 0) {
            winToggle = true;
          }     
    }
    //check diagonals
    if ((board.board[0][0].state === board.board[1][1].state 
        && board.board[1][1].state === board.board[2][2].state
        && board.board[0][0].state > 0) ||
        (board.board[0][2].state === board.board[1][1].state 
        && board.board[1][1].state === board.board[2][0].state
        && board.board[0][2].state > 0)) {
      winToggle = true;
  }
    return(winToggle);
}

const drawLogic = (board) => {
    //takes a board, checks if it is full
    let playedSquares = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (! (board.board[i][j].state === 0)) {
                playedSquares++;
            }
        }
    }
    if (playedSquares === 9) {
        return true;
    }
    else {
        return false;
    }
}


//newGame function
const newGame = () => {
    //clean up html
    document.querySelectorAll(".square").forEach((item) => {
        item.innerHTML = "";
    })

    //generate board, players
   let player1 = playerGenerate(1);
   let player2 = playerGenerate(2);
   let myBoard = boardGenerate();


   const renderBoard = () => {
    document.querySelectorAll(".square").forEach((item) => {
        let usrInput = item.value;
        if (!(myBoard.board[((usrInput - usrInput % 3) / 3)][(usrInput % 3)].state === 0)) {
            if (myBoard.board[((usrInput - usrInput % 3) / 3)][(usrInput % 3)].state === 1) {
                item.innerHTML = "X";
            }
            else if (myBoard.board[((usrInput - usrInput % 3) / 3)][(usrInput % 3)].state === 2) {
                item.innerHTML = "O";
            }
        } 
    })
}

   function squareChange() {
    let usrInput = this.value;
    if ( this.innerHTML === "") {
        if ( myBoard.nextMove === 1) {
            gameState(myBoard, player1, player1.move(((usrInput - usrInput % 3) / 3), (usrInput % 3)));
            myBoard.nextMove = 2;
        }
        else if (myBoard.nextMove === 2) {
            gameState(myBoard, player2, player2.move(((usrInput - (usrInput % 3)) / 3), (usrInput % 3)));
            myBoard.nextMove = 1;
        }

        //call renderboard
        renderBoard();
        //call windraw fxn
        winDraw();
    }
}

   const addListeners = () => {
    const domSquares = document.querySelectorAll(".square");
    domSquares.forEach((item) => {
        item.addEventListener("click", squareChange);
    })
    }

    const winDraw = () => {
        if (winLogic(myBoard)) {
            if (myBoard.nextMove === 1) {
                document.querySelector("#result").innerHTML = "player 2 wins";
            }
            else if (myBoard.nextMove === 2) {
                document.querySelector("#result").innerHTML = "player 1 wins";
            }
    
            document.querySelectorAll(".square").forEach((item) => {
                item.removeEventListener("click", squareChange);
            })
        }
        else if (drawLogic(myBoard)) {
            document.querySelector("#result").innerHTML = "It's a tie";
        }
    }

    addListeners();
}

document.querySelector("#newGameBtn").addEventListener("click", newGame);