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

function formatTime(ms) {
    const totalSec = ms / 1000;
    const sec = Math.floor(totalSec);
    const milli = ms % 1000;
    return `${sec.toString().padStart(2, '0')}.${milli.toString().padStart(3, '0')}`;
}

function updateTimer() {
    const now = Date.now();
    const elapsed = now - startTime;
    timerEl.textContent = formatTime(elapsed);
}

function stopGame() {
    clearInterval(timerInterval);
    running = false;
    const finalTime = Date.now() - startTime;
    const formattedTime = formatTime(finalTime);
    timerEl.textContent = formattedTime;

    animFast.classList.add('hidden');
    animSlow.classList.add('hidden');
    animClose.classList.add('hidden');
    animWin.classList.add('hidden');
    animContainer.classList.remove('hidden');

    if (formattedTime > '09.800' && formattedTime < '10.200') {
        messageEl.textContent = '🎉 You nailed it! Perfect timing!';
        messageEl.className = 'mt-6 text-lg font-semibold text-green-600 fade-in';
        animWin.classList.remove('hidden');
    } else {
        const diffMs = finalTime - 10000;
        const absDiff = Math.abs(diffMs);

        if (absDiff <= 400) {
            messageEl.textContent = `😮 So close! You were ${absDiff}ms off!`;
            messageEl.className = 'mt-6 text-lg font-semibold text-orange-500 fade-in';
            animClose.classList.remove('hidden');
        } else if (diffMs < 0) {
            messageEl.textContent = `🏃‍♂️ Too fast! You were ${absDiff}ms early.`;
            messageEl.className = 'mt-6 text-lg font-semibold text-red-600 fade-in';
            animFast.classList.remove('hidden');
        } else {
            messageEl.textContent = `🐢 Too slow! You were ${absDiff}ms late.`;
            messageEl.className = 'mt-6 text-lg font-semibold text-red-600 fade-in';
            animSlow.classList.remove('hidden');
        }
    }

    resetBtn.classList.remove('hidden');
}

startBtn.addEventListener('click', () => {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 10);
    running = true;

    // Reset visuals
    timerEl.textContent = '00.000';
    messageEl.textContent = '';
    messageEl.className = 'opacity-0';
    resetBtn.classList.add('hidden');
    startBtn.classList.add('hidden');
    animFast.classList.add('hidden');
    animSlow.classList.add('hidden');
    animContainer.classList.add('hidden');
});

document.addEventListener('click', (e) => {
    if (running && e.target.id !== 'startBtn' && e.target.id !== 'resetBtn') {
        stopGame();
    }
});

resetBtn.addEventListener('click', () => {
    // Reset everything
    timerEl.textContent = '00.000';
    messageEl.textContent = '';
    messageEl.className = 'opacity-0';
    animFast.classList.add('hidden');
    animSlow.classList.add('hidden');
    animContainer.classList.add('hidden');
    resetBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
});