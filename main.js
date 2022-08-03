// Modules
const gameBoard = (() => {
  const gameArray = ["", "", "", "", "", "", "", "", ""];
  const winIndeces = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // cache DOM
  const gameBoardDOM = document.getElementById("game-board");
  const ul = gameBoardDOM.firstElementChild;
  const li = Array.from(ul.children);

  function getGameArray() {
    return gameArray;
  }

  function getListElements() {
    return li;
  }

  function getWinIndeces() {
    return winIndeces;
  }

  function modifyArray(index, letter) {
    gameArray[index] = letter;
  }

  return { getGameArray, getListElements, getWinIndeces, modifyArray };
})();

const displayController = (() => {
  // cache DOM
  const modal = document.getElementById("winner-modal");

  // add listener
  modal.addEventListener("click", closeModal);

  function showGameArray() {
    gameBoard.getListElements().forEach((li, index) => {
      li.textContent = gameBoard.getGameArray()[index];
    });
  }

  function showMessage(message) {
    displayController.modal.firstElementChild.textContent = message;
    displayController.modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
    gameController.resetGameArray();
    gameController.resetPlayer();
    displayController.showGameArray();
  }

  return { showGameArray, showMessage, modal };
})();

const gameController = (() => {
  // cache DOM
  let playerText = document.getElementsByTagName("h2")[0];

  // event listeners
  gameBoard.getListElements().forEach((li) => {
    li.addEventListener("click", doTurn);
  });

  function doTurn(event) {
    if (
      playerText.textContent == "Player 1's Turn" &&
      event.target.textContent == ""
    ) {
      playerText.textContent = "Player 2's Turn";
      gameBoard.modifyArray(event.target.dataset["id"], "X");
      if (checkWinner("X")) {
        displayController.showMessage("Player 1 wins!");
      }
    } else if (
      playerText.textContent == "Player 2's Turn" &&
      event.target.textContent == ""
    ) {
      playerText.textContent = "Player 1's Turn";
      gameBoard.modifyArray(event.target.dataset["id"], "O");
      if (checkWinner("O")) {
        displayController.showMessage("Player 2 wins!");
      }
    }
    if (checkTie() && !checkWinner("O") && !checkWinner("X")) {
      displayController.showMessage("Tie game!");
    }

    displayController.showGameArray();
  }

  function resetPlayer() {
    playerText.textContent = "Player 1's Turn";
  }

  function resetGameArray() {
    for (index = 0; index < 9; index++) {
      gameBoard.modifyArray(index, "");
    }
  }

  function checkWinner(letter) {
    const arr = gameBoard.getGameArray();
    const ind = gameBoard.getWinIndeces();
    let currentIndeces;

    // Check win condition
    for (let i = 0; i < ind.length; i++) {
      let count = 0;
      currentIndeces = ind[i];
      for (let j = 0; j < 3; j++) {
        if (arr[currentIndeces[j]] == letter) {
          count++;
        }
      }
      if (count == 3) {
        return true;
      }
    }
  }
  function checkTie() {
    let count = 0;
    const arr = gameBoard.getGameArray();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == "X" || arr[i] == "O") {
        count++;
      }
    }
    if (count == 9) {
      return true;
    }
  }

  return { resetGameArray, resetPlayer };
})();

// Factory functions
const players = (name, letter, turn) => {};

displayController.showGameArray();
