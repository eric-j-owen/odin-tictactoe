const GameBoard = (function () {
    let board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    const getBoard = () => {
        return board;
    };
    return { getBoard };
})();

function gameController() {

    const board = GameBoard.getBoard();
    
    const player = [
        {
            name: "Player One",
            token: "X",
        },
        {
            name: "Player Two",
            token: "O",
        },
    ];

    const isValidMove = (x, y) => {
        return board[x][y] === null;
    };

    const updateBoard = (x, y) => {
        board[x][y] = player[0].token;
    };

    return { isValidMove, updateBoard };
}
const game = gameController();
game.updateBoard(0,0)
console.log(GameBoard.getBoard());
