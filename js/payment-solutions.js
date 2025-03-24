document.addEventListener('DOMContentLoaded', function() {
    // Initialize payment-specific animations and interactions
    initPaymentAnimations();
    initFeatureInteractions();
    initScrollEffects();
});

/**
 * Initialize the payment-specific animations
 */
function initPaymentAnimations() {
    // Animate payment icons
    const paymentIcons = document.querySelectorAll('.payment-icon');
    
    // Create random positions for payment icons
    paymentIcons.forEach((icon, index) => {
        const delay = index * 1.5;
        const randomX = Math.random() * 80 + 10; // Between 10% and 90%
        const randomY = Math.random() * 80 + 10; // Between 10% and 90%
        
        icon.style.top = `${randomY}%`;
        icon.style.left = `${randomX}%`;
        icon.style.animationDelay = `${delay}s`;
    });
    
    // Create payment streams
    createPaymentStreams();
}

/**
 * Create animated payment data streams
 */
function createPaymentStreams() {
    const container = document.querySelector('.payment-stream');
    
    if (!container) return;
    
    // Create multiple streams
    for (let i = 0; i < 5; i++) {
        const stream = document.createElement('div');
        stream.className = 'stream-line';
        
        // Random positioning and timing
        const randomY = Math.random() * 80 + 10; // Between 10% and 90%
        const randomDuration = Math.random() * 5 + 10; // Between 10 and 15s
        const randomDelay = Math.random() * 5; // Between 0 and 5s
        
        stream.style.top = `${randomY}%`;
        stream.style.animationDuration = `${randomDuration}s`;
        stream.style.animationDelay = `${randomDelay}s`;
        
        container.appendChild(stream);
    }
}

/**
 * Initialize feature card interactions
 */
function initFeatureInteractions() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Enhanced hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
            
            // Animate the icon
            const icon = this.querySelector('.feature-icon svg');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.filter = 'drop-shadow(0 0 8px rgba(255, 0, 0, 0.8))';
            }
            
            // Enhance animation
            const animation = this.querySelector('.feature-animation');
            if (animation) {
                animation.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
            
            // Reset icon
            const icon = this.querySelector('.feature-icon svg');
            if (icon) {
                icon.style.transform = '';
                icon.style.filter = '';
            }
            
            // Reset animation
            const animation = this.querySelector('.feature-animation');
            if (animation) {
                animation.style.opacity = '0.6';
            }
        });
    });
}

/**
 * Initialize scroll-based effects
 */
function initScrollEffects() {
    // Scroll to section on button click
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Scroll to features or CTA based on button text
            const targetSection = this.innerText.includes('Learn More') ? 
                document.querySelector('.features-section') : 
                document.querySelector('.cta-section');
                
            if (targetSection) {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll to top button functionality
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        }
        
        // Parallax for payment icons
        const paymentIcons = document.querySelectorAll('.payment-icon');
        paymentIcons.forEach(icon => {
            icon.style.transform = `translateY(${scrollPosition * 0.02}px) rotate(${scrollPosition * 0.01}deg)`;
        });
    });
}

/**
 * Initialize tabs on category navigation (if exists)
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.case-study-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const target = this.getAttribute('data-target');
            
            // Filter cards based on data-target
            cards.forEach(card => {
                if (target === 'all' || card.getAttribute('data-category') === target) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
} 