/* ============================================
   ANIMACIONES AL SCROLL
   ============================================ */

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.85;
        
        if (elementTop < triggerPoint && elementBottom > 0) {
            // Stagger más dinámico basado en posición y tipo
            const baseDelay = element.dataset.delay || 0;
            const positionDelay = (index % 6) * 120;
            const randomOffset = Math.random() * 50;
            const totalDelay = parseInt(baseDelay) + positionDelay + randomOffset;
            
            setTimeout(() => {
                element.classList.add('visible');
                
                // Solo aplicar rebote a elementos específicos
                if (element.classList.contains('bounce-effect')) {
                    element.style.animation = 'subtleBounce 0.6s ease-out';
                }
            }, totalDelay);
        }
    });
}

// Agregar animación de rebote sutil (solo para elementos con clase bounce-effect)
if (!document.querySelector('#scroll-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'scroll-animation-styles';
    style.textContent = `
        @keyframes subtleBounce {
            0%, 100% { transform: translateY(0) translateX(0) scale(1) rotate(0deg); }
            25% { transform: translateY(-8px) scale(1.03); }
            50% { transform: translateY(0) scale(0.98); }
            75% { transform: translateY(-3px) scale(1.01); }
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   CONTADORES ANIMADOS
   ============================================ */

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        if (!target) return;
        
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        let hasAnimated = false;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

/* ============================================
   NAVEGACIÓN SUAVE
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            const navLinks = document.querySelector('.nav_links');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/* ============================================
   MENÚ HAMBURGUESA
   ============================================ */

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav_links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

/* ============================================
   HEADER DINÁMICO AL SCROLL
   ============================================ */

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (!header) return;
    
    const currentScroll = window.pageYOffset;
    
    // Cambiar estilo del header
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Ocultar/mostrar header al scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

/* ============================================
   EFECTO PARALLAX EN EL HERO
   ============================================ */

function parallaxEffect() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    
    const scrolled = window.pageYOffset;
    const video = hero.querySelector('.hero-video');
    const content = hero.querySelector('.hero-content');
    
    if (scrolled < window.innerHeight) {
        if (video) {
            video.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
        
        if (content) {
            content.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));
            content.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
    }
}

window.addEventListener('scroll', parallaxEffect);

/* ============================================
   FORMULARIO DE CONTACTO
   ============================================ */

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formMessage = document.getElementById('form-message');
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono')?.value.trim() || '';
        const servicio = document.getElementById('servicio')?.value || '';
        const mensaje = document.getElementById('mensaje').value.trim();
        
        // Validación
        if (!nombre || !email || !mensaje) {
            showFormMessage(formMessage, 'Por favor, completa todos los campos requeridos.', 'error');
            return;
        }
        
        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage(formMessage, 'Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Simular envío
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            // Mostrar éxito
            showFormMessage(formMessage, '¡Mensaje enviado correctamente!  Nos pondremos en contacto contigo pronto.', 'success');
            
            // Limpiar formulario
            contactForm.reset();
            
            // Restaurar botón
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            // Log de datos (en producción esto iría a un servidor)
            console.log('Formulario enviado:', { nombre, email, telefono, servicio, mensaje });
            
            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

function showFormMessage(element, message, type) {
    if (!element) return;
    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'block';
    
    // Scroll al mensaje
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ============================================
   SCROLL INDICATOR (Flecha animada)
   ============================================ */

const scrollIndicator = document.querySelector('.scroll-indicator');

if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('#stats') || 
                           document.querySelector('section:nth-of-type(2)');
        if (nextSection) {
            const headerHeight = document.querySelector('header')?.offsetHeight || 80;
            window.scrollTo({
                top: nextSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
    
    // Ocultar flecha al hacer scroll
    window.addEventListener('scroll', () => {
        scrollIndicator.style.opacity = window.pageYOffset > 200 ? '0' : '1';
        scrollIndicator.style.pointerEvents = window.pageYOffset > 200 ? 'none' : 'auto';
    });
}

/* ============================================
   VIDEO PLACEHOLDER - Modal
   ============================================ */

const videoPlaceholder = document.querySelector('.video-placeholder');

if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        openVideoModal();
    });
}

function openVideoModal() {
    // Crear modal
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-overlay"></div>
        <div class="video-modal-content">
            <button class="video-modal-close">&times;</button>
            <div class="video-modal-body">
                <p style="color: white; text-align: center; padding: 2rem;">
                    🎬 Aquí iría tu video de YouTube o Vimeo. <br><br>
                    <small>Reemplaza este contenido con un iframe de video real.</small>
                </p>
                <!-- Ejemplo con YouTube: 
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/TU_VIDEO_ID?autoplay=1" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
                -->
            </div>
        </div>
    `;
    
    // Estilos del modal
    const style = document.createElement('style');
    style.textContent = `
        .video-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease;
        }
        .video-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
        }
        .video-modal-content {
            position: relative;
            width: 90%;
            max-width: 900px;
            aspect-ratio: 16/9;
            background: #000;
            border-radius: 10px;
            overflow: hidden;
        }
        .video-modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 10;
        }
        .video-modal-body {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Cerrar modal
    const closeBtn = modal.querySelector('.video-modal-close');
    const overlay = modal.querySelector('.video-modal-overlay');
    
    const closeModal = () => {
        modal.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            modal.remove();
            style.remove();
            document.body.style.overflow = '';
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Cerrar con Escape
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

/* ============================================
   ANIMACIÓN DE PORCENTAJES
   ============================================ */

function animatePercentages() {
    const percentages = document.querySelectorAll('.satisfaccion-numero');
    
    percentages.forEach(element => {
        const text = element.textContent;
        const isPercentage = text.includes('%');
        const target = parseFloat(text);
        
        if (isNaN(target)) return;
        
        let hasAnimated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    
                    let current = 0;
                    const duration = 2000;
                    const step = target / (duration / 16);
                    
                    const updateNumber = () => {
                        current += step;
                        if (current < target) {
                            element.textContent = Math.floor(current) + (isPercentage ? '%' : '');
                            requestAnimationFrame(updateNumber);
                        } else {
                            element.textContent = target + (isPercentage ? '%' : '');
                        }
                    };
                    
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

/* ============================================
   EFECTO RIPPLE EN BOTONES
   ============================================ */

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            left: ${e.clientX - rect.left}px;
            top: ${e.clientY - rect.top}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Agregar keyframes para ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

/* ============================================
   LAZY LOADING DE IMÁGENES
   ============================================ */

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ============================================
   EFECTO TILT EN TARJETAS (Escritorio)
   ============================================ */

if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.servicio-card, .testimonio-card, .caso-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/* ============================================
   TYPING EFFECT (Opcional)
   ============================================ */

function typeWriter(element, text, speed = 50, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

/* ============================================
   CURSOR PERSONALIZADO (Opcional)
   ============================================ */

/*
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.querySelectorAll('a, button, .cta-button').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}
*/

/* ============================================
   DETECCIÓN DE SCROLL DIRECTION
   ============================================ */

let scrollDirection = 'up';
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', () => {
    const currentScrollPos = window.pageYOffset;
    scrollDirection = currentScrollPos > prevScrollPos ? 'down' : 'up';
    prevScrollPos = currentScrollPos;
    
    // Puedes usar scrollDirection para otras animaciones
    document.body.setAttribute('data-scroll-direction', scrollDirection);
});

/* ============================================
   PRELOADER (Opcional)
   ============================================ */

function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">🚁</div>
            <div class="preloader-text">Cargando...</div>
            <div class="preloader-bar"><div class="preloader-progress"></div></div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #2E7D32 0%, #1a1a2e 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            transition: opacity 0.5s, visibility 0.5s;
        }
        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        .preloader-content {
            text-align: center;
            color: white;
        }
        .preloader-logo {
            font-size: 4rem;
            animation: pulse 1s infinite;
        }
        .preloader-text {
            margin: 1rem 0;
            font-size: 1.2rem;
        }
        .preloader-bar {
            width: 200px;
            height: 4px;
            background: rgba(255,255,255,0.2);
            border-radius: 2px;
            overflow: hidden;
        }
        .preloader-progress {
            height: 100%;
            background: white;
            animation: loading 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes loading {
            0% { width: 0; margin-left: 0; }
            50% { width: 100%; margin-left: 0; }
            100% { width: 0; margin-left: 100%; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.prepend(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
                style.remove();
            }, 500);
        }, 500);
    });
}

// Descomentar para activar el preloader: 
// initPreloader();

/* ============================================
   INICIALIZACIÓN
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Animaciones principales
    animateOnScroll();
    animateCounters();
    animatePercentages();
    
    // Ejecutar animaciones en cada scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Inicializar FAQs
    initFAQAccordion();
    
    // Marcar página como cargada
    document.body.classList.add('loaded');
    
    console.log('🚁 DroneAgro - Sitio web cargado correctamente');
});

/* ============================================
   FAQ ACCORDION
   ============================================ */

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (!faqItems.length) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los otros FAQs (opcional - quitar si quieres múltiples abiertos)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle el FAQ actual
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
            
            // Efecto de vibración suave al expandir
            if (!isActive) {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'faqExpand 0.4s ease';
                }, 10);
            }
        });
    });
}

// Agregar animación de expansión en el CSS dinámicamente
if (!document.querySelector('#faq-dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'faq-dynamic-styles';
    style.textContent = `
        @keyframes faqExpand {
            0% { transform: scale(1); }
            50% { transform: scale(1.02); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

/* ============================================
   UTILIDADES
   ============================================ */

// Debounce function para optimizar eventos
function debounce(func, wait = 20) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function para limitar ejecuciones
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimizar scroll events
window.addEventListener('scroll', debounce(animateOnScroll, 10)); 