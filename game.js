const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('start');
const difficultySelect = document.getElementById('difficulty');
const livesDisplay = document.getElementById('lives');

const scale = 30;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let tetromino;
let score = 0;
let lives = 3;
let gameOver = false;
let gameInterval;
let speed = 1000; // Default speed (easy)

// Tetromino shapes
const shapes = [
    [[1, 1, 1, 1]], // I
    [[1, 1], [1, 1]], // O
    [[0, 1, 0], [1, 1, 1]], // T
    [[1, 1, 0], [0, 1, 1]], // S
    [[0, 1, 1], [1, 1, 0]], // Z
    [[1, 0, 0], [1, 1, 1]], // L
    [[0, 0, 1], [1, 1, 1]]  // J
];

// Initialize tetromino
function createTetromino() {
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    tetromino = {
        shape: randomShape,
        x: Math.floor(columns / 2) - Math.floor(randomShape[0].length / 2),
        y: 0
    };
}

// Draw tetromino
function drawTetromino() {
    ctx.fillStyle = 'cyan';
    tetromino.shape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                ctx.fillRect((tetromino.x + x) * scale, (tetromino.y + y) * scale, scale, scale);
            }
        });
    });
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Update game state
function update() {
    clearCanvas();
    drawTetromino();
    tetromino.y++;
    if (collision()) {
        tetromino.y--;
        lives--;
        livesDisplay.textContent = lives;
        if (lives <= 0) {
            gameOver = true;
            clearInterval(gameInterval);
            alert('Game Over!');
        } else {
            createTetromino();
        }
    }
}

// Check for collision
function collision() {
    return tetromino.y + tetromino.shape.length > rows;
}

// Start game
startButton.addEventListener('click', () => {
    if (gameInterval) clearInterval(gameInterval);
    gameOver = false;
    lives = 3;
    livesDisplay.textContent = lives;
    score = 0;

    switch (difficultySelect.value) {
        case 'easy':
            speed = 1000;
            break;
        case 'hard':
            speed = 500;
            break;
        case 'extreme':
            speed = 250;
            break;
    }

    createTetromino();
    gameInterval = setInterval(update, speed);
});