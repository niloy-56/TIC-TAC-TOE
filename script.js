const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", ""];

let currentPlayer = "X";

let gameRunning = true;


// Winning combinations
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


// Cell click
cells.forEach(cell => {

  cell.addEventListener("click", function () {

    const index = this.dataset.index;

    if (board[index] !== "" || !gameRunning) {
      return;
    }

    board[index] = currentPlayer;

    this.textContent = currentPlayer;

    this.classList.add(currentPlayer.toLowerCase());

    checkWinner();

  });

});


// Check winner
function checkWinner() {

  let winnerFound = false;

  for (let condition of winningConditions) {

    const a = condition[0];
    const b = condition[1];
    const c = condition[2];

    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {

      winnerFound = true;

      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");

      break;
    }
  }


  if (winnerFound) {

    statusText.textContent =
      `Player ${currentPlayer} Wins! 🎉`;

    gameRunning = false;

    return;
  }


  // Draw
  if (!board.includes("")) {

    statusText.textContent = "It's a Draw! 🤝";

    gameRunning = false;

    return;
  }


  // Change player
  currentPlayer = currentPlayer === "X" ? "O" : "X";

  statusText.textContent =
    `Player ${currentPlayer}'s Turn`;
}


// Restart game
restartButton.addEventListener("click", restartGame);


function restartGame() {

  board = ["", "", "", "", "", "", "", ""];

  currentPlayer = "X";

  gameRunning = true;

  statusText.textContent = "Player X's Turn";

  cells.forEach(cell => {

    cell.textContent = "";

    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.classList.remove("winner");

  });

}