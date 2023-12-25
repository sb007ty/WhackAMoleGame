let cells = document.querySelectorAll("td");
let oldCellNo = -1;

let timeLeftEl = document.querySelector(".time-left span");
let startBtn = document.querySelector(".start-btn");
let stopBtn = document.querySelector(".stop-btn");
let pointsEl = document.querySelector(".points span");

let baseTable = document.querySelector(".base-table");
let moleTimer = null;
let timeTimer = null;
let points = 0;
let timeLeft = 30;

function updateTimer() {
  timeLeft--;
  timeLeftEl.textContent = timeLeft;
  if (timeLeft == 0) {
    stopApp();
  }
}
function removeMole() {
  if (oldCellNo != -1) cells[oldCellNo].classList.remove("mole");
}
function startApp(e) {
  moleTimer = setInterval(() => {
    let cellNo = Math.floor(Math.random() * 16);
    console.log(cellNo, cells.length);
    cells[cellNo].classList.add("mole");
    if (oldCellNo != -1) cells[oldCellNo].classList.remove("mole");
    oldCellNo = cellNo;
  }, 2000);

  timeTimer = setInterval(updateTimer, 1000);
}

function stopApp(e) {
  if (moleTimer && timeTimer) {
    clearInterval(moleTimer);
    clearInterval(timeTimer);
    points = 0;
    timeLeft = 31;
    updateTimer();
    removeMole();
    updatePoints();
    moleTimer = null;
    timeTimer = null;
  }
}

function updatePoints() {
  pointsEl.textContent = points;
}

function cellClicked(e) {
  let cell = e.target;
  if (cell.classList.contains("mole")) {
    points++;
    updatePoints();
  }
}

startBtn.addEventListener("click", startApp);
stopBtn.addEventListener("click", stopApp);
baseTable.addEventListener("click", cellClicked);
