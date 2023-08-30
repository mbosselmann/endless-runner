const scoreElement = document.querySelector('[data-js="score"]');
export let timeInSeconds = undefined;
export let score = 0;

export function setupScore() {
  score = 0;
  timeInSeconds = undefined;
}

export function updateScore() {
  const seconds = new Date().getTime();
  if (timeInSeconds === undefined) {
    return (timeInSeconds = seconds);
  }
  if (timeInSeconds !== seconds) {
    score = Math.floor((seconds - timeInSeconds) / 1000);
  }
  scoreElement.textContent = score;
}
