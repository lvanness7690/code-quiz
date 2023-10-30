const timerEl = document.getElementById("timer");
const startQuizButton = document.getElementById("start-quiz");
const mainContent = document.querySelector(".main-content");
const viewHighScoresLink = document.getElementById("view-high-scores");
let timeLeft = 60;

const questions = [
    {
        question: "Commonly used data types DO not Include:",
        options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if / else statement is enclosed with ____.",
        options: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        options: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },
];

let currentQuestionIndex = 0;

startQuizButton.addEventListener("click", startQuiz);
viewHighScoresLink.addEventListener("click", displayHighScores);

function startQuiz() {
    startQuizButton.style.display = "none";
    timerEl.textContent = `Time: ${timeLeft}`;
    const timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time: ${timeLeft}`;
        if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    mainContent.innerHTML = `<h2>${currentQuestion.question}</h2>`;
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, currentQuestion.answer));
        mainContent.appendChild(button);
    });
}

function checkAnswer(selected, correctAnswer) {
    if (selected !== correctAnswer) {
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    }
}

function endQuiz() {
    mainContent.innerHTML = `<h2>Game Over!</h2>
                             <p>Your score: ${timeLeft}</p>
                             <label for="initials">Enter your initials:</label>
                             <input type="text" id="initials">
                             <button id="submit-score">Submit</button>`;
    document.getElementById("submit-score").addEventListener("click", saveScore);
}

function saveScore() {
    const initials = document.getElementById("initials").value;
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ initials, score: timeLeft });
    localStorage.setItem("scores", JSON.stringify(scores));
    mainContent.innerHTML = `<h2>Thank you!</h2>`;
}

function displayHighScores(event) {
    event.preventDefault(); // prevent default link behavior

    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    mainContent.innerHTML = '<h2>High Scores</h2><ul id="scores-list"></ul>';
    const scoresList = document.getElementById("scores-list");

    scores.sort((a, b) => b.score - a.score); // sort scores in descending order

    scores.forEach(score => {
        const li = document.createElement("li");
        li.textContent = `${score.initials}: ${score.score}`;
        scoresList.appendChild(li);
    });
}
