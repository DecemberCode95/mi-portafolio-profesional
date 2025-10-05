// js/modules/scrollAnimations.js - VERSIÓN MEJORADA
export function setupScrollAnimations() {
    console.log('🎬 Configurando animaciones de scroll...');
    
    // Configurar progress bar de scroll
    setupScrollProgress();
    
    // Configurar observador para animaciones al aparecer
    setupIntersectionObserver();
    
    // Configurar scroll suave para navegación
    setupSmoothScrolling();
    
    // Configurar efectos parallax
    setupParallaxEffects();
    
    console.log('✅ Animaciones de scroll configuradas correctamente');
}

function setupScrollProgress() {
    // Crear y agregar la progress bar si no existe
    let progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
        
        // Estilos para la progress bar
        Object.assign(progressBar.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            height: '3px',
            background: 'linear-gradient(90deg, var(--primary-color), var(--primary-light))',
            width: '0%',
            zIndex: '10000',
            transition: 'width 0.1s ease',
            borderRadius: '0 2px 2px 0'
        });
    }
    
    // Actualizar progress bar al hacer scroll
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const trackLength = docHeight - winHeight;
        const progress = Math.min((scrollTop / trackLength) * 100, 100);
        
        progressBar.style.width = `${progress}%`;
        
        // Ocultar/mostrar basado en la posición
        if (scrollTop > 100) {
            progressBar.style.opacity = '1';
        } else {
            progressBar.style.opacity = '0';
        }
    });
}

function setupIntersectionObserver() {
    const elementsToAnimate = document.querySelectorAll(
        '.portfolio-item, .section__title, .about__content > *, .hero__content > *, .contact__content > *'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase para animación
                entry.target.classList.add('animate-in');
                
                // Opcional: Remover después de animar para optimización
                setTimeout(() => {
                    observer.unobserve(entry.target);
                }, 1000);
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos
    elementsToAnimate.forEach((element, index) => {
        // Configurar delay escalonado
        element.style.setProperty('--animation-delay', `${index * 0.1}s`);
        observer.observe(element);
    });
}

function setupSmoothScrolling() {
    // Smooth scroll para enlaces internos
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('href');
            scrollToSection(targetId);
        }
    });
    
    // Smooth scroll para botones con data-scroll-to
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-scroll-to]')) {
            e.preventDefault();
            const targetId = e.target.getAttribute('data-scroll-to');
            scrollToSection(targetId);
        }
    });
}

function scrollToSection(sectionId) {
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // Actualizar URL sin recargar la página
        history.pushState(null, null, sectionId);
    }
}

function setupParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    // Efecto parallax suave para el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// Efectos de aparición para elementos específicos
export function animateElements(elements, animationType = 'fadeInUp') {
    elements.forEach((element, index) => {
        element.style.animation = `${animationType} 0.6s ease forwards`;
        element.style.animationDelay = `${index * 0.1}s`;
        element.style.opacity = '0';
    });
}

// Función para reiniciar animaciones (útil después de filtros)
export function resetAnimations() {
    const animatedElements = document.querySelectorAll('.animate-in');
    animatedElements.forEach(element => {
        element.classList.remove('animate-in');
    });
    
    // Re-configurar observer
    setTimeout(() => {
        setupIntersectionObserver();
    }, 100);
}

// Efecto de escritura para el hero (opcional)
export function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            // Quitar cursor al finalizar
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Iniciar después de un delay
    setTimeout(typeWriter, 1000);
}