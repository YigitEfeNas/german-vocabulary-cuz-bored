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
        <div id="feedback"></div>
    `;

    // Focus on the input field automatically
    document.getElementById('userInput').focus();

    // Add event listener to submit answer when "Enter" is pressed
    document.getElementById('userInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if it's in a form (not necessary here, but good practice)
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

    currentWordIndex++; // Move to the next question
    setTimeout(showNextQuestion, 1000); // Wait for 1 second before showing the next question
}
