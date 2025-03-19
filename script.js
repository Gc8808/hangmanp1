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
updateDifficultyDisplay(level)

//Show Game area and difficulty display hide selection button
document.getElementById('gameArea').classList.remove('d-none')
document.getElementById('gameArea').classList.add('d-block')

document.getElementById('difficultyBox').classList.remove('d-none')
document.getElementById('difficultyBox').classList.add('d-block')
document.getElementById('difficultySelection').classList.add('d-none')
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