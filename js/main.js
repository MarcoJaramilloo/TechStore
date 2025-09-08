// Variables globales
let carrito = [];
let productos = [];

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarProductos();
    configurarFiltros();
    configurarBuscador();
    mostrarCarrito();
});

// Función para inicializar los productos
function inicializarProductos() {
    productos = [
        {
            id: 1,
            nombre: 'MOTOROLA MOTO RAZR 60',
            precio: 1039.99,
            categoria: 'celulares',
            descripcion: 'Teléfono plegable XT2553-1 DS, 12GB+512GB, color azul. Innovación y estilo únicos.'
        },
        {
            id: 2,
            nombre: 'CELULAR HONOR 400 LITE',
            precio: 379.99,
            categoria: 'celulares',
            descripcion: '12GB+256GB Negro, Display 3500 nits, Cámara frontal 108MP+5MP. Calidad excepcional.'
        },
        {
            id: 3,
            nombre: 'LAPTOP HP AMD R5-7520U',
            precio: 599.99,
            categoria: 'laptops',
            descripcion: '2.8GHz, 16GB RAM, 512GB SSD, Moonlight Blue, 15.6" FHD, FreeDOS'
        },
        {
            id: 4,
            nombre: 'LAPTOP ASUS TUF GAMING A15',
            precio: 1099.99,
            categoria: 'laptops',
            descripcion: 'R5-7535HS 3.3GHz, 16GB RAM, 512GB SSD, RTX 3050 4GB, Black, 15.6" FHD'
        },
        {
            id: 5,
            nombre: 'BROTHER T730DW MULTIFUNCIÓN',
            precio: 349.99,
            categoria: 'impresoras',
            descripcion: 'Impresora tinta continua con WiFi, dúplex automático, ADF y velocidad de 20PPM'
        },
        {
            id: 6,
            nombre: 'EPSON ECOTANK L8050',
            precio: 539.99,
            categoria: 'impresoras',
            descripcion: 'Impresora fotográfica de tinta continua, ideal para impresión profesional de alta calidad'
        },
        {
            id: 7,
            nombre: 'MOUSE LOGITECH G502 HERO',
            precio: 54.99,
            categoria: 'accesorios',
            descripcion: 'Mouse gamer alámbrico con 11 botones, USB, color negro. Precisión y rendimiento profesional.'
        },
        {
            id: 8,
            nombre: 'MOUSE PRIMUS GAMING',
            precio: 19.99,
            categoria: 'accesorios',
            descripcion: 'Mouse gamer alámbrico con 8 botones USB. Diseño ergonómico y gran relación calidad-precio.'
        }
    ];
}

// Función para scroll suave a productos
function scrollToProducts() {
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });
}

