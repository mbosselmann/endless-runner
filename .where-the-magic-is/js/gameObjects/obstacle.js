import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "../helper/updateCustomProperty.js";

const SPEED = 0.05;
const OBSTACLE_INTERVAL_MIN = 1000;
const OBSTACLE_INTERVAL_MAX = 2500;

const world = document.querySelector('[data-js="world"]');

let nextObstacleTime;

export function setupObstacle() {
  nextObstacleTime = OBSTACLE_INTERVAL_MIN;
  document.querySelectorAll('[data-js="obstacle"]').forEach((obstacle) => {
    obstacle.remove();
  });
}

export function updateObstacle(delta, speedScale) {
  document.querySelectorAll('[data-js="obstacle"]').forEach((obstacle) => {
    incrementCustomProperty(
      obstacle,
      "--left",
      delta * speedScale * SPEED * -1
    );

    if (getCustomProperty(obstacle, "--left") <= -100) {
      obstacle.remove();
    }
  });

  if (nextObstacleTime <= 0) {
    createObstacle();
    nextObstacleTime =
      randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) /
      speedScale;
  }

  nextObstacleTime -= delta;
}

function createObstacle() {
  const obstacle = document.createElement("img");
  obstacle.dataset.js = "obstacle";
  obstacle.classList.add("obstacle");
  obstacle.src = "./assets/rock.png";
  setCustomProperty(obstacle, "--left", 100);
  world.append(obstacle);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getObstacleRectangles() {
  return [...document.querySelectorAll('[data-js="obstacle"]')].map(
    (obstacle) => {
      return obstacle.getBoundingClientRect();
    }
  );
}
