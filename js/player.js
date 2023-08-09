import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

import { figure } from "../setup.js";

const player = document.querySelector('[data-js="player"]');

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;

let isJumping;

let yVelocity;

export function setupPlayer() {
  isJumping = false;
  yVelocity = 0;
  player.classList.remove("player--jump");
  setCustomProperty(player, "--bottom", 10);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
  player.src = figure.normal;
}

export function updatePlayer(delta) {
  handleJump(delta);
}

function onJump(event) {
  if (event.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
  player.classList.add("player--jump");
  console.log("JUMP!");
}

function handleJump(delta) {
  if (!isJumping) return;
  player.src = figure.jumping;
  incrementCustomProperty(player, "--bottom", yVelocity * delta);
  if (getCustomProperty(player, "--bottom") <= 10) {
    setCustomProperty(player, "--bottom", 10);
    player.classList.remove("player--jump");
    isJumping = false;
    player.src = figure.normal;
  }
  yVelocity -= GRAVITY * delta;
}

export function getPlayerRectangle() {
  return player.getBoundingClientRect();
}

export function setPlayerLose() {
  player.src = figure.lose;
}
