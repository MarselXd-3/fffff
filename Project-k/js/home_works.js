const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return regex.test(email);
};

const gmailInput = document.getElementById("gmail_input");
const gmailResult = document.getElementById("gmail_result");

document.getElementById("gmail_button").addEventListener("click", () => {
  const email = gmailInput.value.trim();
  if (validateEmail(email)) {
    gmailResult.textContent = "Valid Gmail";
  } else {
    gmailResult.textContent = "Invalid Gmail";
  }
});

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');
const btnStart = document.getElementById('start');
const btnStop = document.getElementById('stop');
const btnReset = document.getElementById('reset');
const secondsDisplay = document.getElementById('seconds');

let x = 0;
let y = 0;
let dx = 1;
let dy = 0;
let animationId;
let timerInterval;

const move = () => {
    if (x >= parentBlock.offsetWidth - childBlock.offsetWidth || x < 0 || y >= parentBlock.offsetHeight - childBlock.offsetHeight || y < 0) {
        const temp = dx;
        dx = dy;
        dy = -temp;
    }
    x += dx;
    y += dy;
    childBlock.style.left = `${x}px`;
    childBlock.style.top = `${y}px`;
    animationId = requestAnimationFrame(move);
};

btnStart.addEventListener('click', () => {
    move();
    startTimer();
});

btnStop.addEventListener('click', () => {
    cancelAnimationFrame(animationId);
    stopTimer();
});

btnReset.addEventListener('click', () => {
    x = 0;
    y = 0;
    childBlock.style.left = `${x}px`;
    childBlock.style.top = `${y}px`;
    cancelAnimationFrame(animationId);
    resetTimer();
});

// Stopwatch functionality
let seconds = 0;

const updateTimer = () => {
    secondsDisplay.textContent = seconds;
};

const startTimer = () => {
    timerInterval = setInterval(() => {
        seconds++;
        updateTimer();
    }, 1000);
};

const stopTimer = () => {
    clearInterval(timerInterval);
};

const resetTimer = () => {
    seconds = 0;
    updateTimer();
};

updateTimer(); // Ensure timer display is initialized



