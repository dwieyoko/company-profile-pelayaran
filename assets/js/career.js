// Career Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initJobFilters();
    initJobApplications();
    initJobModal();
    initProcessAnimation();
});

// Job Filters
function initJobFilters() {
    const filterButtons = document.querySelectorAll('.job-filters .filter-btn');
    const jobCards = document.querySelectorAll('.job-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter job cards
            filterJobs(filter, jobCards);
        });
    });
}

function filterJobs(filter, jobCards) {
    let visibleCount = 0;
    
    jobCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Update job count
    updateJobCount(filter, visibleCount);
}

function updateJobCount(filter, count) {
    let countDisplay = document.querySelector('.job-count');
    if (!countDisplay) {
        countDisplay = document.createElement('div');
        countDisplay.className = 'job-count';
        const jobFilters = document.querySelector('.job-filters');
        jobFilters.appendChild(countDisplay);
    }
    
    const filterNames = {
        'all': 'Semua Posisi',
        'marine': 'Marine Operations',
        'technical': 'Technical',
        'management': 'Management',
        'support': 'Support'
    };
    
    countDisplay.textContent = `${filterNames[filter]}: ${count} lowongan`;
}

// Job Applications
function initJobApplications() {
    const applyButtons = document.querySelectorAll('.apply-btn');
    const detailButtons = document.querySelectorAll('.details-btn');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.getAttribute('data-job');
            showJobModal(jobTitle, 'apply');
        });
    });
    
    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jobTitle = this.getAttribute('data-job');
            showJobDetails(jobTitle);
        });
    });
}

function showJobDetails(jobTitle) {
    // Create job details modal
    const modal = document.createElement('div');
    modal.className = 'job-details-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Detail Posisi: ${jobTitle}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="job-detail-content">
                    <h4>Deskripsi Pekerjaan</h4>
                    <p>Bertanggung jawab atas operasional dan keselamatan kapal sesuai dengan standar internasional dan regulasi maritim yang berlaku.</p>
                    
                    <h4>Tanggung Jawab</h4>
                    <ul>
                        <li>Memimpin dan mengawasi seluruh operasional kapal</li>
                        <li>Memastikan keselamatan awak kapal dan kargo</li>
                        <li>Melakukan navigasi dan komunikasi maritim</li>
                        <li>Menjaga compliance terhadap regulasi maritim</li>
                        <li>Melakukan pelaporan operasional secara berkala</li>
                    </ul>
                    
                    <h4>Benefit & Fasilitas</h4>
                    <ul>
                        <li>Gaji kompetitif sesuai pengalaman</li>
                        <li>Asuransi kesehatan dan jiwa</li>
                        <li>BPJS Ketenagakerjaan</li>
                        <li>Bonus kinerja tahunan</li>
                        <li>Program pelatihan dan sertifikasi</li>
                        <li>Cuti tahunan dan sick leave</li>
                    </ul>
                </div>
                <div class="modal-actions">
                    <button class="btn btn-primary apply-from-detail" data-job="${jobTitle}">Lamar Sekarang</button>
                    <button class="btn btn-outline modal-close-btn">Tutup</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal events
    modal.querySelector('.modal-overlay').addEventListener('click', () => closeJobDetailsModal(modal));
    modal.querySelector('.modal-close').addEventListener('click', () => closeJobDetailsModal(modal));
    modal.querySelector('.modal-close-btn').addEventListener('click', () => closeJobDetailsModal(modal));
    
    // Apply from detail
    modal.querySelector('.apply-from-detail').addEventListener('click', function() {
        const jobTitle = this.getAttribute('data-job');
        closeJobDetailsModal(modal);
        setTimeout(() => showJobModal(jobTitle, 'apply'), 300);
    });
}

function closeJobDetailsModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Job Application Modal
function initJobModal() {
    const modal = document.getElementById('job-modal');
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-close-btn');
    const overlay = modal.querySelector('.modal-overlay');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', closeJobModal);
    });
    
    overlay.addEventListener('click', closeJobModal);
    
    // Form submission
    const form = document.getElementById('job-application-form');
    form.addEventListener('submit', handleJobApplication);
}

function showJobModal(jobTitle, action = 'apply') {
    const modal = document.getElementById('job-modal');
    const modalTitle = document.getElementById('modal-job-title');
    
    modalTitle.textContent = jobTitle;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set hidden field for job title
    let jobTitleField = document.getElementById('jobTitle');
    if (!jobTitleField) {
        jobTitleField = document.createElement('input');
        jobTitleField.type = 'hidden';
        jobTitleField.id = 'jobTitle';
        jobTitleField.name = 'jobTitle';
        document.getElementById('job-application-form').appendChild(jobTitleField);
    }
    jobTitleField.value = jobTitle;
}

