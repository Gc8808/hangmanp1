// Word list
const wordList = ['gold', 'luck', 'clover', 'rain', 'rainbow', 'sunlight', 'shamrock'];

// Declare variables
let selectedWord = '';
let displayedWord = '';
let wrongGuesses = 0;
let guessedLetters = [];
const maxMistakes = 6;
const audio = document.getElementById("ding-small-bell-sfx-233008.mp3");


// Start game function
function startGame(level) {
    // Reset game
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = getRandomWord(level);
    displayedWord = '_'.repeat(selectedWord.length);
    updateDifficultyDisplay(level);
    updateUI();

    // Show game area and difficulty display, hide selection button
    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('gameArea').classList.add('d-block');

    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-block');
    document.getElementById('difficultySelection').classList.add('d-none');
    document.getElementById('letterInput').focus(); // Type without clicking
}

// Get a random word based on difficulty level
function getRandomWord(level) {
    let filteredWords = wordList.filter(word => {
        if (level === 'easy') return word.length <= 4;
        if (level === 'medium') return word.length >= 5 && word.length <= 7;
        if (level === 'hard') return word.length >= 8;
    });

    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

// Update difficulty display
function updateDifficultyDisplay(level) {
    let difficultyBox = document.getElementById('difficultyBox');
    difficultyBox.classList.remove('easy', 'medium', 'hard');
    
    difficultyBox.textContent = level;
    difficultyBox.classList.add(level);
}

// Update UI with the displayed word
function updateUI() {
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ');
}

// Handle letter guesses
function guessLetter() {
    let inputField = document.getElementById('letterInput'); // Get input field
    let guessedLetter = inputField.value.toLowerCase(); // Convert to lowercase

    // Check for valid input
    if (!guessedLetter.match(/^[a-z]$/)) {
        alert('Please enter a valid letter (a-z)');
        inputField.value = '';
        return;
    }

    if (guessedLetters.includes(guessedLetter)) {
        alert('Letter already guessed');
        inputField.value = '';
        return;
    }

    // Store guessed letter
    guessedLetters.push(guessedLetter);
    if (selectedWord.includes(guessedLetter)) {
        updateCorrectedGuess(guessedLetter);
    } else {
        updateWrongGuess(guessedLetter);
    }
    inputField.value = '';
    inputField.focus();
}

// Handle wrong guesses
function updateWrongGuess(guessedLetter) {
    wrongGuesses++;
    

    document.getElementById('wrongLetters').textContent += `${guessedLetter} `;
    document.getElementById('incorrectSound').play();
    document.getElementById('hangmanImage').src = `start(${wrongGuesses}).png`;
    if (wrongGuesses === maxMistakes) {
        endGame(false);
    }
}

// Handle correct guesses
function updateCorrectedGuess(guessedLetter) {
    let newDisplayedWord = '';

    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
            newDisplayedWord += guessedLetter;
        } else {
            newDisplayedWord += displayedWord[i];
        }
    }

    displayedWord = newDisplayedWord;
    updateUI();

   document.getElementById('correctSound').play();

    if (!displayedWord.includes('_')) {
        endGame(true);
     
    }
}

// End game function
function endGame(won) {
    let message = won
        ? '🎉 Congratulations! You guessed the word! 🍀'
        : `❌ Game Over! The word was "${selectedWord}".`;
       
    let endMessage = document.getElementById('end');
    endMessage.textContent = message; // Set the text content of the element
    endMessage.classList.remove('d-none'); // Show the message
    endMessage.classList.add('d-block'); // Ensure it's displayed properly
    
    // Hide the game area
    document.getElementById('gameArea').classList.add('d-none');

    // Hide the difficulty box
    document.getElementById('difficultyBox').classList.add('d-none'); // Hide the difficulty box

    // Show the difficulty selection buttons again
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('difficultySelection').classList.add('d-block');

    // Optional: Add a 3-second delay before resetting the game state
    setTimeout(() => {
        // Reset game variables
        wrongGuesses = 0;
        guessedLetters = [];
        selectedWord = '';
        displayedWord = '';
        document.getElementById('hangmanImage').src = 'start.png';
        document.getElementById('wrongLetters').innerText = ('Wrong Guesses:')
        // Hide the end message
        endMessage.classList.add('d-none');

        // Show the difficulty selection buttons
        document.getElementById('difficultySelection').classList.remove('d-none');
        document.getElementById('difficultySelection').classList.add('d-block');
    }, 3000); // 3-second delay before showing difficulty selection
}


function restartGame(end) {
    let message = end
    ? ' Restarting...'
    : `Restarting...`;

let endMessage = document.getElementById('end');
endMessage.textContent = message; // Set the text content of the element
endMessage.classList.remove('d-none'); // Show the message
endMessage.classList.add('d-block'); // Ensure it's displayed properly

// Hide the game area
document.getElementById('gameArea').classList.add('d-none');

// Hide the difficulty box
document.getElementById('difficultyBox').classList.add('d-none'); // Hide the difficulty box

// Show the difficulty selection buttons again
document.getElementById('difficultySelection').classList.remove('d-none');
document.getElementById('difficultySelection').classList.add('d-block');

// Optional: Add a 3-second delay before resetting the game state
setTimeout(() => {
    // Reset game variables
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = '';
    displayedWord = '';
    document.getElementById('wrongLetters').innerText = ('Wrong Guesses:')
    document.getElementById('hangmanImage').src = 'start.png';
    
    // Hide the end message
    endMessage.classList.add('d-none');

    // Show the difficulty selection buttons
    document.getElementById('difficultySelection').classList.remove('d-none');
    document.getElementById('difficultySelection').classList.add('d-block');
}, 3000); // 3-second delay before showing difficulty selection
}

// Add event listener for the Enter key
document.getElementById('letterInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        guessLetter();
    }
});

function startGameAlt(level) {
    // Reset game
    wrongGuesses = 0;
    guessedLetters = [];
    selectedWord = prompt("Enter your desired word").toLowerCase();
    displayedWord = '_'.repeat(selectedWord.length);
    updateDifficultyDisplay(level);
    updateUI();

    // Show game area and difficulty display, hide selection button
    document.getElementById('gameArea').classList.remove('d-none');
    document.getElementById('gameArea').classList.add('d-block');

    document.getElementById('difficultyBox').classList.remove('d-none');
    document.getElementById('difficultyBox').classList.add('d-block');
    document.getElementById('difficultySelection').classList.add('d-none');

    document.getElementById('letterInput').focus(); // Type without clicking
}


