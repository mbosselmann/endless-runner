import { setupGround, updateGround } from "../gameObjects/ground.js";
import { setupObstacle, updateObstacle } from "../gameObjects/obstacle.js";
import { setupPlayer, updatePlayer } from "../gameObjects/player.js";
import { checkLose, handleLose } from "./loseGame.js";
import { updateScore, setupScore } from "./score.js";
import { setupSpeedScale, updateSpeedScale } from "./updateSpeedScale.js";

const startScreen = document.querySelector('[data-js="start-screen"]');
const text = document.querySelector('[data-js="text"]');

let lastTime;

export function handleStart() {
  lastTime = null;
  setupSpeedScale();
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
  updateGround(delta);
  updatePlayer(delta);
  updateObstacle(delta);
  updateScore();
  updateSpeedScale(delta);

  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(update);
}
