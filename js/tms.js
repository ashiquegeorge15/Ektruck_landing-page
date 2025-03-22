// TMS Page Animations and Interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactive elements
    initHeroAnimations();
    initFeatureCards();
    initBenefitCards();
    initWorkflowSteps();
    initDashboardAnimation();
    createParticleEffect();
    initSectionAnimations();
    initVisualizationAnimations();
    
    // Also refresh AOS when window is resized
    window.addEventListener('resize', function() {
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    });
});

// Hero section animations
function initHeroAnimations() {
    // Animate title with letter-by-letter reveal
    const title = document.querySelector('.tms-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.opacity = '0';
            span.style.animation = `fadeInChar 0.5s forwards ${i * 0.05}s`;
            title.appendChild(span);
        }
    }
    
    // Add animated glow to circuit nodes
    addCircuitAnimations();
}

// Add circuit line and node animations
function addCircuitAnimations() {
    const circuitLines = document.querySelectorAll('.circuit-line');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    
    circuitLines.forEach((line, index) => {
        line.style.animation = `lineGlow 4s infinite ${index * 0.5}s`;
    });
    
    circuitNodes.forEach((node, index) => {
        node.style.animation = `nodePulse 3s infinite ${index * 0.3}s`;
    });
}

// Feature card hover effects and animations
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Show the feature glow effect
            const glow = this.querySelector('.card-glow');
            glow.style.opacity = '0.8';
            
            // Add feature-specific animation based on data attribute
            const featureType = this.getAttribute('data-feature');
            animateFeature(featureType);
        });
        
        card.addEventListener('mouseleave', function() {
            const glow = this.querySelector('.card-glow');
            glow.style.opacity = '0';
        });
    });
    
    // Auto-rotate feature highlights
    let currentFeatureIndex = 0;
    setInterval(() => {
        const cards = Array.from(featureCards);
        
        // Reset previous highlight
        cards.forEach(card => {
            card.classList.remove('highlighted');
            const glow = card.querySelector('.card-glow');
            glow.style.opacity = '0';
        });
        
        // Highlight next card
        const nextCard = cards[currentFeatureIndex];
        nextCard.classList.add('highlighted');
        const glow = nextCard.querySelector('.card-glow');
        glow.style.opacity = '0.8';
        
        // Animate feature
        const featureType = nextCard.getAttribute('data-feature');
        animateFeature(featureType);
        
        // Increment index
        currentFeatureIndex = (currentFeatureIndex + 1) % cards.length;
    }, 4000);
}

// Feature-specific animations
function animateFeature(featureType) {
    switch(featureType) {
        case 'route-optimization':
            animateRouteOptimization();
            break;
        case 'real-time-tracking':
            animateRealTimeTracking();
            break;
        case 'automated-dispatch':
            animateAutomatedDispatch();
            break;
        case 'freight-cost':
            animateFreightCost();
            break;
        case 'compliance':
            animateCompliance();
            break;
        case 'integration':
            animateIntegration();
            break;
        case 'analytics':
            animateAnalytics();
            break;
    }
}

// Route optimization animation
function animateRouteOptimization() {
    // Animation effect for route optimization would go here
    // For now, we'll keep it simple with console log
    console.log('Route optimization animation triggered');
    
    // Pulse effect on the route visualization if it exists
    const routeVisualization = document.querySelector('.route-optimization-visual');
    if (routeVisualization) {
        routeVisualization.classList.add('pulse-animation');
        setTimeout(() => {
            routeVisualization.classList.remove('pulse-animation');
        }, 1000);
    }
}

// Real-time tracking animation
function animateRealTimeTracking() {
    // Animation for tracking points in the dashboard
    const dataPoints = document.querySelectorAll('.data-point');
    
    dataPoints.forEach((point, index) => {
        setTimeout(() => {
            point.classList.add('pulse');
            setTimeout(() => {
                point.classList.remove('pulse');
            }, 500);
        }, index * 300);
    });
}

// Automated dispatch animation
function animateAutomatedDispatch() {
    console.log('Automated dispatch animation triggered');
    // This would animate workflow steps in a real implementation
}

// Freight cost animation
function animateFreightCost() {
    console.log('Freight cost animation triggered');
    // Cost savings visualization would go here
}

// Compliance monitoring animation
function animateCompliance() {
    console.log('Compliance monitoring animation triggered');
    // Safety check visualization would go here
}

// System integration animation
function animateIntegration() {
    console.log('Integration animation triggered');
    // Connection visualization would go here
}

// Analytics animation
function animateAnalytics() {
    console.log('Analytics animation triggered');
    // Data visualization would go here
}

// Benefit card hover effects
function initBenefitCards() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    benefitItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.classList.add('pulse');
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.benefit-icon');
            icon.classList.remove('pulse');
        });
    });
}

// Workflow step interactions
function initWorkflowSteps() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    const progressFill = document.querySelector('.progress-fill');
    
    workflowSteps.forEach((step, index) => {
        step.addEventListener('click', function() {
            // Remove active class from all steps
            workflowSteps.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked step
            this.classList.add('active');
            
            // Update progress bar
            const progressPercentage = ((index + 1) / workflowSteps.length) * 100;
            progressFill.style.width = `${progressPercentage}%`;
            
            // Update workflow animation based on step
            updateWorkflowAnimation(index + 1);
        });
    });
    
    // Auto-rotate workflow steps
    let currentStepIndex = 0;
    setInterval(() => {
        // Move to next step
        currentStepIndex = (currentStepIndex + 1) % workflowSteps.length;
        
        // Remove active class from all steps
        workflowSteps.forEach(s => s.classList.remove('active'));
        
        // Add active class to current step
        workflowSteps[currentStepIndex].classList.add('active');
        
        // Update progress bar
        const progressPercentage = ((currentStepIndex + 1) / workflowSteps.length) * 100;
        progressFill.style.width = `${progressPercentage}%`;
        
        // Update workflow animation
        updateWorkflowAnimation(currentStepIndex + 1);
    }, 5000);
}

