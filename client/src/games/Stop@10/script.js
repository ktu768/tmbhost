let startTime, timerInterval, running = false;

const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');
const messageEl = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const animFast = document.getElementById('anim-fast');
const animSlow = document.getElementById('anim-slow');
const animClose = document.getElementById('anim-close');
const animWin = document.getElementById('anim-win');
const animContainer = document.getElementById('animationContainer');
const missionLabel = document.getElementById('missionLabel');
const container = document.getElementById('container');

function formatTime(ms) {
    const totalSec = ms / 1000;
    const sec = Math.floor(totalSec);
    const milli = ms % 1000;
    const milliStr = milli.toString().padStart(3, '0');
    
    return `${sec.toString().padStart(2, '0')}.${milliStr[0]}<span class="ms-suffix">${milliStr.slice(1)}</span>`;
}

function updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;
    timerEl.innerHTML = formatTime(elapsed);
}

function stopGame() {
    clearInterval(timerInterval);
    running = false;
    container.classList.remove('running');
    
    const finalTime = Date.now() - startTime;
    timerEl.innerHTML = formatTime(finalTime);

    const plainTime = (finalTime / 1000).toFixed(3).padStart(6, '0');

    animFast.classList.add('hidden');
    animSlow.classList.add('hidden');
    animClose.classList.add('hidden');
    animWin.classList.add('hidden');
    animContainer.classList.remove('hidden');
    missionLabel.classList.add('hidden');

    if (plainTime > '09.800' && plainTime < '10.200') {
        messageEl.innerHTML = '🎯 <span>Perfect Precision!</span>';
        messageEl.style.color = '#0EE17C';
        animWin.classList.remove('hidden');
    } else {
        const diffMs = finalTime - 10000;
        const absDiff = Math.abs(diffMs);

        if (absDiff <= 400) {
            messageEl.innerHTML = '😲 <span>So Close!</span>';
            messageEl.style.color = '#FFA500';
            animClose.classList.remove('hidden');
        } else if (diffMs < 0) {
            messageEl.innerHTML = '⚡ <span>Too Fast!</span>';
            messageEl.style.color = '#FF4B4B';
            animFast.classList.remove('hidden');
        } else {
            messageEl.innerHTML = '🐢 <span>Too Slow!</span>';
            messageEl.style.color = '#FF4B4B';
            animSlow.classList.remove('hidden');
        }
    }

    resetBtn.classList.remove('hidden');
}

startBtn.addEventListener('click', () => {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    running = true;
    container.classList.add('running');

    timerEl.innerHTML = '00.<span class="ms-suffix">000</span>';
    messageEl.textContent = '';
    resetBtn.classList.add('hidden');
    startBtn.classList.add('hidden');
    animContainer.classList.add('hidden');
    missionLabel.classList.remove('hidden');
});

document.addEventListener('click', (e) => {
    if (running && !startBtn.contains(e.target) && !resetBtn.contains(e.target)) {
        stopGame();
    }
});

resetBtn.addEventListener('click', () => {
    timerEl.innerHTML = '00.<span class="ms-suffix">000</span>';
    messageEl.textContent = '';
    animContainer.classList.add('hidden');
    missionLabel.classList.remove('hidden');
    resetBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
});