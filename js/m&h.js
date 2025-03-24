/**
 * Mining & Heavy Equipment Page JavaScript
 * Handles animations, interactive elements, and dynamic content
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactive elements
    initHeroAnimations();
    initParticleSystem();
    initEquipmentAnimations();
    initChallengeCards();
    initFeatureCards();
    initScrollAnimations();
    initTiltAngleSimulation();
    initTiltEffect();
    
    // Window resize handler
    window.addEventListener('resize', function() {
        resizeParticleCanvas();
    });
});

/**
 * Initialize hero section animations
 */
function initHeroAnimations() {
    // Staggered entrance for hero content
    anime({
        targets: '.hero-content > *',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        easing: 'easeOutQuad',
        duration: 800
    });
    
    // Enhanced glow animations
    anime({
        targets: '.glow-red-large',
        scale: [0.8, 1.2],
        opacity: [0.4, 0.7],
        easing: 'easeInOutSine',
        duration: 4000,
        loop: true,
        direction: 'alternate'
    });
    
    anime({
        targets: '.glow-red-small',
        scale: [1, 1.5],
        opacity: [0.3, 0.6],
        easing: 'easeInOutQuad',
        duration: 3000,
        loop: true,
        direction: 'alternate',
        delay: 1000
    });
    
    // Grid pattern animation
    anime({
        targets: '.enhanced-grid',
        backgroundPosition: ['0px 0px', '20px 20px'],
        easing: 'linear',
        duration: 20000,
        loop: true
    });
    
    // Dust particles animation
    const dustParticles = document.querySelectorAll('.dust-particle');
    dustParticles.forEach((particle, index) => {
        const delay = index * 1000;
        const duration = 15000 + (Math.random() * 10000);
        
        anime({
            targets: particle,
            translateX: function() { return [0, anime.random(-100, 100)]; },
            translateY: function() { return [0, anime.random(-50, -150)]; },
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5],
            delay: delay,
            duration: duration,
            easing: 'easeOutQuad',
            loop: true
        });
    });
}

/**
 * Initialize particle system for dynamic background
 */
