import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

import { figure } from "../../setup.js";

const player = document.querySelector('[data-js="image-container"]');

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;

let isJumping;

let yVelocity;

let intervalID;

let playerBottom = 1;

const figureRun1 = new Image();
figureRun1.src = figure.normal;
figureRun1.dataset.js = "player";
figureRun1.alt = "avatar";

const figureRun2 = new Image();
figureRun2.src = figure.run;
figureRun2.dataset.js = "player";
figureRun2.alt = "avatar";

const figureJump = new Image();
figureJump.src = figure.jumping;
figureJump.dataset.js = "player";
figureJump.alt = "avatar";

const figureLose = new Image();
figureLose.src = figure.lose;
figureLose.dataset.js = "player";
figureLose.alt = "avatar";

export function setupPlayer() {
  document.querySelector('[data-js="player"]').remove();
  isJumping = false;
  yVelocity = 0;
  player.classList.remove("player--jump");
  setCustomProperty(player, "--bottom", playerBottom);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
  player.append(figureRun1);
  onRun();
}

export function updatePlayer(delta) {
  handleJump(delta);
}

function onJump(event) {
  if (event.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
  if (figure.rotate) player.classList.add("player--jump");
}

function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(player, "--bottom", yVelocity * delta);
  if (getCustomProperty(player, "--bottom") <= playerBottom) {
    setCustomProperty(player, "--bottom", playerBottom);
    if (figure.rotate) player.classList.remove("player--jump");
    isJumping = false;
    document.querySelector('[data-js="player"]').remove();
    player.append(figureRun1);
  }
  yVelocity -= GRAVITY * delta;
}

export function getPlayerRectangle() {
  return player.getBoundingClientRect();
}

export function setPlayerLose() {
  document.querySelector('[data-js="player"]').remove();
  player.append(figureLose);
}

function onRun() {
  const playerFigure = document.querySelector('[data-js="player"]');

  if (playerFigure.src.includes(figure.lose)) return;

  intervalID = setInterval(handleRun, 200);
}

function handleRun() {
  const playerFigure = document.querySelector('[data-js="player"]');

  if (playerFigure.src.includes(figure.lose)) {
    clearInterval(intervalID);
    return;
  }

  if (isJumping) {
    document.querySelector('[data-js="player"]').remove();
    player.append(figureJump);
    return;
  }
  if (playerFigure.src.includes(figure.normal)) {
    document.querySelector('[data-js="player"]').remove();
    player.append(figureRun2);
    return;
  }
  if (playerFigure.src.includes(figure.run)) {
    document.querySelector('[data-js="player"]').remove();
    player.append(figureRun1);

    return;
  }
}
