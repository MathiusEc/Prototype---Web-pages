# 🚁 DroneAgro - Guía de Desarrollo

## 📋 Índice
1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Conceptos Clave](#conceptos-clave)
4. [Cómo Funciona](#cómo-funciona)
5. [Personalización](#personalización)
6. [Buenas Prácticas](#buenas-prácticas)

---

## 📁 Estructura del Proyecto

```
Prototype - 3/
│
├── index.html           # Página principal (inicio)
├── servicios.html       # Página de servicios detallados
├── nosotros.html        # Página sobre la empresa
├── testimonios.html     # Página de testimonios
│
├── styles.css           # Estilos CSS de todo el sitio
├── animations.js        # JavaScript para animaciones e interactividad
│
└── GUIA_DESARROLLO.md   # Esta guía
```

---

## 🛠️ Tecnologías Utilizadas

### HTML5
- **Estructura semántica**: Uso de etiquetas como `<header>`, `<section>`, `<footer>`
- **Formularios**: Input types modernos (email, tel, textarea)
- **SVG inline**: Iconos escalables y personalizables

### CSS3
- **Custom Properties (Variables CSS)**: `--color-primario`, `--color-secundario`, etc.
- **Flexbox**: Para layouts de navegación y cards
- **Grid**: Para grillas de servicios y testimonios
- **Animaciones**: `@keyframes`, `transition`, `transform`
- **Media Queries**: Diseño responsive para móviles

### JavaScript Vanilla
- **IntersectionObserver API**: Detecta cuando elementos entran en viewport
- **DOM Manipulation**: Crear y modificar elementos dinámicamente
- **Event Listeners**: Click, scroll, submit
- **LocalStorage**: (Opcional para guardar preferencias)

---

## 🎯 Conceptos Clave

### 1. **Sistema de Animaciones al Scroll**

#### ¿Cómo funciona?
Cuando un elemento con la clase `.animate-on-scroll` entra en el viewport (área visible), JavaScript le añade la clase `.visible`, activando la animación CSS.

#### HTML:
```html
<div class="animate-on-scroll from-left">
    Este elemento aparecerá desde la izquierda
</div>
```

#### CSS:
```css
.animate-on-scroll {
    opacity: 0;
    transform: translateX(-60px);
    transition: all 0.9s ease;
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateX(0);
}
```

#### JavaScript:
```javascript
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
```

**Direcciones disponibles:**
- `.from-left` - Aparece desde la izquierda
- `.from-right` - Aparece desde la derecha
- `.from-bottom` - Aparece desde abajo
- `.scale-in` - Aparece creciendo

---

### 2. **Variables CSS (Custom Properties)**

#### ¿Por qué usar variables?
Permiten cambiar colores, espaciados y otros valores en un solo lugar.

#### Definición (en :root):
```css
:root {
    --color-primario: #2E7D32;
    --color-secundario: #FF6B6B;
    --sombra-suave: 0 4px 15px rgba(0, 0, 0, 0.1);
}
```

#### Uso:
```css
.boton {
    background: var(--color-primario);
    box-shadow: var(--sombra-suave);
}
```

#### Cambiar dinámicamente con JavaScript:
```javascript
document.documentElement.style.setProperty('--color-primario', '#FF5722');
```

---

### 3. **Iconos SVG Inline**

#### Ventajas:
- ✅ Escalables sin perder calidad
- ✅ Pueden cambiar de color con CSS (`stroke="currentColor"`)
- ✅ Ligeros (no requieren imágenes externas)

#### Ejemplo:
```html
<span class="servicio-icon">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
    </svg>
</span>
```

#### Estilo CSS:
```css
.servicio-icon svg {
    width: 60px;
    height: 60px;
    stroke: var(--color-primario);  /* El color se aplica al SVG */
}
```

---

### 4. **Formulario de Contacto**

#### HTML:
```html
<form id="contact-form">
    <input type="text" id="nombre" required>
    <input type="email" id="email" required>
    <textarea id="mensaje" required></textarea>
    <button type="submit">Enviar</button>
</form>
<div id="form-message"></div>
```

#### JavaScript:
```javascript
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();  // Evita recargar la página
    
    // Obtener valores
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Email inválido');
        return;
    }
    
    // Aquí enviarías los datos a un servidor
    console.log('Formulario enviado:', { nombre, email });
    
    // Mostrar mensaje de éxito
    document.getElementById('form-message').textContent = '¡Enviado!';
    contactForm.reset();
});
```

---

### 5. **Menú Hamburguesa (Móvil)**

#### HTML:
```html
<nav>
    <div class="logo">Logo</div>
    <ul class="nav_links">
        <li><a href="#inicio">Inicio</a></li>
        <li><a href="#servicios">Servicios</a></li>
    </ul>
    <div class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
    </div>
</nav>
```

#### CSS:
```css
/* Móvil por defecto - menú oculto */
.nav_links {
    display: none;
}

.nav_links.active {
    display: flex;
    flex-direction: column;
}

/* Icono hamburguesa */
.menu-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background: #333;
    margin: 5px 0;
}
```

#### JavaScript:
```javascript
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav_links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
```

---

## 🎨 Personalización

### Cambiar Colores

1. Abre `styles.css`
2. Busca `:root` (líneas 18-30)
3. Modifica las variables:

```css
:root {
    --color-primario: #TU_COLOR_AQUI;
    --color-secundario: #TU_COLOR_AQUI;
}
```

**Herramientas recomendadas:**
- [Coolors.co](https://coolors.co/) - Generador de paletas
- [Adobe Color](https://color.adobe.com/) - Rueda cromática

---

### Agregar Nueva Página

1. **Duplica** `servicios.html` y renómbralo (ej: `blog.html`)
2. **Actualiza el título** en `<head>`:
   ```html
   <title>Blog - DroneAgro</title>
   ```
3. **Actualiza la navegación** en todas las páginas:
   ```html
   <li><a href="blog.html">Blog</a></li>
   ```
4. **Crea el contenido** usando las clases existentes

---

### Agregar Nueva Animación

1. **Define el keyframe en CSS**:
```css
@keyframes miAnimacion {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

2. **Aplícala**:
```css
.mi-elemento {
    animation: miAnimacion 2s ease infinite;
}
```

---

## 💡 Buenas Prácticas

### HTML
- ✅ Usa etiquetas semánticas (`<header>`, `<section>`, `<article>`)
- ✅ Añade atributos `alt` a todas las imágenes
- ✅ Usa IDs únicos (no repetir en la misma página)
- ✅ Mantén la indentación consistente

### CSS
- ✅ Organiza por secciones con comentarios
- ✅ Usa nomenclatura BEM: `.bloque__elemento--modificador`
- ✅ Mobile-first: Estilos móvil primero, desktop con media queries
- ✅ Evita `!important` (solo si es absolutamente necesario)

### JavaScript
- ✅ Comenta código complejo
- ✅ Usa `const` y `let`, nunca `var`
- ✅ Valida inputs del usuario
- ✅ Maneja errores con try-catch

---

## 📱 Responsive Design

### Breakpoints Usados

```css
/* Móvil: < 768px (por defecto) */

/* Tablet: 768px - 1024px */
@media (min-width: 768px) {
    /* Estilos tablet */
}

/* Desktop: > 1024px */
@media (min-width: 1024px) {
    /* Estilos desktop */
}
```

### Técnicas:
- **Flexbox** para alinear elementos
- **Grid** para layouts complejos
- **max-width** para contenedores
- **vw, vh** para tamaños fluidos

---

## 🔧 Debugging (Solución de Problemas)

### Animaciones no funcionan
1. Verifica que `animations.js` esté vinculado: `<script src="animations.js"></script>`
2. Abre la consola del navegador (F12) y busca errores
3. Verifica que las clases estén bien escritas: `.animate-on-scroll`

### Estilos no se aplican
1. Verifica que `styles.css` esté vinculado: `<link rel="stylesheet" href="styles.css">`
2. Limpia la caché del navegador (Ctrl + Shift + R)
3. Usa DevTools para inspeccionar el elemento y ver qué estilos se aplican

### Menú móvil no abre
1. Verifica la consola (F12) en busca de errores JavaScript
2. Asegúrate de que las clases coincidan: `.menu-toggle`, `.nav_links`

---

## 🚀 Próximos Pasos

### Mejoras Sugeridas:
1. **Backend**: Conectar el formulario a un servidor real (PHP, Node.js)
2. **Base de datos**: Guardar testimonios dinámicamente
3. **Blog**: Añadir sección de blog con CMS
4. **SEO**: Metatags, sitemap.xml, robots.txt
5. **Performance**: Lazy loading de imágenes, minificar CSS/JS
6. **Accesibilidad**: ARIA labels, contraste de colores

### Recursos para Aprender:
- [MDN Web Docs](https://developer.mozilla.org/) - Documentación completa
- [CSS-Tricks](https://css-tricks.com/) - Tutoriales de CSS
- [JavaScript.info](https://javascript.info/) - Guía de JavaScript
- [Web.dev](https://web.dev/) - Best practices de Google

---

## 📞 Soporte

Si tienes dudas sobre el código:
1. Lee los comentarios en los archivos
2. Usa la consola del navegador (F12) para debugging
3. Busca en [Stack Overflow](https://stackoverflow.com/)

---

**¡Buena suerte con tu proyecto! 🎉**
