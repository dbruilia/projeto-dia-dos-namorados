const imagens = [
    "assets/foto1.jpg",
    "assets/foto2.jpg",
    "assets/foto3.jpg",
    "assets/foto4.jpg",
    "assets/foto5.jpg",
    "assets/foto6.jpg"
  ];
  
  let cartas = imagens.concat(imagens); // 2 de cada
  cartas = cartas.sort(() => 0.5 - Math.random());
  
  const tabuleiro = document.getElementById("tabuleiro");
  let carta1 = null;
  let carta2 = null;
  let travar = false;
  let acertos = 0;
  
  function criarCartas() {
    cartas.forEach((img, index) => {
      const carta = document.createElement("div");
      carta.classList.add("carta");
      carta.dataset.index = index;
      carta.dataset.img = img;
  
      carta.addEventListener("click", () => revelarCarta(carta));
      tabuleiro.appendChild(carta);
    });
  }
  
  function revelarCarta(carta) {
    if (travar || carta.classList.contains("revelada")) return;
  
    carta.style.backgroundImage = `url(${carta.dataset.img})`;
    carta.classList.add("revelada");
  
    if (!carta1) {
      carta1 = carta;
    } else {
      carta2 = carta;
      travar = true;
  
      if (carta1.dataset.img === carta2.dataset.img) {
        carta1 = null;
        carta2 = null;
        acertos++;
        travar = false;
        if (acertos === imagens.length) {
          document.getElementById("mensagem").textContent = "Parabéns! Você encontrou todos os pares! 💘";
        }
      } else {
        setTimeout(() => {
          carta1.style.backgroundImage = "";
          carta2.style.backgroundImage = "";
          carta1.classList.remove("revelada");
          carta2.classList.remove("revelada");
          carta1 = null;
          carta2 = null;
          travar = false;
        }, 1000);
      }
    }
  }
  
  criarCartas();
  