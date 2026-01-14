// Digital Guardian - Main JavaScript
// Interactive components and functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initLoading();
    initNavigation();
    initAuthModal();
    initScrollEffects();
    initFormHandling();
    initMissions();
    initRoleCards();
    initTypingEffect();
    
    // Add cyberpunk classes to elements
    addCyberpunkEffects();
});

// Loading Screen
function initLoading() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingTexts = [
        'Initializing Security Protocols...',
        'Scanning for Threats...',
        'Establishing Secure Connection...',
        'Loading Guardian Network...',
        'Ready to Protect!'
    ];
    
    let textIndex = 0;
    const loadingText = document.querySelector('.loading-text');
    
    // Cycle through loading texts
    const textInterval = setInterval(() => {
        if (textIndex < loadingTexts.length - 1) {
            textIndex++;
            loadingText.textContent = loadingTexts[textIndex];
        }
    }, 400);
    
    // Hide loading screen after 3 seconds
    setTimeout(() => {
        clearInterval(textInterval);
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 600);
    }, 3000);
}

// Navigation
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 255, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 255, 0.1)';
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Update active nav link
                    navLinks.forEach(nl => nl.classList.remove('active'));
                    link.classList.add('active');
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Authentication Modal
function initAuthModal() {
    const modal = document.getElementById('auth-modal');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const closeBtn = document.querySelector('.close');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    // Open modal
    function openModal(tab = 'login') {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        switchTab(tab);
    }
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Switch between login and signup
    function switchTab(tabName) {
        authTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });
        
        authForms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${tabName}-form`) {
                form.classList.add('active');
            }
        });
    }
    
    // Event listeners
    loginBtn?.addEventListener('click', () => openModal('login'));
    signupBtn?.addEventListener('click', () => openModal('signup'));
    closeBtn?.addEventListener('click', closeModal);
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchTab(tab.dataset.tab);
        });
    });
    
    // Close modal when clicking outside
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .community-card, .mission-card, .role-card, .section-header'
    );
    
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
}

// Form Handling
function initFormHandling() {
    const loginForm = document.querySelector('#login-form form');
    const signupForm = document.querySelector('#signup-form form');
    
    // Login form
    loginForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simulate login
        showNotification('Welcome back, Guardian! 🛡️', 'success');
        document.getElementById('auth-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset form
        loginForm.reset();
    });
    
    // Signup form
    signupForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const role = document.getElementById('user-role').value;
        
        // Simulate signup
        const roleText = role === 'guardian' ? 'Guardian' : 'Protectee';
        showNotification(`Welcome to the community, ${name}! You are now a ${roleText} 🎉`, 'success');
        document.getElementById('auth-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Reset form
        signupForm.reset();
    });
}

// Mission Interactions
function initMissions() {
    const missionCards = document.querySelectorAll('.mission-card');
    
    missionCards.forEach(card => {
        const btn = card.querySelector('.btn');
        const progressFill = card.querySelector('.progress-fill');
        const progressText = card.querySelector('.mission-progress span');
        
        if (btn && !btn.disabled) {
            btn.addEventListener('click', () => {
                const missionTitle = card.querySelector('h3').textContent;
                
                if (btn.textContent.includes('Start')) {
                    // Start mission
                    showNotification(`Started mission: ${missionTitle}`, 'info');
                    btn.textContent = 'Continue Mission';
                    btn.classList.remove('btn-primary');
                    btn.classList.add('btn-outline');
                    
                    // Update progress
                    if (progressFill) {
                        progressFill.style.width = '25%';
                        progressText.textContent = '25% Complete';
                    }
                } else if (btn.textContent.includes('Continue')) {
                    // Continue mission
                    showNotification(`Continuing mission: ${missionTitle}`, 'info');
                    
                    // Simulate progress
                    const currentWidth = parseInt(progressFill.style.width) || 25;
                    const newWidth = Math.min(currentWidth + 25, 100);
                    progressFill.style.width = `${newWidth}%`;
                    
                    if (newWidth === 100) {
                        progressText.textContent = 'Completed';
                        btn.innerHTML = '<i class="fas fa-check"></i> Completed';
                        btn.classList.remove('btn-outline');
                        btn.classList.add('btn-success');
                        btn.disabled = true;
                        showNotification(`Completed mission: ${missionTitle}! +XP earned`, 'success');
                    } else {
                        progressText.textContent = `${newWidth}% Complete`;
                    }
                }
            });
        }
    });
}

// Role Card Interactions
function initRoleCards() {
    const guardianRole = document.getElementById('guardian-role');
    const protecteeRole = document.getElementById('protectee-role');
    
    function selectRole(roleType) {
        const modal = document.getElementById('auth-modal');
        const signupTab = document.querySelector('[data-tab="signup"]');
        const roleSelect = document.getElementById('user-role');
        
        // Open signup modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Switch to signup tab
        signupTab.click();
        
        // Pre-select role
        if (roleSelect) {
            roleSelect.value = roleType;
        }
    }
    
    guardianRole?.addEventListener('click', () => selectRole('guardian'));
    protecteeRole?.addEventListener('click', () => selectRole('protectee'));
    
    // Add hover sound effect (optional)
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Typing Effect for Hero Text
function initTypingEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        setTimeout(() => {
            typeText(heroSubtitle, originalText, 50);
        }, 3500); // Start after loading screen
    }
}

function typeText(element, text, speed) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Add cursor blink effect
            element.style.borderRight = '2px solid var(--primary-neon)';
            element.style.animation = 'blink-cursor 1s infinite';
        }
    }, speed);
}

// Add Cyberpunk Effects
function addCyberpunkEffects() {
    // Add scanning lines to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('scan-lines');
        }, index * 200);
    });
    
    // Add floating animation to icons
    const icons = document.querySelectorAll('.feature-icon, .community-icon, .mission-icon, .role-icon');
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('float-animation');
        }, index * 100);
    });
    
    // Add glitch effect to main title occasionally
    const mainTitle = document.querySelector('.hero-title');
    if (mainTitle) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 5 seconds
                mainTitle.classList.add('glitch');
                mainTitle.setAttribute('data-text', mainTitle.textContent);
                setTimeout(() => {
                    mainTitle.classList.remove('glitch');
                }, 500);
            }
        }, 5000);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">
                ${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}
            </span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--primary-neon);
        border-radius: var(--border-radius);
        padding: 1rem;
        min-width: 300px;
        max-width: 400px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 20px rgba(0, 255, 255, 0.2);
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes blink-cursor {
        0%, 50% { border-color: transparent; }
        51%, 100% { border-color: var(--primary-neon); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 1;
        transform: translateY(0);
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-primary);
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        cursor: pointer;
        font-size: 1.2rem;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        color: var(--primary-neon);
    }
    
    /* Initially hide animated elements */
    .feature-card,
    .community-card,
    .mission-card,
    .role-card,
    .section-header {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
`;

