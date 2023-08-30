const SPEED_SCALE_INCREASE = 0.00005;

export let speedScale;

export function setupSpeedScale() {
  speedScale = 2;
}

export function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
  console.log(speedScale);
}
