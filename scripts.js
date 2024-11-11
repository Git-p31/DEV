const questions = {
    easy: [
        { question: "Что делает функция print() в Python?", options: ["1. Выводит данные", "2. Читает файл", "3. Останавливает программу"], correct: 1 },
        { question: "Какой тип данных для целых чисел?", options: ["1. float", "2. int", "3. str"], correct: 2 },
        { question: "Как создать список?", options: ["1. {}", "2. []", "3. ()"], correct: 2 },
        { question: "Какой результат 3 + 2?", options: ["1. 5", "2. 6", "3. 32"], correct: 1 },
        { question: "Что делает метод append()?", options: ["1. Удаляет элемент", "2. Добавляет элемент", "3. Сортирует список"], correct: 2 },
        { question: "Как объявить переменную?", options: ["1. var x", "2. x = 10", "3. let x"], correct: 2 },
        { question: "Какой оператор сравнения используется?", options: ["1. =", "2. ==", "3. ==="], correct: 2 },
        { question: "Что возвращает len()?", options: ["1. Размер списка", "2. Первый элемент", "3. Последний элемент"], correct: 1 },
        { question: "Что делает метод pop()?", options: ["1. Добавляет элемент", "2. Удаляет элемент", "3. Сортирует список"], correct: 2 },
        { question: "Как написать комментарий?", options: ["1. //", "2. /* */", "3. #"], correct: 3 }
    ],
    medium: [
        { question: "Что возвращает функция range(5)?", options: ["1. [0, 1, 2, 3, 4]", "2. [1, 2, 3, 4, 5]", "3. (5, 6, 7, 8, 9)"], correct: 1 },
        { question: "Какой метод используется для объединения списков?", options: ["1. extend()", "2. join()", "3. concat()"], correct: 1 },
        { question: "Какой результат выполнения 2 ** 3?", options: ["1. 6", "2. 8", "3. 9"], correct: 2 },
        { question: "Как проверить наличие ключа в словаре?", options: ["1. 'key' in dict", "2. dict.contains('key')", "3. dict.has_key('key')"], correct: 1 },
        { question: "Как вызвать функцию с аргументами x и y?", options: ["1. func x, y", "2. func(x, y)", "3. func[x, y]"], correct: 2 },
        { question: "Что вернет выражение list('python')?", options: ["1. ['python']", "2. ['p', 'y', 't', 'h', 'o', 'n']", "3. ('p', 'y', 't', 'h', 'o', 'n')"], correct: 2 },
        { question: "Какой метод используется для удаления элемента по значению?", options: ["1. del", "2. remove()", "3. discard()"], correct: 2 },
        { question: "Что делает конструкция try-except?", options: ["1. Проверяет тип данных", "2. Обрабатывает исключения", "3. Запускает цикл"], correct: 2 },
        { question: "Как записать lambda-функцию, которая умножает число на 2?", options: ["1. lambda x: x * 2", "2. lambda x: 2 * x", "3. lambda x * 2 = x"], correct: 1 },
        { question: "Как импортировать модуль math?", options: ["1. import math", "2. include math", "3. require 'math'"], correct: 1 }
    ],
    
    hard: [
        { question: "Что выведет print([i for i in range(5) if i % 2 == 0])?", options: ["1. [0, 2, 4]", "2. [1, 3, 5]", "3. [2, 4, 6]"], correct: 1 },
        { question: "Какое значение вернет выражение bool('False')?", options: ["1. True", "2. False", "3. Ошибка"], correct: 1 },
        { question: "Как создать неизменяемый набор значений?", options: ["1. list()", "2. set()", "3. tuple()"], correct: 3 },
        { question: "Что делает метод zip()?", options: ["1. Упаковывает элементы из нескольких итерируемых объектов", "2. Сортирует элементы", "3. Сжимает текстовый файл"], correct: 1 },
        { question: "Какой результат выполнения операции 10 // 3?", options: ["1. 3.33", "2. 3", "3. 4"], correct: 2 },
        { question: "Как получить текущую дату и время в Python?", options: ["1. datetime.now()", "2. time.get_now()", "3. date.today()"], correct: 1 },
        { question: "Что делает метод join() в Python?", options: ["1. Объединяет строки в одну", "2. Разделяет строки на символы", "3. Объединяет словари"], correct: 1 },
        { question: "Как записать функцию, которая возвращает сумму всех элементов списка?", options: ["1. def sum_list(lst): return sum(lst)", "2. sum(lst): return sum(lst)", "3. sum_list(lst) -> sum(lst)"], correct: 1 },
        { question: "Как создать генератор в Python?", options: ["1. Использовать yield", "2. Использовать return", "3. Использовать print"], correct: 1 },
        { question: "Что делает декоратор @staticmethod?", options: ["1. Добавляет метод в класс без доступа к экземпляру", "2. Создает новый класс", "3. Удаляет метод из класса"], correct: 1 }
    ]
    
};

let currentQuestion = 0;
let userScore = 0;
let wrongAnswers = [];
let timerInterval;
let timeLeft = 300;

function startQuiz(level) {
    displayQuestion(level);
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const seconds = String(timeLeft % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `Осталось времени: ${minutes}:${seconds}`;
        if (timeLeft-- <= 0) finishQuiz();
    }, 1000);
}

function displayQuestion(level) {
    const q = questions[level][currentQuestion];
    document.getElementById('question').textContent = q.question;
    document.getElementById('options').innerHTML = q.options.map((o) => `<p>${o}</p>`).join('');
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById('answerInput').value);
    const q = questions['easy'][currentQuestion];
    if (userAnswer === q.correct) userScore++; else wrongAnswers.push(q);
    currentQuestion++;
    currentQuestion < 10 ? displayQuestion('easy') : finishQuiz();
}

function finishQuiz() {
    clearInterval(timerInterval);
    localStorage.setItem('userScore', userScore);
    window.location.href = 'results.html';
}
