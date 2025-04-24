const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let catcher = {
  x: canvas.width / 2 - 50,
  y: canvas.height - 30,
  width: 100,
  height: 20,
  speed: 7,
};

let cigarette = {
  x: Math.random() * (canvas.width - 30),
  y: -30,
  width: 30,
  height: 50,
  speed: 3,
};

let score = 0;
let gameRunning = false;
let animationFrame;

document.addEventListener("mousemove", (e) => {
  let rect = canvas.getBoundingClientRect();
  let mouseX = e.clientX - rect.left;
  catcher.x = mouseX - catcher.width / 2;

  // Keep catcher within canvas
  if (catcher.x < 0) catcher.x = 0;
  if (catcher.x + catcher.width > canvas.width) catcher.x = canvas.width - catcher.width;
});

function startGame() {
  document.getElementById("startContainer").style.display = "none";
  canvas.style.display = "block";
  gameRunning = true;
  requestAnimationFrame(gameLoop);
}

function drawCigarette() {
  ctx.fillStyle = "#d9d9d9";
  ctx.fillRect(cigarette.x, cigarette.y, cigarette.width, cigarette.height);
  ctx.fillStyle = "#cc0000";
  ctx.fillRect(cigarette.x, cigarette.y + cigarette.height - 10, cigarette.width, 10);
}

function drawCatcher() {
  ctx.fillStyle = "#ff4e4e";
  ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);
}

function updateGame() {
  cigarette.y += cigarette.speed;

  // Check for catch
  if (
    cigarette.y + cigarette.height >= catcher.y &&
    cigarette.x + cigarette.width > catcher.x &&
    cigarette.x < catcher.x + catcher.width
  ) {
    score++;
    cigarette.y = -30;
    cigarette.x = Math.random() * (canvas.width - cigarette.width);
    cigarette.speed += 0.3;
  }

  // Missed cigarette
  if (cigarette.y > canvas.height) {
    endGame();
  }
}

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "18px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCatcher();
  drawCigarette();
  drawScore();
  updateGame();

  animationFrame = requestAnimationFrame(gameLoop);
}

function endGame() {
  gameRunning = false;
  cancelAnimationFrame(animationFrame);
  document.getElementById("restartContainer").style.display = "block";
  document.getElementById("leaderboardContainer").style.display = "block";
  updateLeaderboard();
}

function updateLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(score);
  leaderboard.sort((a, b) => b - a);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 5)));

  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  leaderboard.slice(0, 5).forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `#${i + 1}: ${s}`;
    list.appendChild(li);
  });
}

