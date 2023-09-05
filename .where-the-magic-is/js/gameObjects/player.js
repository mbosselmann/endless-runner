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
let playerData;

async function initializePlayerFigures() {
  const { player } = await getSetupModule();

  if (player) {
    const { playerRun1, playerRun2, playerJump, playerLose } =
      await createPlayerFigures(player);
    playerData = {
      settings: player,
      playerRun1,
      playerRun2,
      playerJump,
      playerLose,
    };
  }
}

initializePlayerFigures();

export function setupPlayer() {
  isJumping = false;
  yVelocity = 0;

  if (playerData) {
    const { playerRun1 } = playerData;
    document.querySelector('[data-js="player-image"]').remove();
    player.classList.remove("player--jump");
    player.append(playerRun1);
    onRun();
  }
  setCustomProperty(player, "--bottom", playerBottom);
  document.removeEventListener("keydown", onJump);
  document.addEventListener("keydown", onJump);
}

async function createPlayerFigures(player) {
  if (!player) return null;

  const playerRun1 = new Image();
  playerRun1.src = player.run1;
  playerRun1.dataset.js = "player-image";
  playerRun1.alt = "avatar";

  const playerRun2 = new Image();
  playerRun2.src = player.run2;
  playerRun2.dataset.js = "player-image";
  playerRun2.alt = "avatar";

  const playerJump = new Image();
  playerJump.src = player.jumping;
  playerJump.dataset.js = "player-image";
  playerJump.alt = "avatar";

  const playerLose = new Image();
  playerLose.src = player.lose;
  playerLose.dataset.js = "player-image";
  playerLose.alt = "avatar";

  return {
    playerRun1,
    playerRun2,
    playerJump,
    playerLose,
  };
}

export function updatePlayer(delta) {
  handleJump(delta);
}

function onJump(event) {
  if (event.code !== "Space" || isJumping) return;
  yVelocity = JUMP_SPEED;
  isJumping = true;
  if (playerData && playerData.settings.rotate)
    player.classList.add("player--jump");
}

function onRun() {
  const playerFigure = document.querySelector('[data-js="player-image"]');

  if (playerFigure.src.includes(playerData.settings.lose)) return;

  intervalID = setInterval(handleRun, 200);
}

async function handleRun() {
  const playerFigure = document.querySelector('[data-js="player-image"]');
  const {
    playerSettings = playerData.settings,
    playerRun1,
    playerRun2,
    playerJump,
  } = playerData;

  if (!playerData) return;

  if (playerFigure.src.includes(playerSettings.lose)) {
    clearInterval(intervalID);
    return;
  }

  playerFigure.remove();

  if (isJumping) {
    player.append(playerJump);
    return;
  }
  if (playerFigure.src.includes(playerSettings.run1)) {
    player.append(playerRun2);
    return;
  }
  if (playerFigure.src.includes(playerSettings.run2)) {
    player.append(playerRun1);
    return;
  }
}

function handleJump(delta) {
  if (!isJumping) return;
  incrementCustomProperty(player, "--bottom", yVelocity * delta);
  if (getCustomProperty(player, "--bottom") <= playerBottom) {
    setCustomProperty(player, "--bottom", playerBottom);
    isJumping = false;
    if (playerData && playerData.settings.rotate) {
      player.classList.remove("player--jump");
    }
    if (playerData) {
      document.querySelector('[data-js="player-image"]').remove();
      player.append(playerData.playerRun1);
    }
  }
  yVelocity -=
    playerData && playerData.settings.jumpToTheMoon
      ? 0.0005 * delta
      : GRAVITY * delta;
}

export function getPlayerRectangle() {
  return player.getBoundingClientRect();
}

export function setPlayerLose() {
  if (!playerData) return;

  document.querySelector('[data-js="player-image"]').remove();
  player.append(playerData.playerLose);
}
