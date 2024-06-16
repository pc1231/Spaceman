// Define wordList as a constant array
const wordList = ["robot", "armstrong", "astronaut", "space"];
let guessedLetters = [];
const maxWrongGuesses = 5;
let wordToGuess;
let wrongGuesses = 0;
let displayWord;

// Function to start a new game
function newGame() {
    // Choose a random word from the word list
    wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
    guessedLetters = [];
    wrongGuesses = 0;  // Reset wrong guesses
    displayWord = "_".repeat(wordToGuess.length);
    updateDisplay();
}

// Function to update the display
function updateDisplay() {
    document.getElementById('displayWord').textContent = "Word: " + displayWord.split('').join(' ');
    document.getElementById('guessedLetters').textContent = "Guessed Letters: " + guessedLetters.join(', ');
    document.getElementById('gameResult').textContent = ""; // Clear game result
}

// Function to process a guessed letter
function guessLetter() {
    let guess = document.getElementById('guessInput').value.toLowerCase();

    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert("Please enter a single letter from A-Z.");
        return;
    }

    if (guessedLetters.includes(guess)) {
        alert("You already guessed that letter.");
        return;
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

    updateDisplay();

    if (!displayWord.includes("_")) {
        document.getElementById('gameResult').textContent = "Congratulations! You've guessed the word: " + wordToGuess;
        setTimeout(newGame, 2000); // Automatically start a new game after 2 seconds
    }

    if (wrongGuesses >= maxWrongGuesses) {
        document.getElementById('gameResult').textContent = "Game Over! The word was: " + wordToGuess;
        setTimeout(newGame, 2000); // Automatically start a new game after 2 seconds
    }
}

// Function to handle letter clicks from keyboard
function handleLetterClick(letter) {
    document.getElementById('guessInput').value = letter;
    guessLetter();
}

// Event listener for the 'Enter' key in the guess input field
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('guessInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            guessLetter();
        }
    });

    // Start the game when the page loads
    newGame();
});
