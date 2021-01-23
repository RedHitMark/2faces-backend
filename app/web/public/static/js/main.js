"use strict";
function openMobileMenu() {
    let burgerMenu = document.getElementById('burger-menu');
    let crossMenuDash = document.getElementById('cross-menu');
    let logoDocDash = document.getElementById('logo-mobile');
    let mobileMenu = document.getElementById('mobile-menu');
    let mobileMenuItems = document.getElementById('mobile-menu-items');

    burgerMenu.style.display = 'none';

    mobileMenu.style.transition = '0.5s';
    mobileMenu.style.display = 'flex';
    mobileMenu.style.width = '100%';

    crossMenuDash.style.display = 'block';
    logoDocDash.style.display = 'none';
    mobileMenuItems.style.display = 'flex';
}
function closeMobileMenu() {
    let burgerMenu = document.getElementById('burger-menu');
    let crossMenuDash = document.getElementById('cross-menu');
    let logoDocDash = document.getElementById('logo-mobile');
    let mobileMenu = document.getElementById('mobile-menu');
    let mobileMenuItems = document.getElementById('mobile-menu-items');

    burgerMenu.style.display = 'block';

    mobileMenu.style.width = '0';

    crossMenuDash.style.display = 'none';
    logoDocDash.style.display = 'block';
    mobileMenuItems.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function () {
    /** Header Scripts **/
    let burgerMenu = document.getElementById('burger-menu');
    let crossMenuDash = document.getElementById('cross-menu');
    let navItems = document.querySelectorAll('#mobile-menu-items > .nav-item');

    burgerMenu.addEventListener('click', openMobileMenu);
    crossMenuDash.addEventListener('click', closeMobileMenu);
    navItems.forEach(function (navItem) {
        navItem.addEventListener('click', closeMobileMenu)
    });
});
