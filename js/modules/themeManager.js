// js/modules/themeManager.js - Gestor de Tema Dark/Light

export function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    // Aplicar tema guardado al cargar
    applyTheme(currentTheme);
    updateToggleButton(themeToggle, currentTheme);

    // Configurar evento click
    themeToggle.addEventListener('click', toggleTheme);
    
    console.log('🎨 Gestor de tema inicializado');
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Aplicar transición suave
    document.documentElement.style.transition = 'all 0.3s ease';
    
    // Cambiar tema
    applyTheme(newTheme);
    
    // Guardar preferencia
    localStorage.setItem('portfolio-theme', newTheme);
    
    // Actualizar botón con microinteracción
    const themeToggle = document.getElementById('themeToggle');
    updateToggleButton(themeToggle, newTheme);
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

function updateToggleButton(button, theme) {
    // Microinteracción: animación del botón
    button.style.transform = 'scale(1.1)';
    
    // Cambiar icono según el tema
    button.innerHTML = theme === 'light' ? '🌙' : '☀️';
    button.setAttribute('aria-label', 
        theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'
    );
    
    // Restaurar escala después de la animación
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}