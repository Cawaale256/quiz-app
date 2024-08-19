const question = [
{
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris"
},
{
    question : "What is the capital of Spain?",
    options : ["Paris", "London", "Berlin", "Madrid"],
    answer : "Madrid"
},
{
    question : "What is the capital of Germany?",
    options : ["Paris", "London", "Berlin", "Madrid"],
    answer : "Berlin"
},
{
    question : "What is the capital of England?",
    options : ["Paris", "London", "Berlin", "Madrid"],
    answer : "London"
}
] 

const startButton = document.querySelector(".start-btn");
const questionElement = document.getElementById("question");
const optionElements = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        button.addEventListener("click", () => selectOption(option, question.answer));
        optionElements.appendChild(button);
    });
}