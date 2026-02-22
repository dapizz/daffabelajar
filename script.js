// ============================================
// Theme Management
// ============================================
const ThemeManager = {
    init() {
        this.toggle = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    },
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
    },
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    },
    
    bindEvents() {
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
    }
};

// ============================================
// Scroll Reveal Animation
// ============================================
const ScrollReveal = {
    init() {
        this.elements = document.querySelectorAll('.reveal');
        this.observer = this.createObserver();
        this.observeElements();
    },
    
    createObserver() {
        return new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    },
    
    observeElements() {
        this.elements.forEach(el => this.observer.observe(el));
    }
};

// ============================================
// Card Hover Effects
// ============================================
const CardEffects = {
    init() {
        this.cards = document.querySelectorAll('.subject-card, .chapter-card');
        this.bindEvents();
    },
    
    bindEvents() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.onHover(e, card));
            card.addEventListener('mousemove', (e) => this.onMove(e, card));
            card.addEventListener('mouseleave', (e) => this.onLeave(card));
        });
    },
    
    onHover(e, card) {
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    },
    
    onMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    },
    
    onLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
};

// ============================================
// Smooth Page Transitions
// ============================================
const PageTransitions = {
    init() {
        this.links = document.querySelectorAll('a[href]');
        this.bindEvents();
    },
    
    bindEvents() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
                    e.preventDefault();
                    this.fadeOut(() => {
                        window.location.href = href;
                    });
                }
            });
        });
    },
    
    fadeOut(callback) {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(callback, 300);
    }
};

// ============================================
// Initialize Everything
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial opacity for fade-in
    document.body.style.opacity = '0';
    
    // Initialize modules
    ThemeManager.init();
    ScrollReveal.init();
    CardEffects.init();
    
    // Fade in page
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    });
});

// ============================================
// Page Transitions for Navigation
// ============================================
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        document.body.style.opacity = '1';
    }
});