// Update workflow animation based on active step
function updateWorkflowAnimation(stepNumber) {
    const workflowAnimation = document.getElementById('workflow-animation');
    
    // In a real implementation, this would show different visualizations
    // based on the current workflow step
    console.log(`Workflow animation updated to step ${stepNumber}`);
}

// Create dashboard visualization in the hero section
function initDashboardAnimation() {
    const dashboardPreview = document.querySelector('.dashboard-preview');
    
    if (dashboardPreview) {
        // Create mock dashboard content
        dashboardPreview.innerHTML += `
            <div class="dashboard-content">
                <div class="dashboard-header">
                    <div class="dashboard-title">Fleet Command Center</div>
                    <div class="dashboard-controls">
                        <span class="control-dot"></span>
                        <span class="control-dot"></span>
                        <span class="control-dot"></span>
                    </div>
                </div>
                <div class="dashboard-body">
                    <div class="map-container">
                        <div class="map-overlay"></div>
                        <div class="vehicle-marker v1"></div>
                        <div class="vehicle-marker v2"></div>
                        <div class="vehicle-marker v3"></div>
                        <div class="route-line r1"></div>
                        <div class="route-line r2"></div>
                    </div>
                    <div class="stats-panel">
                        <div class="stat-item">
                            <div class="stat-label">Vehicles Active</div>
                            <div class="stat-value">24/28</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">On-Time Deliveries</div>
                            <div class="stat-value">96%</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Fuel Efficiency</div>
                            <div class="stat-value">+12%</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Animate vehicle markers
        const vehicles = document.querySelectorAll('.vehicle-marker');
        vehicles.forEach((vehicle, index) => {
            vehicle.style.animation = `vehicleMove 15s infinite ${index * 2}s`;
        });
    }
}

// Create particle background effect
function createParticleEffect() {
    const heroSection = document.querySelector('.tms-hero');
    
    if (heroSection) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        
        // Create 50 particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random size
            const size = Math.random() * 3 + 1;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            particle.style.animation = `float ${duration}s infinite`;
            
            // Random animation delay
            particle.style.animationDelay = `${Math.random() * 10}s`;
            
            particleContainer.appendChild(particle);
        }
        
        heroSection.appendChild(particleContainer);
    }
}

// Initialize scroll-based animations using Intersection Observer
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Trigger section-specific animations
                if (entry.target.classList.contains('tms-features')) {
                    animateFeatureSection();
                } else if (entry.target.classList.contains('tms-benefits')) {
                    animateBenefitsSection();
                } else if (entry.target.classList.contains('tms-workflow')) {
                    animateWorkflowSection();
                } else if (entry.target.classList.contains('tms-cta')) {
                    animateCtaSection();
                }
                
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Feature section animation
function animateFeatureSection() {
    console.log('Feature section in view, triggering animations');
    // Additional animations could be added here
}

// Benefits section animation
function animateBenefitsSection() {
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    benefitItems.forEach((item, index) => {
        item.style.animation = `benefitAppear 0.5s forwards ${index * 0.2}s`;
    });
}

// Workflow section animation
function animateWorkflowSection() {
    console.log('Workflow section in view, triggering animations');
    // Additional animations could be added here
}

// CTA section animation
function animateCtaSection() {
    const ctaContent = document.querySelector('.cta-content');
    
    if (ctaContent) {
        ctaContent.style.animation = 'pulse 2s infinite';
    }
}

// Initialize visualization animations
function initVisualizationAnimations() {
    const visualization = document.querySelector('.visualization-wrapper');
    if (visualization) {
        // Force animation if AOS is not working
        setTimeout(() => {
            if (!visualization.classList.contains('aos-animate')) {
                console.log('Applying manual animation to visualization');
                visualization.style.opacity = '1';
                visualization.style.transform = 'translateY(0)';
            }
        }, 800);

        // Add click interaction
        visualization.addEventListener('click', function() {
            const svg = this.querySelector('object');
            if (svg) {
                svg.classList.add('pulse-animation');
                setTimeout(() => {
                    svg.classList.remove('pulse-animation');
                }, 1000);
                
                // Try to access SVG content and trigger animations
                try {
                    const svgDoc = svg.contentDocument;
                    if (svgDoc) {
                        const trucks = svgDoc.querySelectorAll('use[href="#truck"]');
                        trucks.forEach(truck => {
                            const motion = truck.querySelector('animateMotion');
                            if (motion) {
                                // Restart animation
                                motion.beginElement();
                            }
                        });
                    }
                } catch (e) {
                    console.log('Could not access SVG internals', e);
                }
            }
        });
    }
    
    // Force refresh animations periodically
    setInterval(() => {
        const visualization = document.querySelector('.visualization-wrapper');
        if (visualization && !visualization.classList.contains('aos-animate')) {
            visualization.style.opacity = '1';
            visualization.style.transform = 'translateY(0)';
        }
    }, 2000);
}

// Ensure the SVG is loaded properly
window.addEventListener('load', function() {
    const svgObject = document.querySelector('.route-optimization-visual');
    if (svgObject) {
        svgObject.addEventListener('load', function() {
            console.log('SVG loaded successfully');
            // Refresh AOS to ensure animations work
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }
}); 