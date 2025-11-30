// script.js

// 1. Validación de formulario de contacto
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function(e) {
      const email = form.querySelector("input[type='email']").value;
      if (!email.includes("@")) {
        alert("Por favor ingresa un correo válido.");
        e.preventDefault();
      }
    });
  }
});

// 2. Animaciones al hacer scroll (fade-in)
window.addEventListener("scroll", () => {
  document.querySelectorAll(".fade").forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add("visible");
    }
  });
});

// 3. Slider automático de imágenes/testimonios
let index = 0;
function showSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach(s => s.style.display = "none");
  if (slides.length > 0) {
    slides[index].style.display = "block";
    index = (index + 1) % slides.length;
  }
}
setInterval(showSlides, 3000);

// 4. Contador regresivo para promociones
function countdown() {
  const endDate = new Date("Dec 31, 2025 23:59:59").getTime();
  const now = new Date().getTime();
  const distance = endDate - now;
  const countdownEl = document.getElementById("countdown");

  if (countdownEl) {
    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      countdownEl.innerText = days + " días restantes";
    } else {
      countdownEl.innerText = "¡Promoción finalizada!";
    }
  }
}
setInterval(countdown, 1000);

// 5. Pop-up de suscripción
document.addEventListener("DOMContentLoaded", () => {
  const promoBtn = document.getElementById("promoBtn");
  const promoModal = document.getElementById("promoModal");
  const closeBtn = document.getElementById("closeModal");

  if (promoBtn && promoModal) {
    promoBtn.addEventListener("click", () => {
      promoModal.style.display = "block";
    });
  }
  if (closeBtn && promoModal) {
    closeBtn.addEventListener("click", () => {
      promoModal.style.display = "none";
    });
  }
});
