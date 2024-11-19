const wordLists = {
    verbs: [
        { english: "To begin", spanish: "Comenzar" },
        { english: "To need", spanish: "Necesitar" },
        { english: "To last", spanish: "Durar" },
    ],
    nouns: [
        { english: "The ground floor", spanish: "La planta baja" },
        { english: "The subject", spanish: "La materia" },
        { english: "The key", spanish: "La llave" },
    ],
    numbers: [
        { english: "One", spanish: "Uno" },
        { english: "Two", spanish: "Dos" },
        { english: "Three", spanish: "Tres" },
    ],
    colors: [
        { english: "Red", spanish: "Rojo" },
        { english: "Blue", spanish: "Azul" },
        { english: "Green", spanish: "Verde" },
    ],
};

let score = 0;
let currentWordIndex = 0;
let currentList = [];

// Populate word list in sidebar
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

function startQuiz(category) {
    currentList = shuffleArray(wordLists[category]);
    currentWordIndex = 0;
    score = 0;
    showNextQuestion();
}

function startCustomQuiz() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
    if (selectedCategories.length === 0) return alert("Please select at least one category!");

    currentList = selectedCategories.flatMap(category => wordLists[category]);
    currentList = shuffleArray(currentList);
    currentWordIndex = 0;
    score = 0;
    showNextQuestion();
    toggleModal();
}

function showNextQuestion() {
    if (currentWordIndex >= currentList.length) {
        document.getElementById("quizArea").innerHTML = `Your score: ${score}/${currentList.length}`;
        return;
    }
    const { english, spanish } = currentList[currentWordIndex];
    document.getElementById("quizArea").innerHTML = `
        <p>Translate "${english}":</p>
        <input type="text" id="userInput" placeholder="Type translation here" />
        <button onclick="submitAnswer('${spanish}')">Submit</button>
    `;
}

function submitAnswer(correctTranslation) {
    const userInput = document.getElementById("userInput").value.trim().toLowerCase();
    if (userInput === correctTranslation.toLowerCase()) {
        score++;
        alert("Correct!");
    } else {
        alert(`Incorrect! The correct translation is "${correctTranslation}".`);
    }
    currentWordIndex++;
    showNextQuestion();
}

// Utility: Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Modal control
function toggleModal() {
    const modal = document.getElementById("customQuizModal");
    modal.style.display = modal.style.display === "flex" ? "none" : "flex";
}

document.getElementById("customQuizBtn").addEventListener("click", toggleModal);
