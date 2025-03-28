// Partners and Industries Sections Animation
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations when document is loaded
    initPartnersAnimation();
    initIndustriesAnimation();
    
    // Handle scroll-based animations
    window.addEventListener('scroll', function() {
        animateOnScroll();
    });
    
    // Partners & Clients Marquee Animation
    setupMarquee();
});

// Partners Section Animations
function initPartnersAnimation() {
    // Partner cards hover effect enhancement
    const partnerCards = document.querySelectorAll('.partner-card');
    
    partnerCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Calculate mouse position relative to card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            // Apply 3D rotation effect
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform on mouse leave
            card.style.transform = '';
        });
    });
    
    // Animate circuit lines
    animateCircuitLines();
    
    // Create floating particles in the background
    createParticles('.partners-section', 20);
}

// Industries Section Animations
function initIndustriesAnimation() {
    // Industry cards interactive effects
    const industryCards = document.querySelectorAll('.industry-card');
    
    industryCards.forEach(card => {
        // Add glow effect that follows mouse
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            // Update glow position
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(239, 68, 68, 0.4) 0%, transparent 70%)`;
                glow.style.opacity = '1';
            }
            
            // Subtle tilt effect
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset effects on mouse leave
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
            card.style.transform = '';
        });
        
        // Animate stats counters when card is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statValues = card.querySelectorAll('.stat-value');
                    statValues.forEach(stat => {
                        const value = parseInt(stat.textContent);
                        animateCounter(stat, value);
                    });
                    observer.unobserve(card);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(card);
    });
    
    // Create floating elements animation
    animateFloatingElements();
}

// Animate counter from 0 to target value
function animateCounter(element, targetValue, duration = 2000) {
    let startValue = 0;
    const increment = targetValue / (duration / 16); // 60fps
    
    const updateCounter = () => {
        startValue += increment;
        if (startValue < targetValue) {
            element.textContent = Math.floor(startValue);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
        }
    };
    
    updateCounter();
}

// Create and animate circuit lines
function animateCircuitLines() {
    const circuitLines = document.querySelectorAll('.circuit-line');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    
    // Animate circuit lines with staggered delay
    circuitLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.animation = `lineGrow 2s ${index * 0.3}s forwards ease-out`;
        }, 500);
    });
    
    // Animate circuit nodes with staggered delay
    circuitNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animation = `nodePulse 2s infinite`;
        }, 1500 + (index * 300));
    });
}

// Create floating particles
function createParticles(containerSelector, count) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    // Create particle container if it doesn't exist
    let particleContainer = container.querySelector('.particle-container');
    if (!particleContainer) {
        particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.overflow = 'hidden';
        particleContainer.style.zIndex = '1';
        particleContainer.style.pointerEvents = 'none';
        container.appendChild(particleContainer);
    }
    
    // Create particles
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        
        // Style the particle
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
        particle.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.2)';
        
        // Random position
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random animation duration between 10-30s
        const duration = Math.random() * 20 + 10;
        particle.style.animation = `floatParticle ${duration}s infinite alternate ease-in-out`;
        
        // Add to container
        particleContainer.appendChild(particle);
    }
    
    // Add keyframe animation if it doesn't exist
    if (!document.querySelector('#particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    opacity: 0.5;
                }
                50% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.2);
                    opacity: 0.7;
                }
                75% {
                    opacity: 0.5;
                }
                100% {
                    transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1);
                    opacity: 0.3;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animate floating elements
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach((element, index) => {
        // Set random animation properties
        const duration = 15 + (index * 2);
        const delay = index * 0.5;
        
        element.style.animation = `floatElement ${duration}s ${delay}s infinite alternate ease-in-out`;
    });
}

// Handle scroll-based animations
function animateOnScroll() {
    // Parallax effect for background elements
    const scrollY = window.scrollY;
    
    // Parallax for partners section
    const partnersSection = document.querySelector('.partners-section');
    if (partnersSection) {
        const orbs = partnersSection.querySelectorAll('.glow-orb');
        orbs.forEach((orb, index) => {
            const speed = 0.05 + (index * 0.02);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }
    
    // Parallax for industries section
    const industriesSection = document.querySelector('.industries-section');
    if (industriesSection) {
        const elements = industriesSection.querySelectorAll('.floating-element');
        elements.forEach((element, index) => {
            const speed = 0.03 + (index * 0.01);
            const currentTransform = element.style.transform;
            // Extract current animation transform and add parallax
            if (currentTransform.includes('translate')) {
                // Don't override the animation transform
            } else {
                element.style.transform = `translateY(${scrollY * speed}px)`;
            }
        });
    }
}

// Add interactive hover effect to CTA buttons
document.querySelectorAll('.partners-cta .btn, .industries-cta .btn').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x-pos', `${x}px`);
        button.style.setProperty('--y-pos', `${y}px`);
    });
});

// Add CSS for button hover effect
const style = document.createElement('style');
style.textContent = `
    .partners-cta .btn::before,
    .industries-cta .btn::before {
        background: radial-gradient(circle at var(--x-pos, center) var(--y-pos, center), rgba(255,255,255,0.2) 0%, transparent 60%);
    }
`;
document.head.appendChild(style);

// Add tab functionality for partners if needed
function initPartnersTabs() {
    const tabs = document.querySelectorAll('.partner-tab');
    const partnerGroups = document.querySelectorAll('.partner-group');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all partner groups
            partnerGroups.forEach(group => group.classList.remove('active'));
            
            // Show the selected group
            const groupId = this.getAttribute('data-group');
            document.querySelector(`.partner-group[data-group="${groupId}"]`).classList.add('active');
        });
    });
}

// Initialize any additional functionality
function initAdditionalFunctionality() {
    // Add any other interactive features here
    
    // Example: Add hover sound effect (uncomment if needed)
    /*
    const hoverSound = new Audio('path/to/hover-sound.mp3');
    document.querySelectorAll('.partner-card, .industry-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.2;
            hoverSound.play();
        });
    });
    */
}

// Call additional initialization if needed
// initAdditionalFunctionality();

// Partners & Clients Marquee Animation
document.addEventListener('DOMContentLoaded', function() {
    // Function to duplicate items for seamless loop
    function setupMarquee(trackSelector) {
        const track = document.querySelector(trackSelector);
        
        if (!track) return;
        
        // Get all original items
        const items = track.querySelectorAll('.marquee-item');
        
        // Clone each item and append to track for seamless loop
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
        
        // Calculate total width to adjust animation speed
        const totalItems = track.querySelectorAll('.marquee-item').length;
        const originalItemsCount = items.length;
        
        // Adjust animation duration based on number of items to ensure smooth transition
        const baseSpeed = 35; // Base speed in seconds
        const adjustedSpeed = baseSpeed * (totalItems / originalItemsCount) * 0.5;
        
        // Set animation duration dynamically
        track.style.animationDuration = `${adjustedSpeed}s`;
    }
    
    // Setup both marquees
    setupMarquee('.partners-marquee .marquee-track');
    setupMarquee('.clients-marquee .marquee-track');
    
    // Handle pause on hover for better user interaction
    const tracks = document.querySelectorAll('.marquee-track');
    
    tracks.forEach(track => {
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
    });
    
    // Pause animations when not in viewport to save resources
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const track = entry.target.querySelector('.marquee-track');
                if (track) {
                    if (entry.isIntersecting) {
                        track.style.animationPlayState = 'running';
                    } else {
                        track.style.animationPlayState = 'paused';
                    }
                }
            });
        }, { threshold: 0.1 });
        
        const marqueeWrappers = document.querySelectorAll('.marquee-wrapper');
        marqueeWrappers.forEach(wrapper => {
            observer.observe(wrapper);
        });
    }
    
    // Adjust speed based on screen size for better mobile experience
    function handleResize() {
        const windowWidth = window.innerWidth;
        tracks.forEach(track => {
            // Get current duration
            const currentDuration = parseFloat(track.style.animationDuration);
            
            // Adjust based on screen width
            let multiplier = 1;
            if (windowWidth <= 576) {
                multiplier = 0.5; // Faster on mobile
            } else if (windowWidth <= 768) {
                multiplier = 0.625;
            } else if (windowWidth <= 992) {
                multiplier = 0.75;
            }
            
            // Apply new duration
            const baseDuration = currentDuration / multiplier;
            track.style.animationDuration = `${baseDuration * multiplier}s`;
        });
    }
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
    
    // Initial resize handling
    setTimeout(handleResize, 100);
}); 