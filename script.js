let wordlists = {}; // To store predefined word lists
let userLists = JSON.parse(localStorage.getItem("userLists")) || {}; // Load saved user lists
let currentList = [];
let tempList = []; // Temporarily store words for creating a new list
let correctAnswers = 0;
let totalAnswers = 0;

// Fetch predefined word lists and populate buttons
document.addEventListener("DOMContentLoaded", () => {
    fetch('wordlists.json')
        .then(response => response.json())
        .then(data => {
            wordlists = data;
            populateButtons();
            setupWordListTable(wordlists);
        });

    // Attach event listeners for user list creation
    document.getElementById("add-word-button").addEventListener("click", addWordToList);
    document.getElementById("save-list-button").addEventListener("click", saveUserList);
    document.getElementById("submit-button").addEventListener("click", checkAnswer);

    populateUserDefinedLists();
});

// Populate the list buttons
function populateButtons() {
    const buttonContainer = document.getElementById("list-buttons");

    // Add buttons for predefined lists
    for (const listName in wordlists) {
        const button = createListButton(listName, wordlists[listName]);
        buttonContainer.appendChild(button);
    }

    // Populate user-defined lists dynamically
    populateUserDefinedLists();
}

// Create a list button
function createListButton(listName, listWords) {
    const button = document.createElement("button");
    button.textContent = listName.charAt(0).toUpperCase() + listName.slice(1);
    button.className = "list-button";
    button.addEventListener("click", () => startQuiz(listWords));
    return button;
}

// Start the quiz
function startQuiz(list) {
    currentList = [...list]; // Reset the current list
    correctAnswers = 0;
    totalAnswers = 0;
    updateScore();

    // Shuffle the list
    shuffleArray(currentList);

    showNextWord();
}

// Show the next word
function showNextWord() {
    if (currentList.length === 0) {
        alert("Quiz finished! Refresh the list to start again.");
        return;
    }

    const currentWord = currentList.pop();
    const wordPrompt = document.getElementById("word-prompt");
    const userInput = document.getElementById("user-input");

    const direction = document.querySelector('input[name="direction"]:checked').value;
    if (direction === "english-to-spanish") {
        wordPrompt.textContent = currentWord.english;
        userInput.dataset.correctAnswer = currentWord.spanish;
    } else {
        wordPrompt.textContent = currentWord.spanish;
        userInput.dataset.correctAnswer = currentWord.english;
    }

    userInput.value = "";
}

// Check the user's answer
function checkAnswer() {
    const userInput = document.getElementById("user-input");
    const userAnswer = userInput.value.trim();
    const correctAnswer = userInput.dataset.correctAnswer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        correctAnswers++;
        showFeedback("Correct!", "success");
    } else {
        showFeedback(`Wrong! The correct answer is: ${correctAnswer}`, "error");
    }

    totalAnswers++;
    updateScore();
    showNextWord();
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = `${correctAnswers}/${totalAnswers}`;
}

// Shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Display feedback messages
function showFeedback(message, type) {
    const feedback = document.getElementById("feedback");
    feedback.textContent = message;
    feedback.className = type;
    setTimeout(() => {
        feedback.textContent = "";
        feedback.className = "";
    }, 3000);
}

// Populate the word list table
function setupWordListTable(lists) {
    const tableBody = document.getElementById("all-words-table");
    tableBody.innerHTML = ""; // Clear existing rows

    for (const listName in lists) {
        const list = lists[listName];
        const headerRow = document.createElement("tr");
        const headerCell = document.createElement("td");
        headerCell.colSpan = 2;
        headerCell.textContent = listName.charAt(0).toUpperCase() + listName.slice(1);
        headerRow.appendChild(headerCell);
        tableBody.appendChild(headerRow);

        list.forEach(wordPair => {
            const row = document.createElement("tr");
            const englishCell = document.createElement("td");
            englishCell.textContent = wordPair.english;
            const spanishCell = document.createElement("td");
            spanishCell.textContent = wordPair.spanish;
            row.appendChild(englishCell);
            row.appendChild(spanishCell);
            tableBody.appendChild(row);
        });
    }
}

// Add a word to the new user-defined list
function addWordToList() {
    const englishWord = document.getElementById("english-word").value.trim();
    const spanishWord = document.getElementById("spanish-word").value.trim();

    if (!englishWord || !spanishWord) {
        showFeedback("Both fields are required to add a word.", "error");
        return;
    }

    tempList.push({ english: englishWord, spanish: spanishWord });
    showFeedback(`Added: "${englishWord}" - "${spanishWord}"`, "success");

    document.getElementById("english-word").value = "";
    document.getElementById("spanish-word").value = "";
}

// Save the new user-defined list
function saveUserList() {
    const listName = document.getElementById("new-list-name").value.trim();

    if (!listName) {
        showFeedback("List name is required to save the list.", "error");
        return;
    }

    if (tempList.length === 0) {
        showFeedback("Add at least one word before saving the list.", "error");
        return;
    }

    userLists[listName] = tempList;
    localStorage.setItem("userLists", JSON.stringify(userLists));

    tempList = [];
    document.getElementById("new-list-name").value = "";
    showFeedback(`List "${listName}" saved successfully!`, "success");

    populateUserDefinedLists();
}

// Populate buttons for user-defined lists
function populateUserDefinedLists() {
    const buttonContainer = document.getElementById("list-buttons");

    document.querySelectorAll(".user-list-button").forEach(button => button.remove());

    for (const listName in userLists) {
        const button = createListButton(listName, userLists[listName]);
        button.classList.add("user-list-button");
        buttonContainer.appendChild(button);
    }

    setupWordListTable({ ...userLists });
}
