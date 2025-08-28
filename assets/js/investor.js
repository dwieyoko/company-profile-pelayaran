// Investor Relations Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initShareholdersChart();
    initFinancialHighlights();
    initInvestorForm();
    initDocumentDownloads();
    initFinancialTable();
});

// Shareholders Chart
function initShareholdersChart() {
    const ctx = document.getElementById('shareholdersChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Publik', 'Institusi', 'Pendiri'],
            datasets: [{
                data: [45, 35, 20],
                backgroundColor: [
                    '#1e3a8a',
                    '#3b82f6',
                    '#0ea5e9'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Financial Highlights Animation
function initFinancialHighlights() {
    const highlightCards = document.querySelectorAll('.highlight-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueElement = entry.target.querySelector('.highlight-value');
                const changeElement = entry.target.querySelector('.highlight-change');
                
                // Animate value
                animateValue(valueElement);
                
                // Animate change indicator
                setTimeout(() => {
                    changeElement.style.opacity = '1';
                    changeElement.style.transform = 'translateY(0)';
                }, 500);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    highlightCards.forEach(card => {
        const changeElement = card.querySelector('.highlight-change');
        changeElement.style.opacity = '0';
        changeElement.style.transform = 'translateY(10px)';
        changeElement.style.transition = 'all 0.3s ease';
        
        observer.observe(card);
    });
}

function animateValue(element) {
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const isCurrency = text.includes('Rp');
    
    let numericValue = parseFloat(text.replace(/[^\d.]/g, ''));
    let suffix = '';
    
    if (isCurrency) {
        if (text.includes('T')) {
            suffix = ' T';
            numericValue = numericValue;
        } else if (text.includes('M')) {
            suffix = ' M';
            numericValue = numericValue;
        }
        suffix = 'Rp ' + suffix;
    } else if (isPercentage) {
        suffix = '%';
    }
    
    let current = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = current.toFixed(1);
        if (!isPercentage && !isCurrency) {
            displayValue = Math.floor(current).toLocaleString();
        }
        
        element.textContent = suffix.startsWith('Rp') ? 
            suffix.replace(' ', ' ' + displayValue) : 
            displayValue + suffix;
    }, 20);
}

// Investor Form
function initInvestorForm() {
    const investorForm = document.querySelector('form[data-form="investor"]');
    
    if (investorForm) {
        investorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Validate required fields
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
                return;
            }
            
            if (!isValidEmail(data.email)) {
                showNotification('Format email tidak valid', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Pesan Anda telah terkirim. Tim Investor Relations akan menghubungi Anda segera.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Document Downloads
function initDocumentDownloads() {
    const downloadButtons = document.querySelectorAll('.btn-download');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const documentTitle = this.closest('.document-item').querySelector('h4').textContent;
            
            // Show download animation
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
            this.style.pointerEvents = 'none';
            
            // Simulate download
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> Downloaded';
                
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    this.style.pointerEvents = 'auto';
                }, 2000);
                
                // Track download
                trackDocumentDownload(documentTitle);
            }, 1500);
        });
    });
}

function trackDocumentDownload(documentTitle) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            event_category: 'Investor Relations',
            event_label: documentTitle
        });
    }
    
    console.log(`Document downloaded: ${documentTitle}`);
}

// Financial Table Enhancement
function initFinancialTable() {
    const table = document.querySelector('.financial-table table');
    if (!table) return;
    
    // Add hover effects to rows
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--gray-100)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
    
    // Add sorting functionality
    const headers = table.querySelectorAll('th');
    headers.forEach((header, index) => {
        if (index === 0) return; // Skip first column (labels)
        
        header.style.cursor = 'pointer';
        header.innerHTML += ' <i class="fas fa-sort"></i>';
        
        header.addEventListener('click', function() {
            sortTable(table, index);
        });
    });
}

function sortTable(table, columnIndex) {
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    const sortedRows = rows.sort((a, b) => {
        const aValue = parseFloat(a.cells[columnIndex].textContent.replace(/,/g, ''));
        const bValue = parseFloat(b.cells[columnIndex].textContent.replace(/,/g, ''));
        return bValue - aValue; // Descending order
    });
    
    // Clear tbody and append sorted rows
    tbody.innerHTML = '';
    sortedRows.forEach(row => tbody.appendChild(row));
    
    // Update sort icons
    const headers = table.querySelectorAll('th');
    headers.forEach(header => {
        const icon = header.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-sort';
        }
    });
    
    const activeIcon = headers[columnIndex].querySelector('i');
    if (activeIcon) {
        activeIcon.className = 'fas fa-sort-down';
    }
}

// RUPS Information Enhancement
function initRUPSInfo() {
    const rupsItems = document.querySelectorAll('.rups-item');
    
    rupsItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.rups-title').textContent;
            showRUPSDetails(title);
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--gray-100)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });
}

function showRUPSDetails(title) {
    // Create modal for RUPS details
    const modal = document.createElement('div');
    modal.className = 'rups-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Detail informasi RUPS akan ditampilkan di sini.</p>
                <div class="rups-documents">
                    <a href="#" class="btn btn-primary">Download Hasil RUPS</a>
                    <a href="#" class="btn btn-outline">Download Presentasi</a>
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
    modal.querySelector('.modal-overlay').addEventListener('click', () => closeRUPSModal(modal));
    modal.querySelector('.modal-close').addEventListener('click', () => closeRUPSModal(modal));
}

function closeRUPSModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Dividend Chart
function initDividendChart() {
    const dividendData = [
        { year: '2021', amount: 120, yield: 2.7 },
        { year: '2022', amount: 135, yield: 2.9 },
        { year: '2023', amount: 150, yield: 3.2 }
    ];
    
    // Create simple bar chart for dividend history
    const chartContainer = document.querySelector('.dividend-info');
    if (!chartContainer) return;
    
    const chartHTML = `
        <div class="dividend-chart">
            <h4>Tren Dividen</h4>
            <div class="chart-bars">
                ${dividendData.map(data => `
                    <div class="chart-bar">
                        <div class="bar" style="height: ${(data.amount / 150) * 100}%"></div>
                        <div class="bar-label">${data.year}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    chartContainer.insertAdjacentHTML('afterend', chartHTML);
}

// Email Alerts Subscription
function initEmailAlerts() {
    const alertsContainer = document.createElement('div');
    alertsContainer.className = 'email-alerts';
    alertsContainer.innerHTML = `
        <div class="alerts-content">
            <h4>Berlangganan Alert Email</h4>
            <p>Dapatkan notifikasi untuk laporan keuangan dan pengumuman penting</p>
            <form class="alerts-form">
                <input type="email" placeholder="Email Anda" required>
                <button type="submit" class="btn btn-primary">Berlangganan</button>
            </form>
        </div>
    `;
    
    const investorContact = document.querySelector('.investor-contact');
    if (investorContact) {
        investorContact.parentNode.insertBefore(alertsContainer, investorContact);
        
        const alertsForm = alertsContainer.querySelector('.alerts-form');
        alertsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input').value;
            
            if (isValidEmail(email)) {
                showNotification('Berhasil berlangganan alert email!', 'success');
                this.reset();
            } else {
                showNotification('Format email tidak valid', 'error');
            }
        });
    }
}

// Utility Functions
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
        initRUPSInfo();
        initDividendChart();
        initEmailAlerts();
    }, 1000);
});

// Export functions for external use
window.InvestorManager = {
    initShareholdersChart,
    trackDocumentDownload,
    showRUPSDetails
};
