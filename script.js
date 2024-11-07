const listA = ["Beginnen", "Brauchen", "Dauern", "Erklaren", "das Erdgeschoss", "der ersten Stock, der zweiten Stock, der dritten Stock", "das Fach", "der Unterricht", "der FuBball", "das Brot", "die Bibliothek", "die Cafeteria", "der Schlüssel", "der Schulhof", "Glücklich", "Traurig", "Taglich", "Bunt", "Krank", "Gesund"];
const listB = ["To begin", "To need", "To last", "To explain", "the ground floor", "the 1st, 2nd, 3rd floor", "the subject", "the lesson", "the football", "the bread", "the library", "the cafeteria", "the key", "the schoolyard", "Happy", "Sad", "Daily", "Colorful", "Sick", "Healthy"];

let score = 0;
let totalQuestions = 0;

document.getElementById('showWordsBtn').addEventListener('click', () => {
    const wordList = document.getElementById('wordList');
    wordList.style.display = wordList.style.display === 'block' ? 'none' : 'block';
});

function startQuiz(listType) {
    score = 0;
    totalQuestions = listA.length;
    
    let words, translations;
    if (listType === 'A') {
        words = listA;
        translations = listB;
    } else {
        words = listB;
        translations = listA;
    }

    const quizArea = document.getElementById('quizArea');
    quizArea.innerHTML = '';

    let shuffledPairs = shufflePairs(words, translations);

    shuffledPairs.forEach(pair => {
        const word = pair[0];
        const correctTranslation = pair[1];
        
        let userInput = prompt(`Translate '${word}':`);
        if (userInput) {
            if (userInput.trim().toLowerCase() === correctTranslation.toLowerCase()) {
                alert('Correct!');
                score++;
            } else {
                alert(`Incorrect! The correct answer is '${correctTranslation}'`);
            }
        }
    });

    document.getElementById('scoreArea').innerHTML = `Your score: ${score}/${totalQuestions}`;
}

function shufflePairs(words, translations) {
    const combined = words.map((word, index) => [word, translations[index]]);
    for (let i = combined.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [combined[i], combined[j]] = [combined[j], combined[i]];
    }
    return combined;
}
