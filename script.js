const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const dino = {
  x: 50,
  y: canvas.height - 60,
  width: 40,
  height: 60,
  jumping: false,
  jumpHeight: 180,
  jumpCount: 0,
};
const cactus = {
  x: canvas.width,
  y: canvas.height - 20,
  width: 10,
  height: 20,
  speed: 4,
};
const bird = {
  x: canvas.width,
  y: 200,
  width: 30,
  height: 20,
  speed: 5,
};
const rock = {
  x: canvas.width,
  y: canvas.height - 10,
  width: 20,
  height: 10,
  speed: 2,
};
let score = 0;
let gameLoop;
let gameStarted = false;
function drawDino() {
  ctx.fillStyle = "green";
  ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}
function drawCactus() {
  ctx.fillStyle = "red";
  ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);
}
function drawBird() {
  ctx.fillStyle = "blue";
  ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}
function drawRock() {
  ctx.fillStyle = "grey";
  ctx.fillRect(rock.x, rock.y, rock.width, rock.height);
}
function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 30);
}
function drawStartScreen() {
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText(
    "Press Space to Start",
    canvas.width / 2 - 120,
    canvas.height / 2
  );
}
function jump() {
  if (!dino.jumping) {
    dino.jumping = true;
    dino.jumpCount = 0;
  }
}
function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Update dino position
  if (dino.jumping) {
    dino.jumpCount++;
    if (dino.jumpCount < 15) {
      dino.y -= 5;
    } else if (dino.jumpCount < 30) {
      dino.y += 5;
    } else {
      dino.jumping = false;
      dino.y = 260;
    }
  }
  // Update cactus position
  cactus.x -= cactus.speed;
  if (cactus.x < -cactus.width) {
    cactus.x = canvas.width;
    score++;
  }
  // Update bird position
  bird.x -= bird.speed;
  if (bird.x < -bird.width) {
    bird.x = canvas.width;
    bird.y = Math.random() * canvas.height;
    score++;
  }
  rock.x -= rock.speed;
  if (rock.x < -rock.width) {
    rock.x = canvas.width;
    score++;
  }
  //check cactus col
  if (
    dino.x < cactus.x + cactus.width &&
    dino.x + dino.width > cactus.x &&
    dino.y <= cactus.y &&
    dino.y + dino.height >= cactus.y
  ) {
    gameOver();
    console.log("col detected");
  }
  if (
    dino.x < bird.x + bird.width &&
    dino.x + dino.width > bird.x &&
    dino.y <= bird.y &&
    dino.y + dino.height >= bird.y
  ) {
    gameOver();
    console.log("col detected");
  }
  if (
    dino.x < rock.x + rock.width &&
    dino.x + dino.width > rock.x &&
    dino.y <= rock.y &&
    dino.y + dino.height >= rock.y
  ) {
    gameOver();
    console.log("col detected");
  }
  //speedUp(score);
  // Draw game objects
  console.log("drawing Game Objects");
  drawDino();
  drawCactus();
  drawScore();
  drawBird();
  drawRock();
}
function speedUp(score) {
  if (score >= 1) {
    rock.speed = rock.speed + score / 5;
    bird.speed = bird.speed + score / 5;
    cactus.speed = cactus.speed + score / 5;
  }
}

function gameOver() {
  cancelAnimationFrame(gameLoop);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText(
    `Game Over! Score: ${score}`,
    canvas.width / 2 - 100,
    canvas.height / 2
  );
  ctx.font = "20px Arial";
  ctx.fillText(
    "Press Space to Restart",
    canvas.width / 2 - 80,
    canvas.height / 2 + 40
  );
  gameStarted = false;
}
function gameLoopFunction() {
  update();
  if (gameStarted) gameLoop = requestAnimationFrame(gameLoopFunction);
}
function startGame() {
  gameStarted = true;
  score = 0;
  cactus.x = canvas.width;
  bird.x = canvas.width;
  rock.x = canvas.width;
  bird.speed = 5
  cactus.speed = 4
  rock.speed = 2
  gameLoopFunction();
}
// Event listeners
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!gameStarted) {
      startGame();
    } else {
      jump();
    }
  }
});
// Initial draw of start screen
drawStartScreen();
