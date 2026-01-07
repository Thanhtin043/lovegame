const player = document.getElementById("player");
const goal = document.getElementById("goal");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupBtn = document.getElementById("popup-btn");
const music = document.getElementById("music");
const walls = document.querySelectorAll(".wall");

/* PLAYER POSITION */
let x = 20;
let y = 20;

const size = 48;
const speed = 20;

let step = 0;
let gameFinished = false;

/* SET START POSITION */
player.style.left = x + "px";
player.style.top = y + "px";

/* WALL DATA (TỰ ĐỘNG LẤY TỌA ĐỘ ABSOLUTE) */
const wallRects = [];
walls.forEach(w => {
  wallRects.push({
    x: w.offsetLeft,
    y: w.offsetTop,
    w: w.offsetWidth,
    h: w.offsetHeight
  });
});

/* GOAL DATA */
const goalRect = {
  x: goal.offsetLeft,
  y: goal.offsetTop,
  w: goal.offsetWidth,
  h: goal.offsetHeight
};

/* MOVE */
function move(dir) {
  if (gameFinished) return;

  let nx = x;
  let ny = y;

  if (dir === "up") ny -= speed;
  if (dir === "down") ny += speed;
  if (dir === "left") nx -= speed;
  if (dir === "right") nx += speed;

  if (!hitWall(nx, ny)) {
    x = nx;
    y = ny;
    player.style.left = x + "px";
    player.style.top = y + "px";
    checkWin();
  }
}

/* KEYBOARD */
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") move("up");
  if (e.key === "ArrowDown") move("down");
  if (e.key === "ArrowLeft") move("left");
  if (e.key === "ArrowRight") move("right");
});

/* WALL COLLISION */
function hitWall(nx, ny) {
  for (let w of wallRects) {
    if (
      nx < w.x + w.w &&
      nx + size > w.x &&
      ny < w.y + w.h &&
      ny + size > w.y
    ) {
      return true;
    }
  }
  return false;
}

/* WIN CHECK */
function checkWin() {
  if (
    x < goalRect.x + goalRect.w &&
    x + size > goalRect.x &&
    y < goalRect.y + goalRect.h &&
    y + size > goalRect.y
  ) {
    gameFinished = true;
    showPopup();
  }
}

/* POPUP */
function showPopup() {
  popup.classList.remove("hidden");

  if (step === 0) {
    popupText.innerText =
      "Em đã vượt qua mê cung 💜\nAnh có điều muốn nói...";
  } 
  else if (step === 1) {
    popupText.innerText =
      "Em làm người yêu anh nhé? 💕";
  } 
  else {
    popupText.innerHTML = `
      <img src="assets/girlfriend.jpg" width="200" style="border-radius:20px"><br><br>
      Anh yêu em rất nhiều 💜
    `;
    popupBtn.style.display = "none";
  }
}

/* POPUP BUTTON */
popupBtn.onclick = () => {
  if (music.paused) music.play();
  step++;
  showPopup();
};
