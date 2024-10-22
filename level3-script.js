const commandInput = document.getElementById('commandInput');
const output = document.getElementById('output');
const clearTerminalButton = document.getElementById('clear-terminal');
const clearInputButton = document.getElementById('clear-input');

const questions = [
    {
        question: 'Який буде результат виконання коду?\ndef foo(a, b=[]):\nb.append(a)\nreturn b\nprint(foo(1))\nprint(foo(2))',
        answer: '[1, 2]' // Список є змінним і зберігає значення між викликами
    },
    {
        question: 'Яка різниця між set і frozenset у Python?',
        answer: 'frozenset є незмінним, set — змінним'
    },
    {
        question: 'Напиши код для підрахунку частоти кожного символа в рядку "hello world".',
        answer: '{\'h\': 1, \'e\': 1, \'l\': 3, \'o\': 2, \' \': 1, \'w\': 1, \'r\': 1, \'d\': 1}'
    },
    {
        question: 'Який результат?\nprint(sorted([\'apple\', \'banana\', \'cherry\'], key=lambda x: len(x)))',
        answer: '[\'apple\', \'cherry\', \'banana\']' // Сортує за довжиною рядка
    },
    {
        question: 'Як викликати метод базового класу з дочірнього класу в Python?',
        answer: 'super().method_name()'
    },
    {
        question: 'Що робить оператор "//" у Python?',
        answer: 'Виконує цілочисельний поділ'
    },
    {
        question: 'Що буде виведено?\nprint([x**2 for x in range(5) if x % 2 == 0])',
        answer: '[0, 4, 16]' // Генератор списків з фільтром
    },
    {
        question: 'Як видалити елемент зі списку за індексом?',
        choices: [
            'A) del', 
            'B) remove()', 
            'C) pop()', 
            'D) discard()'
        ],
        answer: 'A'
    },
    {
        question: 'Який з цих методів змінює сам об’єкт, а не створює новий?',
        choices: [
            'A) sorted()', 
            'B) sort()', 
            'C) reverse()', 
            'D) copy()'
        ],
        answer: 'B' // Метод sort() змінює список
    },
    {
        question: 'Напиши функцію, яка повертає факторіал числа.',
        answer: 'def factorial(n): return 1 if n==0 else n * factorial(n-1)' // Рекурсивна функція для факторіалу
    }
];

let currentQuestionIndex = 0;

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.choices) {
        output.textContent += `\n${currentQuestion.question}\n${currentQuestion.choices.join('\n')}`;
    } else {
        output.textContent += `\n${currentQuestion.question}`;
    }
}

showQuestion();

clearTerminalButton.addEventListener('click', function() {
    output.textContent = 'Enter your answers through the terminal below:';
});

clearInputButton.addEventListener('click', function() {
    commandInput.value = '';
});

commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const userAnswer = commandInput.value.trim();
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (userAnswer === correctAnswer) {
            output.textContent += `\nПравильна відповідь!`;
            currentQuestionIndex++;
            commandInput.value = '';

            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                output.textContent += `\nТест завершено!`;
            }
        } else {
            output.textContent += `\nНеправильна відповідь!`;
        }
    }
});
