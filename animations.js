// Digital Guardian - Animation Effects
// Advanced animations and visual effects

// Particle System for Background
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.animationId = null;
        
        this.init();
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.6';
        
        this.container.appendChild(canvas);
        return canvas;
    }
    
    init() {
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.6 + 0.2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = ['#00ffff', '#ff00ff', '#00ff00'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
        
        // Draw connections
        this.drawConnections();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const opacity = (100 - distance) / 100 * 0.2;
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = opacity;
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.shadowColor = particle.color;
                    this.ctx.shadowBlur = 2;
                    
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                    
                    this.ctx.restore();
                }
            });
        });
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Text Scramble Effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.getRandomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    getRandomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Morphing Card Effect
class MorphingCards {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card, .community-card, .mission-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            this.addMorphEffect(card);
        });
    }
    
    addMorphEffect(card) {
        card.addEventListener('mouseenter', () => {
            this.morphCard(card, true);
        });
        
        card.addEventListener('mouseleave', () => {
            this.morphCard(card, false);
        });
    }
    
    morphCard(card, isHover) {
        const duration = 300;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = this.easeOutCubic(progress);
            
            if (isHover) {
                const scale = 1 + (eased * 0.05);
                const rotateX = eased * 5;
                const glowIntensity = eased * 0.3;
                
                card.style.transform = `scale(${scale}) rotateX(${rotateX}deg) translateY(-${eased * 10}px)`;
                card.style.boxShadow = `0 ${10 + eased * 20}px ${30 + eased * 20}px rgba(0, 255, 255, ${glowIntensity})`;
            } else {
                const scale = 1.05 - (eased * 0.05);
                const rotateX = 5 - (eased * 5);
                const glowIntensity = 0.3 - (eased * 0.3);
                const translateY = 10 - (eased * 10);
                
                card.style.transform = `scale(${scale}) rotateX(${rotateX}deg) translateY(-${translateY}px)`;
                card.style.boxShadow = `0 ${30 - eased * 20}px ${50 - eased * 20}px rgba(0, 255, 255, ${glowIntensity})`;
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        animate();
    }
    
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// Cyber Grid Effect
class CyberGrid {
    constructor(container) {
        this.container = container;
        this.canvas = this.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 40;
        this.animationId = null;
        
        this.init();
    }
    
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        
        this.container.style.position = 'relative';
        this.container.appendChild(canvas);
        return canvas;
    }
    
    init() {
        this.resize();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const time = Date.now() * 0.001;
        
        // Draw vertical lines
        for (let x = 0; x < this.canvas.width; x += this.gridSize) {
            const opacity = (Math.sin(time + x * 0.01) + 1) * 0.1;
            this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        // Draw horizontal lines
        for (let y = 0; y < this.canvas.height; y += this.gridSize) {
            const opacity = (Math.sin(time + y * 0.01) + 1) * 0.1;
            this.ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize all animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system for hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const particleSystem = new ParticleSystem(heroSection);
    }
    
    // Initialize cyber grid for features section
    const featuresSection = document.querySelector('.features');
    if (featuresSection) {
        const cyberGrid = new CyberGrid(featuresSection);
    }
    
    // Initialize morphing cards
    const morphingCards = new MorphingCards();
    
    // Initialize text scramble for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const scrambleEffects = [];
    
    sectionTitles.forEach(title => {
        const scramble = new TextScramble(title);
        scrambleEffects.push(scramble);
        
        // Trigger scramble effect when section comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const originalText = entry.target.textContent;
                    scramble.setText(originalText);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(title);
    });
    
    // Add pulsing effect to mission points
    const missionPoints = document.querySelectorAll('.mission-points');
    missionPoints.forEach(point => {
        point.addEventListener('mouseenter', () => {
            point.style.animation = 'points-pulse 0.3s ease-out';
        });
        
        point.addEventListener('animationend', () => {
            point.style.animation = 'points-glow 2s ease-in-out infinite alternate';
        });
    });
    
    // Add typing sound effect simulation
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            // Visual feedback for typing
            input.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.5), inset 0 0 15px rgba(0, 255, 255, 0.1)';
            
            setTimeout(() => {
                input.style.boxShadow = '0 0 10px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)';
            }, 100);
        });
    });
    
    // Add glitch effect to random elements occasionally
    setInterval(() => {
        const glitchableElements = document.querySelectorAll('h1, h2, h3, .neon-text');
        const randomElement = glitchableElements[Math.floor(Math.random() * glitchableElements.length)];
        
        if (randomElement && Math.random() < 0.1) { // 10% chance
            randomElement.classList.add('glitch');
            randomElement.setAttribute('data-text', randomElement.textContent);
            
            setTimeout(() => {
                randomElement.classList.remove('glitch');
            }, 200);
        }
    }, 3000);
    
    // Add breathing effect to icons
    const icons = document.querySelectorAll('.feature-icon i, .community-icon i, .mission-icon i');
    icons.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.animation = `icon-breathe ${2 + Math.random()}s ease-in-out infinite alternate`;
        }, index * 200);
    });
});

// Add additional CSS animations
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes points-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes icon-breathe {
        0% { 
            transform: scale(1);
            text-shadow: 0 0 10px currentColor;
        }
        100% { 
            transform: scale(1.05);
            text-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
        }
    }
    
    .dud {
        color: rgba(0, 255, 255, 0.5);
    }
    
    /* Enhanced card hover states */
    .feature-card,
    .community-card,
    .mission-card {
        transform-style: preserve-3d;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        perspective: 1000px;
    }
    
    /* Smooth transitions for all interactive elements */
    .btn,
    .nav-link,
    .role-card,
    .social-link {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    /* Add subtle animation to loading bar */
    .loading-progress {
        background: linear-gradient(90deg, var(--primary-neon), var(--secondary-neon));
        animation: loading-progress 2s ease-in-out, progress-glow 1s ease-in-out infinite alternate;
    }
    
    @keyframes progress-glow {
        0% {
            box-shadow: 0 0 5px var(--primary-neon);
        }
        100% {
            box-shadow: 0 0 15px var(--primary-neon), 0 0 25px var(--secondary-neon);
        }
    }
    
    /* Add subtle parallax effect to background elements */
    .hero-background {
        animation: parallax-float 20s ease-in-out infinite;
    }
    
    @keyframes parallax-float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        25% {
            transform: translateY(-10px) rotate(1deg);
        }
        50% {
            transform: translateY(-5px) rotate(0deg);
        }
        75% {
            transform: translateY(-15px) rotate(-1deg);
        }
    }
`;

document.head.appendChild(additionalStyles);

// Expose animation classes globally for dynamic use
window.DigitalGuardianAnimations = {
    ParticleSystem,
    TextScramble,
    MorphingCards,
    CyberGrid
};