// js/modules/formHandler.js - VERSIÓN NUEVA Y CORREGIDA
export function initializeForm() {
    console.log('📝 Inicializando formulario de contacto...');
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!contactForm || !submitBtn) {
        console.error('❌ No se encontró el formulario o botón de envío');
        return;
    }

    // ✅ CONFIGURACIÓN FORMSPREE - TU ID REAL
    const FORMSPREE_ID = 'mmpgzpxj';
    contactForm.action = `https://formspree.io/f/${FORMSPREE_ID}`;
    
    console.log('✅ Formspree configurado con ID:', FORMSPREE_ID);

    // Configurar evento de envío
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Configurar interacciones del formulario
    setupFormInteractions();
    
    console.log('✅ Formulario inicializado correctamente');
}

// Función principal de envío
async function handleFormSubmit(event) {
    event.preventDefault();
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
        showNotification('Por favor, corrige los errores en el formulario.', 'error');
        return;
    }
    
    // Mostrar estado de carga
    setSubmitButtonState('loading');
    
    try {
        const formData = new FormData(contactForm);
        
        console.log('📤 Enviando formulario a Formspree...');
        
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('✅ Formulario enviado con éxito');
            showNotification('¡Mensaje enviado con éxito! Te contactaré en menos de 24 horas.', 'success');
            contactForm.reset();
            resetFormStyles();
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error('❌ Error enviando formulario:', error);
        showNotification('Error al enviar el mensaje. Por favor, inténtalo nuevamente o contáctame directamente por email.', 'error');
    } finally {
        setSubmitButtonState('idle');
    }
}

// Configurar interacciones del formulario
function setupFormInteractions() {
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(control => {
        // Efecto focus
        control.addEventListener('focus', function() {
            this.parentElement.classList.add('form-group--focused');
        });
        
        control.addEventListener('blur', function() {
            this.parentElement.classList.remove('form-group--focused');
            
            // Marcar como lleno si tiene valor
            if (this.value) {
                this.parentElement.classList.add('form-group--filled');
            } else {
                this.parentElement.classList.remove('form-group--filled');
            }
        });

        // Validación en tiempo real
        control.addEventListener('input', function() {
            validateField(this);
        });
        
        // Inicializar estado de campos con valores
        if (control.value) {
            control.parentElement.classList.add('form-group--filled');
        }
    });
}

// Validar todo el formulario
function validateForm() {
    let isValid = true;
    const contactForm = document.getElementById('contactForm');
    const requiredFields = contactForm.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

// Validar campo individual
function validateField(field) {
    const value = field.value.trim();
    const formGroup = field.parentElement;
    
    // Limpiar estados previos
    formGroup.classList.remove('form-group--valid', 'form-group--invalid');
    clearFieldError(field);
    
    // Validar campo requerido
    if (field.hasAttribute('required') && !value) {
        formGroup.classList.add('form-group--invalid');
        showFieldError(field, 'Este campo es requerido');
        return false;
    }
    
    // Validar email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('form-group--invalid');
            showFieldError(field, 'Por favor, ingresa un email válido');
            return false;
        }
    }
    
    // Validar longitud mínima del mensaje
    if (field.name === 'message' && value.length > 0 && value.length < 10) {
        formGroup.classList.add('form-group--invalid');
        showFieldError(field, 'El mensaje debe tener al menos 10 caracteres');
        return false;
    }
    
    // Si pasa todas las validaciones
    if (value) {
        formGroup.classList.add('form-group--valid');
    }
    
    return true;
}

// Controlar estado del botón de envío
function setSubmitButtonState(state) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn__text');
    const btnLoader = submitBtn.querySelector('.btn__loader');
    
    if (state === 'loading') {
        btnText.style.display = 'none';
        btnLoader.style.display = 'flex';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
    } else {
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    }
}

// Mostrar error en campo específico
function showFieldError(field, message) {
    let errorElement = field.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        field.parentElement.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Limpiar error de campo
function clearFieldError(field) {
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Mostrar notificación al usuario
function showNotification(message, type) {
    // Eliminar notificación existente
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__icon">${type === 'success' ? '✅' : '❌'}</span>
            <span class="notification__message">${message}</span>
        </div>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar con animación
    setTimeout(() => {
        notification.classList.add('notification--visible');
    }, 100);
    
    // Auto-eliminar después de 6 segundos
    setTimeout(() => {
        notification.classList.remove('notification--visible');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 6000);
}

// Resetear estilos del formulario
function resetFormStyles() {
    const contactForm = document.getElementById('contactForm');
    const formGroups = contactForm.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        group.classList.remove(
            'form-group--focused', 
            'form-group--filled', 
            'form-group--valid', 
            'form-group--invalid'
        );
    });
    
    // Limpiar todos los errores
    const errorElements = contactForm.querySelectorAll('.field-error');
    errorElements.forEach(error => {
        error.style.display = 'none';
    });
}

// Función para obtener datos del formulario (útil para debugging)
function getFormData() {
    const contactForm = document.getElementById('contactForm');
    const formData = new FormData(contactForm);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    return data;
}

// Exportar funciones adicionales si es necesario
export { validateForm, getFormData, showNotification };