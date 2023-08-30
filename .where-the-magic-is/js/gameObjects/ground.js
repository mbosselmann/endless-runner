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
  setCustomProperty(grounds[1], "--left", 300);
}

export function updateGround(delta) {
  grounds.forEach((ground) => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1);
    if (getCustomProperty(ground, "--left") <= -300) {
      incrementCustomProperty(ground, "--left", 600);
    }
  });
}
