// Import word lists from a separate file
import { wordLists } from "./wordLists.js";

let score = 0;
let currentWordIndex = 0;
let currentList = [];

// Populate the word list in the sidebar
function populateWordList() {
    Object.keys(wordLists).forEach(category => {
        const tbody = document.getElementById(`${category}List`);
        wordLists[category].forEach(pair => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${pair.english}</td><td>${pair.spanish}</td>`;
            tbody.appendChild(row);
        });
    });
}
populateWordList();

// Toggle the word list visibility
document.getElementById("showWordsBtn").addEventListener("click", () => {
    const wordList = document.getElementById("wordList");
    wordList.style.display = wordList.style.display === "block" ? "none" : "block";
});

// Start a quiz for a specific category
function startQuiz(category) {
    if (!wordLists[category]) {
        alert("Invalid category selected!");
        return;
    }

    currentList = shuffleArray(wordLists[category]); // Shuffle the word list for randomness
    currentWordIndex = 0;
    score = 0;

    showNextQuestion(); // Show the first question
}

// Start a custom quiz with selected categories
function startCustomQuiz() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);

    if (selectedCategories.length === 0) {
        alert("Please select at least one category!");
        return;
    }

    currentList = selectedCategories.flatMap(category => wordLists[category]); // Combine selected lists
    currentList = shuffleArray(currentList);
    currentWordIndex = 0;
    score = 0;

    showNextQuestion();
    toggleModal(); // Close the modal
}

// Show the next question in the quiz
function showNextQuestion() {
    const quizArea = document.getElementById("quizArea");

    if (currentWordIndex >= currentList.length) {
        quizArea.innerHTML = `<p>Your score: ${score}/${currentList.length}</p>`;
        return;
    }

    const { english, spanish } = currentList[currentWordIndex];

    quizArea.innerHTML = `
        <p>Translate "${english}":</p>
        <input type="text" id="userInput" placeholder="Type translation here" />
        <button id="submitBtn">Submit</button>
        <p id="feedback"></p>
    `;

    const inputField = document.getElementById("userInput");
    const submitButton = document.getElementById("submitBtn");

    // Add event listener for Enter key
    inputField.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            submitAnswer(spanish);
        }
    });

    // Add event listener for Submit button
    submitButton.addEventListener("click", () => {
        submitAnswer(spanish);
    });

    inputField.focus();
}

// Submit the user's answer
function submitAnswer(correctTranslation) {
    const userInput = document.getElementById("userInput").value.trim().toLowerCase();
    const feedback = document.getElementById("feedback");

    if (userInput === correctTranslation.toLowerCase()) {
        score++;
        feedback.textContent = "Correct!";
        feedback.style.color = "green";
    } else {
        feedback.textContent = `Incorrect! The correct translation is "${correctTranslation}".`;
        feedback.style.color = "red";
    }

    currentWordIndex++;
    setTimeout(showNextQuestion, 1000);
}

// Utility: Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Modal control for custom quiz
function toggleModal() {
    const modal = document.getElementById("customQuizModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

document.getElementById("customQuizBtn").addEventListener("click", toggleModal);
