// Temperature Monitoring Solutions JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initHeroAnimations();
    initFeatureCards();
    initTemperatureDisplay();
    initTemperatureGraph();
    createDeviceStatusIndicators();
    initScrollBasedAnimations();
    initCircuitAnimations();
    
    // Refresh animations on window resize
    window.addEventListener('resize', function() {
        AOS.refresh();
    });
    
    // Check if the temperature monitoring visualization is loaded
    const tempMonitoringVisual = document.querySelector('.temperature-monitoring-visual');
    if (tempMonitoringVisual) {
        tempMonitoringVisual.addEventListener('load', function() {
            console.log('Temperature monitoring visualization loaded');
            setTimeout(() => {
                AOS.refresh();
            }, 200);
        });
    }

    // Page loading animation
    const loadingAnimation = document.querySelector('.loading-animation');
    if (loadingAnimation) {
        setTimeout(() => {
            loadingAnimation.classList.add('hide');
            setTimeout(() => {
                loadingAnimation.style.display = 'none';
            }, 500);
        }, 1500);
    }

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        offset: 100,
        once: true,
        easing: 'ease-in-out'
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const body = document.querySelector('body');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            body.style.overflow = 'hidden';
        });

        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.style.overflow = 'visible';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && 
                !mobileMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                body.style.overflow = 'visible';
            }
        });
    }

    // Scroll animations for elements without AOS
    const scrollAnimElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');
    const staggeredElements = document.querySelectorAll('.staggered-item');

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    scrollAnimElements.forEach(element => {
        observer.observe(element);
    });

    staggeredElements.forEach(element => {
        observer.observe(element);
    });

    // Temperature bars animation
    const temperatureBars = document.querySelectorAll('.temperature-bar');
    const temperatureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    temperatureBars.forEach(bar => {
        temperatureObserver.observe(bar);
    });

    // Counter animation
    const counterElements = document.querySelectorAll('.counter-value');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-count'));
                
                target.classList.add('animate');
                
                let count = 0;
                const duration = 2000; // 2 seconds
                const interval = Math.ceil(duration / value);
                
                const counter = setInterval(() => {
                    count++;
                    target.textContent = count;
                    
                    if (count >= value) {
                        clearInterval(counter);
                    }
                }, interval);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Tabs functionality
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabLinks.length && tabContents.length) {
        tabLinks.forEach(tabLink => {
            tabLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all tab links and contents
                tabLinks.forEach(link => link.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                const targetTab = tabLink.getAttribute('data-tab');
                tabLink.classList.add('active');
                document.querySelector(`.tab-content[data-tab="${targetTab}"]`).classList.add('active');
            });
        });
    }

    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all accordion items
                faqItems.forEach(faq => {
                    faq.classList.remove('active');
                    const content = faq.querySelector('.faq-answer');
                    content.style.maxHeight = null;
                });
                
                // Open the clicked item if it wasn't already open
                if (!isActive) {
                    item.classList.add('active');
                    const content = item.querySelector('.faq-answer');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });
    }

    // Background particles animation
    const particlesContainer = document.querySelector('.particles-container');
    
    if (particlesContainer) {
        createParticles();
    }
    
    function createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 10 + 2;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            
            // Set CSS properties
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            particle.style.animationDuration = `${duration}s`;
            
            // Add to container
            particlesContainer.appendChild(particle);
        }
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const yOffset = -80; // Account for fixed header
                const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    body.style.overflow = 'visible';
                }
            }
        });
    });

    // Initialize Lottie animations
    const lottieAnimations = document.querySelectorAll('[data-lottie]');
    
    lottieAnimations.forEach(animation => {
        const animationPath = animation.getAttribute('data-lottie');
        const animationContainer = animation;
        
        lottie.loadAnimation({
            container: animationContainer,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: animationPath
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const heroContent = heroSection.querySelector('.hero-content');
            const floatingObjects = heroSection.querySelectorAll('.floating-object');
            
            // Move content up slightly on scroll for parallax effect
            heroContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            
            // Move floating objects in different directions
            floatingObjects.forEach((obj, index) => {
                const factor = index % 2 === 0 ? 0.05 : -0.05;
                obj.style.transform = `translate(${scrollPosition * factor}px, ${scrollPosition * -0.05}px)`;
            });
        }
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formFields = contactForm.querySelectorAll('input, textarea');
            
            formFields.forEach(field => {
                if (field.hasAttribute('required') && !field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else if (field.type === 'email' && field.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    const successMessage = document.createElement('div');
                    successMessage.classList.add('form-success');
                    successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                    
                    contactForm.reset();
                    contactForm.appendChild(successMessage);
                    
                    // Reset button
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMessage.remove();
                    }, 5000);
                }, 1500);
            }
        });
        
        // Clear error state on input
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
});

