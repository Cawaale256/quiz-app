const questions = [
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

// html Dom Methods

const startButton = document.querySelector(".start-btn");
const questionElement = document.getElementById("question");
const optionElements = document.getElementById("options");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

/**
 * Add Event Listeners to the startButton and nextButton
 */

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

/**
 * Initializes the quiz by startButton
 * Hides the startButton by adding hide class
 * Rests both currentQuestionIndex and score to zero
 * calls setNextQuestion 
 */

function startGame() {
    startButton.classList.add("hide");
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
}

/**
 * sets up the next question
 * calls resetstate function to clear any previous question
 * calll agian showQuestion functionwith current question to show
 */
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

/**
 * shows the current question and its options:
 * sets the text of the questionElement to the current question's text
 * loops over options array of the current question
 * for each option, create a new button element,sets its text to the option and adds the btn classto it  
 */

function showQuestion(question) {
    questionElement.innerText = questions.question;
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn");
        button.addEventListener("click", selectOption((option, correctAnswer)));
        optionElements.appendChild(button);
    });
} 

/**
 * Reset the state of the quiz before showing the nextquestion:
 * hides the nextButton,removes child elements from the optionElements,
 */

function resetState() {
    nextButton.classList.add("hide");
    while (optionElements.firstChild) {
        optionElements.removeChild(optionElements.firstChild);
    }
}

/**
 * check if the selected answer is correct
 * update the quiz score
 * making nextButton vissible
 */

function  selectOption(Option, answer){
    if (option === answer ){
        score++;
    }
    nextButton.classList.remove("hide");

}

/**
 * display final score at the end of the quiz
 * display startButton
 * hide nextButton
 */

// function showResult() {
//     questionElement.innerText = `Your score is ${score} out of ${questions.length}`;
//     startButton.innerText = "Restart";
//     startButton.classList.remove("hide");
//     nextButton.classList.add("hide");
// }
