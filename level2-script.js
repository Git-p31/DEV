const commandInput = document.getElementById('commandInput');
const output = document.getElementById('output');
const clearTerminalButton = document.getElementById('clear-terminal');
const clearInputButton = document.getElementById('clear-input');

const questions = [
    {
        question: 'Який буде результат виконання цього коду?\na = [1, 2, 3]\na.append([4, 5])\nprint(len(a))',
        answer: '4' // Довжина списку з вкладеним списком
    },
    {
        question: 'Що таке декоратор у Python?',
        choices: [
            'A) Функція, яка змінює поведінку іншої функції',
            'B) Цикл для обробки елементів',
            'C) Спосіб видалення об\'єкта з пам\'яті'
        ],
        answer: 'A'
    },
    {
        question: 'Що робить інструкція "with open(\'file.txt\', \'r\') as f:"?',
        answer: 'Відкриває файл для читання з автоматичним закриттям файлу після операцій'
    },
    {
        question: 'Що буде виведено?\nprint(2 ** 3 ** 2)',
        choices: [
            'A) 64', 
            'B) 512', 
            'C) 16', 
            'D) Помилка'
        ],
        answer: 'B' // 2 ** (3 ** 2) = 2 ** 9 = 512
    },
    {
        question: 'Напиши код для створення словника, де ключі — це числа від 1 до 5, а значення — це квадрати цих чисел.',
        answer: '{1: 1, 2: 4, 3: 9, 4: 16, 5: 25}' // Рішення має бути у формі словника
    },
    {
        question: 'Який метод дозволяє додати елемент у кінець списку?',
        choices: [
            'A) append()', 
            'B) extend()', 
            'C) insert()', 
            'D) push()'
        ],
        answer: 'A'
    },
    {
        question: 'Що робить інструкція "try...except"?',
        answer: 'Обробляє винятки, щоб уникнути аварійного завершення програми'
    },
    {
        question: 'Що означає вираз "lambda" у Python?',
        answer: 'Анонімна функція'
    },
    {
        question: 'Що поверне функція max([2, 3, 5, 4, 1])?',
        answer: '5'
    },
    {
        question: 'Яким чином можна перевірити, чи є ключ у словнику?',
        choices: [
            'A) in', 
            'B) hasattr()', 
            'C) exists()', 
            'D) find()'
        ],
        answer: 'A'
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
