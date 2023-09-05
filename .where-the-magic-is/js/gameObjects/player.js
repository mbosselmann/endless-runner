import { getSetupModule } from "../helper/getSetupModule.js";
import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "../helper/updateCustomProperty.js";

const player = document.querySelector('[data-js="player"]');

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;

let isJumping;
let yVelocity;
let intervalID;
let playerBottom = 1;
let figureData;

async function initializePlayerFigures() {
  const { figure } = await getSetupModule();

  if (figure) {
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
}

initializePlayerFigures();

export function setupPlayer() {
  isJumping = false;
  yVelocity = 0;
  console.log(figureData);
  if (figureData) {
    const { figureRun1 } = figureData;
    document.querySelector('[data-js="player-image"]').remove();
    player.classList.remove("player--jump");
    player.append(figureRun1);
    onRun();
  }
  setCustomProperty(player, "--bottom", playerBottom);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

async function createPlayerFigures(figure) {
  if (!figure) return null;

  const figureRun1 = new Image();
  figureRun1.src = figure.run1;
  figureRun1.dataset.js = "player-image";
  figureRun1.alt = "avatar";

  const figureRun2 = new Image();
  figureRun2.src = figure.run2;
  figureRun2.dataset.js = "player-image";
  figureRun2.alt = "avatar";

  const figureJump = new Image();
  figureJump.src = figure.jumping;
  figureJump.dataset.js = "player-image";
  figureJump.alt = "avatar";

  const figureLose = new Image();
  figureLose.src = figure.lose;
  figureLose.dataset.js = "player-image";
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
  const playerFigure = document.querySelector('[data-js="player-image"]');

  if (playerFigure.src.includes(figureData.settings.lose)) return;

  intervalID = setInterval(handleRun, 200);
}

async function handleRun() {
  const playerFigure = document.querySelector('[data-js="player-image"]');
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

  playerFigure.remove();

  if (isJumping) {
    player.append(figureJump);
    return;
  }
  if (playerFigure.src.includes(figure.run1)) {
    player.append(figureRun2);
    return;
  }
  if (playerFigure.src.includes(figure.run2)) {
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
      document.querySelector('[data-js="player-image"]').remove();
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

  document.querySelector('[data-js="player-image"]').remove();
  player.append(figureData.figureLose);
}
