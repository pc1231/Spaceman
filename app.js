const easyWords = ["star", "moon", "mars"];
const mediumWords = ["rocket", "astronaut", "gravity"];
const hardWords = ["constellation", "nebula", "blackhole"];

const difficultyLevels = {
  easy: easyWords,
  medium: mediumWords,
  hard: hardWords,
};

let guessedLetters = [];
const maxWrongGuesses = 5;
let wordToGuess;
let wrongGuesses;
let displayWord;

console.log("Welcome to Spaceman! Guess the space-themed word.");

function chooseDifficulty() {
  let difficulty;
  while (!difficulty) {
    difficulty = prompt("Choose difficulty (easy, medium, hard):").toLowerCase();
    if (!difficultyLevels.hasOwnProperty(difficulty)) {
      console.error("Invalid difficulty. Please choose easy, medium, or hard.");
      difficulty = null;
    }
  }
  return difficulty;
}

function newGame() {
  try {
    const difficulty = chooseDifficulty();
    const wordList = difficultyLevels[difficulty];
    wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    displayWord = "_".repeat(wordToGuess.length);
  } catch (error) {
    console.error("Error starting a new game:", error);
  } finally {
    gameLoop();
  }
}

function displayGameState() {
  console.log("Word: " + displayWord.split('').join(' '));
  console.log("Guessed Letters: " + guessedLetters.join(', '));
  console.log("Wrong guesses left: " + (maxWrongGuesses - wrongGuesses));
}

function gameLoop() {
  while (wrongGuesses < maxWrongGuesses && displayWord.includes("_")) {
    displayGameState();
    let guess;
    try {
      guess = prompt("Enter a letter to guess:").toLowerCase();
      if (guess.length !== 1 || !guess.match(/[a-z]/i)) {
        throw new Error("Invalid guess. Please enter a single letter.");
      }
    } catch (error) {
      console.error(error.message);
      continue;
    }
    if (guessedLetters.includes(guess)) {
      console.log("You already guessed that letter.");
      continue;
    }
    guessedLetters.push(guess);
    if (wordToGuess.includes(guess)) {
      for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === guess) {
          displayWord = displayWord.substr(0, i) + guess + displayWord.substr(i + 1);
        }
      }
    } else {
      wrongGuesses++;
    }
  }
  if (!displayWord.includes("_")) {
    console.log("Congratulations! You've guessed the word: " + wordToGuess);
  } else {
    console.log("Game Over! The word was: " + wordToGuess);
  }
}

newGame();