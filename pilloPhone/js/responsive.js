// Crear el elemento SVG del ícono de hamburguesa
const hamburger = document.createElement('img');
hamburger.src = 'assets/svg/bars-solid-full.svg';
hamburger.alt = 'Menú';
hamburger.width = 24;
hamburger.height = 24;
hamburger.classList.add('hamburger');

// Insertar el ícono después del logo en la barra de navegación
const nav = document.querySelector('header nav');
const logo = document.querySelector('header nav .logo');
nav.insertBefore(hamburger, logo.nextSibling);

const navMenu = document.querySelector('header nav ul');

// Crear overlay para el fondo del menú
const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);

// Función para alternar el menú
function toggleMenu() {
    const isActive = navMenu.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    document.body.classList.toggle('menu-open', isActive);

    // Cambiar el ícono según el estado
    if (isActive) {
        hamburger.src = 'assets/svg/xmark-solid-full.svg';
        hamburger.style.zIndex = '1011';
    } else {
        hamburger.src = 'assets/svg/bars-solid-full.svg';
        hamburger.style.zIndex = '1001';
    }
}

// Función para cerrar el menú
function closeMenu() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.src = 'assets/svg/bars-solid-full.svg';
}

// Eventos
hamburger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', closeMenu);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
});
