document.addEventListener('DOMContentLoaded', function() {
    // ===== CARRUSEL DE PRODUCTOS =====
    const carrusel = document.querySelector('.carrusel-productos');
    const productos = document.querySelectorAll('.producto');
    const puntos = document.querySelector('.puntos');
    const flechaIzquierda = document.querySelector('.flecha.izquierda');
    const flechaDerecha = document.querySelector('.flecha.derecha');
    let indiceActual = 0;
    
    // Crear puntos de navegación
    productos.forEach((_, index) => {
        const punto = document.createElement('span');
        if (index === 0) punto.classList.add('activo');
        punto.addEventListener('click', () => moverCarrusel(index));
        puntos.appendChild(punto);
    });
    
    // Eventos de flechas
    flechaDerecha.addEventListener('click', () => {
        indiceActual = (indiceActual + 1) % productos.length;
        moverCarrusel(indiceActual);
    });
    
    flechaIzquierda.addEventListener('click', () => {
        indiceActual = (indiceActual - 1 + productos.length) % productos.length;
        moverCarrusel(indiceActual);
    });
    
    // Función para mover el carrusel
    function moverCarrusel(indice) {
        const productoAncho = productos[0].offsetWidth + 30; // Ancho + gap
        carrusel.scrollTo({
            left: indice * productoAncho,
            behavior: 'smooth'
        });
        
        // Actualizar puntos activos
        document.querySelectorAll('.puntos span').forEach((punto, i) => {
            punto.classList.toggle('activo', i === indice);
        });
    }
    
    // Autoplay para carrusel de productos
    let intervaloProductos = setInterval(() => {
        indiceActual = (indiceActual + 1) % productos.length;
        moverCarrusel(indiceActual);
    }, 5000);
    
    // Pausar autoplay al interactuar
    carrusel.addEventListener('mouseenter', () => clearInterval(intervaloProductos));
    carrusel.addEventListener('mouseleave', () => {
        intervaloProductos = setInterval(() => {
            indiceActual = (indiceActual + 1) % productos.length;
            moverCarrusel(indiceActual);
        }, 5000);
    });
    
    // ===== TESTIMONIOS VERTICALES =====
    const testimonios = document.querySelectorAll('.testimonio');
    const puntosTestimonio = document.querySelector('.puntos-testimonio');
    let testimonioActual = 0;
    let intervaloTestimonios;
    
    // Crear puntos de navegación
    testimonios.forEach((_, index) => {
        const punto = document.createElement('span');
        if (index === 0) punto.classList.add('activo');
        punto.addEventListener('click', () => cambiarTestimonio(index));
        puntosTestimonio.appendChild(punto);
    });
    
    // Eventos de flechas
    document.querySelector('.flecha-testimonio.izquierda').addEventListener('click', () => {
        cambiarTestimonio((testimonioActual - 1 + testimonios.length) % testimonios.length);
    });
    
    document.querySelector('.flecha-testimonio.derecha').addEventListener('click', () => {
        cambiarTestimonio((testimonioActual + 1) % testimonios.length);
    });
    
    // Función para cambiar testimonio
    function cambiarTestimonio(index) {
        // Ocultar testimonio actual
        const testimonioActivo = document.querySelector('.testimonio.activo');
        if (testimonioActivo) {
            testimonioActivo.classList.remove('activo');
            testimonioActivo.classList.add('saliendo');
            
            setTimeout(() => {
                testimonioActivo.classList.remove('saliendo');
            }, 800);
        }
        
        // Mostrar nuevo testimonio
        testimonios[index].classList.add('activo');
        testimonioActual = index;
        
        // Actualizar puntos
        document.querySelectorAll('.puntos-testimonio span').forEach((punto, i) => {
            punto.classList.toggle('activo', i === testimonioActual);
        });
        
        reiniciarAutoplayTestimonios();
    }
    
    // Autoplay para testimonios
    function iniciarAutoplayTestimonios() {
        intervaloTestimonios = setInterval(() => {
            cambiarTestimonio((testimonioActual + 1) % testimonios.length);
        }, 4000);
    }
    
    function reiniciarAutoplayTestimonios() {
        clearInterval(intervaloTestimonios);
        iniciarAutoplayTestimonios();
    }
    
    // Iniciar autoplay
    iniciarAutoplayTestimonios();
    
    // Pausar al interactuar
    testimonios.forEach(testimonio => {
        testimonio.addEventListener('mouseenter', () => {
            clearInterval(intervaloTestimonios);
        });
        
        testimonio.addEventListener('mouseleave', () => {
            reiniciarAutoplayTestimonios();
        });
    });
    
    // Mostrar primer testimonio
    cambiarTestimonio(0);
    
    // ===== VALIDACIÓN DE FORMULARIO =====
    const formulario = document.querySelector('.formulario-contacto');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación simple
            const nombre = this.querySelector('input[type="text"]');
            const email = this.querySelector('input[type="email"]');
            const mensaje = this.querySelector('textarea');
            
            if (nombre.value && email.value && mensaje.value) {
                alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
                this.reset();
            } else {
                alert('Por favor completa todos los campos.');
            }
        });
    }
});