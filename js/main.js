// js/main.js - VERSIÓN CORREGIDA Y DEFINITIVA
import { initializeThemeToggle } from './modules/themeManager.js';
import { loadProjects } from './modules/projectLoader.js';
import { initializeForm } from './modules/formHandler.js';
import { setupScrollAnimations } from './modules/scrollAnimations.js';

function initPortfolio() {
    console.log('🚀 Inicializando portafolio...');
    
    // Inicializar todos los módulos
    initializeThemeToggle();
    loadProjects();
    initializeForm();
    setupScrollAnimations();

    // Configurar botón de ver proyectos
    const viewProjectsBtn = document.getElementById("viewProjectsBtn");
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', () => {
            document.getElementById('proyectos').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    console.log('✅ Portafolio inicializado correctamente');
}

// CORRECCIÓN - Esta parte debe estar FUERA de la función
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}

// Exportar para uso externo si es necesario
export { initPortfolio };