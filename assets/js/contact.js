// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFAQ();
    initScheduleMeeting();
    initMapInteractions();
});

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Phone number formatting
        const phoneInput = contactForm.querySelector('#phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', formatPhoneNumber);
        }
    }
}

function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        services: formData.getAll('services[]'),
        message: formData.get('message'),
        privacy: formData.get('privacy')
    };
    
    // Validate required fields
    if (!validateContactForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Pesan Anda telah terkirim! Tim kami akan menghubungi Anda dalam 24 jam.', 'success');
        this.reset();
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
        
        // Track form submission
        trackContactSubmission(data.subject);
    }, 2000);
}

function validateContactForm(data) {
    let isValid = true;
    
    // Required field validation
    if (!data.name.trim()) {
        showFieldError('name', 'Nama lengkap wajib diisi');
        isValid = false;
    }
    
    if (!data.email.trim()) {
        showFieldError('email', 'Email wajib diisi');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showFieldError('email', 'Format email tidak valid');
        isValid = false;
    }
    
    if (!data.phone.trim()) {
        showFieldError('phone', 'Nomor telepon wajib diisi');
        isValid = false;
    } else if (!isValidPhone(data.phone)) {
        showFieldError('phone', 'Format nomor telepon tidak valid');
        isValid = false;
    }
    
    if (!data.subject) {
        showFieldError('subject', 'Subjek wajib dipilih');
        isValid = false;
    }
    
    if (!data.message.trim()) {
        showFieldError('message', 'Pesan wajib diisi');
        isValid = false;
    } else if (data.message.trim().length < 10) {
        showFieldError('message', 'Pesan minimal 10 karakter');
        isValid = false;
    }
    
    if (!data.privacy) {
        showFieldError('privacy', 'Anda harus menyetujui kebijakan privasi');
        isValid = false;
    }
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearFieldError(field.name);
    
    switch(field.name) {
        case 'name':
            if (!value) {
                showFieldError('name', 'Nama lengkap wajib diisi');
            }
            break;
        case 'email':
            if (!value) {
                showFieldError('email', 'Email wajib diisi');
            } else if (!isValidEmail(value)) {
                showFieldError('email', 'Format email tidak valid');
            }
            break;
        case 'phone':
            if (!value) {
                showFieldError('phone', 'Nomor telepon wajib diisi');
            } else if (!isValidPhone(value)) {
                showFieldError('phone', 'Format nomor telepon tidak valid');
            }
            break;
        case 'message':
            if (!value) {
                showFieldError('message', 'Pesan wajib diisi');
            } else if (value.length < 10) {
                showFieldError('message', 'Pesan minimal 10 karakter');
            }
            break;
    }
}

function showFieldError(fieldName, message) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    // Remove existing error
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error class and message
    field.classList.add('error');
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
}

function clearFieldError(fieldName) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    if (!field) return;
    
    field.classList.remove('error');
    const formGroup = field.closest('.form-group');
    if (formGroup) {
        const errorElement = formGroup.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

function formatPhoneNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    // Format Indonesian phone number
    if (value.startsWith('62')) {
        value = '+' + value;
    } else if (value.startsWith('0')) {
        value = '+62' + value.substring(1);
    } else if (value.length > 0 && !value.startsWith('+')) {
        value = '+62' + value;
    }
    
    e.target.value = value;
}

// FAQ Section
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherItem.querySelector('.faq-question i');
                    otherAnswer.style.maxHeight = null;
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Schedule Meeting
function initScheduleMeeting() {
    const scheduleBtns = document.querySelectorAll('.schedule-meeting');
    
    scheduleBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showScheduleModal();
        });
    });
}

function showScheduleModal() {
    const modal = document.createElement('div');
    modal.className = 'schedule-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>Jadwalkan Meeting</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <form class="schedule-form">
                    <div class="form-group">
                        <label>Nama Lengkap *</label>
                        <input type="text" name="name" required>
                    </div>
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label>Nomor Telepon *</label>
                        <input type="tel" name="phone" required>
                    </div>
                    <div class="form-group">
                        <label>Tanggal Preferensi *</label>
                        <input type="date" name="date" required min="${new Date().toISOString().split('T')[0]}">
                    </div>
                    <div class="form-group">
                        <label>Waktu Preferensi *</label>
                        <select name="time" required>
                            <option value="">Pilih Waktu</option>
                            <option value="09:00">09:00 WIB</option>
                            <option value="10:00">10:00 WIB</option>
                            <option value="11:00">11:00 WIB</option>
                            <option value="13:00">13:00 WIB</option>
                            <option value="14:00">14:00 WIB</option>
                            <option value="15:00">15:00 WIB</option>
                            <option value="16:00">16:00 WIB</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Topik Meeting</label>
                        <textarea name="topic" rows="3" placeholder="Jelaskan topik yang ingin dibahas..."></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-outline modal-close-btn">Batal</button>
                        <button type="submit" class="btn btn-primary">Jadwalkan</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Show modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal events
    modal.querySelector('.modal-overlay').addEventListener('click', () => closeScheduleModal(modal));
    modal.querySelector('.modal-close').addEventListener('click', () => closeScheduleModal(modal));
    modal.querySelector('.modal-close-btn').addEventListener('click', () => closeScheduleModal(modal));
    
    // Form submission
    modal.querySelector('.schedule-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.name || !data.email || !data.phone || !data.date || !data.time) {
            showNotification('Mohon lengkapi semua field yang wajib diisi', 'error');
            return;
        }
        
        // Show success message
        showNotification('Meeting berhasil dijadwalkan! Kami akan mengirim konfirmasi melalui email.', 'success');
        closeScheduleModal(modal);
    });
}

function closeScheduleModal(modal) {
    modal.classList.remove('active');
    setTimeout(() => {
        document.body.removeChild(modal);
    }, 300);
}

// Map Interactions
function initMapInteractions() {
    // Copy address functionality - Define globally
    if (typeof window.copyAddress === 'undefined') {
        window.copyAddress = function() {
            const address = 'Jl. Pelabuhan Raya No. 123, Tanjung Priok, Jakarta Utara, DKI Jakarta 14450';

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(address).then(() => {
                    showNotification('Alamat berhasil disalin!', 'success');
                }).catch(() => {
                    fallbackCopyAddress(address);
                });
            } else {
                fallbackCopyAddress(address);
            }
        };
    }

    function fallbackCopyAddress(address) {
        try {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = address;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                showNotification('Alamat berhasil disalin!', 'success');
            } else {
                showNotification('Gagal menyalin alamat. Silakan salin manual.', 'error');
            }
        } catch (err) {
            showNotification('Gagal menyalin alamat. Silakan salin manual.', 'error');
        }
    }
    
    // Map placeholder click
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('click', function() {
            window.open('https://maps.google.com/?q=Jl.+Pelabuhan+Raya+No.+123,+Tanjung+Priok,+Jakarta+Utara', '_blank');
        });
    }
}

// Contact Card Animations
function initContactCardAnimations() {
    const contactCards = document.querySelectorAll('.contact-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
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

function trackContactSubmission(subject) {
    // Analytics tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'contact_form_submit', {
            event_category: 'Contact',
            event_label: subject
        });
    }
    
    console.log(`Contact form submitted with subject: ${subject}`);
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initContactCardAnimations();
    }, 500);
});

// Export functions for external use
window.ContactManager = {
    showScheduleModal,
    copyAddress,
    validateContactForm
};
