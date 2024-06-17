// List of words to guess
const wordList = ["robot", "armstrong", "astronaut", "space"];

// Array to store guessed letters
let guessedLetters = [];

// Maximum allowed wrong guesses before game over
const maxWrongGuesses = 5;

// Variables to track the current word to guess, wrong guesses, and displayed word
let wordToGuess;
let wrongGuesses = 0;
let displayWord;
// Function to start a new game
function newGame() {
    // Choose a random word from the word list
    wordToGuess = wordList[Math.floor(Math.random() * wordList.length)];
    
    // Reset guessed letters array
    guessedLetters = [];
    
    // Reset wrong guesses counter
    wrongGuesses = 0;
    
     // Initialize displayWord with underscores based on the length of wordToGuess
    displayWord = "_".repeat(wordToGuess.length);
    
    // Update the display to show the initial state of the game
    updateDisplay();
}
// Function to update the display with current game state
function updateDisplay() {
    // Update the HTML element displaying the word to guess with spaces between letters
    document.getElementById('displayWord').textContent = "Word: " + displayWord.split('').join(' ');
    
    // Update the HTML element displaying guessed letters
    document.getElementById('guessedLetters').textContent = "Guessed Letters: " + guessedLetters.join(', ');
    
    // Clear any previous game result messages
    document.getElementById('gameResult').textContent = "";
}
// Function to handle a player's letter guess
function guessLetter() {
    // Get the guessed letter from the input field and convert it to lowercase
    let guess = document.getElementById('guessInput').value.toLowerCase();

    // Validate the guessed letter
    if (guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert("Please enter a single letter from A-Z.");
        return;
    }

    // Check if the letter has already been guessed
    if (guessedLetters.includes(guess)) {
        alert("You already guessed that letter.");
        return;
    }

    // Add the guessed letter to the guessedLetters array
    guessedLetters.push(guess);

    // Check if the guessed letter is in the word to guess
    if (wordToGuess.includes(guess)) {
        // Replace underscores in displayWord with the guessed letter where it appears
        for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === guess) {
                displayWord = displayWord.substr(0, i) + guess + displayWord.substr(i + 1);
            }
        }
    } else {
        // Increment wrong guesses counter if guessed letter is not in the word
        wrongGuesses++;
    }

    // Update the display after each guess
    updateDisplay();

    // Check if the word has been completely guessed
    if (!displayWord.includes("_")) {
        document.getElementById('gameResult').textContent = "Congratulations! You've guessed the word: " + wordToGuess;
        setTimeout(newGame, 2000); // Automatically start a new game after 2 seconds
    }

    // Check if maximum wrong guesses limit has been reached
    if (wrongGuesses >= maxWrongGuesses) {
        document.getElementById('gameResult').textContent = "Game Over! The word was: " + wordToGuess;
        setTimeout(newGame, 2000); // Automatically start a new game after 2 seconds
    }
}

// Function to handle a click on a letter for guessing
function handleLetterClick(letter) {
    // Set the guess input field value to the clicked letter
    document.getElementById('guessInput').value = letter;
    
    // Process the guess as if the player pressed Enter
    guessLetter();
}
// Event listener for when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for when Enter key is pressed in guessInput field
    document.getElementById('guessInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            guessLetter();
        }
    });

    // Start a new game when the page loads
    newGame();
});
