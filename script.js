const boardElement = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;


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


// ==========================
// CELL CLICK
// ==========================

boardElement.addEventListener("click", function (event) {

  // Find the clicked cell
  const cell = event.target.closest(".cell");

  // If something other than a cell was clicked
  if (!cell) {
    return;
  }

  // Get cell number
  const index = parseInt(cell.dataset.index);

  // Check index
  if (isNaN(index)) {
    return;
  }

  // Don't allow occupied cells
  if (board[index] !== "") {
    return;
  }

  // Don't allow moves after game ends
  if (gameOver) {
    return;
  }


  // Put X or O
  board[index] = currentPlayer;

  cell.textContent = currentPlayer;

  cell.classList.add(currentPlayer.toLowerCase());


  // Check winner
  checkWinner();

});


// ==========================
// CHECK WINNER
// ==========================

function checkWinner() {

  for (let condition of winningConditions) {

    const a = condition[0];
    const b = condition[1];
    const c = condition[2];


    if (
      board[a] !== "" &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {

      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");


      statusText.textContent =
        "Player " + currentPlayer + " Wins! 🎉";


      gameOver = true;

      return;
    }
  }


  // Check draw
  if (!board.includes("")) {

    statusText.textContent = "It's a Draw! 🤝";

    gameOver = true;

    return;
  }


  // Change player
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }


  statusText.textContent =
    "Player " + currentPlayer + "'s Turn";
}


// ==========================
// RESTART GAME
// ==========================

restartButton.addEventListener("click", function () {

  // Empty board
  board = ["", "", "", "", "", "", "", ""];

  // Player X starts
  currentPlayer = "X";

  // Game active
  gameOver = false;


  // Reset status
  statusText.textContent = "Player X's Turn";


  // Clear all cells
  cells.forEach(function (cell) {

    cell.textContent = "";

    cell.classList.remove("x");
    cell.classList.remove("o");
    cell.classList.remove("winner");

  });

});
