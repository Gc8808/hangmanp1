//word list
const wordList = [ 'Gold', 'luck', 'clover', 'rain', 'rainbow', 'sunlight', 'shamrock', ]
   


//declare varibles
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

//start game runs everything
function startGame(level) {
//reset game
wrongGuesses = 0
guessedLetters = []
selectedWord = getRandomWord(level)
displayedWord = '_'.repeat(selectedWord.length)
updateDifficultyDisplay(level)
updateUI()

//Show Game area and difficulty display hide selection button
document.getElementById('gameArea').classList.remove('d-none')
document.getElementById('gameArea').classList.add('d-block')

document.getElementById('difficultyBox').classList.remove('d-none')
document.getElementById('difficultyBox').classList.add('d-block')
document.getElementById('difficultySelection').classList.add('d-none')

document.getElementById('letterInput').focus() //Type without clicking
}

function getRandomWord(level){
let filteredWords = wordList.filter (word => {
    if (level=== 'easy') return word.length <= 4
    if (level=== 'medium') return word.length >= 5 && word.length <=7
    if (level=== 'hard') return word.length >= 8
}
)

return filteredWords[Math.floor(Math.random()*filteredWords.length)]

}
//update difficulty display
function updateDifficultyDisplay(level) {
let difficultyBox = document.getElementById('difficultyBox')
difficultyBox.classList.remove('easy', 'medium', 'hard')
if(level=== 'easy') {
difficultyBox.classList.add('easy')
document.getElementById('difficultyBox').innerHTML ='easy'
}else if (level=== 'medium') {
    difficultyBox.classList.add('medium')
    document.getElementById('difficultyBox').innerHTML ='medium'
} else if (level=== 'hard') {
    difficultyBox.classList.add('hard')
    document.getElementById('difficultyBox').innerHTML ='hard'
}
}
function updateUI(){
    document.getElementById('wordDisplay').textContent = displayedWord.split('').join('  ') //Show word with spaces
    
}

function guessLetter(){
let inputField = document.getElementById('letterInput') //Get input field
let guessedLetter = inputField.value.toLowerCase() //Converting to lowercase
// check for valid input
if (!guessedLetter.match(/^[a-z]$/)) {
    alert('Please enter a valid letter (a-z)')
    inputField.value = ''
    return
}
if (guessedLetters.includes(guessLetter)) {
    alert('Letter already Guessed')
    inputField.value = ''
    return
}
//store guessed letter
guessedLetters.push(guessedLetter)
if (selectedWord.includes(guessedLetter)){
    updateCorrectedGuess(guessedLetter)
} else {
    updateWrongGuess(guessedLetter)
}
inputField.value = ''
document.getElementById('letterInput').focus()
}

function updateWrongGuess(guessedLetter) {
    wrongGuesses++
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`
   // document.getElementById('shamrock').src= `imgs/shamrock${6-wrongGuesses}.jpg`

    if (wrongGuesses === maxMistakes) {
         endGame(false)
    }
}
function updateCorrectedGuess(guessedLetter) {
let newDisplayedWord = ''

for(let i=0;i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
        newDisplayedWord += guessedLetter
    } else {
        newDisplayedWord += displayedWord[i]

    }
}
displayedWord = newDisplayedWord
updateUI()
 if (!displayedWord.includes('_')) {
    endGame(true)
 }
}