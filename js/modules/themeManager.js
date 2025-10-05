// js/modules/themeManager.js - VERSIÓN MEJORADA
export function initializeThemeToggle() {
    console.log('🎨 Inicializando gestor de temas...');
    
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = getSavedTheme();
    
    // Aplicar tema guardado al cargar
    applyTheme(currentTheme);
    updateToggleButton(themeToggle, currentTheme);
    
    // Configurar evento click
    themeToggle.addEventListener('click', handleThemeToggle);
    
    // Configurar microinteracciones
    setupThemeInteractions(themeToggle);
    
    // Escuchar cambios de tema del sistema (opcional)
    listenToSystemTheme();
    
    console.log('✅ Gestor de temas inicializado correctamente');
}

function getSavedTheme() {
    // Intentar obtener tema guardado
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme) {
        return savedTheme;
    }
    
    // Si no hay tema guardado, detectar preferencia del sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    // Tema por defecto
    return 'light';
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
    // Microinteracción: animación del botón
    button.style.transform = 'scale(1.1)';
    
    // Cambiar icono y texto según el tema
    const isDark = theme === 'dark';
    button.innerHTML = isDark ? '☀️' : '🌙';
    button.setAttribute('aria-label', 
        isDark ? 'Activar modo claro' : 'Activar modo oscuro'
    );
    button.setAttribute('title', 
        isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
    
    // Restaurar escala después de la animación
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