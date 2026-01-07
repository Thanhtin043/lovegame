const player = document.getElementById("player");
const goal = document.getElementById("goal");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupBtn = document.getElementById("popup-btn");
const music = document.getElementById("music");
const walls = document.querySelectorAll(".wall");

/* 🔒 KHÓA POPUP NGAY KHI LOAD */
popup.classList.add("hidden");

let x = 20, y = 20;
const size = 36;
const speed = 20;
let step = 0;
let finished = false;

const wallRects = [...walls].map(w => ({
  x: w.offsetLeft,
  y: w.offsetTop,
  w: w.offsetWidth,
  h: w.offsetHeight
}));

const goalRect = {
  x: goal.offsetLeft,
  y: goal.offsetTop,
  w: goal.offsetWidth,
  h: goal.offsetHeight
};

function move(dir) {
  if (finished) return;

  let nx = x, ny = y;
  if (dir === "up") ny -= speed;
  if (dir === "down") ny += speed;
  if (dir === "left") nx -= speed;
  if (dir === "right") nx += speed;

  if (!hitWall(nx, ny)) {
    x = nx; y = ny;
    player.style.left = x + "px";
    player.style.top = y + "px";
    checkWin();
  }
}

function hitWall(nx, ny) {
  return wallRects.some(w =>
    nx < w.x + w.w &&
    nx + size > w.x &&
    ny < w.y + w.h &&
    ny + size > w.y
  );
}

function checkWin() {
  if (
    x < goalRect.x + goalRect.w &&
    x + size > goalRect.x &&
    y < goalRect.y + goalRect.h &&
    y + size > goalRect.y
  ) {
    finished = true;
    showPopup();
  }
}

function showPopup() {
  popup.classList.remove("hidden");
  popupText.innerText = step === 0
    ? "Em đã tới được trái tim anh 💜"
    : "Em làm người yêu anh nhé? 💕";
}

popupBtn.onclick = () => {
  step++;
  music.play();
  popupText.innerHTML = `
    <img src="assets/girlfriend.jpg" width="200" style="border-radius:20px"><br><br>
    Anh yêu em 💜
  `;
  popupBtn.style.display = "none";
};
