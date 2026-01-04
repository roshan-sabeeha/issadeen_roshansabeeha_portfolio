// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme or prefer-color-scheme
const savedTheme = localStorage.getItem('theme') || 
                  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
body.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add animation to toggle button
    themeToggle.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0)';
    }, 300);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        menuToggle.style.transform = navMenu.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.style.transform = 'rotate(0)';
    });
});

// Bottom navigation
const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
bottomNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        bottomNavLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Enhanced form submission with beautiful notifications
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button and show loading
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Show loading animation in message area
        formMessage.innerHTML = `
            <div class="notification loading">
                <div class="notification-icon">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
                <div class="notification-content">
                    <h4>Sending your message</h4>
                    <p>Please wait while we deliver your message...</p>
                </div>
            </div>
        `;
        
        try {
            const formData = new FormData(this);
            
            const response = await fetch('send_email.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                // Success notification
                formMessage.innerHTML = `
                    <div class="notification success">
                        <div class="notification-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="notification-content">
                            <h4>Message Sent Successfully!</h4>
                            <p>${result.message} A confirmation has been sent to your email.</p>
                        </div>
                        <div class="notification-close" onclick="this.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                `;
                
                // Reset form with animation
                this.style.opacity = '0.5';
                setTimeout(() => {
                    this.reset();
                    this.style.opacity = '1';
                    
                    // Add success animation to form
                    this.classList.add('form-success');
                    setTimeout(() => {
                        this.classList.remove('form-success');
                    }, 2000);
                }, 500);
                
                // Show celebration animation
                showConfetti();
                
            } else {
                // Error notification
                formMessage.innerHTML = `
                    <div class="notification error">
                        <div class="notification-icon">
                            <i class="fas fa-exclamation-circle"></i>
                        </div>
                        <div class="notification-content">
                            <h4>Message Not Sent</h4>
                            <p>${result.message}</p>
                        </div>
                        <div class="notification-close" onclick="this.parentElement.remove()">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                `;
            }
            
        } catch (error) {
            // Network error notification
            formMessage.innerHTML = `
                <div class="notification error">
                    <div class="notification-icon">
                        <i class="fas fa-wifi"></i>
                    </div>
                    <div class="notification-content">
                        <h4>Network Error</h4>
                        <p>Please check your internet connection and try again.</p>
                    </div>
                    <div class="notification-close" onclick="this.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
            `;
        } finally {
            // Re-enable submit button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Confetti animation for success
function showConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(confettiContainer);
    
    // Create confetti particles
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: ${getRandomColor()};
            top: -20px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            left: ${Math.random() * 100}%;
            animation: confetti-fall ${1 + Math.random() * 2}s linear forwards;
            opacity: ${0.7 + Math.random() * 0.3};
        `;
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 3000);
}

function getRandomColor() {
    const colors = [
        '#6a11cb', '#2575fc', '#ff7e5f', '#f46b45', 
        '#fa709a', '#fee140', '#a8edea', '#fed6e3'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    /* Notification Styles */
    .notification {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        margin: 15px 0;
        border-radius: 10px;
        animation: slideIn 0.3s ease;
        position: relative;
    }
    
    .notification.loading {
        background: linear-gradient(135deg, #e3f2fd, #bbdefb);
        border-left: 4px solid #2196f3;
    }
    
    .notification.success {
        background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
        border-left: 4px solid #4caf50;
    }
    
    .notification.error {
        background: linear-gradient(135deg, #ffebee, #ffcdd2);
        border-left: 4px solid #f44336;
    }
    
    .notification-icon {
        font-size: 24px;
        margin-right: 15px;
    }
    
    .notification.loading .notification-icon {
        color: #2196f3;
    }
    
    .notification.success .notification-icon {
        color: #4caf50;
    }
    
    .notification.error .notification-icon {
        color: #f44336;
    }
    
    .notification-content h4 {
        margin: 0 0 5px 0;
        font-size: 16px;
    }
    
    .notification-content p {
        margin: 0;
        font-size: 14px;
        opacity: 0.9;
    }
    
    .notification-close {
        margin-left: auto;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    /* Form Success Animation */
    .form-success {
        animation: formPulse 2s ease;
    }
    
    /* Confetti Animation */
    @keyframes confetti-fall {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
        }
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes formPulse {
        0%, 100% {
            box-shadow: 0 0 0 rgba(106, 17, 203, 0);
        }
        50% {
            box-shadow: 0 0 30px rgba(106, 17, 203, 0.3);
        }
    }
    
    /* Floating label animation */
    .form-group {
        position: relative;
        margin-bottom: 25px;
    }
    
    .form-group label {
        position: absolute;
        top: 12px;
        left: 15px;
        color: #666;
        transition: all 0.3s ease;
        pointer-events: none;
        background: var(--card-bg);
        padding: 0 5px;
    }
    
    .form-group input:focus + label,
    .form-group textarea:focus + label,
    .form-group input:not(:placeholder-shown) + label,
    .form-group textarea:not(:placeholder-shown) + label {
        top: -10px;
        left: 10px;
        font-size: 12px;
        color: var(--primary-color);
    }
    
    .form-group input,
    .form-group textarea {
        padding: 15px;
        border: 2px solid var(--border-color);
        transition: all 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        border-color: var(--primary-color);
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(106, 17, 203, 0.1);
    }
`;
document.head.appendChild(style);

// Update form HTML to support floating labels
document.addEventListener('DOMContentLoaded', function() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        
        if (input && label) {
            // Add placeholder for floating label effect
            if (!input.placeholder) {
                input.placeholder = ' ';
            }
            
            // Move label inside input
            group.insertBefore(input, label);
            
            // Check if input has value on page load
            if (input.value) {
                label.style.top = '-10px';
                label.style.left = '10px';
                label.style.fontSize = '12px';
                label.style.color = 'var(--primary-color)';
            }
        }
    });
});




// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to nav links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
    
    // Update bottom nav
    bottomNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Back to top button
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animation]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            const animation = element.getAttribute('data-animation');
            const delay = element.getAttribute('data-delay') || 0;
            
            setTimeout(() => {
                element.classList.add('animate__animated', `animate__${animation}`);
                
                // Add specific classes for timeline and experience cards
                if (element.classList.contains('timeline-item')) {
                    element.classList.add('animated');
                }
                if (element.classList.contains('experience-card')) {
                    element.classList.add('animated');
                }
                
                // Add animated class for general scroll animations
                element.classList.add('animated');
            }, delay);
        }
    });
};

// Initialize scroll animation
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Language bars animation
const animateLanguageBars = () => {
    const languageBars = document.querySelectorAll('.language-level');
    
    languageBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
};

// Initialize language bars animation
window.addEventListener('load', () => {
    setTimeout(animateLanguageBars, 1000);
});

// Skills hover effect
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Loader animation (optional)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation for theme toggle
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 't') {
        e.preventDefault();
        themeToggle.click();
    }
});


// Skills Orbital System Interactivity
const initSkillsOrbital = () => {
    const skillIcons = document.querySelectorAll('.skill-icon');
    const centralIcon = document.querySelector('.central-icon');
    
    // Add click functionality to skill icons
    skillIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const tooltip = this.getAttribute('data-tooltip');
            
            // Add click animation
            this.style.transform = 'translateX(-50%) scale(0.9)';
            this.style.transition = 'transform 0.2s ease';
            
            setTimeout(() => {
                this.style.transform = 'translateX(-50%) scale(1.15)';
            }, 200);
            
            setTimeout(() => {
                this.style.transform = 'translateX(-50%) scale(1)';
            }, 400);
            
            // Navigate to relevant section based on skill
            const skillMap = {
                'Communication': '#skills',
                'Leadership': '#skills',
                'Education': '#qualifications',
                'ICT Skills': '#qualifications',
                'Experience': '#experience',
                'Problem Solving': '#skills'
            };
            
            const targetSection = skillMap[tooltip];
            if (targetSection) {
                const section = document.querySelector(targetSection);
                if (section) {
                    window.scrollTo({
                        top: section.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Central icon click functionality
    if (centralIcon) {
        centralIcon.addEventListener('click', function() {
            // Pulse animation
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse-glow 4s ease-in-out infinite';
            }, 100);
            
            // Navigate to about section
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Mouse move parallax effect
    const orbitalSystem = document.querySelector('.skills-orbital-system');
    if (orbitalSystem) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            orbitalSystem.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
        
        // Reset on mouse leave
        orbitalSystem.parentElement.addEventListener('mouseleave', () => {
            orbitalSystem.style.transform = 'rotateY(0deg) rotateX(0deg)';
            orbitalSystem.style.transition = 'transform 0.5s ease';
        });
        
        // Reset transition
        orbitalSystem.parentElement.addEventListener('mouseenter', () => {
            orbitalSystem.style.transition = 'none';
        });
    }
    
    // Randomize animation speeds for natural look
    const orbits = document.querySelectorAll('.orbit');
    orbits.forEach(orbit => {
        const randomSpeed = 0.8 + Math.random() * 0.4;
        orbit.style.animationDuration = `${parseFloat(getComputedStyle(orbit).animationDuration) * randomSpeed}s`;
    });
};

// Initialize when page loads
window.addEventListener('load', () => {
    setTimeout(initSkillsOrbital, 1000);
});

// Pause animations when not in viewport for performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const orbitalSystem = entry.target.querySelector('.skills-orbital-system');
        if (orbitalSystem) {
            if (entry.isIntersecting) {
                orbitalSystem.style.animationPlayState = 'running';
                orbitalSystem.querySelectorAll('.orbit, .ring').forEach(el => {
                    el.style.animationPlayState = 'running';
                });
            } else {
                orbitalSystem.style.animationPlayState = 'paused';
                orbitalSystem.querySelectorAll('.orbit, .ring').forEach(el => {
                    el.style.animationPlayState = 'paused';
                });
            }
        }
    });
}, observerOptions);

// Observe hero section
const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}