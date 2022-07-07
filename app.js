const scoreDisplay = document.getElementById('score-display');
const questionDisplay = document.getElementById('question-display');

// array of questions to display
const questions = [
    {
        quiz: ['value', 'estimate', 'evaluate'],
        options: ['jury', 'assess'],
        correct: 2
    },
    {
        quiz: ['close', 'near', 'next'],
        options: ['trace', 'adjacent'],
        correct: 1
    },
    {
        quiz: ['fast', 'quick', 'prompt'],
        options: ['charity', 'rapid'],
        correct: 2
    },
    {
        quiz: ['foreign', 'national', 'ethnic'],
        options: ['mad', 'exotic'],
        correct: 2
      }
]

// loop to create questions

let score = 0;
scoreDisplay.textContent = score;

let clicked = []

function populateQuestions() {

    questions.forEach(question => {
        // create a div for each new question
        const questionBox = document.createElement('div')
        questionBox.classList.add('question-box')

        const logoDisplay = document.createElement('h1')
        logoDisplay.textContent = "🖊️"
        questionBox.append(logoDisplay)

        question.quiz.forEach(tip => {
            const tipText = document.createElement("p")
            tipText.textContent = tip
            questionBox.append(tipText) // put tip in question-box
        })

        //display the options as buttons
        const questionButtons = document.createElement('div')
        questionButtons.classList.add('question-buttons')
        questionBox.append(questionButtons)

        question.options.forEach((option, optionIndex) => {
            const questionButton = document.createElement('button')
            questionButton.classList.add('question-button')
            questionButton.textContent = option

            questionButton.addEventListener('click', () =>
            checkAnswer(
              questionBox,
              questionButton,
              option,
              optionIndex + 1,
              question.correct
            )
          )

            questionButtons.append(questionButton)
        })

        // show whether the answer is correct/incorrect
        const answerDisplay = document.createElement('div')
        answerDisplay.classList.add('answer-display')

        questionBox.append(answerDisplay)

        questionDisplay.append(questionBox)
    })

}

populateQuestions()

// check if answer is correcnt -> then say correct/incorrect, also disable the button clicked
function checkAnswer(questionBox, questionButton, option, optionIndex, correctAnswer) {
    console.log('option', option)
    console.log('optionIndex', optionIndex)

    if(optionIndex === correctAnswer) {
        score++
        scoreDisplay.textContent = score
        addResult(questionBox, "Correct!", "correct")
    } else {
        score--
        scoreDisplay.textContent = score
        addResult(questionBox, "Incorrect", "incorrect")
    }
    clicked.push(option)

    questionButton.disabled = clicked.includes(option)    
}


function addResult(questionBox, answer, className) {
    const answerDisplay = questionBox.querySelector('.answer-display')
    answerDisplay.classList.remove('incorrect')
    answerDisplay.classList.remove('correct')
    answerDisplay.classList.add(className)
    answerDisplay.textContent = answer
}