function closeJobModal() {
    const modal = document.getElementById('job-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('job-application-form').reset();
}

function handleJobApplication(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        jobTitle: formData.get('jobTitle'),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        experience: formData.get('experience'),
        education: formData.get('education'),
        coverLetter: formData.get('coverLetter'),
        resume: formData.get('resume')
    };
    
    // Validate required fields
    if (!data.fullName || !data.email || !data.phone || !data.education || !data.resume) {
        showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Format email tidak valid', 'error');
        return;
    }
    
    if (!isValidPhone(data.phone)) {
        showNotification('Format nomor telepon tidak valid', 'error');
        return;
    }
    
    // Validate file
    if (data.resume && data.resume.size > 5 * 1024 * 1024) {
        showNotification('Ukuran file CV maksimal 5MB', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification(`Lamaran untuk posisi ${data.jobTitle} telah terkirim. Tim HR akan menghubungi Anda segera.`, 'success');
        closeJobModal();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Track application
        trackJobApplication(data.jobTitle);
    }, 2000);
}

function trackJobApplication(jobTitle) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'job_application', {
            event_category: 'Career',
            event_label: jobTitle
        });
    }
    
    console.log(`Job application submitted for: ${jobTitle}`);
}

// Process Animation
function initProcessAnimation() {
    const processSteps = document.querySelectorAll('.process-step');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s ease';
        observer.observe(step);
    });
}

// Job Search
function initJobSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'job-search-container';
    searchContainer.innerHTML = `
        <div class="search-box">
            <input type="text" class="job-search" placeholder="Cari posisi atau kata kunci...">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        </div>
    `;
    
    const jobFilters = document.querySelector('.job-filters');
    if (jobFilters) {
        jobFilters.parentNode.insertBefore(searchContainer, jobFilters);
        
        const searchInput = searchContainer.querySelector('.job-search');
        const searchBtn = searchContainer.querySelector('.search-btn');
        
        searchInput.addEventListener('input', debounce(performJobSearch, 300));
        searchBtn.addEventListener('click', performJobSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performJobSearch();
            }
        });
    }
}

function performJobSearch() {
    const searchInput = document.querySelector('.job-search');
    const searchTerm = searchInput.value.toLowerCase().trim();
    const jobCards = document.querySelectorAll('.job-card');
    
    if (searchTerm === '') {
        jobCards.forEach(card => {
            card.style.display = 'block';
        });
        return;
    }
    
    let foundCount = 0;
    jobCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const requirements = card.querySelector('.job-requirements').textContent.toLowerCase();
        const location = card.querySelector('.job-location span').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || 
            requirements.includes(searchTerm) || 
            location.includes(searchTerm)) {
            card.style.display = 'block';
            foundCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    showSearchResults(searchTerm, foundCount);
}

function showSearchResults(searchTerm, count) {
    let resultsDisplay = document.querySelector('.search-results');
    if (!resultsDisplay) {
        resultsDisplay = document.createElement('div');
        resultsDisplay.className = 'search-results';
        const jobsGrid = document.querySelector('.jobs-grid');
        jobsGrid.parentNode.insertBefore(resultsDisplay, jobsGrid);
    }
    
    if (count === 0) {
        resultsDisplay.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Tidak ada hasil untuk "${searchTerm}"</h3>
                <p>Coba gunakan kata kunci yang berbeda atau lihat semua posisi yang tersedia.</p>
            </div>
        `;
    } else {
        resultsDisplay.innerHTML = `
            <div class="results-info">
                Ditemukan <strong>${count}</strong> posisi untuk "<strong>${searchTerm}</strong>"
            </div>
        `;
    }
}

// Job Alert Subscription
function initJobAlert() {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'job-alert-section';
    alertContainer.innerHTML = `
        <div class="container">
            <div class="alert-content">
                <div class="alert-info">
                    <h3>Berlangganan Job Alert</h3>
                    <p>Dapatkan notifikasi lowongan terbaru sesuai minat Anda</p>
                </div>
                <form class="alert-form">
                    <input type="email" placeholder="Email Anda" required>
                    <select required>
                        <option value="">Pilih Kategori</option>
                        <option value="marine">Marine Operations</option>
                        <option value="technical">Technical</option>
                        <option value="management">Management</option>
                        <option value="support">Support</option>
                    </select>
                    <button type="submit" class="btn btn-primary">Berlangganan</button>
                </form>
            </div>
        </div>
    `;
    
    const currentOpenings = document.querySelector('.current-openings');
    if (currentOpenings) {
        currentOpenings.parentNode.insertBefore(alertContainer, currentOpenings.nextSibling);
        
        const alertForm = alertContainer.querySelector('.alert-form');
        alertForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            const category = this.querySelector('select').value;
            
            if (isValidEmail(email) && category) {
                showNotification('Berhasil berlangganan job alert!', 'success');
                this.reset();
            } else {
                showNotification('Mohon lengkapi email dan kategori', 'error');
            }
        });
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\-\(\)\s]{10,}$/;
    return phoneRegex.test(phone);
}

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
        initJobSearch();
        initJobAlert();
    }, 1000);
});

// Export functions for external use
window.CareerManager = {
    filterJobs,
    showJobModal,
    performJobSearch
};
