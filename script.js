const timerElement = document.getElementById('timer-count');
let timeRemaining = 60;

const startButton = document.getElementById('start-button');


const appEl = document.querySelector('.app');
const timeClock = document.querySelector('.time-clock');
const promptEl = document.querySelector('.prompt');

var allInputs = document.querySelectorAll('input');


let timerInterval

var scoreCard = document.querySelector('.score-card')

// var highScores = localStorage.getItem('')

startButton.addEventListener('click', () => {
        startQuiz();
        // startTimer();
        startButton.style.display = "none";
});

const questions = [
    {
        question: "What is 4 + 5?",
        answers: [
            {text: "45", correct: false},
            {text: "9", correct: true},
            {text: "1", correct: false},
            {text: "8", correct: false},
        ]
    },
    {
        question: "What is a group of crows called?",
        answers: [
            {text: "Homocide", correct: false},
            {text: "Mukduk", correct: false},
            {text: "Murder", correct: true},
            {text: "Squad", correct: false},
        ]
    },
    {
        question: "Where did sushi originate?",
        answers: [
            {text: "China", correct: true},
            {text: "Italy", correct: false},
            {text: "Japan", correct: false},
            {text: "'Murica", correct: false},
        ]
    },
    {
        question: "When the first law of thermodynamics, Q = ΔU + W, is applied to an ideal gas that is taken through an isothermal process...",
        answers: [
            {text: "ΔU = 0", correct: true},
            {text: "W = Q", correct: false},
            {text: "Q = 0", correct: false},
            {text: "ΔU = W", correct: false},
        ]
    },
    {
        question: "What color are Mickey Mouse's shoes?",
        answers: [
            {text: "Red", correct: false},
            {text: "Blue", correct: false},
            {text: "Black", correct: false},
            {text: "Yellow", correct: true},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    timeRemaining = 60;
    nextButton.innerHTML = "Next";
    appEl.classList.remove('hidden');
    appEl.classList.add('visible');
    timeClock.classList.remove('hidden');
    timeClock.classList.add('visible');
    promptEl.classList.remove('visible');
    promptEl.classList.add('hidden');
    allInputs.forEach(singleInput => singleInput.value = "");
    showQuestion();
    startTimer();
}

function startTimer(){
    timerElement.textContent = timeRemaining;
    timerInterval = setInterval(() => {
        timeRemaining--;
        timerElement.textContent = timeRemaining;

        if (timeRemaining === 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp(){
    resetState();
    questionElement.innerHTML = "Out of Time!";
    showScore();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add('correct');
        // score++;
    } else {
        selectedBtn.classList.add('incorrect');
        // timeRemaining = timeRemaining - 5;
        timeRemaining -= 5
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ' + timeRemaining + " points! Nice! Save your initials below and play again to try to score even higher! (Check the local storage to see saved scores)";
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    scoreCard.classList.remove('hidden');
    scoreCard.classList.add('visible');
    timeClock.classList.remove('visible');
    timeClock.classList.add('hidden');
}

function saveScore(){
    var initials = document.getElementById("answerbox");
    localStorage.setItem(initials.value, timeRemaining);
    allInputs.forEach(singleInput => singleInput.value = "");
    scoreCard.classList.remove('visible');
    scoreCard.classList.add('hidden');
}
var saveButton = document.getElementById('save-btn');

saveButton.addEventListener('click', saveScore);

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        // timeRemaining = 60;
        showQuestion();
    }else{
        clearInterval(timerInterval);
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        scoreCard.classList.remove('visible');
        scoreCard.classList.add('hidden');
        startQuiz();
    }
});
