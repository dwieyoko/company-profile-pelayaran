// Main JavaScript File for PT Pelayaran Nusantara Website

// Error handling for missing elements
function safeQuerySelector(selector) {
    try {
        return document.querySelector(selector);
    } catch (error) {
        console.warn(`Element not found: ${selector}`);
        return null;
    }
}

function safeQuerySelectorAll(selector) {
    try {
        return document.querySelectorAll(selector);
    } catch (error) {
        console.warn(`Elements not found: ${selector}`);
        return [];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize all components
        initNavigation();
        initHeroSlider();
        initScrollEffects();
        initFormHandlers();
        initWhatsAppFloat();
        initImageFallbacks();
    } catch (error) {
        console.error('Error initializing page:', error);
    }
});

// Navigation Functions
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// Hero Slider Functions
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });

        // Update indicators
        const indicators = document.querySelectorAll('.hero-indicators .indicator');
        indicators.forEach((indicator, i) => {
            indicator.classList.remove('active');
            if (i === index) {
                indicator.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    // Event listeners for navigation buttons
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Event listeners for indicators
    const indicators = document.querySelectorAll('.hero-indicators .indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-play slider
    setInterval(nextSlide, 5000);

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;

    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        heroSlider.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }
}

// Scroll Effects
function initScrollEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .testimonial-item, .about-content, .about-image').forEach(el => {
        observer.observe(el);
    });

    // Back to top button
    const backToTopBtn = createBackToTopButton();
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
}

function createBackToTopButton() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    
    btn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(btn);
    return btn;
}

// Form Handlers
function initFormHandlers() {
    // Contact forms
    const contactForms = document.querySelectorAll('form[data-form="contact"]');
    contactForms.forEach(form => {
        form.addEventListener('submit', handleContactForm);
    });

    // Newsletter form
    const newsletterForms = document.querySelectorAll('form[data-form="newsletter"]');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', handleNewsletterForm);
    });

    // Career application form
    const careerForms = document.querySelectorAll('form[data-form="career"]');
    careerForms.forEach(form => {
        form.addEventListener('submit', handleCareerForm);
    });
}

function handleContactForm(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    // Show loading state
    showFormLoading(form);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showFormSuccess(form, 'Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
        form.reset();
    }, 2000);
}

function handleNewsletterForm(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.querySelector('input[type="email"]').value;
    
    if (!isValidEmail(email)) {
        showFormError(form, 'Mohon masukkan email yang valid.');
        return;
    }
    
    showFormLoading(form);
    
    setTimeout(() => {
        showFormSuccess(form, 'Terima kasih! Anda telah berlangganan newsletter kami.');
        form.reset();
    }, 1500);
}

function handleCareerForm(e) {
    e.preventDefault();
    const form = e.target;
    
    showFormLoading(form);
    
    setTimeout(() => {
        showFormSuccess(form, 'Lamaran Anda telah terkirim. Kami akan menghubungi Anda jika sesuai dengan kriteria.');
        form.reset();
    }, 2500);
}

function showFormLoading(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    submitBtn.dataset.originalText = originalText;
}

function showFormSuccess(form, message) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = submitBtn.dataset.originalText || 'Kirim';
    submitBtn.disabled = false;
    
    showNotification(message, 'success');
}

function showFormError(form, message) {
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = submitBtn.dataset.originalText || 'Kirim';
    submitBtn.disabled = false;
    
    showNotification(message, 'error');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// WhatsApp Float Button
function initWhatsAppFloat() {
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        // Add click tracking
        whatsappFloat.addEventListener('click', function() {
            // Track WhatsApp click (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'Contact',
                    event_label: 'WhatsApp Float Button'
                });
            }
        });

        // Show/hide based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.visibility = 'visible';
            } else {
                whatsappFloat.style.opacity = '0.7';
            }
        });
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimization
window.addEventListener('scroll', throttle(function() {
    // Throttled scroll events
}, 100));

// Image Fallbacks
function initImageFallbacks() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Set loading state immediately
        img.style.transition = 'opacity 0.3s ease';

        img.addEventListener('error', function() {
            console.log(`Image failed to load: ${this.src}`);

            // Create placeholder based on image purpose
            const alt = this.alt || 'Image';
            const rect = this.getBoundingClientRect();
            const width = rect.width || this.width || 300;
            const height = rect.height || this.height || 200;

            // Determine image type for better placeholder
            let bgColor = '#1e3a8a';
            let textColor = 'white';
            let fontSize = Math.min(width / 10, 16);

            if (this.classList.contains('logo') || alt.toLowerCase().includes('logo')) {
                bgColor = '#3b82f6';
                fontSize = Math.min(width / 8, 14);
            } else if (alt.toLowerCase().includes('hero')) {
                bgColor = 'linear-gradient(135deg, #1e3a8a, #3b82f6)';
                fontSize = Math.min(width / 15, 24);
            }

            // Create SVG placeholder
            const svgPlaceholder = `data:image/svg+xml;base64,${btoa(`
                <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#1e3a8a;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grad)"/>
                    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${fontSize}"
                          fill="${textColor}" text-anchor="middle" dy=".3em">${alt}</text>
                </svg>
            `)}`;

            this.src = svgPlaceholder;
            this.style.backgroundColor = '#f8fafc';
            this.style.border = '1px solid #e2e8f0';
            this.style.borderRadius = '8px';
            this.style.opacity = '1';
        });

        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.border = 'none';
        });

        // Check if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        } else if (!img.complete) {
            img.style.opacity = '0.7';
        }
    });
}

// Global notification function
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        ${type === 'success' ? 'background: #10b981;' : ''}
        ${type === 'error' ? 'background: #ef4444;' : ''}
        ${type === 'info' ? 'background: #3b82f6;' : ''}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Make functions globally available
window.showNotification = showNotification;

// Export functions for global use
window.MainApp = {
    initNavigation,
    initHeroSlider,
    initScrollEffects,
    initImageFallbacks,
    showNotification
};

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can send error reports to your analytics service here
});

// Service Worker registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
