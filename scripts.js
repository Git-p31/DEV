const commandInput = document.getElementById('commandInput');
const output = document.getElementById('output');
const terminal = document.getElementById('terminal');
const levelSelection = document.getElementById('level-selection');
let loadingProcess = 0;
let loadingInterval;

// Слухач для введення команд
commandInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = commandInput.value.trim();
        
        if (command === 'sudo apt-get install python3') {
            output.textContent += `\n> ${command}\nStarting installation of Python...`;
            startDownload();
        } else {
            output.textContent += `\n> ${command}\nCommand not found. Try 'sudo apt-get install python3'.`;
        }
        
        commandInput.value = ''; // Очищуємо інпут після введення
    }
});

// Імітація процесу скачування
function startDownload() {
    loadingInterval = setInterval(function() {
        loadingProcess += 10;
        output.textContent += `\nDownloading... ${loadingProcess}% completed.`;
        terminal.scrollTop = terminal.scrollHeight; // Прокрутка вниз

        if (loadingProcess >= 100) {
            clearInterval(loadingInterval);
            output.textContent += `\nInstallation completed. Python 3.9.2 installed successfully.`;
            setTimeout(showLevelSelection, 2000);
        }
    }, 1000); // Кожну секунду додаємо 10%
}

// Показ вибору рівня
function showLevelSelection() {
    terminal.classList.add('hidden');
    levelSelection.classList.remove('hidden');
}

// Логіка для вибору рівня тесту
document.getElementById('level-1').addEventListener('click', function() {
    window.location.href = '1level.html';
});

document.getElementById('level-2').addEventListener('click', function() {
    window.location.href = '2level.html';
});

document.getElementById('level-3').addEventListener('click', function() {
    window.location.href = '3level.html';
});
