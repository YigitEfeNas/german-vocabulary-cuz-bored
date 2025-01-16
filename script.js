let wordList = [];
let fullWordList = [];
let currentWord = {};
let isEnglishToGerman = true;
let correctAnswers = 0;
let totalAnswered = 0;
let timerInterval;

// Load word lists and populate buttons
document.addEventListener("DOMContentLoaded", () => {
    fetch("wordlists.json")
        .then(response => response.json())
        .then(data => {
            populateButtons(data);
            setupWordListTable(data);
        });

    document.getElementById("submit-button").addEventListener("click", checkAnswer);
    document.getElementById("user-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") checkAnswer();
    });

    document.getElementById("toggle-word-list").addEventListener("click", toggleWordList);
});

// Get the translation direction based on user selection
function getTranslationDirection() {
    const selectedDirection = document.querySelector('input[name="direction"]:checked').value;
    return selectedDirection === "english-to-german";
}

// Create buttons for each word list
function populateButtons(data) {
    const buttonContainer = document.getElementById("list-buttons");
    for (const listName in data) {
        const button = document.createElement("button");
        button.textContent = listName.charAt(0).toUpperCase() + listName.slice(1);
        button.addEventListener("click", () => startQuiz(data[listName]));
        buttonContainer.appendChild(button);
    }
}

// Start the quiz with a selected word list
function startQuiz(words) {
    // Reset state
    wordList = shuffle([...words]); // Make a fresh copy and shuffle
    fullWordList = [...words]; // Keep the full list for the score tracker
    currentWord = {};
    correctAnswers = 0;
    totalAnswered = 0;
    resetFeedback();
    updateScore();

    // Set translation direction
    isEnglishToGerman = getTranslationDirection();

    // Start the timer
    startTimer();

    // Load the first word
    nextWord();
}

// Shuffle the word list
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Display the next word in the list
function nextWord() {
    if (wordList.length === 0) {
        endQuiz();
        return;
    }
    currentWord = wordList.pop();
    const wordPrompt = document.getElementById("word-prompt");
    wordPrompt.textContent = isEnglishToGerman ? currentWord.english : currentWord.german;

    // Clear input
    document.getElementById("user-input").value = "";
}

// Check the user’s answer
function checkAnswer() {
    const userInput = document.getElementById("user-input").value.trim().toLowerCase();
    const correctAnswer = isEnglishToGerman ? currentWord.german : currentWord.english;

    const feedback = document.getElementById("feedback");
    totalAnswered++;

    if (userInput === correctAnswer.toLowerCase()) {
        correctAnswers++;
        feedback.textContent = "Correct!";
        feedback.className = "correct";
    } else {
        feedback.textContent = `The correct answer is "${correctAnswer}".`;
        feedback.className = "incorrect";
    }

    updateScore();
    nextWord();
}

// Update the score display
function updateScore() {
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = `${correctAnswers}/${totalAnswered}`;
}

// Start a timer
function startTimer() {
    const timerDisplay = document.getElementById("timer");
    let seconds = 0;

    // Clear any existing timer
    if (timerInterval) clearInterval(timerInterval);

    // Start new timer
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Time: ${formatTime(seconds)}`;
    }, 1000);
}

// Format seconds into mm:ss
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// End the quiz
function endQuiz() {
    const feedback = document.getElementById("feedback");
    feedback.textContent = "Quiz completed! Well done.";
    feedback.className = "correct";

    // Stop the timer
    if (timerInterval) clearInterval(timerInterval);
}

// Reset feedback message
function resetFeedback() {
    const feedback = document.getElementById("feedback");
    feedback.textContent = "";
    feedback.className = "";
}

// Toggle word list visibility
function toggleWordList() {
    const wordListContainer = document.getElementById("word-list-container");
    wordListContainer.classList.toggle("hidden");
}

// Populate all words table
function setupWordListTable(data) {
    const table = document.getElementById("all-words-table");
    table.innerHTML = ""; // Clear table

    for (const listName in data) {
        const headerRow = document.createElement("tr");
        const headerCell = document.createElement("th");
        headerCell.colSpan = 2;
        headerCell.textContent = listName.charAt(0).toUpperCase() + listName.slice(1);
        headerRow.appendChild(headerCell);
        table.appendChild(headerRow);

        data[listName].forEach(word => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${word.english}</td><td>${word.german}</td>`;
            table.appendChild(row);
        });
    }
}
