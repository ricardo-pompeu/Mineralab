import "/scripts.js";


const finishUrl = "/Inicio.html";

const cards = document.getElementById("cards");
const totalCards = document.querySelectorAll(".card").length;
const dotsContainer = document.getElementById("dots");

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let index = 0;

// swipe control
let startX = 0;
let currentX = 0;
let isDragging = false;

function getStep() {
  const card = document.querySelector(".card");
  const style = window.getComputedStyle(cards);
  const gap = parseInt(style.gap) || 0;

  return card.offsetWidth + gap;
}

// Criar dots
for (let i = 0; i < totalCards; i++) {
  const dot = document.createElement("span");
  dot.classList.add("dot");

  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });

  dotsContainer.appendChild(dot);
}

function updateCarousel() {
  cards.style.transition = "transform 0.6s ease-in-out";
  cards.style.transform = `translateX(-${index * getStep()}px)`;

  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  updateButtons();
}


const nextIcon = document.getElementById("nextIcon");
const prevIcon = document.getElementById("prevIcon");


function updateButtons() {

  prevIcon.style.transition = "all 0.6s ease-in-out";
  nextIcon.style.transition = "all 0.6s ease-in-out";

  prevIcon.style.color = index === 0 ? "var(--bg-primary)" : "var(--text-primary)";

  prevBtn.style.background = "var(--bg-teary)";
  nextBtn.style.background = "var(--bg-teary)";

  if (index === totalCards - 1) {
    nextIcon.className = "ph-bold ph-check";
    nextBtn.style.background = "var(--button-color)";
    
    nextIcon.style.color = "var(--bg-primary)";

  } else {
    nextIcon.className = "ph-bold ph-arrow-right";

    nextIcon.style.color = "var(--text-primary)";

    nextBtn.style.background = "var(--bg-teary)";
  }
}



// ===== BOTÕES =====

nextBtn.addEventListener("click", () => {
  if (index < totalCards - 1) {
    index++;
    updateCarousel();
  } else {
    window.location.href = finishUrl;
  }
});

prevBtn.addEventListener("click", () => {
  if (index > 0) {
    index--;
    updateCarousel();
  }
});

// ===== SWIPE TOUCH =====

cards.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  currentX = startX;
  isDragging = true;
  cards.style.transition = "none";
});

cards.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  let base = -index * getStep();
  let offset = base + diff;

  if ((index === 0 && diff > 0) || (index === totalCards - 1 && diff < 0)) {
    offset = base + diff * 0.35;
  }

  cards.style.transform = `translateX(${offset}px)`;
});

cards.addEventListener("touchend", () => {
  if (!isDragging) return;

  isDragging = false;

  const diff = currentX - startX;

  if (diff < -60 && index < totalCards - 1) {
    index++;
  } else if (diff > 60 && index > 0) {
    index--;
  }

  updateCarousel();
});

// ===== MOUSE DRAG =====

cards.addEventListener("mousedown", (e) => {
  startX = e.clientX;
  currentX = startX;
  isDragging = true;
  cards.style.transition = "none";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  currentX = e.clientX;
  const diff = currentX - startX;

  let base = -index * getStep();
  let offset = base + diff;

  if ((index === 0 && diff > 0) || (index === totalCards - 1 && diff < 0)) {
    offset = base + diff * 0.35;
  }

  cards.style.transform = `translateX(${offset}px)`;
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;

  isDragging = false;

  const diff = currentX - startX;

  if (diff < -60 && index < totalCards - 1) {
    index++;
  } else if (diff > 60 && index > 0) {
    index--;
  }

  updateCarousel();
});

// evitar seleção de texto durante drag
cards.addEventListener("dragstart", (e) => e.preventDefault());

// init
updateCarousel();








