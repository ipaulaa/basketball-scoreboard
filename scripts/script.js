const homeEl = document.getElementById("home");
const homeScore = document.getElementById("home-score");
const home1 = document.getElementById("home-1");
const home2 = document.getElementById("home-2");
const home3 = document.getElementById("home-3");
const homeFouls = document.getElementById("home-fouls");
const homeFoul = document.getElementById("home-foul");

const guestEl = document.getElementById("guest");
const guestScore = document.getElementById("guest-score");
const guest1 = document.getElementById("guest-1");
const guest2 = document.getElementById("guest-2");
const guest3 = document.getElementById("guest-3");
const guestFouls = document.getElementById("guest-fouls");
const guestFoul = document.getElementById("guest-foul");

const periodEl = document.getElementById("period");
const newPeriod = document.getElementById("new-period");
const newGame = document.getElementById("new-game");

const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const home = {
  score: 0,
  fouls: 0
};

const guest = {
  score: 0,
  fouls: 0
};

let gameInProgress = false;
let period = 0;
let interval;
let time = {
  total: 0,
  minutes: 0,
  seconds: 0
};

function getWinning() {
  clearWinning();
  if (home.score > guest.score) {
    homeEl.classList.add("winning");
  } else if (home.score < guest.score) {
    guestEl.classList.add("winning");
  }
}

function clearWinning() {
  if (homeEl.classList.contains("winning")) {
    homeEl.classList.remove("winning");
  }
  if (guestEl.classList.contains("winning")) {
    guestEl.classList.remove("winning");
  }
}

function updateScore(player) {
  if (player === "home") {
    homeScore.textContent = `${home.score}`;
  } else {
    guestScore.textContent = `${guest.score}`;
  }
  getWinning();
}

function startGame() {
  clearWinning();
  clearInterval(interval);

  home1.disabled = !home1.disabled;
  home2.disabled = !home2.disabled;
  home3.disabled = !home3.disabled;
  homeFoul.disabled = !homeFoul.disabled;

  guest1.disabled = !guest1.disabled;
  guest2.disabled = !guest2.disabled;
  guest3.disabled = !guest3.disabled;
  guestFoul.disabled = !guestFoul.disabled;

  gameInProgress = !gameInProgress;
  newGame.textContent = gameInProgress ? "Stop Game" : "Start Game";

  if (gameInProgress) {
    getTime();
  }

  home.score = 0;
  home.fouls = 0;
  homeScore.textContent = `${home.score}`;
  homeFouls.textContent = `${home.fouls}`;

  guest.score = 0;
  guest.fouls = 0;
  guestScore.textContent = `${guest.score}`;
  guestFouls.textContent = `${guest.fouls}`;

  period = 1;
  periodEl.textContent = `${period}`;
}

function getTime() {
  time.total = 720;
  interval = setInterval(() => {
    if (--time.total === 0) {
      newPeriod.disabled = false;
      clearInterval(interval);
    }
    time.minutes = Math.floor(time.total / 60);
    time.seconds = time.total % 60;

    minutesEl.textContent = `${time.minutes}`;
    secondsEl.textContent = `${time.seconds}`;
  }, 1000);
}

home1.addEventListener("click", () => {
  home.score++;
  updateScore("home");
});

home2.addEventListener("click", () => {
  home.score += 2;
  updateScore("home");
});

home3.addEventListener("click", () => {
  home.score += 3;
  updateScore("home");
});

guest1.addEventListener("click", () => {
  guest.score++;
  updateScore("guest");
});

guest2.addEventListener("click", () => {
  guest.score += 2;
  updateScore("guest");
});

guest3.addEventListener("click", () => {
  guest.score += 3;
  updateScore("guest");
});

homeFoul.addEventListener("click", () => {
  homeFouls.textContent = `${++home.fouls}`;
});

guestFoul.addEventListener("click", () => {
  guestFouls.textContent = `${++guest.fouls}`;
});

newPeriod.addEventListener("click", () => {
  periodEl.textContent = `${++period}`;
  clearWinning();
  startGame();
});

newGame.addEventListener("click", () => {
  newPeriod.disabled = true;
  startGame();
});
