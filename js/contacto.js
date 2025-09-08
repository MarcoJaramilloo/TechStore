// JavaScript específico para la página de contacto

// Función para enviar el formulario de contacto completo
function enviarFormularioContacto(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Convertir FormData a objeto
    const datos = {};
    for (let [key, value] of formData.entries()) {
        datos[key] = value;
    }
    
    // Validar formulario completo
    const errores = validarFormularioContactoCompleto(datos);
    
    if (errores.length > 0) {
        mostrarMensajeContacto(errores.join('<br>'), 'error');
        return;
    }
    
    // Simular envío del formulario
    const botonEnviar = form.querySelector('.btn-enviar-completo');
    const textoOriginal = botonEnviar.innerHTML;
    
    botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    botonEnviar.disabled = true;
    
    // Simular tiempo de procesamiento
    setTimeout(() => {
        // Simular respuesta exitosa
        mostrarMensajeContacto(
            `¡Gracias ${datos.nombre}! Tu mensaje ha sido enviado correctamente.<br>
            Te contactaremos en un máximo de 24 horas a ${datos.email}.`, 
            'success'
        );
        
        form.reset();
        actualizarContadorCaracteres();
        
        botonEnviar.innerHTML = textoOriginal;
        botonEnviar.disabled = false;
        
        // Log para propósitos educativos
        console.log('Datos del formulario de contacto enviados:', datos);
        
        // Enviar notificación por email (simulado)
        simularNotificacionEmail(datos);
        
    }, 2000);
}

