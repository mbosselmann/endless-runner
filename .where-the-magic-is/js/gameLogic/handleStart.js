import { setupPlayer } from "../gameObjects/player.js";
import { setupScore } from "./score.js";
import { setupSpeedScale } from "./speedScale.js";
import { updateGame, setupLastTime } from "./updateGame.js";
import { setupGround } from "../gameObjects/ground.js";
import { setupObstacle } from "../gameObjects/obstacle.js";

const startScreen = document.querySelector('[data-js="start-screen"]');
const text = document.querySelector('[data-js="text"]');

export function handleStart() {
  setupLastTime();
  setupSpeedScale();
  setupGround();
  setupPlayer();
  setupObstacle();
  setupScore();
  text.classList.add("hide");
  startScreen.classList.add("hide");
  window.requestAnimationFrame(updateGame);
}
