const GameBoard = (function () {
    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    const getBoard = () => board;
    return { getBoard };
})();

function gameController() {
    const board = GameBoard.getBoard();

    const player = [
        {
            name: "Player One",
            move: "X",
        },
        {
            name: "Player Two",
            move: "O",
        },
    ];

    let currentPlayer = Math.round(Math.random()) === 0 ? player[0] : player[1];

    const printBoard = (board) => {
        console.log(board[0]);
        console.log(board[1]);
        console.log(board[2]);
    };
    const getCurrentPlayer = () => currentPlayer;
    const switchCurrentPlayer = () =>
        (currentPlayer = currentPlayer === player[0] ? player[1] : player[0]);
    const isValidMove = (x, y) => board[x][y] === null;
    const updateBoard = (x, y) => (board[x][y] = currentPlayer.move);
    const checkWin = (board, player) => {
        const consecutiveMovesForWin = 3;
        let consecutiveMovesCount = 0;
        
        // check rows
        for (let row = 0; row < board.length; row++) {
            consecutiveMovesCount = 0;
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] === player.move) consecutiveMovesCount++;
            }
            if (consecutiveMovesCount === consecutiveMovesForWin) {
                return `${player.name} wins!`;
            }
        }
        consecutiveMovesCount = 0;

        // check cols
        for (let col = 0; col < board.length; col++) {
            consecutiveMovesCount = 0;
            for (let row = 0; row < board[col].length; row++) {
                if (board[row][col] === player.move) consecutiveMovesCount++;
            }
            if (consecutiveMovesCount === consecutiveMovesForWin)
                return `${player.name} wins!`;
        }
        consecutiveMovesCount = 0;

        // check diag
        for (let i = 0; i < board.length; i++) {
            if (board[i][i] === player.move) consecutiveMovesCount++;
        }
        if (consecutiveMovesCount === consecutiveMovesForWin) {
            return `${player.name} wins!`;
        }
        consecutiveMovesCount = 0;

        for (let i = 0; i < board.length; i++) {
            if (board[i][board.length - 1 - i] === player.move)
                consecutiveMovesCount++;
        }
        if (consecutiveMovesCount === consecutiveMovesForWin) {
            return `${player.name} wins!`;
        }
        consecutiveMovesCount = 0;

        
        // check draw
        let isDraw = true;
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] === null) {
                    isDraw = false;
                    break;
                }
            }
            if (!isDraw) {
                break;
            }
        }
        if (isDraw) {
            return "It's a draw.";
        }


        return false;
    };

    return {
        printBoard,
        getCurrentPlayer,
        switchCurrentPlayer,
        isValidMove,
        updateBoard,
        checkWin,
    };
}

function renderController(x, y, playerMove) {
    const squareEl = document.querySelectorAll(".square");
    squareEl.forEach((sq) => {
        if(sq.dataset.x === x && sq.dataset.y === y){
            sq.textContent = playerMove;
        }
    })
}

// game loop

const game = gameController();
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("square")) {
        const currentPlayer = game.getCurrentPlayer();
        const board = GameBoard.getBoard();
        const { x, y } = e.target.dataset;

        if (game.isValidMove(x, y)) {
            game.updateBoard(x, y);
            renderController(x, y, currentPlayer.move);
            game.printBoard(board);
            game.switchCurrentPlayer();
        } else {
            console.log("Invalid move.");
        }

        if (game.checkWin(board, currentPlayer)) {
            console.log(game.checkWin(board, currentPlayer));
        }
    }
});
