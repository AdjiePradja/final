// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE MENU ──
function toggleMenu() {
    document.getElementById('mobile-menu').classList.toggle('open');
}

// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// ── FAQ TOGGLE ──
function toggleFaq(el) {
    const item = el.parentElement;
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
}

// ── BILLING TOGGLE (removed - fixed pricing) ──

// ── FEATURE HOVER EFFECT ──
const featureCards = document.querySelectorAll('.feature-card[data-hover-img]');

const featureHoverContainer = document.createElement('div');
featureHoverContainer.id = 'feature-hover-container';

const featureHoverImg = document.createElement('img');
featureHoverImg.className = 'feature-hover-img-elem';

const featureHoverGradient = document.createElement('div');
featureHoverGradient.className = 'feature-hover-gradient';

const featureHoverTitle = document.createElement('div');
featureHoverTitle.className = 'feature-hover-title';

featureHoverContainer.appendChild(featureHoverImg);
featureHoverContainer.appendChild(featureHoverGradient);
featureHoverContainer.appendChild(featureHoverTitle);
document.body.appendChild(featureHoverContainer);

featureCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        if (window.innerWidth > 768) {
            const imgSrc = card.getAttribute('data-hover-img');
            const titleText = card.querySelector('.feature-card-title').innerText;

            if (imgSrc) {
                featureHoverImg.src = imgSrc;
                featureHoverTitle.innerText = titleText;
                featureHoverContainer.classList.add('show');
            }
        }
    });

    card.addEventListener('mousemove', (e) => {
        if (window.innerWidth > 768) {
            featureHoverContainer.style.setProperty('--mouse-x', `${e.clientX}px`);
            featureHoverContainer.style.setProperty('--mouse-y', `${e.clientY}px`);
        }
    });

    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
            featureHoverContainer.classList.remove('show');
        }
    });

    // Mobile click support
    card.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.stopPropagation();
            const imgSrc = card.getAttribute('data-hover-img');
            const titleText = card.querySelector('.feature-card-title').innerText;

            if (featureHoverContainer.classList.contains('show') && featureHoverImg.src.endsWith(imgSrc)) {
                featureHoverContainer.classList.remove('show');
                featureHoverContainer.classList.remove('mobile-center');
            } else {
                featureHoverImg.src = imgSrc;
                featureHoverTitle.innerText = titleText;
                featureHoverContainer.classList.add('show');
                featureHoverContainer.classList.add('mobile-center');
            }
        }
    });
});

document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('#feature-hover-container')) {
            featureHoverContainer.classList.remove('show');
            featureHoverContainer.classList.remove('mobile-center');
        }
    }
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── HERO SLIDER ──
let heroIndex = 0;
const heroSlides = document.querySelectorAll('.hero-slide');
let heroAutoPlay;

function updateHeroSlider() {
    if (heroSlides.length === 0) return;
    heroSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next', 'hidden');

        if (i === heroIndex) {
            slide.classList.add('active');
        } else if (i === (heroIndex - 1 + heroSlides.length) % heroSlides.length) {
            slide.classList.add('prev');
        } else if (i === (heroIndex + 1) % heroSlides.length) {
            slide.classList.add('next');
        } else {
            slide.classList.add('hidden');
        }
    });
}

function nextHero() {
    heroIndex = (heroIndex + 1) % heroSlides.length;
    updateHeroSlider();
}

function switchHero(index) {
    heroIndex = index;
    updateHeroSlider();
    resetHeroInterval();
}

function resetHeroInterval() {
    clearInterval(heroAutoPlay);
    heroAutoPlay = setInterval(nextHero, 4500);
}

if (heroSlides.length > 0) {
    updateHeroSlider();
    resetHeroInterval();
}

// ── USECASES TABS AUTOPLAY ──
const usecaseTabs = document.querySelectorAll('.usecase-tab');
const usecaseImgLayers = document.querySelectorAll('.usecase-img-layer');
const usecaseCircle = document.getElementById('usecase-circle');
let currentUsecaseIndex = 0;
let usecaseInterval;

function switchUsecase(index) {
    usecaseTabs.forEach(t => t.classList.remove('active'));
    const selectedTab = usecaseTabs[index];
    selectedTab.classList.add('active');

    // Crossfade images using layers instead of changing src
    usecaseImgLayers.forEach(img => img.classList.remove('active'));
    usecaseImgLayers[index].classList.add('active');

    usecaseCircle.style.background = selectedTab.getAttribute('data-color');

    currentUsecaseIndex = index;
    resetUsecaseInterval();
}

function nextUsecase() {
    let nextIndex = currentUsecaseIndex + 1;
    if (nextIndex >= usecaseTabs.length) nextIndex = 0;
    switchUsecase(nextIndex);
}

function resetUsecaseInterval() {
    clearInterval(usecaseInterval);
    usecaseInterval = setInterval(nextUsecase, 4000);
}

if (usecaseTabs.length > 0) {
    resetUsecaseInterval();
}