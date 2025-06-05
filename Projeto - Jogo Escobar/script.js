const game = document.getElementById("game");
const carro = document.getElementById("carro");
const pontuacaoEl = document.getElementById("pontuacao");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

let posicaoCarro = 175;
let posicaoCarroTop = 500;
let pontuacao = 0;
let gameOver = false;
let vidas = 3;
let velocidadeCone = 5;

const vidasEl = document.createElement("div");
vidasEl.id = "vidas";
vidasEl.innerHTML = `Vidas: <span id="vidasCont">${vidas}</span>`;
document.body.insertBefore(vidasEl, gameOverScreen);

document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  if (e.key === "ArrowLeft" && posicaoCarro > 0) {
    posicaoCarro -= 25;
  } else if (e.key === "ArrowRight" && posicaoCarro < 350) {
    posicaoCarro += 25;
  } else if (e.key === "ArrowUp" && posicaoCarroTop > 0) {
    posicaoCarroTop -= 25;
  } else if (e.key === "ArrowDown" && posicaoCarroTop < 540) {
    posicaoCarroTop += 25;
  }

  carro.style.left = posicaoCarro + "px";
  carro.style.top = posicaoCarroTop + "px";
});

function criarCone() {
  const cone = document.createElement("img");
  cone.src = "imagens/cone.png";
  cone.classList.add("cone");
  cone.style.left = Math.floor(Math.random() * 360) + "px";
  cone.style.top = "-60px";
  game.appendChild(cone);
  moverCone(cone);
}

function criarBonus() {
  const bonus = document.createElement("div");
  bonus.classList.add("bonus");
  bonus.style.left = Math.floor(Math.random() * 360) + "px";
  bonus.style.top = "-60px";
  game.appendChild(bonus);
  moverBonus(bonus);
}

function moverCone(cone) {
  let top = -60;
  const intervalo = setInterval(() => {
    if (gameOver) {
      clearInterval(intervalo);
      return;
    }

    top += velocidadeCone;
    cone.style.top = top + "px";

    const coneRect = cone.getBoundingClientRect();
    const carroRect = carro.getBoundingClientRect();

    if (
      coneRect.bottom > carroRect.top &&
      coneRect.top < carroRect.bottom &&
      coneRect.left < carroRect.right &&
      coneRect.right > carroRect.left
    ) {
      clearInterval(intervalo);
      cone.remove();
      vidas--;
      document.getElementById("vidasCont").textContent = vidas;
      if (vidas <= 0) {
        gameOver = true;
        finalScore.textContent = pontuacao;
        gameOverScreen.style.display = "block";
      }
      return;
    }

    if (top > 600) {
      clearInterval(intervalo);
      cone.remove();
      pontuacao++;
      pontuacaoEl.textContent = pontuacao;

      if (pontuacao % 10 === 0) velocidadeCone += 1;
    }
  }, 30);
}

function moverBonus(bonus) {
  let top = -60;
  const intervalo = setInterval(() => {
    if (gameOver) {
      clearInterval(intervalo);
      return;
    }

    top += velocidadeCone;
    bonus.style.top = top + "px";

    const bonusRect = bonus.getBoundingClientRect();
    const carroRect = carro.getBoundingClientRect();

    if (
      bonusRect.bottom > carroRect.top &&
      bonusRect.top < carroRect.bottom &&
      bonusRect.left < carroRect.right &&
      bonusRect.right > carroRect.left
    ) {
      clearInterval(intervalo);
      bonus.remove();
      pontuacao += 5;
      pontuacaoEl.textContent = pontuacao;
      return;
    }

    if (top > 600) {
      clearInterval(intervalo);
      bonus.remove();
    }
  }, 30);
}

function reiniciarJogo() {
  location.reload();
}

setInterval(() => {
  if (!gameOver) criarCone();
}, 1000);

setInterval(() => {
  if (!gameOver && Math.random() < 0.2) criarBonus();
}, 4000);