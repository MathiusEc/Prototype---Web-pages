/* ============================================
   DRONEAGRO - ANIMATIONS.JS
   Archivo principal de animaciones e interacciones
   ============================================ */

// Añadir clase al body para indicar que JS está activo
document.body.classList.add('js-enabled');

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
            const baseDelay = element.dataset.delay || 0;
            const positionDelay = (index % 6) * 120;
            const randomOffset = Math.random() * 50;
            const totalDelay = parseInt(baseDelay) + positionDelay + randomOffset;
            
            setTimeout(() => {
                element.classList.add('visible');
                
                if (element.classList.contains('bounce-effect')) {
                    element.style.animation = 'subtleBounce 0.6s ease-out';
                }
            }, totalDelay);
        }
    });
}

// Agregar animación de rebote
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

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

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
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    if (currentScroll > lastScroll && currentScroll > 500) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

/* ============================================
   EFECTO PARALLAX
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
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono')?.value.trim() || '';
        const servicio = document.getElementById('servicio')?.value || '';
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (!nombre || !email || !mensaje) {
            showFormMessage(formMessage, 'Por favor, completa todos los campos requeridos.', 'error');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage(formMessage, 'Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        setTimeout(() => {
            showFormMessage(formMessage, '¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
            
            contactForm.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            console.log('Formulario enviado:', { nombre, email, telefono, servicio, mensaje });
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}

function showFormMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.style.display = 'block';
    element.style.padding = '15px';
    element.style.marginTop = '20px';
    element.style.borderRadius = '8px';
    element.style.fontSize = '14px';
    
    if (type === 'success') {
        element.style.backgroundColor = '#d4edda';
        element.style.color = '#155724';
        element.style.border = '1px solid #c3e6cb';
    } else {
        element.style.backgroundColor = '#f8d7da';
        element.style.color = '#721c24';
        element.style.border = '1px solid #f5c6cb';
    }
}

/* ============================================
   TEXTO ROTATIVO
   ============================================ */

function rotatingText() {
    const textElements = document.querySelectorAll('.rotating-text span');
    if (!textElements.length) return;
    
    let currentIndex = 0;
    
    setInterval(() => {
        textElements[currentIndex].style.opacity = '0';
        textElements[currentIndex].style.transform = 'translateY(-20px)';
        
        currentIndex = (currentIndex + 1) % textElements.length;
        
        textElements[currentIndex].style.opacity = '1';
        textElements[currentIndex].style.transform = 'translateY(0)';
    }, 3000);
}

/* ============================================
   INDICADOR DE SCROLL
   ============================================ */

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
    
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.getElementById('stats');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/* ============================================
   ANIMACIÓN DE PORCENTAJES
   ============================================ */

function animatePercentages() {
    const percentages = document.querySelectorAll('.percentage-bar');
    
    percentages.forEach(bar => {
        const target = parseInt(bar.getAttribute('data-percentage'));
        if (!target) return;
        
        let hasAnimated = false;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    bar.style.width = target + '%';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

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
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
            
            if (!isActive) {
                item.style.animation = 'none';
                setTimeout(() => {
                    item.style.animation = 'faqExpand 0.4s ease';
                }, 10);
            }
        });
    });
}

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

/* ============================================
   INICIALIZACIÓN
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateCounters();
    animatePercentages();
    rotatingText();
    initFAQAccordion();
    
    window.addEventListener('scroll', debounce(animateOnScroll, 10));
    
    document.body.classList.add('loaded');
    
    console.log('🚁 DroneAgro - Sitio web cargado correctamente');
});
