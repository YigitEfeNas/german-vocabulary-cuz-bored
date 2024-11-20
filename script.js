let wordList = [];
let currentWord = {};
let isEnglishToSpanish = true;

// Load word lists and populate buttons
document.addEventListener("DOMContentLoaded", () => {
    fetch("wordlists.json")
        .then(response => response.json())
        .then(data => {
            populateButtons(data);
        });

    document.getElementById("submit-button").addEventListener("click", checkAnswer);
    document.getElementById("user-input").addEventListener("keydown", (e) => {
        if (e.key === "Enter") checkAnswer();
    });
});

// Create buttons for each word list
function populateButtons(data) {
    const buttonContainer = document.getElementById("list-buttons");
    for (const listName in data) {
        const button = document.createElement("button");
        button.textContent = listName;
        button.addEventListener("click", () => loadWordList(data[listName]));
        buttonContainer.appendChild(button);
    }
}

// Load a word list and initialize the game
function loadWordList(words) {
    wordList = shuffle(words);
    currentWord = wordList.pop();
    isEnglishToSpanish = Math.random() > 0.5; // Randomly choose direction
    updateWordPrompt();
    populateWordTable(words);
}

// Shuffle the word list
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Display a random word prompt
function updateWordPrompt() {
    const wordPrompt = document.getElementById("word-prompt");
    wordPrompt.textContent = isEnglishToSpanish ? currentWord.english : currentWord.spanish;
}

// Check the user’s answer
function checkAnswer() {
    const userInput = document.getElementById("user-input").value.trim().toLowerCase();
    const correctAnswer = isEnglishToSpanish ? currentWord.spanish : currentWord.english;

    const feedback = document.getElementById("feedback");
    if (userInput === correctAnswer.toLowerCase()) {
        feedback.textContent = "Correct!";
        feedback.className = "correct";
    } else {
        feedback.textContent = `The correct answer is "${correctAnswer}".`;
        feedback.className = "incorrect";
    }

    if (wordList.length > 0) {
        currentWord = wordList.pop();
        updateWordPrompt();
        document.getElementById("user-input").value = "";
    } else {
        feedback.textContent = "No more words in this list!";
    }
}

// Populate the table of all words
function populateWordTable(words) {
    const tableBody = document.getElementById("words-list");
    tableBody.innerHTML = ""; // Clear existing rows
    words.forEach(word => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${word.english}</td><td>${word.spanish}</td>`;
        tableBody.appendChild(row);
    });
}
