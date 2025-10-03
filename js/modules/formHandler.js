// js/modules/formHandler.js - Manejador de Formulario Formspree

export function initializeForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!contactForm || !submitBtn) {
        console.error('❌ No se encontró el formulario de contacto');
        return;
    }
    
    // IMPORTANTE: Configurar Formspree
    // 1. Ve a https://formspree.io/register 
    // 2. Crea una cuenta gratuita
    // 3. Confirma tu email
    // 4. Haz clic en "New Form"
    // 5. Completa el nombre (ej: "Portafolio Contact")
    // 6. Formspree generará un FORM ID único como: xdoqzqkr
    // 7. Reemplaza "your-form-id" en el HTML con tu ID real
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Añadir microinteracciones a los inputs
    setupFormInteractions();
    
    console.log('📝 Formulario de contacto inicializado');
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn__text');
    const btnLoader = submitBtn.querySelector('.btn__loader');
    
    // Mostrar estado de carga
    setButtonLoadingState(submitBtn, btnText, btnLoader, true);
    
    try {
        const formData = new FormData(form);
        
        // Enviar a Formspree
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
            form.reset();
            resetFormStyles();
        } else {
            throw new Error('Error en el servidor de Formspree');
        }
    } catch (error) {
        console.error('Error enviando formulario:', error);
        showNotification('Error al enviar el mensaje. Por favor, inténtalo nuevamente.', 'error');
    } finally {
        setButtonLoadingState(submitBtn, btnText, btnLoader, false);
    }
}

function setButtonLoadingState(button, text, loader, isLoading) {
    if (isLoading) {
        text.style.display = 'none';
        loader.style.display = 'block';
        button.disabled = true;
        button.style.opacity = '0.7';
        button.style.cursor = 'not-allowed';
    } else {
        text.style.display = 'block';
        loader.style.display = 'none';
        button.disabled = false;
        button.style.opacity = '1';
        button.style.cursor = 'pointer';
    }
}

function setupFormInteractions() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        // Efecto focus
        control.addEventListener('focus', () => {
            control.parentElement.classList.add('form-group--focused');
        });
        
        control.addEventListener('blur', () => {
            if (!control.value) {
                control.parentElement.classList.remove('form-group--focused');
            }
        });
        
        // Validación en tiempo real
        control.addEventListener('input', () => {
            validateField(control);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    
    // Remover estados previos
    formGroup.classList.remove('form-group--valid', 'form-group--invalid');
    
    if (!value) return;
    
    if (field.type === 'email') {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        formGroup.classList.add(isValid ? 'form-group--valid' : 'form-group--invalid');
    } else {
        formGroup.classList.add(value ? 'form-group--valid' : 'form-group--invalid');
    }
}

function resetFormStyles() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('form-group--focused', 'form-group--valid', 'form-group--invalid');
    });
}

function showNotification(message, type) {
    // Remover notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Estilos inline para garantizar funcionamiento
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '8px',
        zIndex: '10000',
        fontWeight: '500',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        animation: 'slideInRight 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}