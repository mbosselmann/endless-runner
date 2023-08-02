import { getObstacleRectangles } from "./obstacle.js";
import { getPlayerRectangle } from "./player.js";
import { handleStart } from "./runGame.js";
import {
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const startScreen = document.querySelector('[data-js="start-screen"]');
const player = document.querySelector('[data-js="player"]');
const text = document.querySelector('[data-js="text"]');
const world = document.querySelector('[data-js="world"]');

export function checkLose() {
  const playerRectangle = getPlayerRectangle();
  return getObstacleRectangles().some((rectangle) =>
    isCollision(rectangle, playerRectangle)
  );
}

function isCollision(rectangle1, rectangle2) {
  return (
    rectangle1.left < rectangle2.right &&
    rectangle1.right > rectangle2.left &&
    rectangle1.top < rectangle2.bottom &&
    rectangle1.bottom > rectangle2.top
  );
}

export function handleLose() {
  text.classList.remove("hide");
  const playerBottom = getCustomProperty(player, "--bottom");
  const worldHeight = getCustomProperty(world, "height");
  console.log((worldHeight / 100) * playerBottom + 20);
  setCustomProperty(
    text,
    "--bottom",
    Math.floor((worldHeight / 100) * playerBottom + 80) + "px"
  );
  setTimeout(() => {
    document.addEventListener("keydown", handleStart, { once: true });
    startScreen.classList.remove("hide");
  }, 1000);
}
