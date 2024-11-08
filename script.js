const listB = ["Beginnen", "Brauchen", "Dauern", "Erklaren", "das Erdgeschoss", "der ersten Stock, der zweiten Stock, der dritten Stock", "das Fach", "der Unterricht", "der FuBball", "das Brot", "die Bibliothek", "die Cafeteria", "der Schlüssel", "der Schulhof", "Glücklich", "Traurig", "Taglich", "Bunt", "Krank", "Gesund"];
const listA = ["To begin", "To need", "To last", "To explain", "the ground floor", "the 1st, 2nd, 3rd floor", "the subject", "the lesson", "the football", "the bread", "the library", "the cafeteria", "the key", "the schoolyard", "Happy", "Sad", "Daily", "Colorful", "Sick", "Healthy"];

let score = 0;
let totalQuestions = 0;
let currentWordIndex = 0;
let wordPairs;

document.getElementById('showWordsBtn').addEventListener('click', () => {
    const wordList = document.getElementById('wordList');
    wordList.style.display = wordList.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('quizArea').addEventListener('submit', (event) => {
    event.preventDefault();
});

function startQuiz(listType) {
    score = 0;
    totalQuestions = listA.length;
    if (listType === 'A') {
        wordPairs = shuffleArray(listA.map((word, index) => [word, listB[index]]));
    } else {
        wordPairs = shuffleArray(listB.map((word, index) => [word, listA[index]]));
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

    const [word, correctTranslation] = wordPairs[currentWordIndex];

    const quizArea = document.getElementById('quizArea');
    quizArea.innerHTML = `
        <p>Translate '${word}':</p>
        <div id="inputArea">
            <input type="text" id="userInput" placeholder="Type translation here" />
            <button class="submitAnswer" onclick="submitAnswer('${correctTranslation}')">Submit Answer</button>
        </div>
        <div id="feedback"></div>
    `;

    document.getElementById('userInput').focus();

    document.getElementById('userInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            submitAnswer(correctTranslation);
        }
    });
}

function submitAnswer(correctTranslation) {
    const userInput = document.getElementById('userInput').value.trim();
    const feedbackDiv = document.getElementById('feedback');

    if (userInput.toLowerCase() === correctTranslation.toLowerCase()) {
        score++;
        feedbackDiv.innerHTML = 'Correct!';
        feedbackDiv.style.color = 'green';
    } else {
        feedbackDiv.innerHTML = `Incorrect! The correct answer is '${correctTranslation}'`;
        feedbackDiv.style.color = 'red';
    }

    currentWordIndex++;
    setTimeout(showNextQuestion, 1000);
}

// Fisher-Yates (Knuth) shuffle function to randomize the array order
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
