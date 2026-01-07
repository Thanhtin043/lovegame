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
const size = 60;

/* DI CHUYỂN */
function move(direction) {
  const speed = 20;
  let nx = x;
  let ny = y;

  if (direction === "up") ny -= speed;
  if (direction === "down") ny += speed;
  if (direction === "left") nx -= speed;
  if (direction === "right") nx += speed;

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

/* VA CHẠM TƯỜNG */
function hitWall(nx, ny) {
  const future = {
    left: nx,
    right: nx + size,
    top: ny,
    bottom: ny + size
  };

  for (let wall of walls) {
    const w = wall.getBoundingClientRect();
    if (
      future.left < w.right &&
      future.right > w.left &&
      future.top < w.bottom &&
      future.bottom > w.top
    ) {
      return true;
    }
  }
  return false;
}

/* KIỂM TRA THẮNG */
function checkWin() {
  const p = player.getBoundingClientRect();
  const g = goal.getBoundingClientRect();

  if (
    p.left < g.right &&
    p.right > g.left &&
    p.top < g.bottom &&
    p.bottom > g.top
  ) {
    showPopup();
  }
}

/* POPUP */
function showPopup() {
  popup.classList.remove("hidden");

  if (step === 0) {
    popupText.innerText =
      "Em đã vượt qua mê cung rồi 💜\nAnh có điều này muốn hỏi...";
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

/* CLICK POPUP */
popupBtn.onclick = () => {
  if (music.paused) music.play();
  step++;
  showPopup();
};
