const player = document.getElementById("player");
const goal = document.getElementById("goal");
const popup = document.getElementById("popup");
const popupText = document.getElementById("popup-text");
const popupBtn = document.getElementById("popup-btn");
const music = document.getElementById("music");

let step = 0;
let x = 50, y = 50;

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") y -= 20;
  if (e.key === "ArrowDown") y += 20;
  if (e.key === "ArrowLeft") x -= 20;
  if (e.key === "ArrowRight") x += 20;

  player.style.left = x + "px";
  player.style.top = y + "px";
  checkWin();
});

function checkWin() {
  const p = player.getBoundingClientRect();
  const g = goal.getBoundingClientRect();

  if (
    p.left < g.right &&
    p.right > g.left &&
    p.top < g.bottom &&
    p.bottom > g.top
  ) {
    win();
  }
}

function win() {
  music.play();
  popup.classList.remove("hidden");
  showPopup();
}

function showPopup() {
  if (step === 0) {
    popupText.innerText = "Em đã tới đây rồi… Anh có điều muốn nói 💜";
  } else if (step === 1) {
    popupText.innerText = "Em làm người yêu anh nhé? 💕";
  } else {
    popupText.innerHTML = `
      <img src="assets/girlfriend.jpg" width="200"><br>
      Anh yêu em 💜
    `;
    popupBtn.style.display = "none";
  }
}

popupBtn.onclick = () => {
  step++;
  showPopup();
};
