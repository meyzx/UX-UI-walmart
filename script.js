// Contador global para el carrito
let cartItems = 0;

/**
 * Añadir productos al carrito
 */
function addToCart() {
    cartItems++;
    const badge = document.getElementById('cart-badge');
    
    if (badge) {
        badge.style.display = 'block';
        badge.innerText = cartItems;
        
        // Reiniciamos la animación de Animate.css para que "salte" cada vez
        badge.classList.remove('animate__bounceIn');
        void badge.offsetWidth; // Truco para resetear la animación en el navegador
        badge.classList.add('animate__bounceIn');
    }
    
    toast("¡Producto añadido al carrito!");
}

/**
 * Cambia el estado del botón de favoritos (Corazón)
 * @param {HTMLElement} el - El elemento que recibe el clic
 */
function toggleFavorite(el) {
    const icon = el.querySelector('i');
    
    el.classList.toggle('active');
    
    if (el.classList.contains('active')) {
        // Cambia de corazón vacío a lleno
        icon.classList.replace('far', 'fas');
        // Añade animación de latido de Animate.css
        el.classList.add('animate__animated', 'animate__heartBeat');
        
        // Limpia la clase después de que termine la animación
        setTimeout(() => el.classList.remove('animate__heartBeat'), 500);
        toast("Guardado en tus favoritos");
    } else {
        // Vuelve a corazón vacío
        icon.classList.replace('fas', 'far');
    }
}

/**
 * Muestra una notificación temporal tipo Toast
 * @param {string} message - El texto a mostrar
 */
function toast(message) {
    const t = document.getElementById('toast');
    if (t) {
        t.innerText = message;
        t.style.opacity = '1';
        
        // Desvanecer después de 2.5 segundos
        setTimeout(() => {
            t.style.opacity = '0';
        }, 2500);
    }
}

/**
 * Microinteracción: Escucha el scroll para animar la entrada de productos
 */
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Cuando el producto entra en pantalla, se desliza hacia arriba
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});
