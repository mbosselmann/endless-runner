import { updateGround } from "../gameObjects/ground.js";
import { updateObstacle } from "../gameObjects/obstacle.js";
import { updatePlayer } from "../gameObjects/player.js";
import { handleLose } from "./handleLose.js";
import { updateScore } from "./score.js";
import { updateSpeedScale } from "./speedScale.js";
import { checkCollision } from "./collision.js";

let lastTime;

export function setupLastTime() {
  lastTime = null;
}

export function updateGame(time) {
  const player = document.querySelector('[data-js="player-image"]');
  const ground = document.querySelector('[data-js="ground"]');
  const score = document.querySelector('[data-js="score"]');

  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(updateGame);
    return;
  }
  const delta = time - lastTime;
  if (ground) updateGround(delta);
  if (player) updatePlayer(delta);
  updateObstacle(delta);
  if (score) updateScore();
  updateSpeedScale(delta);

  if (player && checkCollision()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateGame);
}