// Hero section animations
function initHeroAnimations() {
    const title = document.querySelector('.tpms-title');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    
    if (title) {
        // Add staggered animation to title
        const words = title.textContent.split(' ');
        title.innerHTML = '';
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.transitionDelay = `${index * 0.2}s`;
            span.classList.add('word-animate');
            title.appendChild(span);
        });
    }
    
    // Animate circuit nodes
    if (circuitNodes.length) {
        setInterval(() => {
            circuitNodes.forEach((node, index) => {
                setTimeout(() => {
                    node.classList.add('pulse');
                    setTimeout(() => {
                        node.classList.remove('pulse');
                    }, 1000);
                }, index * 300);
            });
        }, 4000);
    }
}

// Feature cards hover effects and animations
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    let activeCardIndex = 0;
    
    if (featureCards.length) {
        // Add hover effects
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const feature = this.getAttribute('data-feature');
                if (feature) {
                    animateFeature(feature);
                }
                // Add highlight class
                featureCards.forEach(c => c.classList.remove('highlight'));
                this.classList.add('highlight');
            });
        });
        
        // Auto-rotate feature highlights
        setInterval(() => {
            featureCards.forEach(c => c.classList.remove('highlight'));
            featureCards[activeCardIndex].classList.add('highlight');
            
            const feature = featureCards[activeCardIndex].getAttribute('data-feature');
            if (feature) {
                animateFeature(feature);
            }
            
            activeCardIndex = (activeCardIndex + 1) % featureCards.length;
        }, 5000);
    }
}

// Animate specific features based on type
function animateFeature(featureType) {
    const tempDisplay = document.querySelector('.temperature-display');
    const tempGraph = document.querySelector('.temp-graph');
    
    if (!tempDisplay || !tempGraph) return;
    
    switch(featureType) {
        case 'real-time-tracking':
            // Pulse the temperature display
            tempDisplay.classList.add('highlight-feature');
            setTimeout(() => {
                tempDisplay.classList.remove('highlight-feature');
            }, 1500);
            break;
            
        case 'instant-alerts':
            // Create alert notification
            createTempAlert();
            break;
            
        case 'automated-reporting':
            // Create report overlay
            createReportOverlay();
            break;
            
        case 'seamless-integration':
            // Show connection animation
            const connectors = document.createElement('div');
            connectors.className = 'integration-connectors';
            tempDisplay.appendChild(connectors);
            
            setTimeout(() => {
                connectors.remove();
            }, 2000);
            break;
            
        case 'battery-life':
            // Animate battery icon
            const batteryIcon = document.querySelector('.status-icon i.fa-battery-three-quarters');
            if (batteryIcon) {
                batteryIcon.classList.add('pulse-icon');
                setTimeout(() => {
                    batteryIcon.classList.remove('pulse-icon');
                }, 2000);
            }
            break;
            
        case 'multi-zone':
            // Create multi-zone visualization
            const zones = ['Zone A: 2.8°C', 'Zone B: -18.2°C', 'Zone C: 5.1°C'];
            const zoneDiv = document.createElement('div');
            zoneDiv.className = 'multi-zone-display';
            
            zones.forEach(zone => {
                const zoneItem = document.createElement('div');
                zoneItem.className = 'zone-item';
                zoneItem.textContent = zone;
                zoneDiv.appendChild(zoneItem);
            });
            
            tempDisplay.appendChild(zoneDiv);
            
            setTimeout(() => {
                zoneDiv.remove();
            }, 2500);
            break;
    }
}

