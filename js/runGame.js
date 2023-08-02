import { setupGround, updateGround } from "./ground.js";
import { setupObstacle, updateObstacle } from "./obstacle.js";
import { setupPlayer, updatePlayer } from "./player.js";
import { checkLose, handleLose } from "./loseGame.js";

let lastTime;
let speedScale;
let score;
const startScreen = document.querySelector('[data-js="start-screen"]');
const scoreElement = document.querySelector('[data-js="score"]');
const text = document.querySelector('[data-js="text"]');

export function handleStart() {
  lastTime = null;
  speedScale = 1;
  score = 0;
  setupGround();
  setupPlayer();
  setupObstacle();
  text.classList.add("hide");
  startScreen.classList.add("hide");
  window.requestAnimationFrame(update);
}

export function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta);
  updatePlayer(delta, speedScale);
  updateObstacle(delta, speedScale);
  updateScore(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(update);
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElement.textContent = Math.floor(score);
}
