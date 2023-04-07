const words = ['apple', 'banana', 'grapefruit', 'kiwi', 'mango', 'orange', 'strawberry'];
const maxAttempts = 6;
let attempts = maxAttempts;
let guessedLetters = new Set();
let currentWord;

function initializeGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters.clear();
  attempts = maxAttempts;
  displayWord();
  displayMessage('');
  displayAttemptsRemaining();
  createLetterButtons();
}

function displayWord() {
  const wordContainer = document.getElementById('word-container');
  wordContainer.innerHTML = '';

  for (const letter of currentWord) {
    const letterBox = document.createElement('span');
    letterBox.classList.add('letter-box');

    if (guessedLetters.has(letter)) {
      letterBox.textContent = letter;
    } else {
      letterBox.textContent = '_';
    }

    wordContainer.appendChild(letterBox);
  }
}

function displayMessage(text) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = text;
}

function displayAttemptsRemaining() {
  const attemptsElement = document.getElementById('attempts-remaining');
  attemptsElement.textContent = `Attempts remaining: ${attempts}`;
}

function createLetterButtons() {
  const letterContainer = document.getElementById('letter-container');
  letterContainer.innerHTML = '';

  for (let i = 97; i <= 122; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement('button');
    button.classList.add('letter-btn');
    button.textContent = letter;
    button.addEventListener('click', () => handleLetterClick(letter));
    letterContainer.appendChild(button);
  }
}

function handleLetterClick(letter) {
  if (guessedLetters.has(letter) || attempts === 0) {
    return;
  }

  guessedLetters.add(letter);

  if (currentWord.includes(letter)) {
    displayWord();
    checkForWin();
  } else {
    attempts--;
    displayAttemptsRemaining();
    checkForLoss();
  }
}

function checkForWin() {
  if (Array.from(currentWord).every(letter => guessedLetters.has(letter))) {
    displayMessage('Congratulations! You guessed the word!');
    disableButtons();
  }
}

function checkForLoss() {
  if (attempts === 0) {
    displayMessage('Game over! Better luck next time!');
    disableButtons();
  }
}

function disableButtons() {
  const buttons = document.getElementsByClassName('letter-btn');

  for (const button of buttons) {
    button.disabled = true;
  }
}

function addRestartButtonListener() {
  const restartButton = document.getElementById('restart-btn');
  restartButton.addEventListener('click', () => {
    initializeGame();
    enableButtons();
  });
}

function enableButtons() {
  const buttons = document.getElementsByClassName('letter-btn');

  for (const button of buttons) {
    button.disabled = false;
  }
}

initializeGame();
addRestartButtonListener();