const hamburger = document.createElement('i');
hamburger.classList.add('fa-solid', 'fa-bars', 'hamburger');

const nav = document.querySelector('header nav');
const logo = document.querySelector('header nav .logo');
nav.insertBefore(hamburger, logo.nextSibling);

const navMenu = document.querySelector('header nav ul');

const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);

function toggleMenu() {
    const isActive = navMenu.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    document.body.classList.toggle('menu-open', isActive);
    
    hamburger.classList.toggle('fa-bars', !isActive);
    hamburger.classList.toggle('fa-xmark', isActive);
}

function closeMenu() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    hamburger.classList.add('fa-bars');
    hamburger.classList.remove('fa-xmark');
}

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