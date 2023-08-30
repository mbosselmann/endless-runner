import { setPlayerLose } from "../gameObjects/player.js";
import { handleStart } from "./handleStart.js";
import {
  getCustomProperty,
  setCustomProperty,
} from "../helper/updateCustomProperty.js";

const startScreen = document.querySelector('[data-js="start-screen"]');
const text = document.querySelector('[data-js="text"]');
const world = document.querySelector('[data-js="world"]');

export function handleLose() {
  text.classList.remove("hide");
  const player = document.querySelector('[data-js="player"]');

  const playerBottom = getCustomProperty(player, "--bottom");
  const playerLeft = getCustomProperty(player, "left");
  const playerWidth = getCustomProperty(player, "width");
  const worldHeight = getCustomProperty(world, "height");
  setPlayerLose();

  setCustomProperty(
    text,
    "--bottom",
    Math.floor((worldHeight / 100) * playerBottom + 130) + "px"
  );

  setCustomProperty(text, "--left", playerLeft + playerWidth + 120 + "px");
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startScreen.classList.remove("hide");
  }, 1000);
}
