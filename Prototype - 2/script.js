/* ============================================
   🎬 ANIMACIONES AL SCROLL
   Similar a AnimatedContent pero en Vanilla JS
   ============================================ */

// Función que detecta cuando un elemento entra en la pantalla
function animateOnScroll() {
    // Selecciona todos los elementos que tienen la clase 'animate-on-scroll'
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element, index) => {
        // Obtiene la posición del elemento respecto a la ventana
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Altura de la ventana
        const windowHeight = window.innerHeight;
        
        // Si el elemento está visible (con un margen del 20%)
        const triggerPoint = windowHeight * 0.85;
        
        if (elementTop < triggerPoint && elementBottom > 0) {
            // Añade un pequeño delay escalonado para cada elemento
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100); // 100ms de diferencia entre cada uno
        }
    });
}

// Ejecutar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Ejecutar una vez al inicio
    animateOnScroll();
    
    // Ejecutar cada vez que se hace scroll
    window.addEventListener('scroll', animateOnScroll);
});

/* ============================================
   🎬 EFECTO PARALLAX SUAVE EN EL HERO
   ============================================ */

window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const scrolled = window.pageYOffset;
    
    // Mueve el fondo más lento que el scroll (efecto parallax)
    if (hero) {
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

/* ============================================
   🎬 NAVEGACIÓN SUAVE AL HACER CLIC EN LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',  // Scroll suave
                block: 'start'
            });
        }
    });
});

/* ============================================
   🎬 HEADER QUE CAMBIA AL HACER SCROLL
   ============================================ */

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

/* ============================================
   🎬 EFECTO DE ESCRITURA (TYPEWRITER) - OPCIONAL
   Descomenta si quieres usarlo
   ============================================ */

/*
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Ejemplo de uso:
// const titulo = document.querySelector('#hero h1');
// typeWriter(titulo, 'Servicios Profesionales de Drones', 80);
*/