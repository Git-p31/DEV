const commandInput = document.getElementById('commandInput');
const output = document.getElementById('output');
const clearTerminalButton = document.getElementById('clear-terminal');
const clearInputButton = document.getElementById('clear-input');

const questions = [
    {
        question: 'Який буде вивід цієї програми Python?\ntot = 0\nfor i in [5, 4, 3, 2, 1] :\ntot = tot + 1\nprint(tot)',
        answer: '5'
    },
    {
        question: 'Що робить інструкція break?',
        answer: 'Завершує поточний цикл'
    },
    {
        question: 'Скільки разів буде виконуватися цей цикл?\nn = 0\nwhile n > 0 :\nprint(\'Lather\')\nprint(\'Rinse\')\nprint(\'Dry off!\')',
        answer: '0'
    },
    {
        question: 'Яке ключове слово вказує на початок «невизначеного» циклу в Python?',
        answer: 'while'
    },
    {
        question: 'Як називається одне виконання циклу?',
        answer: 'ітерація'
    },
    {
        question: 'Цикл з післяумовою має вид:',
        answer: 'while умова'
    },
    {
        question: 'Що не так з цим циклом у Python?\nn = 5\nwhile n > 0 :\nprint(n)\nprint(\'All done\')',
        answer: 'Інструкція виводу «Готово» (\'All done\') повинна мати відступ у чотири пробіли'
    }
];

let currentQuestionIndex = 0;

// Функція шифрування (просте XOR-шифрування)
function encrypt(text) {
    let encrypted = '';
    const key = 'secret'; // Ключ для шифрування
    for (let i = 0; i < text.length; i++) {
        encrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encrypted;
}

// Показ питання в терміналі
function showQuestion() {
    output.textContent += `\n${questions[currentQuestionIndex].question}`;
}

showQuestion();

clearTerminalButton.addEventListener('click', function() {
    output.textContent = 'Enter your answers through the terminal below:';
});

clearInputButton.addEventListener('click', function() {
    commandInput.value = '';
});

// Відправка відповіді на сервер для перевірки
function checkAnswer(encryptedAnswer) {
    fetch('/api/check-answer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            answer: encryptedAnswer,
            questionIndex: currentQuestionIndex
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.correct) {
            output.textContent += '\nПравильна відповідь!';
            currentQuestionIndex++;
            commandInput.value = '';

            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                output.textContent += '\nТест завершено!';
            }
        } else {
            output.textContent += '\nНеправильна відповідь!';
        }
    })
    .catch(error => {
        console.error('Помилка:', error);
    });
}

commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const userAnswer = commandInput.value.trim();
        const encryptedAnswer = encrypt(userAnswer); // Шифруємо відповідь перед відправкою
        checkAnswer(encryptedAnswer); // Відправляємо на сервер
    }
});
