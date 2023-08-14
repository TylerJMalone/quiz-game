const questions = [
    {
        question: "What is 4 + 5?",
        answers: [
            {text: "143", correct: false},
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
            {text: "W = 0", correct: false},
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
    nextButton.innerHTML = "Next";
    showQuestion();
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
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
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
    questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();