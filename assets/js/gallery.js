// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
    initGalleryModal();
    initProjectCards();
    initClientSlider();
});

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update project count
    updateProjectCount(filter, projectCards);
}

function updateProjectCount(filter, projectCards) {
    const visibleCards = Array.from(projectCards).filter(card => {
        const category = card.getAttribute('data-category');
        return filter === 'all' || category === filter;
    });
    
    // Create or update count display
    let countDisplay = document.querySelector('.project-count');
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.className = 'project-count';
        const categoryFilter = document.querySelector('.category-filter');
        categoryFilter.appendChild(countDisplay);
    }
    
    countDisplay.textContent = `Menampilkan ${visibleCards.length} proyek`;
}

// Gallery Modal
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h4').textContent;
            const description = this.querySelector('p').textContent;
            
            showGalleryModal(img.src, title, description, index);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-overlay').style.opacity = '0';
        });
    });
}

function showGalleryModal(imageSrc, title, description, currentIndex) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('gallery-modal');
    if (!modal) {
        modal = createGalleryModal();
        document.body.appendChild(modal);
    }
    
    // Populate modal content
    modal.querySelector('.modal-image img').src = imageSrc;
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-description').textContent = description;
    modal.setAttribute('data-current-index', currentIndex);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize navigation
    updateModalNavigation(currentIndex);
}

function createGalleryModal() {
    const modal = document.createElement('div');
    modal.id = 'gallery-modal';
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <button class="modal-prev"><i class="fas fa-chevron-left"></i></button>
            <button class="modal-next"><i class="fas fa-chevron-right"></i></button>
            <div class="modal-image">
                <img src="" alt="">
            </div>
            <div class="modal-info">
                <h3 class="modal-title"></h3>
                <p class="modal-description"></p>
                <div class="modal-counter">
                    <span class="current-image">1</span> / <span class="total-images">6</span>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    modal.querySelector('.modal-overlay').addEventListener('click', closeGalleryModal);
    modal.querySelector('.modal-close').addEventListener('click', closeGalleryModal);
    modal.querySelector('.modal-prev').addEventListener('click', showPrevImage);
    modal.querySelector('.modal-next').addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleModalKeyboard);
    
    return modal;
}

function updateModalNavigation(currentIndex) {
    const modal = document.getElementById('gallery-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    modal.querySelector('.current-image').textContent = currentIndex + 1;
    modal.querySelector('.total-images').textContent = galleryItems.length;
    
    // Update navigation buttons
    const prevBtn = modal.querySelector('.modal-prev');
    const nextBtn = modal.querySelector('.modal-next');
    
    prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
    nextBtn.style.display = currentIndex === galleryItems.length - 1 ? 'none' : 'block';
}

function showPrevImage() {
    const modal = document.getElementById('gallery-modal');
    const currentIndex = parseInt(modal.getAttribute('data-current-index'));
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (currentIndex > 0) {
        const newIndex = currentIndex - 1;
        const item = galleryItems[newIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        
        updateModalContent(img.src, title, description, newIndex);
    }
}

function showNextImage() {
    const modal = document.getElementById('gallery-modal');
    const currentIndex = parseInt(modal.getAttribute('data-current-index'));
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (currentIndex < galleryItems.length - 1) {
        const newIndex = currentIndex + 1;
        const item = galleryItems[newIndex];
        const img = item.querySelector('img');
        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;
        
        updateModalContent(img.src, title, description, newIndex);
    }
}

function updateModalContent(imageSrc, title, description, index) {
    const modal = document.getElementById('gallery-modal');
    
    modal.querySelector('.modal-image img').src = imageSrc;
    modal.querySelector('.modal-title').textContent = title;
    modal.querySelector('.modal-description').textContent = description;
    modal.setAttribute('data-current-index', index);
    
    updateModalNavigation(index);
}

function handleModalKeyboard(e) {
    const modal = document.getElementById('gallery-modal');
    if (!modal || !modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeGalleryModal();
            break;
        case 'ArrowLeft':
            showPrevImage();
            break;
        case 'ArrowRight':
            showNextImage();
            break;
    }
}

function closeGalleryModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Project Cards Animation
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Client Slider
function initClientSlider() {
    const clientCards = document.querySelectorAll('.client-card');
    let currentClient = 0;
    
    if (clientCards.length <= 1) return;
    
    // Auto-rotate testimonials
    setInterval(() => {
        clientCards[currentClient].style.opacity = '0.7';
        currentClient = (currentClient + 1) % clientCards.length;
        clientCards[currentClient].style.opacity = '1';
        clientCards[currentClient].style.transform = 'scale(1.02)';
        
        setTimeout(() => {
            clientCards[currentClient].style.transform = 'scale(1)';
        }, 300);
    }, 5000);
}

// Project Search
function initProjectSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Cari proyek...';
    searchInput.className = 'project-search';
    
    const categoryFilter = document.querySelector('.category-filter');
    if (categoryFilter) {
        categoryFilter.appendChild(searchInput);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const projectCards = document.querySelectorAll('.project-card');
            
            projectCards.forEach(card => {
                const title = card.querySelector('h4').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const category = card.getAttribute('data-category');
                
                if (title.includes(searchTerm) || 
                    description.includes(searchTerm) || 
                    category.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Statistics Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[\d,]/g, '');
                
                animateCounter(target, 0, numericValue, suffix, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
}

function animateCounter(element, start, end, suffix, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initProjectSearch();
        initLazyLoading();
        initStatsCounter();
    }, 1000);
});

// Export functions for external use
window.GalleryManager = {
    filterProjects,
    showGalleryModal,
    closeGalleryModal
};
