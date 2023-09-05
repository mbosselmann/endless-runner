import { getCustomProperty } from "../helper/updateCustomProperty.js";

const SPEED_SCALE_INCREASE = 0.00005;

export let speedScale;

export function setupSpeedScale() {
  const world = document.querySelector('[data-js="world"]');
  const worldWidth = getCustomProperty(world, "width");
  if (worldWidth >= 800) {
    return (speedScale = 1);
  }
  if (worldWidth >= 500) {
    return (speedScale = 1.5);
  }
  if (worldWidth < 500) {
    return (speedScale = 2);
  }
}

export function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}
