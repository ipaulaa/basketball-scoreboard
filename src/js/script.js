function toggleGameButtons(disabled) {
  gameBtns.forEach(btn => (btn.disabled = disabled));
}


function updateScore(team) {
  gameData[team].dom.score.textContent = `${gameData[team].score}`;
}

function addScore(team, increment) {
  gameData[team].score += increment;
  updateScore(team);
  highlightWinner();
}

function updateFoul(team) {
  gameData[team].dom.fouls.textContent = `${gameData[team].fouls}`;
}

function addFoul(team) {
  gameData[team].fouls++;
  updateFoul(team);
}

function updateTimer() {
  const mins = `${Math.floor(gameData.timer.seconds / 60)}`.padStart(2, "0");
  const secs = `${gameData.timer.seconds % 60}`.padStart(2, "0");
  gameData.timer.dom.textContent = `${mins}:${secs}`;
}

function highlightWinner() {
  clearWinner();
  if (gameData.home.score > gameData.guest.score)
    gameData.home.dom.section.classList.add("winner");
  else if (gameData.guest.score > gameData.home.score)
    gameData.guest.dom.section.classList.add("winner");
}

function clearGameData() {
  gameData.home.score = 0;
  updateScore("home");

  gameData.home.fouls = 0;
  updateFoul("home");

  gameData.guest.score = 0;
  updateScore("guest");

  gameData.guest.fouls = 0;
  updateFoul("guest");

  clearWinner();
}

function clearTimer() {
  gameData.timer.seconds = GAME_TIME;
  gameData.timer.dom.textContent = "00:00";
}

function clearWinner() {
  gameData.guest.dom.section.classList.remove("winner");
  gameData.home.dom.section.classList.remove("winner");
}

function clearPeriod() {
  gameData.period.period = 0;
  gameData.period.dom.textContent = `${gameData.period.period}`;
}

const GAME_TIME = 720;
const gameData = {
  state: "idle",
  period: {period: 0, dom: document.getElementById("period")},
  home: {
    score: 0,
    fouls: 0,
    dom: {
      section: document.querySelector(".home"),
      score: document.getElementById("home-score"),
      fouls: document.getElementById("home-fouls"),
    },
  },
  guest: {
    score: 0,
    fouls: 0,
    dom: {
      section: document.querySelector(".guest"),
      score: document.getElementById("guest-score"),
      fouls: document.getElementById("guest-fouls"),
    },
  },
  timer: {
    seconds: GAME_TIME,
    interval: null,
    dom: document.getElementById("timer"),
  },
};

const gameBtns = document.querySelectorAll(".game-btn");
const actionBtn = document.getElementById("action-btn");
const quitBtn = document.getElementById("quit-btn");

const homeBtn1 = document.getElementById("home-btn-1");
const homeBtn2 = document.getElementById("home-btn-2");
const homeBtn3 = document.getElementById("home-btn-3");
const homeBtnFoul = document.getElementById("home-btn-foul");

const guestBtn1 = document.getElementById("guest-btn-1");
const guestBtn2 = document.getElementById("guest-btn-2");
const guestBtn3 = document.getElementById("guest-btn-3");
const guestBtnFoul = document.getElementById("guest-btn-foul");

const periodBtn = document.getElementById("period-btn");

quitBtn.addEventListener("click", () => {
  clearGameData();
  clearInterval(gameData.timer.interval);
  clearPeriod();
  clearTimer();
  actionBtn.textContent = "Start";
  toggleGameButtons(true);
});

actionBtn.addEventListener("click", e => {
  if (gameData.state === "idle") {
    e.target.textContent = "Stop";
    gameData.state = "running";
    periodBtn.disabled = true;
    toggleGameButtons(false);
    clearGameData();
    updateTimer(gameData.timer.seconds);
    gameData.timer.interval = setInterval(() => {
      updateTimer(--gameData.timer.seconds);
      if (gameData.timer.seconds === 0) {
        clearInterval(gameData.timer.interval);
        e.target.textContent = "Start";
        gameData.state = "idle";
        gameData.timer.seconds = GAME_TIME;
        toggleGameButtons(true);
        periodBtn.disabled = false;
      }
    }, 1000);
  } else if (gameData.state === "running") {
    e.target.textContent = "Continue";
    gameData.state = "idle";
    clearInterval(gameData.timer.interval);
    periodBtn.disabled = false;
    toggleGameButtons(true);
  }
});

homeBtn1.addEventListener("click", () => addScore("home", 1));
homeBtn2.addEventListener("click", () => addScore("home", 2));
homeBtn3.addEventListener("click", () => addScore("home", 3));

homeBtnFoul.addEventListener("click", () => addFoul("home"));

guestBtn1.addEventListener("click", () => addScore("guest", 1));
guestBtn2.addEventListener("click", () => addScore("guest", 2));
guestBtn3.addEventListener("click", () => addScore("guest", 3));

guestBtnFoul.addEventListener("click", () => addFoul("guest"));

periodBtn.addEventListener("click", e => {
  gameData.period.period++;
  e.target.disabled = true;
  gameData.period.dom.textContent = `${gameData.period.period}`;
});
