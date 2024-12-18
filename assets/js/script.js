const startButton = document.querySelector(".start-btn");
const questionElement = document.getElementById("question");
const optionElements = document.getElementById("options");
const correctScoreElement = document.getElementById("correct-score");
const wrongScoreElement = document.getElementById("wrong-score");
const progressBar = document.getElementById("progress-bar");
const quizIntro = document.getElementById("quiz-intro");
const quizContent = document.getElementById("quiz-content");
const scoreMessageElement = document.getElementById("score-message");

let currentQuestionIndex = 0;
let score = 0;
let correctScore = 0;
let wrongScore = 0;
let questions = [];

// Add Event Listener to the startButton
startButton.addEventListener("click", startGame);

// Initializes the quiz by startButton
async function startGame() {
    quizIntro.style.display = 'none';
    quizContent.style.display = 'block';
    scoreMessageElement.style.display = 'none'; // Hide score message during quiz
    currentQuestionIndex = 0;
    score = 0;
    correctScore = 0;
    wrongScore = 0;
    updateScore();
    questions = await fetchGeographyQuestions();
    questions = questions.slice(0, 10); // Limit to 10 questions
    setNextQuestion();
    updateProgressBar();
}

// Fetch geography questions from The Trivia API
async function fetchGeographyQuestions() {
    const response = await fetch('https://the-trivia-api.com/v2/questions?categories=geography');
    const data = await response.json();
    return data.map(question => ({
        question: question.question.text, // Access the question text correctly
        options: question.incorrectAnswers.concat(question.correctAnswer).sort(() => Math.random() - 0.5),
        answer: question.correctAnswer
    }));
}

// Sets up the next question
function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    updateProgressBar();
}

// Shows the current question and its options
function showQuestion(question) {
    if (currentQuestionIndex >= questions.length) {
        showResult();
        return;
    }
    questionElement.innerText = question.question;
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("btn", "btn-outline-primary");
        button.addEventListener("click", () => selectOption(option));
        optionElements.appendChild(button);
    });
}

// Reset the state of the quiz before showing the next question
function resetState() {
    while (optionElements.firstChild) {
        optionElements.removeChild(optionElements.firstChild);
    }
}

// Check if the selected answer is correct and update the quiz score
async function selectOption(option) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (option === correctAnswer) {
        score++;
        correctScore++;
    } else {
        wrongScore++;
    }
    updateScore();
    currentQuestionIndex++;
    await delay(1000); // Add a delay of 1 second before moving to the next question
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
}

// Add a delay function that returns a promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Update the live score
function updateScore() {
    correctScoreElement.innerText = correctScore;
    wrongScoreElement.innerText = wrongScore;
}

// Update the progress bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100; // Adjusted to ensure it hits 100%
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute('aria-valuenow', progress);
    progressBar.innerText = `${Math.round(progress)}%`;
}

// Display final score at the end of the quiz
function showResult() {
    quizContent.style.display = 'none'; // Hide quiz content
    scoreMessageElement.style.display = 'block'; // Show score message
    scoreMessageElement.innerText = `You scored ${score} out of ${questions.length}`; // Display score message
    startButton.style.display = 'block'; // Reappear the start button
    startButton.innerText = "Restart"; // Update button text to "Restart"
    startButton.classList.remove("d-none"); // Ensure the button is visible
    quizIntro.style.display = 'block'; // Show the intro section to hold the restart button
}