// Temperature graph animations
function initTemperatureGraph() {
    const graphPoints = document.querySelectorAll('.graph-point');
    const tempGraph = document.querySelector('.temp-graph');
    
    if (!graphPoints.length || !tempGraph) return;
    
    // Position graph points with realistic data pattern
    graphPoints[0].style.left = '10%';
    graphPoints[0].style.top = '40%';
    
    graphPoints[1].style.left = '30%';
    graphPoints[1].style.top = '50%';
    
    graphPoints[2].style.left = '50%';
    graphPoints[2].style.top = '30%';
    
    graphPoints[3].style.left = '70%';
    graphPoints[3].style.top = '60%';
    
    graphPoints[4].style.left = '90%';
    graphPoints[4].style.top = '45%';
    
    // Add graph line
    const graphLine = document.querySelector('.graph-line');
    if (graphLine) {
        graphLine.style.position = 'absolute';
        graphLine.style.top = '50%';
        graphLine.style.left = '0';
        graphLine.style.width = '100%';
        graphLine.style.height = '2px';
        graphLine.style.background = 'rgba(255, 255, 255, 0.1)';
        graphLine.style.zIndex = '1';
    }
    
    // Add line animation for temperature path
    const tempPath = document.createElement('div');
    tempPath.className = 'temp-path';
    tempGraph.appendChild(tempPath);
    
    // Add threshold lines
    const thresholdLines = document.querySelectorAll('.threshold-line');
    if (thresholdLines.length >= 2) {
        thresholdLines[0].style.position = 'absolute';
        thresholdLines[0].style.top = '30%';
        thresholdLines[0].style.left = '0';
        thresholdLines[0].style.width = '100%';
        thresholdLines[0].style.height = '1px';
        thresholdLines[0].style.background = 'rgba(230, 57, 70, 0.3)';
        thresholdLines[0].style.zIndex = '1';
        
        thresholdLines[1].style.position = 'absolute';
        thresholdLines[1].style.top = '70%';
        thresholdLines[1].style.left = '0';
        thresholdLines[1].style.width = '100%';
        thresholdLines[1].style.height = '1px';
        thresholdLines[1].style.background = 'rgba(42, 157, 143, 0.3)';
        thresholdLines[1].style.zIndex = '1';
    }
}

// Temperature display animations
function initTemperatureDisplay() {
    const currentTemp = document.querySelector('.current-temp');
    const tempRange = document.querySelector('.temp-range');
    
    if (!currentTemp) return;
    
    // Simulate temperature fluctuations
    let tempValue = 2.8;
    const minLimit = 2.0;
    const maxLimit = 8.0;
    const warningLimit = 7.5;
    
    setInterval(() => {
        // Random temperature changes
        tempValue += (Math.random() - 0.5) * 0.3;
        tempValue = Math.round(tempValue * 10) / 10;
        
        // Keep within safe range mostly
        if (tempValue < minLimit) tempValue = minLimit + (Math.random() * 0.3);
        if (tempValue > maxLimit) tempValue = maxLimit - (Math.random() * 0.3);
        
        // Occasionally simulate a warning (every ~30 seconds)
        if (Math.random() > 0.98) {
            tempValue = warningLimit + (Math.random() * 0.7);
            currentTemp.classList.add('warning');
            createTempAlert();
        } else {
            currentTemp.classList.remove('warning');
        }
        
        currentTemp.textContent = `${tempValue.toFixed(1)}°C`;
    }, 3000);
    
    // Update range display
    if (tempRange) {
        tempRange.textContent = `Range: ${minLimit.toFixed(1)}°C - ${maxLimit.toFixed(1)}°C`;
    }
}

// Create device status indicators with animations
function createDeviceStatusIndicators() {
    const statusIcons = document.querySelectorAll('.status-icon');
    
    if (!statusIcons.length) return;
    
    // Periodically animate the status icons
    setInterval(() => {
        const randomIcon = statusIcons[Math.floor(Math.random() * statusIcons.length)];
        randomIcon.classList.add('pulse');
        
        setTimeout(() => {
            randomIcon.classList.remove('pulse');
        }, 1000);
    }, 5000);
    
    // Update active status periodically
    setInterval(() => {
        statusIcons.forEach(icon => {
            if (Math.random() > 0.8) {
                if (icon.classList.contains('active')) {
                    icon.classList.remove('active');
                } else {
                    icon.classList.add('active');
                }
            }
        });
    }, 10000);
}

