// ERP Integration Section Animations & Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations for ERP Integration Section
    initERPInteractions();
    
    // Setup the mobile device frame dynamics
    setupMobileFrameDynamics();
});

function initERPInteractions() {
    // Add hover effects for benefit cards
    const benefitCards = document.querySelectorAll('.erp-integration-section .benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Calculate mouse position relative to card
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on mouse position
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Apply 3D rotation effect
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            
            // Highlight effect
            const highlight = card.querySelector('.image-container');
            if (highlight) {
                highlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 0, 0, 0.2), rgba(30, 30, 30, 0.8) 70%)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset transform on mouse leave
            card.style.transform = '';
            
            // Reset highlight
            const highlight = card.querySelector('.image-container');
            if (highlight) {
                highlight.style.background = 'linear-gradient(45deg, #1a1a1a, #2a2a2a)';
            }
        });
    });
    
    // Add interactive animation for the systems
    const systems = document.querySelectorAll('.erp-integration-section .erp-system, .erp-integration-section .control-tower');
    
    systems.forEach(system => {
        system.addEventListener('mouseenter', function() {
            // Speed up data points animation
            const dataPoints = this.querySelectorAll('.data-point');
            dataPoints.forEach(point => {
                point.style.animationDuration = '0.8s';
            });
            
            // Speed up data packets
            const packets = document.querySelectorAll('.erp-integration-section .data-packet');
            packets.forEach(packet => {
                packet.style.animationDuration = '2s';
            });
        });
        
        system.addEventListener('mouseleave', function() {
            // Reset animation speed
            const dataPoints = this.querySelectorAll('.data-point');
            dataPoints.forEach(point => {
                point.style.animationDuration = '2s';
            });
            
            // Reset data packets
            const packets = document.querySelectorAll('.erp-integration-section .data-packet');
            packets.forEach(packet => {
                packet.style.animationDuration = '4s';
            });
        });
    });
    
    // Dashboard interaction
    const dashboard = document.querySelector('.erp-integration-section .integration-dashboard');
    
    if (dashboard) {
        dashboard.addEventListener('mousemove', function(e) {
            const rect = dashboard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Subtle parallax effect for the dashboard image
            const img = dashboard.querySelector('.dashboard-img');
            if (img) {
                const moveX = (x - rect.width / 2) / 20;
                const moveY = (y - rect.height / 2) / 20;
                img.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
        
        dashboard.addEventListener('mouseleave', function() {
            // Reset transformation
            const img = dashboard.querySelector('.dashboard-img');
            if (img) {
                img.style.transform = '';
            }
        });
    }
    
    // Enhance CTA button
    const ctaButton = document.querySelector('.erp-integration-section .btn-glow');
    
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', function(e) {
            const rect = ctaButton.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create glow effect that follows cursor
            ctaButton.style.setProperty('--x-pos', `${x}px`);
            ctaButton.style.setProperty('--y-pos', `${y}px`);
        });
    }
}

function setupMobileFrameDynamics() {
    // Find pulse points
    const pulsePoints = document.querySelectorAll('.erp-integration-section .pulse-point');
    
    // Add click events to show details
    pulsePoints.forEach(point => {
        point.addEventListener('click', function() {
            // Get the label
            const label = this.querySelector('.point-label');
            
            // Toggle active class
            this.classList.toggle('active');
            
            // If we have a label, animate it
            if (label) {
                if (this.classList.contains('active')) {
                    label.style.opacity = '1';
                    label.style.transform = 'translateX(-50%) translateY(0)';
                } else {
                    label.style.opacity = '0';
                    label.style.transform = 'translateX(-50%) translateY(10px)';
                }
            }
            
            // Create ripple effect
            createRipple(this);
        });
    });
}

function createRipple(element) {
    // Create a new ripple element
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    
    // Style the ripple
    ripple.style.position = 'absolute';
    ripple.style.width = '100%';
    ripple.style.height = '100%';
    ripple.style.border = '2px solid rgba(255, 0, 0, 0.8)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(1)';
    ripple.style.opacity = '1';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    
    // Add to element
    element.appendChild(ripple);
    
    // Trigger animation
    setTimeout(() => {
        ripple.style.transform = 'scale(3)';
        ripple.style.opacity = '0';
        
        // Remove after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }, 10);
}

// Add scroll-based parallax effects
window.addEventListener('scroll', function() {
    const erpSection = document.querySelector('.erp-integration-section');
    
    if (erpSection) {
        const scrollPosition = window.scrollY;
        const sectionTop = erpSection.offsetTop;
        const sectionHeight = erpSection.offsetHeight;
        
        // Check if section is in viewport
        if (scrollPosition > sectionTop - window.innerHeight && 
            scrollPosition < sectionTop + sectionHeight) {
            
            // Calculate relative position within the section
            const relativePosition = (scrollPosition - (sectionTop - window.innerHeight)) / 
                                    (sectionHeight + window.innerHeight);
            
            // Apply parallax to orbs
            const orbs = erpSection.querySelectorAll('.glow-orb');
            orbs.forEach((orb, index) => {
                const speed = 0.05 + (index * 0.02);
                const yMove = (relativePosition * 100 * speed) - (50 * speed);
                orb.style.transform = `translateY(${yMove}px)`;
            });
            
            // Apply parallax to circuit lines
            const lines = erpSection.querySelectorAll('.circuit-line');
            lines.forEach((line, index) => {
                const speed = 0.02 + (index * 0.01);
                const xMove = (relativePosition * 100 * speed) - (50 * speed);
                line.style.transform = `translateX(${xMove}px)`;
            });
        }
    }
}); 