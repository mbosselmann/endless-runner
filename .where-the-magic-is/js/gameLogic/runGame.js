import { setupGround, updateGround } from "../gameObjects/ground.js";
import { setupObstacle, updateObstacle } from "../gameObjects/obstacle.js";
import { setupPlayer, updatePlayer } from "../gameObjects/player.js";
import { checkLose, handleLose } from "./loseGame.js";
import { updateScore, setupScore } from "./score.js";
import { updateSpeedScale } from "./updateSpeedScale.js";

const startScreen = document.querySelector('[data-js="start-screen"]');
const text = document.querySelector('[data-js="text"]');

let lastTime;
let speedScale;

export function handleStart() {
  lastTime = null;
  speedScale = 1;
  setupGround();
  setupPlayer();
  setupObstacle();
  setupScore();
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
  updateGround(delta, speedScale);
  updatePlayer(delta);
  updateObstacle(delta, speedScale);
  updateScore();
  // updateSpeedScale(delta, speedScale);

  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(update);
}
