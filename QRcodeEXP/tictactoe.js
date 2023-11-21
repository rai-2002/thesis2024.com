document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.game-board');
    const cells = document.querySelectorAll('.cell');
    const status = document.querySelector('.status');
    const restartBtn = document.querySelector('.restart-btn');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    const handleCellClick = (e) => {
      const cell = e.target;
      const cellIndex = parseInt(cell.getAttribute('data-cell-index'));
  
      if (gameState[cellIndex] !== '' || !gameActive) return;
  
      gameState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      checkGameStatus();
      if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O') {
          setTimeout(makeComputerMove, 500); // Introduce delay for the computer's move
        }
        status.textContent = `Player ${currentPlayer}'s turn`;
      }
    };
  
    const makeComputerMove = () => {
      const availableCells = gameState.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
      }, []);
  
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      const computerMove = availableCells[randomIndex];
  
      gameState[computerMove] = currentPlayer;
      cells[computerMove].textContent = currentPlayer;
      checkGameStatus();
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      status.textContent = `Player ${currentPlayer}'s turn`;
    };
  
    const checkGameStatus = () => {
      for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
  
        if (
          gameState[a] !== '' &&
          gameState[a] === gameState[b] &&
          gameState[b] === gameState[c]
        ) {
          gameActive = false;
          status.textContent = `Player ${currentPlayer} wins!`;
          return;
        }
      }
  
      if (!gameState.includes('')) {
        gameActive = false;
        status.textContent = "It's a tie!";
        return;
      }
    };
  
    const restartGame = () => {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      status.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach(cell => {
        cell.textContent = '';
      });
    };
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });
  
    restartBtn.addEventListener('click', restartGame);
  });
  