
// --- ESTADO GLOBAL Y CONFIGURACIÓN ---
let cartItems = 0;
const mainContent = document.getElementById('main-content');


const homeView = `
    <div class="welcome-banner animate__animated animate__fadeIn">
        <h2>Bienvenido a Walmart</h2>
    </div>

    <section class="container categories-section">
        <div class="category-grid">
            <div class="cat-item"><div class="cat-img ahorro"></div><p>Ahorro</p></div>
            <div class="cat-item"><div class="cat-img flash"></div><p>Flash Deals</p></div>
            <div class="cat-item"><div class="cat-img marcas"></div><p>Nuestras Marcas</p></div>
            <div class="cat-item"><div class="cat-img pass"></div><p>Walmart Pass</p></div>
            <div class="cat-item"><div class="cat-img super"></div><p>Súper</p></div>
            <div class="cat-item"><div class="cat-img prichos"></div><p>Prichos</p></div>
            <div class="cat-item"><div class="cat-img goleada"></div><p>Goleada</p></div>
            <div class="cat-item"><div class="cat-img express"></div><p>Walmart Express</p></div>
        </div>
    </section>

    <div class="blue-divider">Tus Favoritos</div>
    <section class="container product-section">
        <div class="product-grid">
            <div class="product-card animate__animated animate__fadeInUp" onclick="navigateTo('product')">
                <div class="fav-badge" onclick="event.stopPropagation(); toggleFavorite(this)">
                    <i class="far fa-heart"></i>
                </div>
                <div class="img-placeholder">
                    <img src="https://m.media-amazon.com/images/I/61mNStZpS9L._AC_SL1500_.jpg" alt="iPad">
                </div>
                <div class="product-info">
                    <div class="action-btns">
                        <button class="btn-yellow ripple" onclick="event.stopPropagation(); toast('Comparando...')"><i class="fas fa-mobile-alt"></i></button>
                        <button class="btn-yellow ripple" onclick="event.stopPropagation(); addToCart()"><i class="fas fa-shopping-cart"></i></button>
                    </div>
                    <div class="prices">
                        <span class="curr-price">$7,489</span>
                        <span class="old-price">$9,500</span>
                    </div>
                    <h4>iPad A16 128GB Rosa</h4>
                    <p class="brand">Apple</p>
                    <p class="desc">El iPad de 11 pulgadas es más poderoso que nunca.</p>
                </div>
            </div>
        </div>
    </section>

    <div class="blue-divider">On trending</div>
    <section class="container trending-section">
        <div class="video-grid">
            <div class="video-card">Video</div>
            <div class="video-card">Video</div>
        </div>
    </section>
`;

const productDetailView = `
    <div class="product-detail-container animate__animated animate__fadeIn">
        <div class="detail-header" style="display:flex; justify-content:space-between; align-items:center; padding: 20px 0;">
            <h1 style="font-size: 28px;">Producto</h1>
            <div class="fav-badge active" onclick="toggleFavorite(this)" style="position:static; width:45px; height:45px; display:flex; align-items:center; justify-content:center; border-radius:50%; background:var(--w-yellow); cursor:pointer;">
                <i class="fas fa-heart"></i>
            </div>
        </div>

        <div class="product-main-img" style="border: 1px solid #ddd; border-radius:12px; padding:40px; text-align:center; background:#fff; margin-bottom:20px;">
            <img src="https://m.media-amazon.com/images/I/61mNStZpS9L._AC_SL1500_.jpg" style="max-width:100%; height:auto;">
        </div>

        <div class="detail-actions" style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:25px;">
            <button class="btn-yellow" style="padding:15px; font-size:24px;" onclick="toast('Opción de pago')"><i class="fas fa-mobile-alt"></i></button>
            <button class="btn-yellow" style="padding:15px; font-size:24px;" onclick="addToCart()"><i class="fas fa-shopping-cart"></i></button>
        </div>

        <h2 style="font-size: 32px; font-weight: bold;">iPad A16 128GB Rosa</h2>
        <p style="font-size: 18px; color: gray; margin-bottom:20px;">Apple</p>

        <div class="price-container" style="display:flex; align-items:baseline; gap:15px; margin-bottom:20px;">
            <span style="font-size: 48px; font-weight:900; color: var(--w-blue);">$20,000</span>
            <span style="font-size: 24px; color: red; text-decoration:line-through;">$27,000</span>
        </div>

        <div class="details-list" style="line-height: 1.6;">
            <p>Detalles del artículo</p>
            <ul style="padding-left:20px; margin-top:10px;">
                <li>La espectacular pantalla Liquid Retina es ideal para ver tus películas favoritas.</li>
                <li>Además de dibujar tu próxima obra maestra.</li>
                <li>El chip A16 multiplica el rendimiento del dispositivo para agilizar todo lo que hagas.</li>
            </ul>
        </div>
    </div>
`;

function navigateTo(view) {
    if (view === 'home') {
        mainContent.innerHTML = homeView;
    } else if (view === 'product') {
        mainContent.innerHTML = productDetailView;
    }
    
    // Al cambiar de vista, reiniciamos el observador para las nuevas tarjetas
    initObserver();
    window.scrollTo(0, 0);
}


function addToCart() {
    cartItems++;
    const badge = document.getElementById('cart-badge');
    
    if (badge) {
        badge.style.display = 'block';
        badge.innerText = cartItems;
        badge.classList.remove('animate__bounceIn');
        void badge.offsetWidth; 
        badge.classList.add('animate__bounceIn');
    }
    toast("¡Producto añadido al carrito!");
}

function toggleFavorite(el) {
    const icon = el.querySelector('i');
    el.classList.toggle('active');
    
    if (el.classList.contains('active')) {
        icon.classList.replace('far', 'fas');
        el.classList.add('animate__animated', 'animate__heartBeat');
        setTimeout(() => el.classList.remove('animate__heartBeat'), 500);
        toast("Guardado en tus favoritos");
    } else {
        icon.classList.replace('fas', 'far');
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const themeBtn = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeBtn.classList.replace('fa-sun', 'fa-moon');
    }
}

function toast(message) {
    const t = document.getElementById('toast');
    if (t) {
        t.innerText = message;
        t.style.opacity = '1';
        setTimeout(() => t.style.opacity = '0', 2500);
    }
}

function initObserver() {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => navigateTo('home'));
