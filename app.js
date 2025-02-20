const startBtn = document.getElementById("start-btn");
const submitBtn = document.getElementById("submit-btn");
const questionArea = document.getElementById("question");
const datasetArea = document.getElementById("dataset");
const answerInput = document.getElementById("answer-input");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const bestTimeDisplay = document.getElementById("best-time");

let dataset = [];
let currentAnswer = 0;
let score = 0;
let bestTime = Infinity;
let startTime = 0;
let currentQuestion = "";

const generateDataset = (size) => {
    dataset = Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 1);
};

const calculateMean = (data) => {
    const sum = data.reduce((acc, num) => acc + num, 0);
    return (sum / data.length).toFixed(2);
};

const calculateMedian = (data) => {
    data.sort((a, b) => a - b);
    const mid = Math.floor(data.length / 2);
    return data.length % 2 !== 0 ? data[mid] : ((data[mid - 1] + data[mid]) / 2).toFixed(2);
};

const calculateMode = (data) => {
    const frequency = {};
    data.forEach(num => frequency[num] = (frequency[num] || 0) + 1);
    let mode = [];
    let maxFreq = 0;
    for (let key in frequency) {
        if (frequency[key] > maxFreq) {
            mode = [key];
            maxFreq = frequency[key];
        } else if (frequency[key] === maxFreq) {
            mode.push(key);
        }
    }
    return mode.length === data.length ? "No mode" : mode.join(", ");
};

const calculateRange = (data) => {
    return Math.max(...data) - Math.min(...data);
};

const askQuestion = () => {
    generateDataset(5 + score);
    datasetArea.textContent = `Dataset: [${dataset.join(", ")}]`;

    const questionTypes = ["mean", "median", "mode", "range"];
    currentQuestion = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    switch (currentQuestion) {
        case "mean":
            currentAnswer = calculateMean(dataset);
            questionArea.textContent = "What is the mean?";
            break;
        case "median":
            currentAnswer = calculateMedian(dataset);
            questionArea.textContent = "What is the median?";
            break;
        case "mode":
            currentAnswer = calculateMode(dataset);
            questionArea.textContent = "What is the mode?";
            break;
        case "range":
            currentAnswer = calculateRange(dataset);
            questionArea.textContent = "What is the range?";
            break;
    }
};

const startGame = () => {
    score = 0;
    scoreDisplay.textContent = score;
    feedback.textContent = "";
    answerInput.value = "";
    answerInput.disabled = false;
    submitBtn.disabled = false;
    startBtn.disabled = true;
    startTime = new Date();
    askQuestion();
};

const resetGame = () => {
    score = 0;
    feedback.textContent = "Incorrect! Game restarting...";
    scoreDisplay.textContent = score;
    setTimeout(startGame, 2000);  // 2-second delay before restarting
};

const submitAnswer = () => {
    const userAnswer = answerInput.value.trim();
    if (userAnswer == currentAnswer) {
        score++;
        const timeTaken = ((new Date() - startTime) / 1000).toFixed(2);
        feedback.textContent = `Correct! Time: ${timeTaken}s`;
        scoreDisplay.textContent = score;

        if (timeTaken < bestTime) {
            bestTime = timeTaken;
            bestTimeDisplay.textContent = bestTime;
        }

        setTimeout(askQuestion, 1000);  // Short delay before next question
    } else {
        resetGame();  // If the answer is wrong, reset the game
    }
    answerInput.value = "";
};

startBtn.addEventListener("click", startGame);
submitBtn.addEventListener("click", submitAnswer);
