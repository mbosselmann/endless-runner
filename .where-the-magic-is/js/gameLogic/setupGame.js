import { setCustomProperty } from "../helper/updateCustomProperty.js";
import { getSetupModule } from "../helper/getSetupModule.js";

const world = document.querySelector('[data-js="world"]');

export async function setupGame() {
  const setupModule = await getSetupModule();

  if (!setupModule) return;

  if (setupModule.theme && !setupModule.customColors) {
    document.body.classList.add(setupModule.theme);
  }

  if (setupModule.customColors) {
    const { textColor, textBackgroundColor, skyColor, gameBackgroundColor } =
      setupModule.customColors;

    if (skyColor) {
      setCustomProperty(world, "--sky", skyColor);
    }

    if (textColor) {
      setCustomProperty(world, "--color", textColor);
    }

    if (textBackgroundColor) {
      setCustomProperty(world, "--bg-color", textBackgroundColor);
    }

    if (gameBackgroundColor) {
      setCustomProperty(document.body, "background-color", gameBackgroundColor);
    }
  }
}
