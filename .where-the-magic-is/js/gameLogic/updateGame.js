import { updateGround } from "../gameObjects/ground.js";
import { updateObstacle } from "../gameObjects/obstacle.js";
import { updatePlayer } from "../gameObjects/player.js";
import { handleLose } from "./loseGame.js";
import { updateScore } from "./score.js";
import { updateSpeedScale } from "./speedScale.js";
import { checkCollision } from "./collision.js";

let lastTime;

export function setupLastTime() {
  lastTime = null;
}

export function updateGame(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(updateGame);
    return;
  }
  const delta = time - lastTime;
  updateGround(delta);
  updatePlayer(delta);
  updateObstacle(delta);
  updateScore();
  updateSpeedScale(delta);

  if (checkCollision()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(updateGame);
}
