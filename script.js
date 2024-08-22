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
    let nextMove = 0;

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
    //take a current board, a player and a move, return new board
    if (board.board[move.row][move.column].state === 0) {
    board.board[move.row][move.column].state = player.playerIndex;
    }
}

const player1 = playerGenerate(1);
const player2 = playerGenerate(2);
const myBoard = boardGenerate();