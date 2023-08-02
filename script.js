import { handleStart } from "./js/runGame.js";
import { setPixelToWorldScale } from "./js/setPixelToWorldScale.js";

setPixelToWorldScale();
window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", handleStart, { once: true });
