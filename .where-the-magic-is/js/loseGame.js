import { getObstacleRectangles } from "./obstacle.js";
import { getPlayerRectangle, setPlayerLose } from "./player.js";
import { handleStart } from "./runGame.js";
import {
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

const startScreen = document.querySelector('[data-js="start-screen"]');
const text = document.querySelector('[data-js="text"]');
const world = document.querySelector('[data-js="world"]');

export function checkLose() {
  const playerRectangle = getPlayerRectangle();

  const smallerBoundingBox = {
    top: playerRectangle.top,
    bottom: playerRectangle.bottom,
    left: playerRectangle.left + 20,
    right: playerRectangle.right - 20,
  };

  return getObstacleRectangles().some((rectangle) =>
    isCollision(rectangle, smallerBoundingBox)
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
