const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            {Text: "Berlin", correct: false},
            {Text: "Madrid", correct: false},
            {Text: "Rome", correct: false},
            {Text: "Paris", correct: true},
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {Text: "Earth", correct: false},
            {Text: "Mars", correct: true},
            {Text: "Jupiter", correct: false},
            {Text: "Venus", correct: false},
        ]
    },
    {
        question: "What is the boiling point of water at sea level?",
        answers: [
            {Text: "90°C", correct: false},
            {Text: "110°C", correct: false},
            {Text: "100°C", correct: true},
            {Text: "200°C", correct: false},
        ]
    },
    {
        question: "Which animal is known as the King of the Jungle?",
        answers: [
            {Text: "Tiger", correct: false},
            {Text: "Elephant", correct: false},
            {Text: "Lion", correct: true},
            {Text: "Cheetah", correct: false},
        ]
    }
];

const questionElement = document.getElementsByClassName("question")[0];
const optionButton = document.getElementsByClassName("options")[0];
const nextButton = document.getElementsByClassName("next_btn")[0];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answers => {
        const button = document.createElement("button");
        button.innerHTML = answers.Text;
        button.classList.add("btn");
        optionButton.appendChild(button);
        if(answers.correct){
            button.dataset.correct = answers.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    // nextButton.style.display = "none";
    while(optionButton.firstChild){
        optionButton.removeChild(optionButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(optionButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();