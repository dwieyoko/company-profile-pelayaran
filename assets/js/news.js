// News & Articles Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initNewsFilters();
    initLoadMore();
    initNewsSearch();
    initNewsletterForm();
    initPopularArticles();
});

// News Category Filters
function initNewsFilters() {
    const filterButtons = document.querySelectorAll('.category-tabs .tab-btn');
    const newsCards = document.querySelectorAll('.news-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter news articles
            filterNews(category, newsCards);
        });
    });
}

function filterNews(category, newsCards) {
    let visibleCount = 0;
    
    newsCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update article count
    updateArticleCount(category, visibleCount);
}

function updateArticleCount(category, count) {
    let countDisplay = document.querySelector('.article-count');
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.className = 'article-count';
        const categoryTabs = document.querySelector('.category-tabs');
        categoryTabs.appendChild(countDisplay);
    }
    
    const categoryNames = {
        'all': 'Semua Artikel',
        'company': 'Update Perusahaan',
        'regulation': 'Regulasi Maritim',
        'education': 'Artikel Edukatif',
        'csr': 'Program CSR'
    };
    
    countDisplay.textContent = `${categoryNames[category]}: ${count} artikel`;
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const newsGrid = document.querySelector('.news-grid');
    let currentPage = 1;
    const articlesPerPage = 6;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            loadMoreArticles(newsGrid, currentPage);
            currentPage++;
            
            // Show loading state
            this.textContent = 'Memuat...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Muat Lebih Banyak';
                this.disabled = false;
                
                // Hide button after loading 3 pages
                if (currentPage > 3) {
                    this.style.display = 'none';
                }
            }, 1500);
        });
    }
}

function loadMoreArticles(container, page) {
    // Simulate loading more articles
    const additionalArticles = [
        {
            category: 'regulation',
            image: 'assets/images/news-regulation-2.jpg',
            title: 'Perubahan Standar Emisi Kapal Internasional',
            excerpt: 'IMO menetapkan standar emisi baru yang lebih ketat untuk kapal-kapal komersial mulai 2025.',
            date: '22 Desember 2023',
            readTime: '4 min read',
            author: 'Capt. Budi Santoso',
            authorImage: 'assets/images/author-2.jpg'
        },
        {
            category: 'csr',
            image: 'assets/images/news-csr-2.jpg',
            title: 'Program Pembersihan Pantai Bersama Masyarakat',
            excerpt: 'Kegiatan gotong royong membersihkan pantai melibatkan 200 relawan dari berbagai kalangan.',
            date: '20 Desember 2023',
            readTime: '3 min read',
            author: 'Sari Wijaya',
            authorImage: 'assets/images/author-4.jpg'
        }
    ];
    
    additionalArticles.forEach(article => {
        const articleElement = createArticleElement(article);
        container.appendChild(articleElement);
        
        // Animate new articles
        setTimeout(() => {
            articleElement.style.opacity = '1';
            articleElement.style.transform = 'translateY(0)';
        }, 100);
    });
}

function createArticleElement(article) {
    const articleDiv = document.createElement('article');
    articleDiv.className = 'news-card';
    articleDiv.setAttribute('data-category', article.category);
    articleDiv.style.opacity = '0';
    articleDiv.style.transform = 'translateY(20px)';
    articleDiv.style.transition = 'all 0.5s ease';
    
    articleDiv.innerHTML = `
        <div class="news-image">
            <img src="${article.image}" alt="${article.title}">
            <div class="news-category">${getCategoryName(article.category)}</div>
        </div>
        <div class="news-content">
            <div class="news-meta">
                <span class="news-date">${article.date}</span>
                <span class="reading-time">${article.readTime}</span>
            </div>
            <h3>${article.title}</h3>
            <p>${article.excerpt}</p>
            <div class="news-footer">
                <div class="author-info">
                    <img src="${article.authorImage}" alt="${article.author}" class="author-avatar">
                    <span class="author-name">${article.author}</span>
                </div>
                <a href="#" class="read-more">Baca Selengkapnya</a>
            </div>
        </div>
    `;
    
    return articleDiv;
}

function getCategoryName(category) {
    const categoryNames = {
        'company': 'Update Perusahaan',
        'regulation': 'Regulasi Maritim',
        'education': 'Artikel Edukatif',
        'csr': 'Program CSR'
    };
    return categoryNames[category] || category;
}

// News Search Functionality
function initNewsSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'news-search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" class="news-search" placeholder="Cari berita atau artikel...">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        </div>
    `;
    
    const categoryTabs = document.querySelector('.category-tabs');
    if (categoryTabs) {
        categoryTabs.parentNode.insertBefore(searchContainer, categoryTabs);
        
        const searchInput = searchContainer.querySelector('.news-search');
        const searchBtn = searchContainer.querySelector('.search-btn');
        
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchBtn.addEventListener('click', () => performSearch());
        
        // Enter key search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.news-search');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const newsCards = document.querySelectorAll('.news-card');
    
    if (searchTerm === '') {
        // Show all articles if search is empty
        newsCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    let foundCount = 0;
    newsCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const content = card.querySelector('p').textContent.toLowerCase();
        const category = card.querySelector('.news-category').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || 
            content.includes(searchTerm) || 
            category.includes(searchTerm)) {
            card.style.display = 'block';
            foundCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show search results count
    showSearchResults(searchTerm, foundCount);
}

function showSearchResults(searchTerm, count) {
    let resultsDisplay = document.querySelector('.search-results');
    if (!resultsDisplay) {
        resultsDisplay = document.createElement('div');
        resultsDisplay.className = 'search-results';
        const newsGrid = document.querySelector('.news-grid');
        newsGrid.parentNode.insertBefore(resultsDisplay, newsGrid);
    }
    
    if (count === 0) {
        resultsDisplay.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Tidak ada hasil untuk "${searchTerm}"</h3>
                <p>Coba gunakan kata kunci yang berbeda atau jelajahi kategori berita kami.</p>
            </div>
        `;
    } else {
        resultsDisplay.innerHTML = `
            <div class="results-info">
                Ditemukan <strong>${count}</strong> artikel untuk "<strong>${searchTerm}</strong>"
            </div>
        `;
    }
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('form[data-form="newsletter"]');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const interest = formData.get('interest');
            
            // Validate form
            if (!name || !email || !interest) {
                showNotification('Mohon lengkapi semua field', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Format email tidak valid', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Memproses...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Terima kasih! Anda telah berlangganan newsletter kami.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Popular Articles Interaction
function initPopularArticles() {
    const popularItems = document.querySelectorAll('.popular-item');
    
    popularItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            // Simulate navigation to article
            console.log(`Navigating to article: ${title}`);
            
            // Add click animation
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--gray-100)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
}

// Reading Progress Bar
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', updateReadingProgress);
}

function updateReadingProgress() {
    const progressFill = document.querySelector('.progress-fill');
    if (!progressFill) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrollTop = window.pageYOffset;
    const progress = (scrollTop / documentHeight) * 100;
    
    progressFill.style.width = Math.min(progress, 100) + '%';
}

// Social Sharing
function initSocialSharing() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title} ${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
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

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initReadingProgress();
        initSocialSharing();
    }, 1000);
});

// Export functions for external use
window.NewsManager = {
    filterNews,
    performSearch,
    loadMoreArticles
};
