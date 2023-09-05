import { setPlayerLose } from "../gameObjects/player.js";
import { handleStart } from "./handleStart.js";
import {
  getCustomProperty,
  setCustomProperty,
} from "../helper/updateCustomProperty.js";
import { positionObstacles } from "../gameObjects/obstacle.js";
import { positionGrounds } from "../gameObjects/ground.js";

const startScreen = document.querySelector('[data-js="start-screen"]');
const text = document.querySelector('[data-js="text"]');
const world = document.querySelector('[data-js="world"]');

export function handleLose() {
  if (text) {
    text.classList.remove("hide");
    const player = document.querySelector('[data-js="player-image"]');

    const playerBottom = getCustomProperty(player, "--bottom");
    const playerLeft = getCustomProperty(player, "left");
    const playerWidth = getCustomProperty(player, "width");
    const worldHeight = getCustomProperty(world, "height");

    setCustomProperty(
      text,
      "--bottom",
      Math.floor((worldHeight / 100) * playerBottom + 130) + "px"
    );

    setCustomProperty(text, "--left", playerLeft + playerWidth + 120 + "px");
  }
  setPlayerLose();
  positionObstacles();
  positionGrounds();

  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    if (startScreen) startScreen.classList.remove("hide");
  }, 1000);
}
