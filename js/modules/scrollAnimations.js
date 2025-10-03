// js/modules/scrollAnimations.js - Animaciones al Scroll

export function setupScrollAnimations() {
    // Configurar progress bar de scroll
    setupScrollProgress();
    
    // Configurar observador de intersección para animaciones
    setupIntersectionObserver();
    
    // Configurar scroll suave para enlaces de navegación
    setupSmoothScrolling();
    
    // Configurar efecto parallax
    setupParallaxEffect();
    
    console.log('🎬 Animaciones de scroll configuradas');
}

function setupScrollProgress() {
    // Crear estilo para la progress bar
    const style = document.createElement('style');
    style.textContent = `
        .header::before {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: var(--scroll-progress, 0%);
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--primary-light));
            transition: width 0.1s ease;
            z-index: 1001;
        }
    `;
    document.head.appendChild(style);
    
    // Actualizar progress bar al hacer scroll
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const trackLength = docHeight - winHeight;
        const progress = (scrollTop / trackLength) * 100;
        
        document.documentElement.style.setProperty('--scroll-progress', `${progress}%`);
    });
}

function setupIntersectionObserver() {
    const animatedElements = document.querySelectorAll(
        '.section__title, .portfolio-item, .about__content > *'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                entry.target.style.opacity = '0';
                
                // Delay escalonado para elementos múltiples
                const delay = entry.target.dataset.delay || '0s';
                entry.target.style.animationDelay = delay;
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos los elementos animados
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.dataset.delay = `${index * 0.1}s`;
        observer.observe(element);
    });
}

function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú móvil si existe (para futura implementación)
                closeMobileMenu();
            }
        });
    });
}

function setupParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.3;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

function closeMobileMenu() {
    // Para futura implementación de menú móvil
    const mobileMenu = document.querySelector('.nav__menu--mobile');
    if (mobileMenu && mobileMenu.classList.contains('nav__menu--open')) {
        mobileMenu.classList.remove('nav__menu--open');
    }
}

// Efecto de máquina de escribir para el hero (opcional)
export function initTypewriterEffect() {
    const heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Iniciar después de un delay
    setTimeout(typeWriter, 1000);
}