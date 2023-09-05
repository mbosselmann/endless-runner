import { getObstacleRectangles } from "../gameObjects/obstacle.js";
import { getPlayerRectangle } from "../gameObjects/player.js";

export function checkCollision() {
  const playerRectangle = getPlayerRectangle();

  const smallerBoundingBox = {
    top: playerRectangle.top,
    bottom: playerRectangle.bottom,
    left: playerRectangle.left + 30,
    right: playerRectangle.right - 40,
  };

  return getObstacleRectangles().some((rectangle) =>
    isCollision(rectangle, smallerBoundingBox)
  );
}

function isCollision(rectangle1, rectangle2) {
  return (
    rectangle1.left < rectangle2.right &&
    rectangle1.right > rectangle2.left &&
    rectangle1.top < rectangle2.bottom &&
    rectangle1.bottom > rectangle2.top
  );
}
