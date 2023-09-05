import { setupPlayer } from "../gameObjects/player.js";
import { setupScore } from "./score.js";
import { setupSpeedScale } from "./speedScale.js";
import { updateGame, setupLastTime } from "./updateGame.js";
import { setupGround } from "../gameObjects/ground.js";
import { setupObstacle } from "../gameObjects/obstacle.js";
import { resetIsObstacleEnabled } from "../gameObjects/obstacle.js";

const startScreen = document.querySelector('[data-js="start-screen"]');
const text = document.querySelector('[data-js="text"]');
const player = document.querySelector('[data-js="player-image"]');
const obstacle = document.querySelector('[data-js="obstacle"]');
const ground = document.querySelector('[data-js="ground"]');
const score = document.querySelector('[data-js="score"]');

export function handleStart() {
  resetIsObstacleEnabled();
  setupLastTime();
  setupSpeedScale();
  if (ground) setupGround();
  if (player) setupPlayer();
  if (obstacle) setupObstacle();
  if (score) setupScore();
  if (text) text.classList.add("hide");
  if (startScreen) startScreen.classList.add("hide");
  window.requestAnimationFrame(updateGame);
}