// Create temperature alert notification
function createTempAlert() {
    const tempDisplay = document.querySelector('.temperature-display');
    if (!tempDisplay) return;
    
    const alert = document.createElement('div');
    alert.className = 'temp-alert';
    alert.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Temperature alert: Outside safe range';
    
    tempDisplay.appendChild(alert);
    
    setTimeout(() => {
        alert.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 3000);
}

// Create report overlay animation
function createReportOverlay() {
    const tempDisplay = document.querySelector('.temperature-display');
    if (!tempDisplay) return;
    
    const report = document.createElement('div');
    report.className = 'report-overlay';
    report.innerHTML = `
        <div class="report-header">
            <i class="fas fa-file-alt"></i> Compliance Report
        </div>
        <div class="report-content">
            <div class="report-item">Avg. Temp: 2.9°C</div>
            <div class="report-item">Deviations: 0</div>
            <div class="report-item">Compliance: 100%</div>
        </div>
    `;
    
    tempDisplay.appendChild(report);
    
    setTimeout(() => {
        report.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        report.classList.remove('show');
        setTimeout(() => {
            report.remove();
        }, 500);
    }, 3000);
}

// Initialize scroll-based animations
function initScrollBasedAnimations() {
    // Create Intersection Observer to trigger animations when sections come into view
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Specific animations based on section type
                if (entry.target.classList.contains('tpms-features')) {
                    const featureCards = entry.target.querySelectorAll('.feature-card');
                    featureCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
                
                if (entry.target.classList.contains('tpms-benefits')) {
                    const benefitItems = entry.target.querySelectorAll('.benefit-item');
                    benefitItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 200);
                    });
                }
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add CSS for dynamic elements created by JavaScript
const style = document.createElement('style');
style.textContent = `
    .word-animate {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.5s forwards;
    }
    
    .pulse {
        animation: pulse 1s ease-in-out;
    }
    
    .highlight-feature {
        box-shadow: 0 0 0 2px var(--primary-red);
        animation: highlightPulse 1.5s ease-in-out;
    }
    
    .temp-path {
        position: absolute;
        top: 40%;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, var(--accent-teal), var(--primary-red));
        z-index: 3;
        animation: drawPath 3s forwards;
    }
    
    .current-temp.warning {
        color: var(--primary-red);
        animation: tempWarning 0.5s infinite alternate;
    }
    
    .temp-alert {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(230, 57, 70, 0.9);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 14px;
        opacity: 0;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .temp-alert.show {
        opacity: 1;
        transform: translateY(0);
    }
    
    .report-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 23, 42, 0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transform: scale(0.9);
        transition: all 0.3s ease;
        z-index: 10;
    }
    
    .report-overlay.show {
        opacity: 1;
        transform: scale(1);
    }
    
    .report-header {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 15px;
        color: var(--primary-red);
    }
    
    .report-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    
    .report-item {
        font-size: 14px;
        color: white;
    }
    
    .integration-connectors {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            repeating-linear-gradient(0deg, 
                transparent, 
                transparent 15px, 
                rgba(230, 57, 70, 0.3) 15px, 
                rgba(230, 57, 70, 0.3) 20px
            );
        opacity: 0;
        animation: fadeIn 0.3s ease-in-out forwards;
        z-index: 5;
    }
    
    .multi-zone-display {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        background: rgba(15, 23, 42, 0.8);
        padding: 15px;
        border-radius: 8px;
        border: 1px solid var(--primary-red);
        z-index: 10;
        animation: fadeInDown 0.5s forwards;
    }
    
    .zone-item {
        color: white;
        font-size: 14px;
        font-weight: 500;
        padding: 5px 10px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.1);
    }
    
    .pulse-icon {
        animation: pulseIcon 1s infinite alternate;
    }
    
    .feature-card.highlight .card-glow {
        opacity: 1;
    }
    
    .feature-card.animate {
        transform: translateY(0);
        opacity: 1;
    }
    
    .benefit-item.animate {
        transform: translateY(0);
        opacity: 1;
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    @keyframes highlightPulse {
        0% {
            box-shadow: 0 0 0 0px var(--primary-red);
        }
        50% {
            box-shadow: 0 0 0 4px var(--primary-red);
        }
        100% {
            box-shadow: 0 0 0 0px var(--primary-red);
        }
    }
    
    @keyframes drawPath {
        0% {
            width: 0%;
        }
        100% {
            width: 100%;
        }
    }
    
    @keyframes tempWarning {
        from {
            text-shadow: 0 0 5px rgba(230, 57, 70, 0.5);
        }
        to {
            text-shadow: 0 0 15px rgba(230, 57, 70, 0.8);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 0.7;
        }
    }
    
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes pulseIcon {
        from {
            transform: scale(1);
            opacity: 1;
        }
        to {
            transform: scale(1.2);
            opacity: 0.8;
        }
    }
`;

document.head.appendChild(style);

// Add these circuit animation functions
function initCircuitAnimations() {
    const circuitNodes = document.querySelectorAll('.circuit-node');
    const dataPulses = document.querySelectorAll('.data-pulse');
    
    // Initialize circuit nodes blinking effect
    if (circuitNodes.length) {
        setInterval(() => {
            circuitNodes.forEach((node, index) => {
                setTimeout(() => {
                    node.classList.add('active');
                    setTimeout(() => {
                        node.classList.remove('active');
                    }, 1000);
                }, index * 300);
            });
        }, 3000);
    }
    
    // Make sure data pulses have staggered animations
    if (dataPulses.length) {
        dataPulses.forEach((pulse, index) => {
            pulse.style.animationDelay = `${index * 0.5}s`;
        });
    }
} 