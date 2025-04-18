function toggleGameButtons(disabled) {
  gameBtns.forEach(btn => (btn.disabled = disabled));
}

function addScore(team, increment) {
  data[team].score += increment;
  data[team].dom.score.textContent = `${data[team].score}`;
}

const gameBtns = document.querySelectorAll(".game-btn");

const actionBtn = document.getElementById("action-btn");
actionBtn.addEventListener("click", e => {
  if (e.target.textContent === "New" || e.target.textContent === "Continue") {
    e.target.textContent = "Stop";
    periodBtn.disabled = true;
    toggleGameButtons(false);
  } else if (e.target.textContent === "Stop") {
    e.target.textContent = "Continue";
    periodBtn.disabled = false;
    toggleGameButtons(true);
  }
});

const data = {
  period: {period: 0, dom: document.getElementById("period")},
  home: {
    score: 0,
    fouls: 0,
    dom: {
      score: document.getElementById("home-score"),
      fouls: document.getElementById("home-fouls"),
    },
  },
  guest: {
    score: 0,
    fouls: 0,
    dom: {
      score: document.getElementById("guest-score"),
      fouls: document.getElementById("guest-fouls"),
    },
  },
  timer: {minutes: 0, seconds: 0, dom: document.getElementById("timer")},
};

const homeBtn1 = document.getElementById("home-btn-1");
const homeBtn2 = document.getElementById("home-btn-2");
const homeBtn3 = document.getElementById("home-btn-3");

homeBtn1.addEventListener("click", () => addScore("home", 1));
homeBtn2.addEventListener("click", () => addScore("home", 2));
homeBtn3.addEventListener("click", () => addScore("home", 3));

const homeBtnFoul = document.getElementById("home-btn-foul");
homeBtnFoul.addEventListener("click", () => {
  data.home.fouls++;
  data.home.fouls %= 10;
  data.home.dom.fouls.textContent = `${data.home.fouls}`;
});

const guestBtn1 = document.getElementById("guest-btn-1");
const guestBtn2 = document.getElementById("guest-btn-2");
const guestBtn3 = document.getElementById("guest-btn-3");

guestBtn1.addEventListener("click", () => addScore("guest", 1));
guestBtn2.addEventListener("click", () => addScore("guest", 2));
guestBtn3.addEventListener("click", () => addScore("guest", 3));

const guestBtnFoul = document.getElementById("guest-btn-foul");
guestBtnFoul.addEventListener("click", () => {
  data.guest.fouls++;
  data.guest.fouls %= 10;
  data.guest.dom.fouls.textContent = `${data.guest.fouls}`;
});

const periodBtn = document.getElementById("period-btn");
periodBtn.addEventListener("click", () => {
  data.period.period++;
  data.period.dom.textContent = `${data.period.period}`;
});
