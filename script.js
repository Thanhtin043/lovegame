const player = document.getElementById("player");
const goal = document.getElementById("goal");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupBtn = document.getElementById("popup-btn");
const music = document.getElementById("music");
const walls = document.querySelectorAll(".wall");

let x = 20;
let y = 20;
let step = 0;
let gameFinished = false;

const size = 48;
const speed = 20;

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
  if (e.key.includes("Arrow")) {
    move(e.key.replace("Arrow", "").toLowerCase());
  }
});

/* WALL COLLISION */
function hitWall(nx, ny) {
  const future = {
    left: nx,
    right: nx + size,
    top: ny,
    bottom: ny + size
  };

  for (let w of walls) {
    const r = w.getBoundingClientRect();
    if (
      future.left < r.right &&
      future.right > r.left &&
      future.top < r.bottom &&
      future.bottom > r.top
    ) return true;
  }
  return false;
}

/* WIN */
function checkWin() {
  const p = player.getBoundingClientRect();
  const g = goal.getBoundingClientRect();

  if (
    p.left < g.right &&
    p.right > g.left &&
    p.top < g.bottom &&
    p.bottom > g.top
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
      "Em đã vượt qua mê cung 💜\nAnh có điều này muốn hỏi...";
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

/* POPUP CLICK */
popupBtn.onclick = () => {
  if (music.paused) music.play();
  step++;
  showPopup();
};
