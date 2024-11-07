const listA = ["Beginnen", "Brauchen", "Dauern", "Erklaren", "das Erdgeschoss", "der ersten Stock, der zweiten Stock, der dritten Stock", "das Fach", "der Unterricht", "der FuBball", "das Brot", "die Bibliothek", "die Cafeteria", "der Schlüssel", "der Schulhof", "Glücklich", "Traurig", "Taglich", "Bunt", "Krank", "Gesund"];
const listB = ["To begin", "To need", "To last", "To explain", "the ground floor", "the 1st, 2nd, 3rd floor", "the subject", "the lesson", "the football", "the bread", "the library", "the cafeteria", "the key", "the schoolyard", "Happy", "Sad", "Daily", "Colorful", "Sick", "Healthy"];

let score = 0;
let totalQuestions = 0;
let currentWordIndex = 0;
let words, translations;

document.getElementById('showWordsBtn').addEventListener('click', () => {
    const wordList = document.getElementById('wordList');
    wordList.style.display = wordList.style.display === 'block' ? 'none' : 'block';
});

function startQuiz(listType) {
    score = 0;
    totalQuestions = listA.length; // Both lists have the same length
    
    if (listType === 'A') {
        words = listA;
        translations = listB;
    } else {
        words = listB;
        translations = listA;
    }

    currentWordIndex = 0; // Reset quiz
    showNextQuestion();
}

function showNextQuestion() {
    if (currentWordIndex >= totalQuestions) {
        document.getElementById('quizArea').innerHTML = ''; // Clear the quiz area
        document.getElementById('scoreArea').innerHTML = `Your score: ${score}/${totalQuestions}`;
        return;
    }

    const word = words[currentWordIndex];
    const correctTranslation = translations[currentWordIndex];
    
    const quizArea = document.getElementById('quizArea');
    quizArea.innerHTML = `
        <p>Translate '${word}':</p>
        <div id="inputArea">
            <input type="text" id="userInput" placeholder="Type translation here" />
            <button class="submitAnswer" onclick="submitAnswer('${correctTranslation}')">Submit Answer</button>
        </div>
    `;
}

function submitAnswer(correctTranslation) {
    const userInput = document.getElementById('userInput').value.trim();
    
    if (userInput.toLowerCase() === correctTranslation.toLowerCase()) {
        alert('Correct!');
        score++;
    } else {
        alert(`Incorrect! The correct answer is '${correctTranslation}'`);
    }

    currentWordIndex++;
    showNextQuestion();
}
