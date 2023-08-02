const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 70;

const world = document.querySelector('[data-js="world"]');

export function setPixelToWorldScale() {
  let worldToPixelScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
    worldToPixelScale = window.innerWidth / WORLD_WIDTH;
  } else {
    worldToPixelScale = window.innerHeight / WORLD_HEIGHT;
  }

  world.style.width = WORLD_WIDTH * worldToPixelScale + "px";
  world.style.height = WORLD_HEIGHT * worldToPixelScale + "px";
}
