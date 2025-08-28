// Fleet Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initFleetTabs();
    initVesselFilters();
    initVesselModal();
});

// Fleet Category Tabs
function initFleetTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const categoryContents = document.querySelectorAll('.category-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            categoryContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(category).classList.add('active');
            
            // Animate content appearance
            const activeContent = document.getElementById(category);
            activeContent.style.opacity = '0';
            activeContent.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeContent.style.transition = 'all 0.3s ease';
                activeContent.style.opacity = '1';
                activeContent.style.transform = 'translateY(0)';
            }, 50);
        });
    });
}

// Vessel Filters
function initVesselFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const vesselCards = document.querySelectorAll('.vessel-card');

    // Create filter buttons if they don't exist
    if (filterButtons.length === 0) {
        createFilterButtons();
    }

    // Filter functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            const filter = e.target.getAttribute('data-filter');
            
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');
            
            // Filter vessels
            filterVessels(filter);
        }
    });
}

function createFilterButtons() {
    const categoryContents = document.querySelectorAll('.category-content');
    
    categoryContents.forEach(content => {
        const intro = content.querySelector('.category-intro');
        if (intro) {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'vessel-filters';
            filterContainer.innerHTML = `
                <button class="filter-btn active" data-filter="all">Semua</button>
                <button class="filter-btn" data-filter="available">Tersedia</button>
                <button class="filter-btn" data-filter="operational">Operasional</button>
                <button class="filter-btn" data-filter="maintenance">Maintenance</button>
            `;
            intro.appendChild(filterContainer);
        }
    });
}

function filterVessels(filter) {
    const activeCategory = document.querySelector('.category-content.active');
    const vesselCards = activeCategory.querySelectorAll('.vessel-card');
    
    vesselCards.forEach(card => {
        const status = card.querySelector('.vessel-status');
        const statusClass = status ? status.className.split(' ')[1] : '';
        
        if (filter === 'all' || statusClass === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Vessel Modal for detailed view
function initVesselModal() {
    const vesselCards = document.querySelectorAll('.vessel-card');
    
    vesselCards.forEach(card => {
        card.addEventListener('click', function() {
            const vesselName = this.querySelector('h4').textContent;
            const vesselImage = this.querySelector('.vessel-image img').src;
            const vesselSpecs = this.querySelectorAll('.spec-item');
            const vesselFeatures = this.querySelectorAll('.feature-tag');
            
            showVesselModal(vesselName, vesselImage, vesselSpecs, vesselFeatures);
        });
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

function showVesselModal(name, image, specs, features) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('vessel-modal');
    if (!modal) {
        modal = createVesselModal();
        document.body.appendChild(modal);
    }
    
    // Populate modal content
    modal.querySelector('.modal-title').textContent = name;
    modal.querySelector('.modal-image img').src = image;
    modal.querySelector('.modal-image img').alt = name;
    
    // Populate specifications
    const specsContainer = modal.querySelector('.modal-specs');
    specsContainer.innerHTML = '';
    specs.forEach(spec => {
        const specClone = spec.cloneNode(true);
        specsContainer.appendChild(specClone);
    });
    
    // Populate features
    const featuresContainer = modal.querySelector('.modal-features');
    featuresContainer.innerHTML = '';
    features.forEach(feature => {
        const featureClone = feature.cloneNode(true);
        featuresContainer.appendChild(featureClone);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createVesselModal() {
    const modal = document.createElement('div');
    modal.id = 'vessel-modal';
    modal.className = 'vessel-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h2 class="modal-title"></h2>
            </div>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="" alt="">
                </div>
                <div class="modal-info">
                    <h3>Spesifikasi Teknis</h3>
                    <div class="modal-specs"></div>
                    <h3>Fitur & Peralatan</h3>
                    <div class="modal-features"></div>
                    <div class="modal-actions">
                        <a href="hubungi-kami.html" class="btn btn-primary">Minta Penawaran</a>
                        <button class="btn btn-outline modal-close-btn">Tutup</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners
    modal.querySelector('.modal-overlay').addEventListener('click', closeVesselModal);
    modal.querySelector('.modal-close').addEventListener('click', closeVesselModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeVesselModal);
    
    return modal;
}

function closeVesselModal() {
    const modal = document.getElementById('vessel-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Vessel status animation
function animateVesselStatus() {
    const statusElements = document.querySelectorAll('.vessel-status');
    
    statusElements.forEach(status => {
        if (status.classList.contains('operational')) {
            // Add blinking animation for operational status
            setInterval(() => {
                status.style.opacity = status.style.opacity === '0.7' ? '1' : '0.7';
            }, 1500);
        }
    });
}

// Initialize status animation
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animateVesselStatus, 1000);
});

// Vessel search functionality
function initVesselSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Cari kapal...';
    searchInput.className = 'vessel-search';
    
    const fleetOverview = document.querySelector('.fleet-overview .container');
    if (fleetOverview) {
        fleetOverview.appendChild(searchInput);
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const vesselCards = document.querySelectorAll('.vessel-card');
            
            vesselCards.forEach(card => {
                const vesselName = card.querySelector('h4').textContent.toLowerCase();
                const vesselSpecs = card.querySelector('.vessel-specs').textContent.toLowerCase();
                
                if (vesselName.includes(searchTerm) || vesselSpecs.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// Keyboard navigation for tabs
document.addEventListener('keydown', function(e) {
    const activeTab = document.querySelector('.tab-btn.active');
    const allTabs = document.querySelectorAll('.tab-btn');
    const currentIndex = Array.from(allTabs).indexOf(activeTab);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        allTabs[currentIndex - 1].click();
    } else if (e.key === 'ArrowRight' && currentIndex < allTabs.length - 1) {
        allTabs[currentIndex + 1].click();
    }
});

// Export functions for external use
window.FleetManager = {
    filterVessels,
    showVesselModal,
    closeVesselModal
};
