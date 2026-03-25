// Game configuration and state variables
const GOAL_CANS = 20;        // Cans needed to win
let currentCans = 0;         // Current number of items collected
let timeLeft = 30;           // Time remaining in seconds
let gameActive = false;      // Tracks if game is currently running
let spawnInterval;           // Holds the interval for spawning items
let timerInterval;           // Holds the interval for the countdown

const winMessages = [
  "Amazing! You're a water hero! 💧",
  "You did it! Clean water for all! 🌊",
  "Incredible work! Every drop counts! ✨",
  "You're unstoppable — the mission is complete! 🏆",
];

const loseMessages = [
  "So close! Give it another shot! 💪",
  "Don't give up — clean water needs you! 🌍",
  "Almost there! Try again and make a splash! 🌊",
  "Keep going — every effort matters! 💧",
];

// Creates the 3x3 game grid where items will appear
function createGrid() {
  const grid = document.querySelector('.game-grid');
  grid.innerHTML = ''; // Clear any existing grid cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'grid-cell'; // Each cell represents a grid square
    grid.appendChild(cell);
  }
}

// Ensure the grid is created when the page loads
createGrid();

// Spawns a new item in a random grid cell
function spawnWaterCan() {
  if (!gameActive) return; // Stop if the game is not active
  const cells = document.querySelectorAll('.grid-cell');
  
  // Clear all cells before spawning a new water can
  cells.forEach(cell => (cell.innerHTML = ''));

  // Select a random cell from the grid to place the water can
  const randomCell = cells[Math.floor(Math.random() * cells.length)];

  // Use a template literal to create the wrapper and water-can element
  randomCell.innerHTML = `
    <div class="water-can-wrapper">
      <div class="water-can"></div>
    </div>
  `;

  // Add click listener to count the collected can
  const canWrapper = randomCell.querySelector('.water-can-wrapper');
  canWrapper.addEventListener('click', () => {
    if (!gameActive) return;
    currentCans++;
    document.getElementById('current-cans').textContent = currentCans;
    randomCell.innerHTML = '';
  });
}

// Initializes and starts a new game
function startGame() {
  if (gameActive) return; // Prevent starting a new game if one is already active
  gameActive = true;
  currentCans = 0;
  timeLeft = 30;
  document.getElementById('current-cans').textContent = currentCans;
  document.getElementById('timer').textContent = timeLeft;
  const achievementsEl = document.getElementById('achievements');
  achievementsEl.textContent = '';
  achievementsEl.className = 'achievement';
  createGrid(); // Set up the game grid
  spawnInterval = setInterval(spawnWaterCan, 1000); // Spawn water cans every second
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').textContent = timeLeft;
    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameActive = false; // Mark the game as inactive
  clearInterval(spawnInterval); // Stop spawning water cans
  clearInterval(timerInterval); // Stop the countdown

  // Clear the grid
  document.querySelectorAll('.grid-cell').forEach(cell => (cell.innerHTML = ''));

  // Display a win or lose message
  const achievementsEl = document.getElementById('achievements');
  if (currentCans >= GOAL_CANS) {
    const msg = winMessages[Math.floor(Math.random() * winMessages.length)];
    achievementsEl.textContent = msg;
    achievementsEl.className = 'achievement win';
  } else {
    const msg = loseMessages[Math.floor(Math.random() * loseMessages.length)];
    achievementsEl.textContent = msg;
    achievementsEl.className = 'achievement lose';
  }
}

// Set up click handler for the start button
document.getElementById('start-game').addEventListener('click', startGame);