// Función para agregar productos al carrito
function agregarCarrito(nombre, precio) {
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }
    
    // Mostrar mensaje de confirmación
    mostrarMensaje(`${nombre} agregado al carrito`, 'success');
    
    // Actualizar el carrito
    mostrarCarrito();
    
    // Animación del botón
    const botones = document.querySelectorAll('.btn-agregar');
    botones.forEach(boton => {
        if (boton.textContent.includes(nombre.split(' ')[0])) {
            boton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                boton.style.transform = 'scale(1)';
            }, 150);
        }
    });
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carritoIcon = document.querySelector('.fa-shopping-cart');
    const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    // Actualizar el icono del carrito con el número de items
    if (totalItems > 0) {
        carritoIcon.style.position = 'relative';
        carritoIcon.setAttribute('data-count', totalItems);
        
        // Agregar estilos CSS para el contador si no existen
        if (!document.querySelector('#carrito-counter-style')) {
            const style = document.createElement('style');
            style.id = 'carrito-counter-style';
            style.textContent = `
                .fa-shopping-cart[data-count]:after {
                    content: attr(data-count);
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff4757;
                    color: white;
                    border-radius: 50%;
                    padding: 2px 6px;
                    font-size: 0.7rem;
                    font-weight: bold;
                    min-width: 18px;
                    text-align: center;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    console.log('Carrito actual:', carrito);
}

// Función para configurar los filtros de productos
function configurarFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    const productos = document.querySelectorAll('.producto-card');
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Remover clase active de todos los filtros
            filtros.forEach(f => f.classList.remove('active'));
            
            // Agregar clase active al filtro clickeado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-filtro');
            
            // Scroll suave a la sección de productos
            document.getElementById('productos').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Delay para que el scroll termine antes de filtrar
            setTimeout(() => {
                // Filtrar productos
                productos.forEach(producto => {
                    if (categoria === 'todos' || producto.getAttribute('data-categoria') === categoria) {
                        producto.style.display = 'block';
                        producto.classList.remove('hidden');
                    } else {
                        producto.style.display = 'none';
                        producto.classList.add('hidden');
                    }
                });
                
                // Animación de entrada
                setTimeout(() => {
                    const productosVisibles = document.querySelectorAll('.producto-card:not(.hidden)');
                    productosVisibles.forEach((producto, index) => {
                        producto.style.opacity = '0';
                        producto.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            producto.style.transition = 'all 0.3s ease';
                            producto.style.opacity = '1';
                            producto.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }, 50);
            }, 300); // Delay de 300ms para que termine el scroll
        });
    });
}

// Función para configurar el buscador
function configurarBuscador() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', function() {
        const termino = this.value.toLowerCase();
        const productos = document.querySelectorAll('.producto-card');
        
        productos.forEach(producto => {
            const nombre = producto.querySelector('h3').textContent.toLowerCase();
            const descripcion = producto.querySelector('.producto-descripcion').textContent.toLowerCase();
            
            if (nombre.includes(termino) || descripcion.includes(termino)) {
                producto.style.display = 'block';
                producto.classList.remove('hidden');
            } else {
                producto.style.display = 'none';
                producto.classList.add('hidden');
            }
        });
        
        // Si no hay término de búsqueda, mostrar todos los productos
        if (termino === '') {
            productos.forEach(producto => {
                producto.style.display = 'block';
                producto.classList.remove('hidden');
            });
        }
    });
}

// Función para buscar productos (llamada desde el botón)
function buscarProductos() {
    const searchInput = document.getElementById('searchInput');
    const termino = searchInput.value.toLowerCase().trim();
    
    if (termino === '') {
        mostrarMensaje('Por favor ingresa un término de búsqueda', 'error');
        return;
    }
    
    const productos = document.querySelectorAll('.producto-card');
    let encontrados = 0;
    
    productos.forEach(producto => {
        const nombre = producto.querySelector('h3').textContent.toLowerCase();
        const descripcion = producto.querySelector('.producto-descripcion').textContent.toLowerCase();
        
        if (nombre.includes(termino) || descripcion.includes(termino)) {
            producto.style.display = 'block';
            producto.classList.remove('hidden');
            encontrados++;
        } else {
            producto.style.display = 'none';
            producto.classList.add('hidden');
        }
    });
    
    // Scroll a la sección de productos
    document.getElementById('productos').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Mostrar mensaje de resultados
    if (encontrados === 0) {
        mostrarMensaje(`No se encontraron productos para "${termino}"`, 'error');
    } else {
        mostrarMensaje(`Se encontraron ${encontrados} producto(s) para "${termino}"`, 'success');
    }
}

// Función para validar el formulario
function validarFormulario(formData) {
    const errores = [];
    
    // Validar nombre
    if (formData.nombre.length < 2) {
        errores.push('El nombre debe tener al menos 2 caracteres');
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        errores.push('Por favor ingresa un email válido');
    }
    
    // Validar teléfono si se proporciona
    if (formData.telefono && !/^\d{10}$/.test(formData.telefono.replace(/\D/g, ''))) {
        errores.push('El teléfono debe tener 10 dígitos');
    }
    
    // Validar mensaje
    if (formData.mensaje.length < 10) {
        errores.push('El mensaje debe tener al menos 10 caracteres');
    }
    
    return errores;
}

// Función para enviar el formulario
function enviarFormulario(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Convertir FormData a objeto
    const datos = {};
    for (let [key, value] of formData.entries()) {
        datos[key] = value;
    }
    
    // Validar formulario
    const errores = validarFormulario(datos);
    
    if (errores.length > 0) {
        mostrarMensaje(errores.join('<br>'), 'error');
        return;
    }
    
    // Simular envío del formulario
    const botonEnviar = form.querySelector('.btn-enviar');
    const textoOriginal = botonEnviar.innerHTML;
    
    botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    botonEnviar.disabled = true;
    
    setTimeout(() => {
        // Simular respuesta exitosa
        mostrarMensaje('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        form.reset();
        
        botonEnviar.innerHTML = textoOriginal;
        botonEnviar.disabled = false;
        
        // Log para propósitos educativos
        console.log('Datos del formulario enviados:', datos);
    }, 2000);
}

// Función para mostrar mensajes
function mostrarMensaje(mensaje, tipo) {
    // Remover mensajes existentes
    const mensajesExistentes = document.querySelectorAll('.success-message, .error-message');
    mensajesExistentes.forEach(msg => msg.remove());
    
    // Crear nuevo mensaje
    const div = document.createElement('div');
    div.className = tipo === 'success' ? 'success-message' : 'error-message';
    div.innerHTML = mensaje;
    
    // Insertar el mensaje en el formulario o en el top de la página
    const formulario = document.querySelector('.contact-form');
    if (formulario) {
        formulario.insertBefore(div, formulario.firstChild);
    } else {
        document.body.insertBefore(div, document.body.firstChild);
    }
    
    // Remover el mensaje después de 5 segundos
    setTimeout(() => {
        div.remove();
    }, 5000);
}

// Función para animaciones de scroll
function animarElementosEnScroll() {
    const elementos = document.querySelectorAll('.producto-card, .contacto-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elementos.forEach(elemento => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(20px)';
        elemento.style.transition = 'all 0.6s ease';
        observer.observe(elemento);
    });
}

// Función para manejar el carrito (click en el icono)
function toggleCarrito() {
    if (carrito.length === 0) {
        mostrarMensaje('Tu carrito está vacío', 'error');
        return;
    }
    
    let carritoHTML = '<div class="carrito-modal"><div class="carrito-content"><h3>Tu Carrito</h3>';
    let total = 0;
    
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        carritoHTML += `
            <div class="carrito-item">
                <span>${item.nombre}</span>
                <span>$${item.precio} x ${item.cantidad} = $${subtotal}</span>
            </div>
        `;
    });
    
    carritoHTML += `
        <div class="carrito-total">Total: $${total}</div>
        <button onclick="cerrarCarrito()">Cerrar</button>
        <button onclick="vaciarCarrito()">Vaciar Carrito</button>
        </div></div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', carritoHTML);
}

// Función para cerrar el carrito
function cerrarCarrito() {
    const modal = document.querySelector('.carrito-modal');
    if (modal) {
        modal.remove();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
    cerrarCarrito();
    mostrarMensaje('Carrito vaciado', 'success');
}

// Event listeners adicionales
document.addEventListener('DOMContentLoaded', function() {
    // Agregar event listener al icono del carrito
    const carritoIcon = document.querySelector('.fa-shopping-cart');
    if (carritoIcon) {
        carritoIcon.addEventListener('click', toggleCarrito);
        carritoIcon.style.cursor = 'pointer';
    }
    
    // Inicializar animaciones
    setTimeout(animarElementosEnScroll, 500);
    
    // Agregar estilos para el modal del carrito
    const style = document.createElement('style');
    style.textContent = `
        .carrito-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
        }
        
        .carrito-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        
        .carrito-item {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #eee;
        }
        
        .carrito-total {
            font-weight: bold;
            font-size: 1.2rem;
            margin: 1rem 0;
            text-align: center;
            color: #667eea;
        }
        
        .carrito-content button {
            margin: 0.5rem;
            padding: 0.8rem 1.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: bold;
        }
        
        .carrito-content button:first-of-type {
            background: #667eea;
            color: white;
        }
        
        .carrito-content button:last-of-type {
            background: #ff4757;
            color: white;
        }
    `;
    document.head.appendChild(style);
});

// Función para validación en tiempo real
function validacionEnTiempoReal() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validarCampo(this);
            }
        });
    });
}

