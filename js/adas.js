document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements and animations
    initADASInteractions();
    initDMSInteractions();
    initIntegrationInteractions();
    initScrollAnimations();
    initHeroParticles();
});

/**
 * Initialize the ADAS section interactions
 */
function initADASInteractions() {
    const vehicleModel = document.querySelector('.vehicle-model');
    const featureCards = document.querySelectorAll('.feature-card');
    const pulseAreas = document.querySelectorAll('.pulse-area');
    
    if (!vehicleModel || !featureCards.length) return;
    
    // Add hover effects to feature cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Remove active class from all cards
            featureCards.forEach(c => c.classList.remove('active'));
            // Add active class to current card
            this.classList.add('active');
            
            // Get the feature ID
            const featureId = this.id;
            
            // Highlight corresponding area on vehicle
            const pulseArea = document.querySelector(`.${featureId}-area`);
            if (pulseArea) {
                // Create a pulse effect
                pulseArea.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    pulseArea.style.transform = '';
                }, 300);
            }
            
            // Zoom into the relevant part of the vehicle
            if (vehicleModel) {
                const vehicleImg = vehicleModel.querySelector('.vehicle-img');
                if (vehicleImg) {
                    vehicleImg.style.transform = 'scale(1.1)';
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset vehicle zoom
            const vehicleImg = vehicleModel.querySelector('.vehicle-img');
            if (vehicleImg) {
                vehicleImg.style.transform = '';
            }
        });
    });
    
    // Make pulse areas interactive
    pulseAreas.forEach(area => {
        area.addEventListener('click', function() {
            // Get the feature associated with this area
            const featureId = this.dataset.feature;
            
            // Highlight the corresponding feature card
            featureCards.forEach(card => {
                card.classList.remove('active');
                if (card.id === featureId) {
                    card.classList.add('active');
                    // Smooth scroll to the card if it's not visible
                    if (!isElementInViewport(card)) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            });
        });
    });
    
    // Auto-rotate through features every 4 seconds
    let activeIndex = 0;
    const autoRotate = setInterval(() => {
        activeIndex = (activeIndex + 1) % featureCards.length;
        
        // Remove active class from all cards
        featureCards.forEach(card => card.classList.remove('active'));
        
        // Add active class to next card
        featureCards[activeIndex].classList.add('active');
        
        // Trigger the corresponding pulse area
        const featureId = featureCards[activeIndex].id;
        const pulseArea = document.querySelector(`.${featureId}-area`);
        if (pulseArea) {
            pulseArea.style.transform = 'scale(1.5)';
            setTimeout(() => {
                pulseArea.style.transform = '';
            }, 300);
        }
    }, 4000);
    
    // Stop auto-rotation when user interacts with cards
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => clearInterval(autoRotate));
    });
    
    // Stop auto-rotation when user interacts with pulse areas
    pulseAreas.forEach(area => {
        area.addEventListener('mouseenter', () => clearInterval(autoRotate));
    });
}

/**
 * Initialize the DMS section interactions
 */
function initDMSInteractions() {
    const driverImg = document.querySelector('.driver-img');
    const dmsFeatures = document.querySelectorAll('.dms-feature');
    const trackingPoints = document.querySelectorAll('.tracking-point');
    const trackingLine = document.querySelector('.tracking-line');
    
    if (!driverImg || !dmsFeatures.length) return;
    
    // Add hover effects to DMS features
    dmsFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            // Highlight the feature
            dmsFeatures.forEach(f => f.style.transform = '');
            this.style.transform = 'translateY(-5px)';
            
            // Get the feature type
            const featureType = this.dataset.feature;
            
            // Animate relevant tracking elements based on feature type
            if (featureType === 'fatigue') {
                // Animate eye tracking points
                trackingPoints.forEach(point => {
                    if (point.classList.contains('eye-left') || point.classList.contains('eye-right')) {
                        point.style.animation = 'pulse 0.5s infinite';
                    }
                });
            } else if (featureType === 'distraction') {
                // Rotate head tracking line to simulate looking away
                if (trackingLine) {
                    trackingLine.style.transform = 'translate(-50%, -55%) rotate(20deg)';
                }
            } else if (featureType === 'compliance') {
                // Highlight mouth tracking point for smoking detection
                trackingPoints.forEach(point => {
                    if (point.classList.contains('mouth')) {
                        point.style.animation = 'pulse 0.5s infinite';
                    }
                });
            } else if (featureType === 'identity') {
                // Intensify all tracking elements for facial recognition
                trackingPoints.forEach(point => point.style.animation = 'pulse 1s infinite');
                if (trackingLine) {
                    trackingLine.style.borderColor = 'rgba(229, 9, 20, 0.8)';
                }
            } else if (featureType === 'analytics') {
                // Show data processing effect
                driverImg.style.filter = 'brightness(1.2) contrast(1.1)';
                trackingPoints.forEach(point => point.style.boxShadow = '0 0 10px rgba(229, 9, 20, 0.8)');
            }
        });
        
        feature.addEventListener('mouseleave', function() {
            // Reset all animations
            trackingPoints.forEach(point => {
                point.style.animation = '';
                point.style.boxShadow = '';
            });
            
            if (trackingLine) {
                trackingLine.style.transform = 'translate(-50%, -55%) rotate(0deg)';
                trackingLine.style.borderColor = '';
            }
            
            driverImg.style.filter = '';
        });
    });
    
    // Add camera view interaction
    const cameraView = document.querySelector('.camera-view');
    if (cameraView) {
        cameraView.addEventListener('mousemove', function(e) {
            // Create a slight parallax effect within the camera view
            const rect = this.getBoundingClientRect();
            const mouseX = e.clientX - rect.left; // X position within the element
            const mouseY = e.clientY - rect.top;  // Y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const offsetX = (mouseX - centerX) / 20;
            const offsetY = (mouseY - centerY) / 20;
            
            // Move the driver image slightly in the opposite direction of the mouse
            if (driverImg) {
                driverImg.style.transform = `translate(${-offsetX}px, ${-offsetY}px)`;
            }
            
            // Move tracking points and line with the image
            trackingPoints.forEach(point => {
                const originalLeft = parseFloat(getComputedStyle(point).left);
                const originalTop = parseFloat(getComputedStyle(point).top);
                
                point.style.left = `${originalLeft - offsetX * 0.2}%`;
                point.style.top = `${originalTop - offsetY * 0.2}%`;
            });
        });
        
        cameraView.addEventListener('mouseleave', function() {
            // Reset positions
            if (driverImg) {
                driverImg.style.transform = '';
            }
            
            trackingPoints.forEach(point => {
                point.style.left = '';
                point.style.top = '';
            });
        });
    }
}