document.head.appendChild(style);

// Easter Eggs and Fun Interactions
function initEasterEggs() {
    let konami = [];
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', (e) => {
        konami.push(e.keyCode);
        if (konami.length > konamiCode.length) {
            konami.shift();
        }
        
        if (konami.join(',') === konamiCode.join(',')) {
            // Konami code activated!
            showNotification('🎮 Cheat code activated! You are now a legendary Digital Guardian!', 'success');
            document.body.style.animation = 'matrix-rain 2s ease-in-out';
            
            // Add extra neon glow to everything
            const style = document.createElement('style');
            style.textContent = `
                * {
                    text-shadow: 0 0 20px var(--primary-neon) !important;
                    box-shadow: 0 0 30px rgba(0, 255, 255, 0.5) !important;
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.head.removeChild(style);
                document.body.style.animation = '';
            }, 10000);
        }
    });
}

// Initialize easter eggs
setTimeout(initEasterEggs, 5000);

// Matrix rain effect for special occasions
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = '01デジタルガーディアン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = `${fontSize}px monospace`;
        
        drops.forEach((y, index) => {
            const text = letters[Math.floor(Math.random() * letters.length)];
            const x = index * fontSize;
            
            ctx.fillText(text, x, y * fontSize);
            
            if (y * fontSize > canvas.height && Math.random() > 0.975) {
                drops[index] = 0;
            }
            drops[index]++;
        });
    }
    
    const interval = setInterval(draw, 100);
    
    // Remove after 30 seconds
    setTimeout(() => {
        clearInterval(interval);
        document.body.removeChild(canvas);
    }, 30000);
}

// Expose global functions for console interaction
window.DigitalGuardian = {
    activateMatrixMode: createMatrixRain,
    showMessage: showNotification,
    version: '1.0.0'
};

console.log(`
  ██████╗ ██╗ ██████╗ ██╗████████╗ █████╗ ██╗     
  ██╔══██╗██║██╔════╝ ██║╚══██╔══╝██╔══██╗██║     
  ██║  ██║██║██║  ███╗██║   ██║   ███████║██║     
  ██║  ██║██║██║   ██║██║   ██║   ██╔══██║██║     
  ██████╔╝██║╚██████╔╝██║   ██║   ██║  ██║███████╗
  ╚═════╝ ╚═╝ ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝
                                                   
   ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗ ██╗ █████╗ ███╗   ██╗
  ██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗████╗  ██║
  ██║  ███╗██║   ██║███████║██████╔╝██║  ██║██║███████║██╔██╗ ██║
  ██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║██║██╔══██║██║╚██╗██║
  ╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝██║██║  ██║██║ ╚████║
   ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝

🛡️ Welcome to Digital Guardian v${window.DigitalGuardian.version}
🎮 Try the konami code for a surprise!
🌐 Type DigitalGuardian.activateMatrixMode() for some fun
💚 Built with love for women in cybersecurity
`);