// Función para validar el formulario de contacto completo
function validarFormularioContactoCompleto(datos) {
    const errores = [];
    
    // Validar nombre
    if (!datos.nombre || datos.nombre.trim().length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres');
    }
    
    // Validar apellido
    if (!datos.apellido || datos.apellido.trim().length < 2) {
        errores.push('El apellido debe tener al menos 2 caracteres');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!datos.email || !emailRegex.test(datos.email)) {
        errores.push('Por favor ingresa un email válido');
    }
    
    // Validar teléfono si se proporciona
    if (datos.telefono && !/^\d{10}$/.test(datos.telefono.replace(/\D/g, ''))) {
        errores.push('El teléfono debe tener 10 dígitos');
    }
    
    // Validar asunto
    if (!datos.asunto) {
        errores.push('Por favor selecciona un asunto');
    }
    
    // Validar mensaje
    if (!datos.mensaje || datos.mensaje.trim().length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    if (datos.mensaje && datos.mensaje.length > 1000) {
        errores.push('El mensaje no puede exceder 1000 caracteres');
    }
    
    // Validar términos y condiciones
    if (!datos.terminos) {
        errores.push('Debes aceptar los términos y condiciones');
    }
    
    return errores;
}

// Función para mostrar mensajes específicos de contacto
function mostrarMensajeContacto(mensaje, tipo) {
    // Remover mensajes existentes
    const mensajesExistentes = document.querySelectorAll('.success-message, .error-message');
    mensajesExistentes.forEach(msg => msg.remove());
    
    // Crear nuevo mensaje
    const div = document.createElement('div');
    div.className = tipo === 'success' ? 'success-message' : 'error-message';
    div.innerHTML = mensaje;
    
    // Insertar el mensaje en el formulario
    const formulario = document.querySelector('.contact-form-completo');
    if (formulario) {
        formulario.insertBefore(div, formulario.firstChild);
    }
    
    // Scroll al mensaje
    div.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Remover el mensaje después de 8 segundos para mensajes de éxito
    const timeout = tipo === 'success' ? 8000 : 6000;
    setTimeout(() => {
        if (div.parentNode) {
            div.remove();
        }
    }, timeout);
}

// Función para simular notificación por email
function simularNotificacionEmail(datos) {
    console.log('--- SIMULACIÓN DE EMAIL ---');
    console.log('Para: soporte@techstore.com');
    console.log('Asunto: Nuevo mensaje de contacto - ' + datos.asunto);
    console.log('De: ' + datos.nombre + ' ' + datos.apellido + ' (' + datos.email + ')');
    console.log('Prioridad: ' + datos.prioridad);
    console.log('Mensaje: ' + datos.mensaje);
    console.log('Teléfono: ' + (datos.telefono || 'No proporcionado'));
    console.log('Producto de interés: ' + (datos['producto-interes'] || 'Ninguno'));
    console.log('Newsletter: ' + (datos.newsletter ? 'Sí' : 'No'));
    console.log('Fecha: ' + new Date().toLocaleString());
    console.log('--- FIN DE EMAIL ---');
}

// Función para toggle de FAQ
function toggleFAQ(element) {
    const faqItem = element.parentNode;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('.fas');
    
    // Cerrar otros FAQs abiertos
    const otrosFAQs = document.querySelectorAll('.faq-item');
    otrosFAQs.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('.fas').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle del FAQ actual
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
    } else {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}

// Función para abrir el mapa
function abrirMapa() {
    const direccion = 'Av. Tecnología 123, Ciudad Tech, Ecuador';
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`;
    window.open(url, '_blank');
}

// Función para contador de caracteres del textarea
function actualizarContadorCaracteres() {
    const textarea = document.getElementById('mensaje');
    const contador = document.querySelector('.char-count');
    
    if (textarea && contador) {
        const caracteresActuales = textarea.value.length;
        const caracteresMaximos = 1000;
        
        contador.textContent = `${caracteresActuales}/${caracteresMaximos} caracteres`;
        
        // Cambiar color según proximidad al límite
        if (caracteresActuales > caracteresMaximos * 0.9) {
            contador.style.color = '#ff4757';
        } else if (caracteresActuales > caracteresMaximos * 0.7) {
            contador.style.color = '#ffa502';
        } else {
            contador.style.color = '#666';
        }
    }
}

// Función para validación en tiempo real específica de contacto
function configurarValidacionContacto() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampoContacto(this);
        });
        
        input.addEventListener('input', function() {
            if (this.id === 'mensaje') {
                actualizarContadorCaracteres();
            }
            
            if (this.classList.contains('error')) {
                validarCampoContacto(this);
            }
        });
    });
}

// Función para validar campos específicos de contacto
function validarCampoContacto(campo) {
    const valor = campo.value.trim();
    let esValido = true;
    let mensaje = '';
    
    // Limpiar clases previas
    campo.classList.remove('error', 'valid');
    
    // Remover mensajes de error previos
    const errorExistente = campo.parentNode.querySelector('.error-field-message');
    if (errorExistente) {
        errorExistente.remove();
    }
    
    // Validaciones específicas
    switch (campo.id) {
        case 'nombre':
        case 'apellido':
            if (campo.hasAttribute('required') && valor.length < 2) {
                esValido = false;
                mensaje = 'Debe tener al menos 2 caracteres';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor && !emailRegex.test(valor)) {
                esValido = false;
                mensaje = 'Email no válido';
            }
            break;
            
        case 'telefono':
            if (valor && !/^\d{10}$/.test(valor.replace(/\D/g, ''))) {
                esValido = false;
                mensaje = 'Debe tener 10 dígitos';
            }
            break;
            
        case 'mensaje':
            if (campo.hasAttribute('required') && valor.length < 10) {
                esValido = false;
                mensaje = 'Debe tener al menos 10 caracteres';
            } else if (valor.length > 1000) {
                esValido = false;
                mensaje = 'No puede exceder 1000 caracteres';
            }
            break;
            
        case 'asunto':
            if (campo.hasAttribute('required') && !valor) {
                esValido = false;
                mensaje = 'Selecciona un asunto';
            }
            break;
    }
    
    // Aplicar estilos y mensajes
    if (valor === '' && !campo.hasAttribute('required')) {
        // Campo opcional vacío - estado neutral
        return;
    } else if (valor === '' && campo.hasAttribute('required')) {
        // Campo requerido vacío
        campo.classList.add('error');
        return;
    } else if (esValido) {
        campo.classList.add('valid');
    } else {
        campo.classList.add('error');
        
        // Agregar mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-field-message';
        errorDiv.textContent = mensaje;
        campo.parentNode.appendChild(errorDiv);
    }
}

// Función para animaciones de las tarjetas de información
function animarTarjetasInfo() {
    const tarjetas = document.querySelectorAll('.info-card, .contacto-item-detalle, .social-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    tarjetas.forEach(tarjeta => {
        tarjeta.style.opacity = '0';
        tarjeta.style.transform = 'translateY(20px)';
        tarjeta.style.transition = 'all 0.6s ease';
        observer.observe(tarjeta);
    });
}

// Función para efectos hover en redes sociales
function configurarEfectosRedes() {
    const redesSociales = document.querySelectorAll('.social-link');
    
    redesSociales.forEach(red => {
        red.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        red.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicialización cuando se carga la página de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Configurar validación específica de contacto
    setTimeout(configurarValidacionContacto, 500);
    
    // Configurar contador de caracteres
    actualizarContadorCaracteres();
    
    // Animaciones
    setTimeout(animarTarjetasInfo, 1000);
    
    // Efectos de redes sociales
    configurarEfectosRedes();
    
    // Agregar estilos CSS específicos para contacto
    agregarEstilosContacto();
});

// Función para agregar estilos CSS específicos
function agregarEstilosContacto() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos específicos para la página de contacto */
        .info-contacto-principal {
            padding: 4rem 0;
            background-color: #f8f9fa;
        }
        
        .contacto-grid-principal {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: start;
        }
        
        .contacto-info h2 {
            font-size: 2.2rem;
            margin-bottom: 1rem;
            color: #333;
        }
        
        .contacto-detalles {
            margin: 2rem 0;
        }
        
        .contacto-item-detalle {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            margin-bottom: 2rem;
            padding: 1.5rem;
            background: white;
            border-radius: 10px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .contacto-item-detalle:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .contacto-item-detalle i {
            font-size: 1.8rem;
            color: #667eea;
            margin-top: 0.2rem;
        }
        
        .contacto-item-detalle h3 {
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .redes-sociales-contacto {
            margin-top: 2rem;
        }
        
        .redes-sociales-contacto h3 {
            margin-bottom: 1rem;
            color: #333;
        }
        
        .social-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
        }
        
        .social-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1rem;
            background: white;
            border-radius: 8px;
            text-decoration: none;
            color: #333;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        
        .social-link.facebook { border-left: 4px solid #1877f2; }
        .social-link.twitter { border-left: 4px solid #1da1f2; }
        .social-link.instagram { border-left: 4px solid #e4405f; }
        .social-link.youtube { border-left: 4px solid #ff0000; }
        .social-link.linkedin { border-left: 4px solid #0077b5; }
        .social-link.whatsapp { border-left: 4px solid #25d366; }
        
        .mapa-container {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            box-shadow: 0 5px 25px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .mapa-placeholder {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 2rem;
            border-radius: 10px;
            margin-top: 1rem;
        }
        
        .mapa-placeholder i {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: #ffd700;
        }
        
        .btn-direcciones {
            background: #ffd700;
            color: #333;
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-weight: bold;
            cursor: pointer;
            margin-top: 1rem;
            transition: all 0.3s ease;
        }
        
        .btn-direcciones:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
        }
        
        .formulario-contacto-completo {
            padding: 4rem 0;
        }
        
        .formulario-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 3rem;
        }
        
        .contact-form-completo {
            background: white;
            padding: 2.5rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        
        .info-adicional {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        
        .info-card {
            background: white;
            padding: 1.5rem;
            border-radius: 10px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.1);
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .info-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .info-card i {
            font-size: 2rem;
            color: #667eea;
            margin-bottom: 1rem;
        }
        
        .info-card h3 {
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .char-count {
            font-size: 0.8rem;
            color: #666;
            float: right;
            margin-top: 0.2rem;
        }
        
        .error-field-message {
            color: #ff4757;
            font-size: 0.8rem;
            margin-top: 0.3rem;
        }
        
        .faq-section {
            padding: 4rem 0;
            background-color: #f8f9fa;
        }
        
        .faq-grid {
            max-width: 800px;
            margin: 0 auto;
        }
        
        .faq-item {
            background: white;
            margin-bottom: 1rem;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .faq-question {
            padding: 1.5rem;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: white;
            transition: background-color 0.3s ease;
        }
        
        .faq-question:hover {
            background-color: #f8f9fa;
        }
        
        .faq-question h3 {
            margin: 0;
            color: #333;
        }
        
        .faq-question i {
            color: #667eea;
            transition: transform 0.3s ease;
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
        }
        
        .faq-answer p {
            padding: 0 1.5rem 1.5rem;
            margin: 0;
            color: #666;
            line-height: 1.6;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .contacto-grid-principal,
            .formulario-grid {
                grid-template-columns: 1fr;
            }
            
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .social-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}

// Exportar funciones para uso global
window.enviarFormularioContacto = enviarFormularioContacto;
window.toggleFAQ = toggleFAQ;
window.abrirMapa = abrirMapa;
