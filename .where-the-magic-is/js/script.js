import { handleStart } from "./gameLogic/handleStart.js";
import { setupGame } from "./gameLogic/setupGame.js";

const world = document.querySelector('[data-js="world"]');
setupGame();
document.addEventListener("keydown", handleStart, { once: true });
world.focus();