/**
 * Initialize the Integration section interactions
 */
function initIntegrationInteractions() {
    const workflowItems = document.querySelectorAll('.workflow-item');
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    // Add flow animation to workflow items
    if (workflowItems.length) {
        workflowItems.forEach((item, index) => {
            // Set a staggered animation delay
            item.style.animationDelay = `${index * 0.2}s`;
            
            item.addEventListener('mouseenter', function() {
                // Highlight the current item and subsequent items in the flow
                workflowItems.forEach((wi, i) => {
                    if (i >= index) {
                        wi.style.transform = 'translateY(-5px)';
                        wi.style.backgroundColor = 'rgba(40, 40, 40, 0.8)';
                        wi.style.borderBottomColor = 'var(--primary-red)';
                    }
                });
            });
            
            item.addEventListener('mouseleave', function() {
                // Reset all items
                workflowItems.forEach(wi => {
                    wi.style.transform = '';
                    wi.style.backgroundColor = '';
                    wi.style.borderBottomColor = '';
                });
            });
        });
    }
    
    // Add hover effects to benefit items
    if (benefitItems.length) {
        benefitItems.forEach(item => {
            const icon = item.querySelector('.benefit-icon');
            
            item.addEventListener('mouseenter', function() {
                if (icon) {
                    // Create a pulse effect for the icon
                    icon.style.animation = 'pulse 1s infinite';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                if (icon) {
                    icon.style.animation = '';
                }
            });
        });
    }
    
    // Add CTA interaction
    const ctaButton = document.querySelector('.integration-cta .btn-glow');
    const ctaPulse = document.querySelector('.cta-pulse');
    
    if (ctaButton && ctaPulse) {
        ctaButton.addEventListener('mouseenter', function() {
            ctaPulse.style.animation = 'cta-pulse 1s infinite';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            ctaPulse.style.animation = '';
        });
    }
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    // Use Intersection Observer to animate elements as they scroll into view
    const animatedElements = document.querySelectorAll('.adas-section, .dms-section, .integration-section, .adas-visual-container, .dms-visual-container, .integration-visual, .integration-cta');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    
                    // If this is a section with a background, animate the background elements
                    const bgElements = entry.target.querySelectorAll('.glow-orb, .circuit-line, .circuit-node');
                    bgElements.forEach((el, index) => {
                        el.style.animationDelay = `${index * 0.2}s`;
                        el.style.opacity = 1;
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        animatedElements.forEach(el => {
            // Initially hide background elements
            const bgElements = el.querySelectorAll('.glow-orb, .circuit-line, .circuit-node');
            bgElements.forEach(bgEl => {
                bgEl.style.opacity = 0;
                bgEl.style.transition = 'opacity 0.5s ease-in-out';
            });
            
            observer.observe(el);
        });
    }
}

/**
 * Initialize particle effects in the hero section
 */
function initHeroParticles() {
    const particlesContainer = document.getElementById('hero-particles');
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(229, 9, 20, ${opacity});
            border-radius: 50%;
            pointer-events: none;
            animation: particle-float ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

/**
 * Check if an element is currently visible in the viewport
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add keyframe animation for particle floating effect to the document
 */
(function addKeyframes() {
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes particle-float {
            0%, 100% {
                transform: translateY(0) translateX(0);
            }
            25% {
                transform: translateY(-30px) translateX(15px);
            }
            50% {
                transform: translateY(-10px) translateX(30px);
            }
            75% {
                transform: translateY(20px) translateX(15px);
            }
        }
    `;
    document.head.appendChild(style);
})(); 