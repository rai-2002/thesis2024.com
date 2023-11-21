document.addEventListener('DOMContentLoaded', function() {
    var board = document.querySelector('.game-board');
    var cells = document.querySelectorAll('.cell');
    var status = document.querySelector('.status');
    var restartBtn = document.querySelector('.restart-btn');

    var currentPlayer = 'X';
    var gameActive = true;
    var gameState = ['', '', '', '', '', '', '', '', ''];

    var winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    var handleCellClick = function(e) {
        var cell = e.target;
        var cellIndex = parseInt(cell.getAttribute('data-cell-index'));

        if (gameState[cellIndex] !== '' || !gameActive) return;

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        checkGameStatus();
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                setTimeout(makeComputerMove, 500); // Introduce delay for the computer's move
            }
            status.textContent = 'Player ' + currentPlayer + "'s turn";
        }
    };

    var makeComputerMove = function() {
        var availableCells = gameState.reduce(function(acc, cell, index) {
            if (cell === '') acc.push(index);
            return acc;
        }, []);

        var randomIndex = Math.floor(Math.random() * availableCells.length);
        var computerMove = availableCells[randomIndex];

        gameState[computerMove] = currentPlayer;
        cells[computerMove].textContent = currentPlayer;
        checkGameStatus();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = 'Player ' + currentPlayer + "'s turn";
    };

    var checkGameStatus = function() {
        for (var i = 0; i < winningConditions.length; i++) {
            var a = winningConditions[i][0];
            var b = winningConditions[i][1];
            var c = winningConditions[i][2];

            if (
                gameState[a] !== '' &&
                gameState[a] === gameState[b] &&
                gameState[b] === gameState[c]
            ) {
                gameActive = false;
                status.textContent = 'Player ' + currentPlayer + ' wins!';
                return;
            }
        }

        if (!gameState.includes('')) {
            gameActive = false;
            status.textContent = "It's a tie!";
            return;
        }
    };

    var restartGame = function() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        status.textContent = 'Player ' + currentPlayer + "'s turn";
        cells.forEach(function(cell) {
            cell.textContent = '';
        });
    };

    cells.forEach(function(cell) {
        cell.addEventListener('click', handleCellClick);
    });

    restartBtn.addEventListener('click', restartGame);
});
