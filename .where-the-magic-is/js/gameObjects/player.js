import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "../helper/updateCustomProperty.js";

// {
//   normal: "/assets/gw_1.png",
//   run: "/assets/gw_2.png",
//   jumping: "/assets/gj.png",
//   lose: "/assets/gh.png",
//   rotate: false,
// }

async function getFigure() {
  try {
    const module = await import("../../../setup.js");
    return module.figure;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

const player = document.querySelector('[data-js="image-container"]');

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;

let isJumping;

let yVelocity;

let intervalID;

let playerBottom = 1;

async function createPlayerFigures() {
  const figure = await getFigure();
  if (!figure) return null;

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

  return {
    figureRun1,
    figureRun2,
    figureJump,
    figureLose,
    rotate: figure.rotate,
  };
}

const figure = await createPlayerFigures();

export function setupPlayer() {
  isJumping = false;
  yVelocity = 0;

  if (figure) {
    document.querySelector('[data-js="player"]').remove();
    player.classList.remove("player--jump");
    player.append(figureRun1);
    onRun();
  }
  setCustomProperty(player, "--bottom", playerBottom);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

export function updatePlayer(delta) {
  handleJump(delta);
}

function onJump(event) {
  if (event.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
  if (figure && figure.rotate) player.classList.add("player--jump");
}

function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(player, "--bottom", yVelocity * delta);
  if (getCustomProperty(player, "--bottom") <= playerBottom) {
    setCustomProperty(player, "--bottom", playerBottom);
    isJumping = false;
    if (figure && figure.rotate) {
      player.classList.remove("player--jump");
      document.querySelector('[data-js="player"]').remove();
      player.append(figureRun1);
    }
  }
  yVelocity -= GRAVITY * delta;
}

export function getPlayerRectangle() {
  return player.getBoundingClientRect();
}

export function setPlayerLose() {
  if (!figure) return;

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

  if (!figure) return;

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
