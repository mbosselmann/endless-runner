import { getSetupModule } from "../helper/getSetupModule.js";
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "../helper/updateCustomProperty.js";

const player = document.querySelector('[data-js="image-container"]');

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;

let isJumping;
let yVelocity;
let intervalID;
let playerBottom = 1;
let figureData;

async function initialLoading() {
  const { figure } = await getSetupModule();
  const { figureRun1, figureRun2, figureJump, figureLose } =
    await createPlayerFigures(figure);
  figureData = {
    settings: figure,
    figureRun1,
    figureRun2,
    figureJump,
    figureLose,
  };
}

initialLoading();

export async function setupPlayer() {
  isJumping = false;
  yVelocity = 0;

  if (figureData) {
    document.querySelector('[data-js="player"]').remove();
    player.classList.remove("player--jump");
    player.append(figureData.figureRun1);
    onRun();
  }
  setCustomProperty(player, "--bottom", playerBottom);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

async function createPlayerFigures(figure) {
  if (!figure) return {};

  const figureRun1 = new Image();
  figureRun1.src = figure.run1;
  figureRun1.dataset.js = "player";
  figureRun1.alt = "avatar";

  const figureRun2 = new Image();
  figureRun2.src = figure.run2;
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

  return {
    figureRun1,
    figureRun2,
    figureJump,
    figureLose,
  };
}

export function updatePlayer(delta) {
  handleJump(delta);
}

function onJump(event) {
  if (event.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
  if (figureData && figureData.settings.rotate)
    player.classList.add("player--jump");
}

function onRun() {
  const playerFigure = document.querySelector('[data-js="player"]');

  if (playerFigure.src.includes(figureData.settings.lose)) return;

  intervalID = setInterval(handleRun, 200);
}

async function handleRun() {
  const playerFigure = document.querySelector('[data-js="player"]');
  const {
    figure = figureData.settings,
    figureRun1,
    figureRun2,
    figureJump,
  } = figureData;

  if (!figureData) return;

  if (playerFigure.src.includes(figure.lose)) {
    clearInterval(intervalID);
    return;
  }

  if (isJumping) {
    document.querySelector('[data-js="player"]').remove();
    player.append(figureJump);
    return;
  }
  if (playerFigure.src.includes(figure.run1)) {
    document.querySelector('[data-js="player"]').remove();
    player.append(figureRun2);
    return;
  }
  if (playerFigure.src.includes(figure.run2)) {
    document.querySelector('[data-js="player"]').remove();
    player.append(figureRun1);

    return;
  }
}

function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(player, "--bottom", yVelocity * delta);
  if (getCustomProperty(player, "--bottom") <= playerBottom) {
    setCustomProperty(player, "--bottom", playerBottom);
    isJumping = false;
    if (figureData && figureData.settings.rotate) {
      player.classList.remove("player--jump");
    }
    if (figureData) {
      document.querySelector('[data-js="player"]').remove();
      player.append(figureData.figureRun1);
    }
  }
  yVelocity -=
    figureData && figureData.settings.jumpToTheMoon
      ? 0.0005 * delta
      : GRAVITY * delta;
}

export function getPlayerRectangle() {
  return player.getBoundingClientRect();
}

export function setPlayerLose() {
  if (!figureData) return;

  document.querySelector('[data-js="player"]').remove();
  player.append(figureData.figureLose);
}
