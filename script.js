let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let laps = [];
let lapRecordedDuringPause = false;

// Cache DOM elements
const stopwatchDisplay = document.getElementById('stopwatch');
const actionButton = document.querySelector('.action-button');
const resetButton = document.querySelector('.reset-button');
const lapButton = document.querySelector('.lap-button');
const lapsContainer = document.getElementById('laps-container');
const lapsList = document.getElementById('laps');
const lapsCount = document.getElementById('laps-count');
const confirmModal = document.getElementById('confirm-modal');
const confirmResetButton = document.getElementById('confirm-reset');
const cancelResetButton = document.getElementById('cancel-reset');

// Format time function
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(Math.floor(milliseconds / 10)).padStart(2, '0')}`;
}

// Update the display
function updateDisplay() {
    stopwatchDisplay.textContent = formatTime(elapsedTime);
}

// Toggle the timer state
function toggleTimer() {
    if (running) {
        pauseTimer();
    } else {
        startTimer();
    }
}

// Start the timer
function startTimer() {
    if (!running) {
        running = true;
        lapRecordedDuringPause = false;
        actionButton.textContent = 'Pause';
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        disableResetButton(); // Disable the reset button while running
        enableLapButton(); // Enable the lap button while running
    }
}

// Pause the timer
function pauseTimer() {
    if (running) {
        running = false;
        actionButton.textContent = 'Play';
        clearInterval(timer);
        enableResetButton(); // Enable the reset button while paused
        enableLapButton(); // Enable lap button while paused
    }
}

// Disable the reset button
function disableResetButton() {
    resetButton.disabled = true;
    resetButton.classList.add("disabled");
}

// Enable the reset button
function enableResetButton() {
    resetButton.disabled = false;
    resetButton.classList.remove("disabled");
}

// Disable the lap button
function disableLapButton() {
    lapButton.disabled = true;
    lapButton.classList.add("disabled");
}

// Enable the lap button
function enableLapButton() {
    lapButton.disabled = false;
    lapButton.classList.remove("disabled");
}

// Reset the timer
function resetTimer() {
    if (!running) {
        confirmModal.style.display = 'block';
    }
}

// Confirm the reset
function confirmReset() {
    running = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    actionButton.textContent = 'Play';
    laps = [];
    updateLaps();
    confirmModal.style.display = 'none';
    disableResetButton();
    hideLapsContainer();
    lapRecordedDuringPause = false;
    disableLapButton();
}

// Cancel the reset
function cancelReset() {
    confirmModal.style.display = 'none';
}

// Record a lap
function lapTimer() {
    if (elapsedTime > 0) {
        laps.push(elapsedTime);
        lapRecordedDuringPause = true;
        lapsContainer.style.display = 'block';
        updateLaps();
        if (!running) {
            disableLapButton();
        }
    }
}

// Update lap records
function updateLaps() {
    lapsList.innerHTML = '';
    lapsCount.textContent = laps.length + ' Laps';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        lapElement.innerHTML = `<b>Lap ${index + 1}:</b> ${formatTime(lap)}`;
        lapsList.appendChild(lapElement);
    });
}

// Hide lap tracker container
function hideLapsContainer() {
    lapsContainer.style.display = 'none';
}

// Event listeners for buttons
actionButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', lapTimer);
confirmResetButton.addEventListener('click', confirmReset);
cancelResetButton.addEventListener('click', cancelReset);

// Initialize display and button states
updateDisplay();
disableResetButton(); // Disable the reset button at the start
disableLapButton(); // Disable the lap button at the start
