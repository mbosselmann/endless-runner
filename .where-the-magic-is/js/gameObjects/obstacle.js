import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "../helper/updateCustomProperty.js";
import { speedScale } from "../gameLogic/speedScale.js";

const SPEED = 0.05;
const OBSTACLE_INTERVAL_MIN = 1200;
const OBSTACLE_INTERVAL_MAX = 2500;

let nextObstacleTime;
let isObstacleEnabled = false;
let obstacleImageSrc;
let initialObstacle;
let isInitialObstacleUsed = false;

const world = document.querySelector('[data-js="world"]');

export function setupObstacle() {
  isObstacleEnabled = true;
  nextObstacleTime = OBSTACLE_INTERVAL_MIN;
  const obstacle = document.querySelector('[data-js="obstacle"]');
  if (obstacle) {
    obstacleImageSrc = obstacle.src;
    initializeObstacleImage();
  }
  document.querySelectorAll('[data-js="obstacle"]').forEach((obstacle) => {
    obstacle.remove();
  });
}

export function updateObstacle(delta) {
  if (isObstacleEnabled) {
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
}

function initializeObstacleImage() {
  const obstacle = new Image();
  obstacle.src = obstacleImageSrc;
  initialObstacle = obstacle;
}

function createObstacle() {
  if (isInitialObstacleUsed) {
    const obstacle = new Image();
    obstacle.src = obstacleImageSrc;
    obstacle.dataset.js = "obstacle";
    obstacle.classList.add("obstacle");
    setCustomProperty(obstacle, "--left", 100);
    world.append(obstacle);
  } else {
    initialObstacle.dataset.js = "obstacle";
    initialObstacle.classList.add("obstacle");
    setCustomProperty(initialObstacle, "--left", 100);
    world.append(initialObstacle);
    isInitialObstacleUsed = true;
  }
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

export function resetIsObstacleEnabled() {
  isObstacleEnabled = false;
}

export function positionObstacles() {
  const obstacles = document.querySelectorAll('[data-js="obstacle"]');
  const world = document.querySelector('[data-js="world"]');
  const worldWidth = getCustomProperty(world, "width");

  if (isObstacleEnabled) {
    obstacles.forEach((obstacle) => {
      const obstacleLeft = getCustomProperty(obstacle, "--left");
      setCustomProperty(
        obstacle,
        "left",
        (worldWidth / 100) * obstacleLeft + "px"
      );
    });
  }
}
