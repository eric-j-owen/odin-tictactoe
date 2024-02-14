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
    
    const player = [
        {
            name: "Player One",
            x: "X",
        },
        {
            name: "Player Two",
            o: "O",
        },
    ];

    const isValidMove = (x, y) => {
        return board[x][y] === null;
    };

    const updateBoard = (x, y) => {
        board[x][y] = currPlayer;
    };

    return { isValidMove, updateBoard };
}
const game = gameController();

console.log(GameBoard.getBoard());
