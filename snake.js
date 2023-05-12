// define the width and height of the game board
const boardWidth = 40;
const boardHeight = 40;
const blockSize = 9;
// initialize the snake
let snake = [
  {x: 10, y: 15},
  {x: 9, y: 15},
  {x: 8, y: 15}
];
// initialize the direction of the snake
let direction = 'right';
// generate the initial food position
let food = generateFood();
// set up the canvas for drawing the game board
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
// set up the game loop
setInterval(() => {
  clearCanvas();
  drawSnake(context, blockSize, snake);
  drawFood(context, blockSize);
  moveSnake();
  if (checkCollision()) {
    resetGame();
  }
  if (checkFood(snake)) {
    growSnake();
  }
}, 100);
// handle key presses to change the direction of the snake
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 'ArrowRight':
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
  }
});
// clear the canvas
function clearCanvas() {
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);
}
// draw the snake on the game board
function drawSnake(context, blockSize, snake) {
  context.fillStyle = 'black';
  snake.forEach(block => {
    context.fillRect(block.x * blockSize, block.y * blockSize, blockSize, blockSize);
  });
}
// move the snake in the current direction
function moveSnake() {
  const head = {x: snake[0].x, y: snake[0].y};
  switch (direction) {
    case 'up':
      head.y -= 1;
      break;
    case 'down':
      head.y += 1;
      break;
    case 'left':
      head.x -= 1;
      break;
    case 'right':
      head.x += 1;
      break;
  }
  snake.unshift(head);
  snake.pop();
}
// check if the snake has collided with a wall or itself
function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= boardWidth || head.y < 0 || head.y >= boardHeight) {
    return true;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}
// generate random coordinates for the food
function generateFood() {
  const food = {
    x: Math.floor(Math.random() * boardWidth),
    y: Math.floor(Math.random() * boardHeight)
  };
  return food;
}
// draw the food on the game board
function drawFood(context, blockSize) {
  const x = food.x * blockSize;
  const y = food.y * blockSize;
  context.fillStyle = 'red';
  context.fillRect(x, y, blockSize,blockSize);
}
// check if the snake has eaten the food
function checkFood(snake) {
  const head = snake[0];
  if (head.x === food.x && head.y === food.y) {
    // generate a new food position
    food = generateFood();
    return true;
  }
  return false;
}
// initialize the score
let score = 0;
// handle the snake eating food
function checkFood(snake) {
  const head = snake[0];
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood();
    return true;
  }
  return false;
}
// display the score
function displayScore() {
  const scoreElement = document.getElementById('score');
  scoreElement.textContent = `SCORE: ${score}`;
}
// update the game loop to display the score
setInterval(() => {
  clearCanvas();
  drawSnake(context, blockSize, snake);
  drawFood(context, blockSize);
  moveSnake();
  if (checkCollision()) {
    resetGame();
  }
  if (checkFood(snake)) {
    growSnake();
  }
  displayScore();
}, 100);