const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const dropdownButtons = document.querySelectorAll('.dropdown-button');
const contactFloatToggle = document.querySelector('.contact-float-toggle');
const contactFloatPanel = document.querySelector('.contact-float-panel');
const contactFloat = document.querySelector('.contact-float');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navMenu.classList.toggle('nav-menu-open');
    });
}

const isTouchDropdown = window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches;

dropdownButtons.forEach((button) => {
    const container = button.nextElementSibling;
    if (!container || !container.classList.contains('dropdown-container')) {
        return;
    }

    // Always attach a click handler, but only toggle the dropdown when
    // the hamburger menu is open or on touch devices. This lets hover
    // keep working on desktop when the normal menu is visible.
    button.addEventListener('click', (event) => {
        if (!navMenu.classList.contains('nav-menu-open') && !isTouchDropdown) {
            // Let desktop hover behavior handle it when not in hamburger view
            return;
        }
        event.stopPropagation();
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
        container.classList.toggle('dropdown-open', !expanded);
        container.setAttribute('aria-hidden', String(expanded));
    });
});

// Close any open dropdowns when clicking outside, regardless of device.
document.addEventListener('click', (event) => {
    dropdownButtons.forEach((button) => {
        const container = button.nextElementSibling;
        if (!container || !container.classList.contains('dropdown-container')) {
            return;
        }
        if (!button.parentElement.contains(event.target) && !container.contains(event.target)) {
            button.setAttribute('aria-expanded', 'false');
            container.classList.remove('dropdown-open');
            container.setAttribute('aria-hidden', 'true');
        }
    });
});

if (contactFloatToggle && contactFloatPanel) {
    contactFloatToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        const expanded = contactFloatToggle.getAttribute('aria-expanded') === 'true';
        const nextState = !expanded;
        contactFloatToggle.setAttribute('aria-expanded', String(nextState));
        contactFloatPanel.classList.toggle('open', nextState);
        contactFloatPanel.setAttribute('aria-hidden', String(!nextState));
    });
}

if (contactFloat) {
    document.addEventListener('click', (event) => {
        if (!contactFloat.contains(event.target)) {
            contactFloatPanel?.classList.remove('open');
            contactFloatToggle?.setAttribute('aria-expanded', 'false');
            contactFloatPanel?.setAttribute('aria-hidden', 'true');
        }
    });
}

const revealElements = document.querySelectorAll('nav, .product-hero, .catalog-item, .product-details, .key-advantages, .product-gallery, .footer-social, .product-gallery-item, .product-summary');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
});

function setupRevealElements() {
    revealElements.forEach((element, index) => {
        if (!element.classList.contains('reveal')) {
            element.classList.add('reveal');
        }
        element.classList.add(`reveal-delay-${Math.min(5, Math.floor(index / 4) + 1)}`);
        revealObserver.observe(element);
    });
}

function animateIntro() {
    document.body.classList.add('page-loaded');
    const introElements = document.querySelectorAll('nav, .product-hero, .catalog-item, .footer-social');
    introElements.forEach((el, index) => {
        el.classList.add('reveal');
        el.classList.add(`reveal-delay-${Math.min(5, index + 1)}`);
        requestAnimationFrame(() => el.classList.add('visible'));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    window.setTimeout(() => {
        animateIntro();
        setupRevealElements();
    }, 80);
});
