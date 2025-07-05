let totalSeconds = 60;
let remainingSeconds = totalSeconds;
let interval;
const timeDisplay = document.getElementById('time-display');
const progressCircle = document.getElementById('progress');
const setTimeInput = document.getElementById('set-time');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

function updateDisplay() {
    const hrs = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(remainingSeconds % 60).padStart(2, '0');
    timeDisplay.textContent = `${hrs}:${mins}:${secs}`;

    const progress = (remainingSeconds / totalSeconds) * 440;
    progressCircle.style.strokeDashoffset = progress;
}

function startTimer() {
    interval = setInterval(() => {
        if (remainingSeconds > 0) {
            remainingSeconds--;
            updateDisplay();
        } else {
            clearInterval(interval);
        }
    }, 1000);

    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline';
    resetBtn.style.display = 'inline';
}

function pauseTimer() {
    clearInterval(interval);
    startBtn.style.display = 'inline';
    pauseBtn.style.display = 'none';
}

function resetTimer() {
    clearInterval(interval);
    remainingSeconds = totalSeconds;
    updateDisplay();
    startBtn.style.display = 'inline';
    pauseBtn.style.display = 'none';
    resetBtn.style.display = 'none';
}

const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('minutes');
const secondsInput = document.getElementById('seconds');

function setTimeFromInputs() {
    const h = parseInt(hoursInput.value) || 0;
    const m = parseInt(minutesInput.value) || 0;
    const s = parseInt(secondsInput.value) || 0;

    totalSeconds = h * 3600 + m * 60 + s;
    remainingSeconds = totalSeconds;
    updateDisplay();
}

// Attach to input changes
[hoursInput, minutesInput, secondsInput].forEach(input => {
    input.addEventListener('change', setTimeFromInputs);
});


startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

updateDisplay();
