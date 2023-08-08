import { handleStart } from "./js/runGame.js";

const world = document.querySelector('[data-js="world"]');
document.addEventListener("keydown", handleStart, { once: true });
world.focus();
