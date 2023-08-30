import { setCustomProperty } from "../helper/updateCustomProperty.js";

const world = document.querySelector('[data-js="world"]');

async function getTheme() {
  try {
    const module = await import("../../../setup.js");
    return module.theme;
  } catch (error) {
    console.log(error.message);
    return "";
  }
}

async function getCustomColors() {
  try {
    const module = await import("../../../setup.js");
    return module.customColors;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export async function setupGame() {
  const theme = await getTheme();
  if (theme) {
    document.body.classList.add(theme);
  }

  const customColors = await getCustomColors();

  if (!customColors) return;

  if (theme) {
    document.body.classList.remove(theme);
  }

  const { textColor, textBackgroundColor, skyColor, gameBackgroundColor } =
    customColors;

  if (skyColor) {
    setCustomProperty(world, "--sky", customColors.skyColor);
  }

  if (textColor) {
    setCustomProperty(world, "--color", customColors.textColor);
  }

  if (textBackgroundColor) {
    setCustomProperty(world, "--bg-color", customColors.textBackgroundColor);
  }

  if (gameBackgroundColor) {
    setCustomProperty(document.body, "background-color", gameBackgroundColor);
  }
}
