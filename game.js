/**
 * Snake Game
 * A classic snake game using HTML5 Canvas
 */

// Game constants
const CANVAS_SIZE = 400;
const GRID_SIZE = 20;
const CELL_SIZE = CANVAS_SIZE / GRID_SIZE;
const GAME_SPEED = 100; // milliseconds

// Game state
let canvas, ctx;
let snake = [];
let food = {};
let direction = 'RIGHT';
let nextDirection = 'RIGHT';
let score = 0;
let highScore = localStorage.getItem('snakeHighScore') || 0;
let gameLoop = null;
let isGameRunning = false;
let isPaused = false;

// DOM elements
let scoreElement, highScoreElement, finalScoreElement;
let gameOverDiv, startBtn, pauseBtn, restartBtn;

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    // Get canvas and context
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    
    // Get DOM elements
    scoreElement = document.getElementById('score');
    highScoreElement = document.getElementById('highScore');
    finalScoreElement = document.getElementById('finalScore');
    gameOverDiv = document.getElementById('gameOver');
    startBtn = document.getElementById('startBtn');
    pauseBtn = document.getElementById('pauseBtn');
    restartBtn = document.getElementById('restartBtn');
    
    // Set high score display
    highScoreElement.textContent = highScore;
    
    // Add event listeners
    startBtn.addEventListener('click', startGame);
    pauseBtn.addEventListener('click', togglePause);
    restartBtn.addEventListener('click', resetGame);
    document.addEventListener('keydown', handleKeyPress);
    
    // Initial draw
    draw();
}

function startGame() {
    if (isGameRunning) return;
    
    // Reset game state
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direction = 'RIGHT';
    nextDirection = 'RIGHT';
    score = 0;
    scoreElement.textContent = score;
    isGameRunning = true;
    isPaused = false;
    
    // Hide game over screen
    gameOverDiv.classList.add('hidden');
    
    // Spawn first food
    spawnFood();
    
    // Start game loop
    gameLoop = setInterval(update, GAME_SPEED);
    
    // Update button text
    startBtn.textContent = 'Restart';
}

function togglePause() {
    if (!isGameRunning) return;
    
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
    
    if (isPaused) {
        clearInterval(gameLoop);
        // Draw pause text
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', CANVAS_SIZE / 2, CANVAS_SIZE / 2);
    } else {
        gameLoop = setInterval(update, GAME_SPEED);
    }
}

function resetGame() {
    clearInterval(gameLoop);
    isGameRunning = false;
    isPaused = false;
    gameOverDiv.classList.add('hidden');
    startBtn.textContent = 'Start Game';
    pauseBtn.textContent = 'Pause';
    
    // Clear canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Reset snake
    snake = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    score = 0;
    scoreElement.textContent = score;
    draw();
}

function handleKeyPress(event) {
    const key = event.key.toLowerCase();
    
    // Prevent default behavior for game keys
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd', ' '].includes(key)) {
        event.preventDefault();
    }
    
    // Space to pause
    if (key === ' ') {
        togglePause();
        return;
    }
    
    // Direction controls
    if (!isGameRunning || isPaused) return;
    
    switch (key) {
        case 'arrowup':
        case 'w':
            if (direction !== 'DOWN') nextDirection = 'UP';
            break;
        case 'arrowdown':
        case 's':
            if (direction !== 'UP') nextDirection = 'DOWN';
            break;
        case 'arrowleft':
        case 'a':
            if (direction !== 'RIGHT') nextDirection = 'LEFT';
            break;
        case 'arrowright':
        case 'd':
            if (direction !== 'LEFT') nextDirection = 'RIGHT';
            break;
    }
}

function update() {
    // Update direction
    direction = nextDirection;
    
    // Calculate new head position
    const head = { ...snake[0] };
    
    switch (direction) {
        case 'UP':
            head.y--;
            break;
        case 'DOWN':
            head.y++;
            break;
        case 'LEFT':
            head.x--;
            break;
        case 'RIGHT':
            head.x++;
            break;
    }
    
    // Check wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }
    
    // Check self collision
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    // Add new head
    snake.unshift(head);
    
    // Check food collision
    if (head.x === food.x && head.y === food.y) {
        // Increase score
        score += 10;
        scoreElement.textContent = score;
        
        // Update high score
        if (score > highScore) {
            highScore = score;
            highScoreElement.textContent = highScore;
            localStorage.setItem('snakeHighScore', highScore);
        }
        
        // Spawn new food
        spawnFood();
    } else {
        // Remove tail if no food eaten
        snake.pop();
    }
    
    // Draw updated game
    draw();
}

function spawnFood() {
    let validPosition = false;
    
    while (!validPosition) {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
        
        // Check if food spawns on snake
        validPosition = true;
        for (let segment of snake) {
            if (food.x === segment.x && food.y === segment.y) {
                validPosition = false;
                break;
            }
        }
    }
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw grid (optional, subtle)
    ctx.strokeStyle = '#222';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * CELL_SIZE, 0);
        ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * CELL_SIZE);
        ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
        ctx.stroke();
    }
    
    // Draw food
    ctx.fillStyle = '#ff6b6b';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(
        food.x * CELL_SIZE + CELL_SIZE / 2,
        food.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 2 - 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Draw snake
    snake.forEach((segment, index) => {
        // Head is different color
        if (index === 0) {
            ctx.fillStyle = '#4CAF50';
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#4CAF50';
        } else {
            // Gradient from head to tail
            const greenValue = Math.max(100, 200 - index * 5);
            ctx.fillStyle = `rgb(76, ${greenValue}, 80)`;
            ctx.shadowBlur = 0;
        }
        
        ctx.fillRect(
            segment.x * CELL_SIZE + 1,
            segment.y * CELL_SIZE + 1,
            CELL_SIZE - 2,
            CELL_SIZE - 2
        );
        
        // Draw eyes on head
        if (index === 0) {
            ctx.fillStyle = '#fff';
            const eyeSize = 3;
            const eyeOffset = 5;
            
            if (direction === 'RIGHT' || direction === 'LEFT') {
                ctx.fillRect(
                    segment.x * CELL_SIZE + (direction === 'RIGHT' ? 14 : 4),
                    segment.y * CELL_SIZE + 5,
                    eyeSize, eyeSize
                );
                ctx.fillRect(
                    segment.x * CELL_SIZE + (direction === 'RIGHT' ? 14 : 4),
                    segment.y * CELL_SIZE + 12,
                    eyeSize, eyeSize
                );
            } else {
                ctx.fillRect(
                    segment.x * CELL_SIZE + 5,
                    segment.y * CELL_SIZE + (direction === 'DOWN' ? 14 : 4),
                    eyeSize, eyeSize
                );
                ctx.fillRect(
                    segment.x * CELL_SIZE + 12,
                    segment.y * CELL_SIZE + (direction === 'DOWN' ? 14 : 4),
                    eyeSize, eyeSize
                );
            }
        }
    });
    
    ctx.shadowBlur = 0;
}

function gameOver() {
    clearInterval(gameLoop);
    isGameRunning = false;
    
    // Show final score
    finalScoreElement.textContent = score;
    gameOverDiv.classList.remove('hidden');
    
    // Update button
    startBtn.textContent = 'Start Game';
}