function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.resizeParticleCanvas = resizeCanvas;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = Math.random() > 0.8 ? '#e62e2e' : '#444';
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        
        draw() {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function createParticles() {
        const particleCount = Math.floor(canvas.width * canvas.height / 15000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    createParticles();
    animateParticles();
}

/**
 * Initialize equipment SVG animations
 */
function initEquipmentAnimations() {
    // Mining equipment animation in hero section
    anime({
        targets: '.mining-equipment-svg g',
        opacity: [0, 0.8],
        translateY: [30, 0],
        delay: anime.stagger(300),
        easing: 'easeOutQuad',
        duration: 1000
    });
    
    // Add drop shadow effect to SVG elements
    const svgElements = document.querySelectorAll('.mining-equipment-svg g, .tilt-angle-svg, .shovel-svg g, .excavator-svg g, .mining-truck-svg g');
    svgElements.forEach(element => {
        element.style.filter = 'drop-shadow(0 0 5px rgba(230, 46, 46, 0.3))';
    });
    
    // Excavator animation
    anime({
        targets: '.excavator-bucket',
        rotate: [-5, 5],
        duration: 3000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
    
    // Mining truck wheel rotation
    anime({
        targets: '.truck-wheel',
        rotate: [0, 360],
        duration: 8000,
        easing: 'linear',
        loop: true
    });
    
    // Shovel arm animation
    anime({
        targets: '.shovel-bucket',
        translateY: [-5, 5],
        duration: 2000,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });
}

/**
 * Initialize interactive challenge cards
 */
function initChallengeCards() {
    const cards = document.querySelectorAll('.challenge-card');
    
    // Entrance animation
    anime({
        targets: '.challenge-card',
        scale: [0.9, 1],
        opacity: [0, 1],
        delay: anime.stagger(200),
        easing: 'easeOutSine',
        duration: 800,
        begin: function() {
            cards.forEach(card => {
                card.style.opacity = '0';
            });
        }
    });
    
    // Add hover interactions
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                scale: 1.05,
                boxShadow: '0 15px 30px rgba(0,0,0,0.3), 0 0 20px rgba(230,46,46,0.4)',
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            // Animate the icon
            const icon = card.querySelector('.challenge-icon i');
            anime({
                targets: icon,
                rotate: '+=15',
                scale: 1.2,
                color: '#e62e2e',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                scale: 1,
                boxShadow: '0 10px 20px rgba(0,0,0,0.15), 0 0 10px rgba(230,46,46,0.2)',
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            // Reset the icon
            const icon = card.querySelector('.challenge-icon i');
            anime({
                targets: icon,
                rotate: '-=15',
                scale: 1,
                color: '#fff',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
}

/**
 * Initialize interactive feature cards
 */
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Entrance animation
    anime({
        targets: '.feature-card',
        translateY: [40, 0],
        opacity: [0, 1],
        delay: anime.stagger(200),
        easing: 'easeOutQuad',
        duration: 800,
        begin: function() {
            featureCards.forEach(card => {
                card.style.opacity = '0';
            });
        }
    });
    
    // Add hover interactions for feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                translateY: -10,
                boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 25px rgba(230,46,46,0.4)',
                duration: 400,
                easing: 'easeOutQuad'
            });
            
            // Animate feature list
            const listItems = card.querySelectorAll('.feature-list li');
            anime({
                targets: listItems,
                translateX: [0, 10],
                opacity: [0.7, 1],
                delay: anime.stagger(100),
                duration: 300,
                easing: 'easeOutSine'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                translateY: 0,
                boxShadow: '0 10px 20px rgba(0,0,0,0.15), 0 0 15px rgba(230,46,46,0.2)',
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // Why choose us animation
    anime({
        targets: '.benefit-item',
        translateX: [-30, 0],
        opacity: [0, 1],
        delay: anime.stagger(150),
        easing: 'easeOutSine',
        duration: 800,
        begin: function() {
            document.querySelectorAll('.benefit-item').forEach(item => {
                item.style.opacity = '0';
            });
        }
    });
    
    // Add hover effect to benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.benefit-icon i');
            anime({
                targets: icon,
                scale: 1.2,
                rotate: '+=10',
                color: '#e62e2e',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.benefit-icon i');
            anime({
                targets: icon,
                scale: 1,
                rotate: '-=10',
                color: '#fff',
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    });
    
    // CTA animation
    anime({
        targets: '.cta-content',
        scale: [0.95, 1],
        opacity: [0, 1],
        easing: 'easeOutQuad',
        duration: 1000
    });
    
    // Add glow effect to CTA button
    const ctaButton = document.querySelector('.cta-glow');
    if (ctaButton) {
        anime({
            targets: ctaButton,
            boxShadow: [
                '0 0 5px rgba(230,46,46,0.5)',
                '0 0 20px rgba(230,46,46,0.7)',
                '0 0 5px rgba(230,46,46,0.5)'
            ],
            duration: 2000,
            easing: 'easeInOutSine',
            direction: 'alternate',
            loop: true
        });
    }
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Apply different animations based on section type
                if (entry.target.classList.contains('challenges-section')) {
                    animateTiltAngle();
                }
                
                if (entry.target.classList.contains('transform-section')) {
                    animateShovel();
                }
                
                if (entry.target.classList.contains('why-choose-section')) {
                    animateExcavator();
                }
                
                if (entry.target.classList.contains('cta-section')) {
                    animateMiningTruck();
                }
                
                fadeInUpObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        fadeInUpObserver.observe(section);
    });
}

/**
 * Animate tilt angle SVG when scrolled into view
 */
function animateTiltAngle() {
    anime({
        targets: '.tilt-gauge-line',
        rotate: [-20, 20],
        transformOrigin: '0% 100%',
        duration: 5000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
    
    anime({
        targets: '.tilt-indicator',
        translateX: function(el) {
            const x = parseInt(el.getAttribute('cx'));
            return [x - 20, x + 20];
        },
        translateY: function(el) {
            const y = parseInt(el.getAttribute('cy'));
            return [y + 10, y - 10];
        },
        duration: 5000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
    
    anime({
        targets: '.tilt-warning-zone',
        opacity: [0.3, 0.7],
        duration: 2000,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });
}

/**
 * Animate shovel SVG when scrolled into view
 */
function animateShovel() {
    anime({
        targets: '.shovel-svg',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutQuad'
    });
    
    anime({
        targets: '.shovel-boom',
        rotate: [-2, 2],
        transformOrigin: '100% 50%',
        duration: 3000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
    
    anime({
        targets: '.shovel-bucket',
        rotate: [-5, 5],
        transformOrigin: '100% 0%',
        duration: 2000,
        delay: 1000,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });
}

/**
 * Animate excavator SVG when scrolled into view
 */
function animateExcavator() {
    anime({
        targets: '.excavator-svg',
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 1000,
        easing: 'easeOutQuad'
    });
    
    anime({
        targets: '.excavator-boom',
        rotate: [-3, 3],
        transformOrigin: '100% 50%',
        duration: 4000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
    
    anime({
        targets: '.excavator-arm',
        rotate: [-5, 5],
        transformOrigin: '0% 0%',
        duration: 3000,
        delay: 500,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });
    
    anime({
        targets: '.excavator-bucket',
        rotate: [-10, 10],
        transformOrigin: '50% 0%',
        duration: 2000,
        delay: 1000,
        easing: 'easeInOutExpo',
        direction: 'alternate',
        loop: true
    });
}

/**
 * Animate mining truck SVG when scrolled into view
 */
function animateMiningTruck() {
    // Initial appearance
    anime({
        targets: '.mining-truck-svg',
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 1500,
        easing: 'easeOutQuad'
    });
    
    // Continuous bouncing movement
    anime({
        targets: '.truck-body',
        translateY: [-3, 3],
        duration: 1000,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true
    });
    
    // Wheel rotation
    anime({
        targets: '.truck-wheels .truck-wheel',
        rotate: [0, 360],
        duration: 3000,
        easing: 'linear',
        loop: true
    });
    
    // Dump box slight movement
    anime({
        targets: '.truck-dump',
        rotate: [-1, 1],
        transformOrigin: '50% 100%',
        duration: 2000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true
    });
}

/**
 * Initialize tilt angle simulation visualization
 */
function initTiltAngleSimulation() {
    let isWarning = false;
    let warningTimeout;
    
    function updateTiltGauge() {
        const randomAngle = Math.random() * 50 - 25; // Random angle between -25 and 25 degrees
        const isHighAngle = Math.abs(randomAngle) > 15;
        
        // Update the tilt gauge line
        anime({
            targets: '.tilt-gauge-line',
            rotate: randomAngle,
            transformOrigin: '0% 100%',
            duration: 1000,
            easing: 'easeOutElastic(1, 0.5)'
        });
        
        // Update the indicator position
        const radius = 90; // Approximate radius
        const x = 150 + Math.sin(randomAngle * Math.PI / 180) * radius;
        const y = 150 - Math.cos(randomAngle * Math.PI / 180) * radius;
        
        anime({
            targets: '.tilt-indicator',
            cx: x,
            cy: y,
            duration: 1000,
            easing: 'easeOutElastic(1, 0.5)'
        });
        
        // Change color and show warning effect when angle is high
        if (isHighAngle && !isWarning) {
            isWarning = true;
            
            anime({
                targets: '.tilt-indicator',
                fill: '#ff0000',
                r: 12,
                duration: 300,
                easing: 'easeOutQuad'
            });
            
            anime({
                targets: '.tilt-warning-zone',
                opacity: [0.5, 0.9],
                duration: 500,
                easing: 'easeOutQuad',
                direction: 'alternate',
                loop: 3
            });
            
            clearTimeout(warningTimeout);
            warningTimeout = setTimeout(() => {
                anime({
                    targets: '.tilt-indicator',
                    fill: '#e62e2e',
                    r: 8,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
                
                isWarning = false;
            }, 3000);
        }
        
        // Schedule next update
        setTimeout(updateTiltGauge, 5000 + Math.random() * 5000);
    }
    
    // Start the simulation after a delay
    setTimeout(updateTiltGauge, 3000);
}

/**
 * 3D Tilt Effect for images and cards
 */
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            const tiltAmount = 10;
            const tiltX = -percentY * tiltAmount;
            const tiltY = percentX * tiltAmount;
            
            element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
            
            // Add a subtle highlight effect
            const glarePosition = `${x / rect.width * 100}% ${y / rect.height * 100}%`;
            element.style.backgroundImage = `radial-gradient(circle at ${glarePosition}, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            element.style.backgroundImage = 'none';
        });
    });
}

/**
 * Handle window resize events
 */
function handleResize() {
    // Adjust SVG sizes and positions based on screen size
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 992;
    
    const svgs = document.querySelectorAll('.tilt-angle-svg, .shovel-svg, .excavator-svg, .mining-truck-svg');
    
    svgs.forEach(svg => {
        if (isMobile) {
            svg.style.transform = 'scale(0.7)';
            svg.style.opacity = '0.2';
        } else if (isTablet) {
            svg.style.transform = 'scale(0.85)';
            svg.style.opacity = '0.25';
        } else {
            svg.style.transform = 'scale(1)';
            svg.style.opacity = '0.3';
        }
    });
} 