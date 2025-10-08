// js/modules/themeManager.js - VERSIÓN MEJORADA
export function initializeThemeToggle() {
    console.log('🎨 Inicializando gestor de temas...');
    
    // Asegurar botón principal en header
    const headerToggle = document.getElementById('themeToggle');

    // Inyectar botón adicional en el hero si existe el contenedor
    let heroToggle = document.getElementById('themeToggleHero');
    const heroButtons = document.querySelector('.hero__buttons');
    if (!heroToggle && heroButtons) {
        heroToggle = document.createElement('button');
        heroToggle.id = 'themeToggleHero';
        heroToggle.className = 'btn btn--secondary';
        heroToggle.type = 'button';
        heroToggle.setAttribute('aria-label', 'Cambiar tema');
        heroButtons.appendChild(heroToggle);
    }

    const toggles = [headerToggle, heroToggle].filter(Boolean);
    const currentTheme = getSavedTheme();

    // Aplicar tema inicial (oscuro por defecto si no hay preferencia)
    applyTheme(currentTheme);
    toggles.forEach(btn => updateToggleButton(btn, currentTheme));

    // Configurar eventos
    toggles.forEach(btn => {
        btn.addEventListener('click', handleThemeToggle);
        setupThemeInteractions(btn);
    });

    // Escuchar cambios de tema del sistema (opcional)
    listenToSystemTheme();
    
    console.log('✅ Gestor de temas inicializado correctamente');
}

function getSavedTheme() {
    // 1) Preferencia guardada
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) return savedTheme;

    // 2) Si el HTML ya tiene data-theme, respetarlo
    const attrTheme = document.documentElement.getAttribute('data-theme');
    if (attrTheme) return attrTheme;

    // 3) Preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    // 4) Por defecto: oscuro para descanso visual
    return 'dark';
}

function handleThemeToggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Aplicar transición suave
    document.documentElement.style.transition = 'all 0.3s ease';
    
    // Cambiar tema
    applyTheme(newTheme);
    
    // Guardar preferencia
    saveTheme(newTheme);
    
    // Actualizar botón con microinteracción
    const themeToggle = document.getElementById('themeToggle');
    updateToggleButton(themeToggle, newTheme);
    
    // Disparar evento personalizado
    dispatchThemeChangeEvent(newTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Actualizar meta theme-color para navegadores móviles
    updateMetaThemeColor(theme);
    
    console.log(`🎨 Tema aplicado: ${theme}`);
}

function updateToggleButton(button, theme) {
    if (!button) return;
    // Microinteracción: animación del botón
    button.style.transform = 'scale(1.1)';

    const isDark = theme === 'dark';

    // Si es el botón del hero (estilo textual), muestra texto claro
    if (button.id === 'themeToggleHero' || button.classList.contains('btn')) {
        button.textContent = isDark ? 'Modo: Claro' : 'Modo: Oscuro';
    } else {
        // Botón compacto del header (emoji)
        button.innerHTML = isDark ? '☀️' : '🌙';
    }

    button.setAttribute('aria-label', isDark ? 'Activar modo claro' : 'Activar modo oscuro');
    button.setAttribute('title', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');

    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

function saveTheme(theme) {
    try {
        localStorage.setItem('portfolio-theme', theme);
        console.log('💾 Tema guardado en localStorage:', theme);
    } catch (error) {
        console.error('❌ Error guardando tema:', error);
    }
}

function setupThemeInteractions(button) {
    // Efecto hover mejorado
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1) rotate(12deg)';
        button.style.transition = 'all 0.2s ease';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Efecto de pulsación al hacer click
    button.addEventListener('mousedown', () => {
        button.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', () => {
        button.style.transform = 'scale(1.1)';
    });
}

function updateMetaThemeColor(theme) {
    // Buscar o crear meta tag para theme-color
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    // Actualizar color basado en el tema
    const color = theme === 'dark' ? '#111827' : '#ffffff';
    metaThemeColor.content = color;
}

function listenToSystemTheme() {
    // Escuchar cambios en la preferencia del sistema
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        mediaQuery.addEventListener('change', (e) => {
            // Solo cambiar si no hay preferencia guardada
            const savedTheme = localStorage.getItem('portfolio-theme');
            
            if (!savedTheme) {
                const newTheme = e.matches ? 'dark' : 'light';
                applyTheme(newTheme);
                updateToggleButton(document.getElementById('themeToggle'), newTheme);
                console.log('🔄 Tema cambiado según preferencia del sistema:', newTheme);
            }
        });
    }
}

function dispatchThemeChangeEvent(theme) {
    // Disparar evento personalizado para que otros módulos puedan reaccionar
    const event = new CustomEvent('themeChanged', {
        detail: { theme }
    });
    document.dispatchEvent(event);
}

// Función para obtener el tema actual
export function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
}

// Función para forzar un tema específico (útil para testing)
export function setTheme(theme) {
    if (theme === 'light' || theme === 'dark') {
        applyTheme(theme);
        saveTheme(theme);
        updateToggleButton(document.getElementById('themeToggle'), theme);
    } else {
        console.warn('⚠️ Tema no válido. Usa "light" o "dark"');
    }
}

// Función para alternar tema programáticamente
export function toggleTheme() {
    handleThemeToggle();
}