export async function getSetupModule() {
  try {
    const module = await import("../../../setup.js");
    return module;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