// Función para validar un campo individual
function validarCampo(campo) {
    const valor = campo.value.trim();
    let esValido = true;
    let mensaje = '';
    
    // Limpiar clases previas
    campo.classList.remove('error', 'valid');
    
    // Validaciones específicas
    switch (campo.type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (valor && !emailRegex.test(valor)) {
                esValido = false;
                mensaje = 'Email no válido';
            }
            break;
        case 'tel':
            if (valor && !/^\d{10}$/.test(valor.replace(/\D/g, ''))) {
                esValido = false;
                mensaje = 'Teléfono debe tener 10 dígitos';
            }
            break;
        case 'text':
            if (campo.hasAttribute('required') && valor.length < 2) {
                esValido = false;
                mensaje = 'Debe tener al menos 2 caracteres';
            }
            break;
    }
    
    // Aplicar estilos
    if (valor === '') {
        // Campo vacío - estado neutral
        return;
    } else if (esValido) {
        campo.classList.add('valid');
    } else {
        campo.classList.add('error');
    }
}

// Inicializar validación en tiempo real cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(validacionEnTiempoReal, 1000);
});

// Función para efectos de hover mejorados
function efectosInteractivos() {
    // Efecto parallax suave en el hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Efecto de typewriter para el título principal
    const titulo = document.querySelector('.hero-content h2');
    if (titulo) {
        const texto = titulo.textContent;
        titulo.textContent = '';
        titulo.style.borderRight = '2px solid #ffd700';
        
        let i = 0;
        function typeWriter() {
            if (i < texto.length) {
                titulo.textContent += texto.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                titulo.style.borderRight = 'none';
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
}

// Inicializar efectos interactivos
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(efectosInteractivos, 2000);
});

// Exportar funciones para uso global
window.scrollToProducts = scrollToProducts;
window.agregarCarrito = agregarCarrito;
window.buscarProductos = buscarProductos;
window.enviarFormulario = enviarFormulario;
