import { handleStart } from "./js/runGame.js";
import { setPixelToWorldScale } from "./js/setPixelToWorldScale.js";

const world = document.querySelector('[data-js="world"]');
setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });
world.focus();
