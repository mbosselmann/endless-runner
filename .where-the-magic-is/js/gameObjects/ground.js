import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "../helper/updateCustomProperty.js";
import { speedScale } from "../gameLogic/speedScale.js";

const SPEED = 0.05;
const grounds = document.querySelectorAll('[data-js="ground"]');

export function setupGround() {
  setCustomProperty(grounds[0], "--left", 0);
  grounds[0].style.removeProperty("left");
  grounds[0].style.removeProperty("width");
  setCustomProperty(grounds[1], "--left", 300);
  grounds[1].style.removeProperty("left");
  grounds[1].style.removeProperty("width");
}

export function updateGround(delta) {
  grounds.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600);
    }
  });
}

export function positionGrounds() {
  const world = document.querySelector('[data-js="world"]');
  const worldWidth = getCustomProperty(world, "width");

  grounds.forEach((ground) => {
    const currentGroundLeft = getCustomProperty(ground, "--left");
    const newGroundLeft = (worldWidth / 100) * currentGroundLeft;
    setCustomProperty(ground, "left", newGroundLeft + "px");
    const groundWidth = getCustomProperty(ground, "width");
    setCustomProperty(ground, "width", groundWidth + "px");
  });
}
