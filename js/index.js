// Add scroll-triggered animations for list items
const animateItems = document.querySelectorAll('.animate-item');

const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
            
            // Add a slight delay based on the item's position
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
            entry.target.style.transitionDelay = `${delay}s`;
            
            // Unobserve after animation
            itemObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe each animate item
animateItems.forEach(item => {
    itemObserver.observe(item);
});

// Add particle effect to the benefits section
const benefitsSectionElement = document.getElementById('benefits-section');

if (benefitsSectionElement && typeof particlesJS !== 'undefined') {
    // Create a container for particles
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'benefits-particles';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.zIndex = '1';
    
    // Insert the container at the beginning of the section
    benefitsSectionElement.insertBefore(particlesContainer, benefitsSectionElement.firstChild);
    
    // Initialize particles
    particlesJS('benefits-particles', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ff0000"
            },
            "shape": {
                "type": "circle",
            },
            "opacity": {
                "value": 0.3,
                "random": true,
            },
            "size": {
                "value": 3,
                "random": true,
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ff0000",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.8
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}

// Add animated counter effect to any numbers in the section
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
};

// Find any elements with data-count attribute and animate them
const counterElements = document.querySelectorAll('[data-count]');

counterElements.forEach(element => {
    const target = parseInt(element.getAttribute('data-count'));
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterObserver.observe(element);
});

// Add magnetic effect to buttons
const magneticButtons = document.querySelectorAll('.btn-animated');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) * 0.1;
        const deltaY = (y - centerY) * 0.1;
        
        this.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Add dynamic connection lines between cards
const updateConnectionLines = () => {
    const cards = document.querySelectorAll('.benefit-card');
    const connectionsSvg = document.querySelector('.connections-svg');
    
    if (!cards.length || !connectionsSvg) return;
    
    // Clear existing paths
    connectionsSvg.innerHTML = '';
    
    // Get card positions
    const cardPositions = Array.from(cards).map(card => {
        const rect = card.getBoundingClientRect();
        const sectionRect = benefitsSectionElement.getBoundingClientRect();
        
        return {
            x: rect.left + rect.width / 2 - sectionRect.left,
            y: rect.top + rect.height / 2 - sectionRect.top
        };
    });
    
    // Create paths between cards
    for (let i = 0; i < cardPositions.length - 1; i++) {
        const start = cardPositions[i];
        const end = cardPositions[i + 1];
        
        // Create a curved path
        const controlPoint1X = start.x + (end.x - start.x) * 0.5;
        const controlPoint1Y = start.y - 100;
        const controlPoint2X = start.x + (end.x - start.x) * 0.5;
        const controlPoint2Y = end.y + 100;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'connection-path');
        path.setAttribute('d', `M${start.x},${start.y} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${end.x},${end.y}`);
        path.style.animationDelay = `${i * 0.5}s`;
        
        connectionsSvg.appendChild(path);
    }
    
    // Create a path from last to first card to complete the circle
    if (cardPositions.length > 2) {
        const start = cardPositions[cardPositions.length - 1];
        const end = cardPositions[0];
        
        const controlPoint1X = start.x + (end.x - start.x) * 0.5;
        const controlPoint1Y = start.y - 150;
        const controlPoint2X = start.x + (end.x - start.x) * 0.5;
        const controlPoint2Y = end.y + 150;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', 'connection-path');
        path.setAttribute('d', `M${start.x},${start.y} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${end.x},${end.y}`);
        path.style.animationDelay = `${cardPositions.length * 0.5}s`;
        
        connectionsSvg.appendChild(path);
    }
};

// Update connection lines on load and resize
window.addEventListener('load', updateConnectionLines);
window.addEventListener('resize', updateConnectionLines);

// Add glitch effect to section title on hover
const sectionTitle = document.querySelector('.glowing-text');

if (sectionTitle) {
    sectionTitle.addEventListener('mouseenter', function() {
        this.classList.add('glitch-effect');
        
        // Create glitch animation
        const glitchStyle = document.createElement('style');
        glitchStyle.textContent = `
            .glitch-effect {
                position: relative;
                animation: glitch 0.5s infinite;
            }
            
            @keyframes glitch {
                0% {
                    transform: translate(0);
                    text-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.3);
                }
                20% {
                    transform: translate(-2px, 2px);
                    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5), 0 0 20px rgba(0, 255, 255, 0.3);
                }
                40% {
                    transform: translate(-2px, -2px);
                    text-shadow: 0 0 10px rgba(255, 0, 255, 0.5), 0 0 20px rgba(255, 0, 255, 0.3);
                }
                60% {
                    transform: translate(2px, 2px);
                    text-shadow: 0 0 10px rgba(255, 255, 0, 0.5), 0 0 20px rgba(255, 255, 0, 0.3);
                }
                80% {
                    transform: translate(2px, -2px);
                    text-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.3);
                }
                100% {
                    transform: translate(0);
                    text-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.3);
                }
            }
        `;
        
        document.head.appendChild(glitchStyle);
        
        // Remove glitch effect after a short time
        setTimeout(() => {
            this.classList.remove('glitch-effect');
            document.head.removeChild(glitchStyle);
        }, 2000);
    });
}

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;

document.head.appendChild(rippleStyle);

// Add scroll-triggered reveal animation for the CTA section
const benefitsCta = document.querySelector('.benefits-cta');

if (benefitsCta) {
    const ctaObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'revealCta 1s forwards';
                ctaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    ctaObserver.observe(benefitsCta);
    
    // Add CSS for reveal animation
    const ctaRevealStyle = document.createElement('style');
    ctaRevealStyle.textContent = `
        @keyframes revealCta {
            0% {
                transform: translateY(50px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    
    document.head.appendChild(ctaRevealStyle);
}

// Add dynamic background color change based on scroll position
window.addEventListener('scroll', function() {
    if (!benefitsSectionElement) return;
    
    const scrollPosition = window.scrollY;
    const sectionTop = benefitsSectionElement.offsetTop;
    const sectionHeight = benefitsSectionElement.offsetHeight;
    
    if (scrollPosition > sectionTop && scrollPosition < sectionTop + sectionHeight) {
        const scrollPercentage = (scrollPosition - sectionTop) / sectionHeight;
        
        // Create a gradient that changes based on scroll position
        const hue1 = Math.floor(0 + scrollPercentage * 20); // Red to slightly orange
        const hue2 = Math.floor(0 + scrollPercentage * 30); // Red to more orange
        
        benefitsSectionElement.style.background = `linear-gradient(135deg, hsl(${hue1}, 100%, 10%), hsl(${hue2}, 100%, 5%))`;
    }
});

// Add animated data visualization to the benefits section
// const createDataVisualization = () => {
//     const container = document.createElement('div');
//     container.className = 'data-visualization';
//     container.style.position = 'absolute';
//     container.style.bottom = '50px';
//     container.style.left = '50px';
//     container.style.zIndex = '2';
//     container.style.width = '200px';
//     container.style.height = '100px';
//     container.style.background = 'rgba(0, 0, 0, 0.5)';
//     container.style.borderRadius = '10px';
//     container.style.padding = '15px';
//     container.style.backdropFilter = 'blur(10px)';
//     container.style.border = '1px solid rgba(255, 0, 0, 0.3)';
//     container.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
//     container.style.opacity = '0';
//     container.style.transform = 'translateY(20px)';
//     container.style.transition = 'all 0.5s ease';
    
//     // Create chart bars
//     for (let i = 0; i < 5; i++) {
//         const bar = document.createElement('div');
//         bar.className = 'chart-bar';
//         bar.style.height = `${20 + Math.random() * 60}%`;
//         bar.style.width = '15%';
//         bar.style.background = 'linear-gradient(to top, #ff0000, #ff3300)';
//         bar.style.borderRadius = '3px';
//         bar.style.position = 'absolute';
//         bar.style.bottom = '15px';
//         bar.style.left = `${15 + i * 20}%`;
//         bar.style.transformOrigin = 'bottom';
//         bar.style.transform = 'scaleY(0)';
//         bar.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
//         bar.style.transitionDelay = `${i * 0.1}s`;
        
//         container.appendChild(bar);
//     }
    
//     // Add title
//     const title = document.createElement('div');
//     title.textContent = 'Efficiency Gains';
//     title.style.color = '#fff';
//     title.style.fontSize = '12px';
//     title.style.fontWeight = 'bold';
//     title.style.marginBottom = '10px';
    
//     container.insertBefore(title, container.firstChild);
    
//     // Add to the benefits section
//     if (benefitsSectionElement) {
//         benefitsSectionElement.appendChild(container);
        
//         // Animate in when scrolled into view
//         const vizObserver = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 if (entry.isIntersecting) {
//                     container.style.opacity = '1';
//                     container.style.transform = 'translateY(0)';
                    
//                     // Animate bars
//                     const bars = container.querySelectorAll('.chart-bar');
//                     bars.forEach(bar => {
//                         bar.style.transform = 'scaleY(1)';
//                     });
                    
//                     vizObserver.unobserve(container);
//                 }
//             });
//         }, { threshold: 0.5 });
        
//         vizObserver.observe(container);
//     }
    
//     return container; // Return the container for potential future use
// };

// // Create data visualization if benefits section exists
// if (benefitsSectionElement) {
//     createDataVisualization();
// }

// Add proper Lottie initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if Lottie library exists
    if (typeof lottie === 'undefined') {
        console.error('Lottie library is not loaded. Please include the Lottie script in your HTML.');
        
        // Try to load Lottie dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.9.6/lottie.min.js';
        script.onload = initLottieAnimations;
        script.onerror = () => console.error('Failed to load Lottie library dynamically');
        document.head.appendChild(script);
    } else {
        // Initialize Lottie animations if library is already loaded
        initLottieAnimations();
    }
    
    function initLottieAnimations() {
        // Find all elements with data-lottie attribute
        const lottieElements = document.querySelectorAll('[data-lottie]');
        
        lottieElements.forEach(element => {
            const animationPath = element.getAttribute('data-lottie');
            if (!animationPath) return;
            
            try {
                const anim = lottie.loadAnimation({
                    container: element,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: animationPath
                });
                
                // Store animation instance on the element for future reference
                element.lottieInstance = anim;
                
                // Add error handling
                anim.addEventListener('data_failed', () => {
                    console.error(`Failed to load Lottie animation: ${animationPath}`);
                    element.innerHTML = '<div class="animation-error">Animation failed to load</div>';
                });
            } catch (error) {
                console.error('Error initializing Lottie animation:', error);
                element.innerHTML = '<div class="animation-error">Animation error</div>';
            }
        });
        
        // Initialize specific animations
        const truckAnimation = document.getElementById('truck-animation');
        if (truckAnimation) {
            try {
                const truckAnim = lottie.loadAnimation({
                    container: truckAnimation,
                    renderer: 'svg',
                    loop: true,
                    autoplay: true,
                    path: truckAnimation.getAttribute('data-lottie') || 'animations/truck.json'
                });
                
                // Adjust speed if animation loaded successfully
                if (truckAnim) {
                    truckAnim.setSpeed(1.2);
                }
            } catch (error) {
                console.error('Error initializing truck animation:', error);
            }
        }
    }
});

// Add CSS for error states
const errorStyle = document.createElement('style');
errorStyle.textContent = `
    .animation-error {
        color: #fff;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        padding: 10px;
        background: rgba(255, 0, 0, 0.5);
        border-radius: 5px;
    }
`;

document.head.appendChild(errorStyle);

document.addEventListener('DOMContentLoaded', function() {
    // Trip Tracking Motion Graphics Animation
    const initMotionGraphics = () => {
        const timelineMarkers = document.querySelectorAll('.timeline-marker');
        const stageInfos = document.querySelectorAll('.stage-info');
        const progressFill = document.querySelector('.timeline-progress .progress-fill');
        
        // Animation timeline
        const animationDuration = 30; // seconds
        const stages = [
            { id: 1, startTime: 0, endTime: 5 },
            { id: 2, startTime: 5, endTime: 10 },
            { id: 3, startTime: 10, endTime: 15 },
            { id: 4, startTime: 15, endTime: 20 },
            { id: 5, startTime: 20, endTime: 25 },
            { id: 6, startTime: 25, endTime: 30 }
        ];
        
        let currentStage = 1;
        let animationStartTime = null;
        let animationFrame;
        let isPlaying = false;
        
        // Update stage based on elapsed time
        function updateStage(elapsedTime) {
            // Find current stage based on elapsed time
            const stage = stages.find(s => elapsedTime >= s.startTime && elapsedTime < s.endTime);
            
            if (stage && stage.id !== currentStage) {
                currentStage = stage.id;
                
                // Update timeline markers
                timelineMarkers.forEach((marker, index) => {
                    const markerStage = index + 1;
                    
                    if (markerStage < currentStage) {
                        marker.classList.add('completed');
                        marker.classList.remove('active');
                    } else if (markerStage === currentStage) {
                        marker.classList.add('active');
                        marker.classList.remove('completed');
                    } else {
                        marker.classList.remove('active', 'completed');
                    }
                });
                
                // Update stage info panels
                stageInfos.forEach((info, index) => {
                    const infoStage = index + 1;
                    
                    if (infoStage === currentStage) {
                        info.classList.add('active');
                    } else {
                        info.classList.remove('active');
                    }
                });
            }
        }
        
        // Animation loop
        function animateMotionGraphics(timestamp) {
            if (!animationStartTime) animationStartTime = timestamp;
            
            const elapsedTime = (timestamp - animationStartTime) / 1000; // convert to seconds
            
            if (elapsedTime < animationDuration) {
                // Update progress fill
                const progressPercentage = (elapsedTime / animationDuration) * 100;
                if (progressFill) {
                    progressFill.style.width = `${progressPercentage}%`;
                }
                
                // Update current stage
                updateStage(elapsedTime);
                
                // Continue animation loop
                animationFrame = requestAnimationFrame(animateMotionGraphics);
            } else {
                // Animation complete, reset or loop
                resetAnimation();
                startAnimation(); // Loop the animation
            }
        }
        
        // Start animation
        function startAnimation() {
            if (!isPlaying) {
                isPlaying = true;
                animationStartTime = null;
                animationFrame = requestAnimationFrame(animateMotionGraphics);
            }
        }
        
        // Reset animation
        function resetAnimation() {
            isPlaying = false;
            cancelAnimationFrame(animationFrame);
            animationStartTime = null;
            
            // Reset progress fill
            if (progressFill) {
                progressFill.style.width = '0%';
            }
            
            // Reset timeline markers
            timelineMarkers.forEach((marker) => {
                marker.classList.remove('active', 'completed');
            });
            
            // Reset stage info panels
            stageInfos.forEach((info) => {
                info.classList.remove('active');
            });
            
            // Set first stage as active
            if (timelineMarkers.length > 0) {
                timelineMarkers[0].classList.add('active');
            }
            
            if (stageInfos.length > 0) {
                stageInfos[0].classList.add('active');
            }
            
            currentStage = 1;
        }
        
        // Pause animation
        function pauseAnimation() {
            if (isPlaying) {
                isPlaying = false;
                cancelAnimationFrame(animationFrame);
            }
        }
        
        // Initialize animation when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                } else {
                    pauseAnimation();
                }
            });
        }, { threshold: 0.3 });
        
        const trackingSection = document.querySelector('.trip-tracking-section');
        if (trackingSection) {
            observer.observe(trackingSection);
            
            // Set initial state
            resetAnimation();
        }
        
        // Add manual controls for testing/debugging
        const animationCanvas = document.querySelector('.animation-canvas');
        if (animationCanvas) {
            // Add click event to restart animation
            animationCanvas.addEventListener('click', function() {
                resetAnimation();
                startAnimation();
            });
        }
        
        // Add truck animation controls
        const truckAnimation = document.getElementById('truck-animation');
        if (truckAnimation) {
            // Adjust truck animation speed
            truckAnimation.addEventListener('load', function() {
                truckAnimation.setSpeed(1.2); // Slightly faster than default
            });
        }
        
        // Add dynamic data points
        const centralAnimation = document.querySelector('.central-animation');
        if (centralAnimation) {
            // Create random data points
            for (let i = 0; i < 10; i++) {
                const dataPoint = document.createElement('div');
                dataPoint.className = 'data-point';
                dataPoint.style.top = `${10 + Math.random() * 80}%`;
                dataPoint.style.left = `${10 + Math.random() * 80}%`;
                dataPoint.style.animationDelay = `${Math.random() * 3}s`;
                
                centralAnimation.appendChild(dataPoint);
            }
        }
        
        // Add mobile app interface updates
        const tripProgress = document.querySelector('.trip-progress .progress-fill');
        const tripStatus = document.querySelector('.trip-status');
        const progressText = document.querySelector('.progress-text');
        
        if (tripProgress && tripStatus && progressText) {
            // Update mobile app interface based on current stage
            setInterval(() => {
                const stagePercentage = (currentStage - 1) / 5; // 0 to 1
                const displayPercentage = Math.round(stagePercentage * 100);
                
                tripProgress.style.width = `${displayPercentage}%`;
                progressText.textContent = `${displayPercentage}% Complete`;
                
                // Update status text based on stage
                const statusTexts = ['Order Created', 'Matched', 'Dispatched', 'In Transit', 'Arriving', 'Delivered'];
                tripStatus.textContent = statusTexts[currentStage - 1] || 'In Progress';
                
                // Add color change based on stage
                const stageColors = ['#ff9900', '#ff6600', '#ff3300', '#ff0066', '#9900ff', '#00cc00'];
                tripStatus.style.backgroundColor = `${stageColors[currentStage - 1]}20`; // 20 = 12% opacity
                tripStatus.style.color = stageColors[currentStage - 1];
            }, 1000);
        }
        
        // Add glow effects animation
        const glowEffects = document.querySelector('.glow-effects');
        if (glowEffects) {
            // Create additional glow orbs
            for (let i = 0; i < 3; i++) {
                const glowOrb = document.createElement('div');
                glowOrb.className = 'glow-orb';
                glowOrb.style.position = 'absolute';
                glowOrb.style.width = `${100 + Math.random() * 200}px`;
                glowOrb.style.height = glowOrb.style.width;
                glowOrb.style.borderRadius = '50%';
                glowOrb.style.background = `radial-gradient(circle at center, rgba(255, ${Math.random() * 50}, 0, 0.2), transparent 70%)`;
                glowOrb.style.top = `${Math.random() * 100}%`;
                glowOrb.style.left = `${Math.random() * 100}%`;
                glowOrb.style.filter = 'blur(30px)';
                glowOrb.style.opacity = '0.3';
                glowOrb.style.animation = `glowPulse ${5 + Math.random() * 5}s infinite alternate ${Math.random() * 5}s`;
                
                glowEffects.appendChild(glowOrb);
            }
        }
        
        // Add route path animation
        const routePath = document.querySelector('.route-path');
        if (routePath) {
            // Make route path responsive to animation progress
            setInterval(() => {
                const routeLine = routePath.querySelector('.route-line');
                if (routeLine) {
                    const dashOffset = 500 - ((currentStage - 1) / 5) * 500;
                    routeLine.style.strokeDashoffset = dashOffset;
                }
            }, 100);
        }
    };
    
    // Initialize the motion graphics animation
    initMotionGraphics();
    
    // Add scroll-triggered animations for the section
    const animateOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const elements = document.querySelectorAll('.trip-tracking-section .section-header, .motion-graphics-container');
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    animateOnScroll();
    
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 1200,
        once: false,
        offset: 100,
        easing: 'ease-out-cubic',
        delay: 100,
        mirror: true
    });
    
    // Add 3D tilt effect to dashboard
    const dashboardPreview = document.querySelector('.dashboard-preview');
    if (dashboardPreview) {
        dashboardPreview.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        dashboardPreview.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(0)';
            this.style.transition = 'transform 0.5s ease';
        });
    }
    
    // Animate feature progress bars on scroll
    const featureItems = document.querySelectorAll('.feature-item');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                if (progressBar) {
                    progressBar.style.transform = 'scaleX(1)';
                }
            }
        });
    }, { threshold: 0.5 });
    
    featureItems.forEach(item => {
        progressObserver.observe(item);
    });
    
    // Add icon particle effects
    featureItems.forEach(item => {
        const icon = item.querySelector('.feature-icon');
        
        if (icon) {
            // Create particles
            const particles = document.createElement('div');
            particles.className = 'icon-particles';
            icon.appendChild(particles);
            
            // Add hover effect
            item.addEventListener('mouseenter', function() {
                const iconElement = this.querySelector('.feature-icon i');
                if (iconElement) {
                    iconElement.style.transform = 'scale(1.2)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const iconElement = this.querySelector('.feature-icon i');
                if (iconElement) {
                    iconElement.style.transform = 'scale(1)';
                }
            });
        }
    });
    
    // Add interactive tabs for feature showcase
    const tabs = document.querySelectorAll('.showcase-tabs .tab');
    const panels = document.querySelectorAll('.showcase-panel');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all panels
            panels.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show the corresponding panel
            const tabId = this.getAttribute('data-tab');
            const panel = document.getElementById(`${tabId}-panel`);
            if (panel) {
                panel.classList.add('active');
            }
        });
    });
    
    // Add parallax effect to orbs
    const featuresSection = document.querySelector('.features-section');
    const orbs = document.querySelectorAll('.glow-orb');
    
    if (featuresSection && orbs.length) {
        window.addEventListener('mousemove', function(e) {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            orbs.forEach((orb, index) => {
                const speed = (index % 3 + 1) * 30;
                const moveX = (mouseX - 0.5) * speed;
                const moveY = (mouseY - 0.5) * speed;
                
                orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
    
    // Add data point hover effects
    const dataPoints = document.querySelectorAll('.data-point');
    
    dataPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.5)';
            this.style.zIndex = '10';
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
            this.style.zIndex = '3';
        });
    });
    
    // Create animated tech grid
    const techGrid = document.querySelector('.tech-grid');
    if (techGrid) {
        // Add random data points to the grid
        for (let i = 0; i < 10; i++) {
            const dataNode = document.createElement('div');
            dataNode.className = 'grid-node';
            dataNode.style.position = 'absolute';
            dataNode.style.width = '8px';
            dataNode.style.height = '8px';
            dataNode.style.borderRadius = '50%';
            dataNode.style.background = '#ff0000';
            dataNode.style.top = `${10 + Math.random() * 80}%`;
            dataNode.style.left = `${10 + Math.random() * 80}%`;
            dataNode.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.7)';
            dataNode.style.zIndex = '2';
            dataNode.style.animation = `nodePulse ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`;
            
            techGrid.appendChild(dataNode);
        }
    }
    
    // Add animated typing effect to feature descriptions
    const featureDescriptions = document.querySelectorAll('.feature-description');
    
    const typingObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const description = entry.target;
                const text = description.textContent;
                description.textContent = '';
                description.style.opacity = '1';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        description.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 20);
                    }
                };
                
                typeWriter();
                typingObserver.unobserve(description);
            }
        });
    }, { threshold: 0.8 });
    
    featureDescriptions.forEach(description => {
        description.style.opacity = '0';
        typingObserver.observe(description);
    });
    
    // Add floating animation to notification
    const notification = document.querySelector('.dashboard-notification');
    if (notification) {
        // Add click event to dismiss notification
        notification.addEventListener('click', function() {
            this.style.animation = 'notificationDismiss 0.5s forwards';
        });
        
        // Add CSS for dismiss animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes notificationDismiss {
                0% {
                    transform: translateY(0);
                    opacity: 1;
                }
                100% {
                    transform: translateY(-20px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add animated circuit lines
    const circuitLines = document.querySelector('.circuit-lines');
    if (circuitLines) {
        // Create data flow animation
        const dataFlow = document.createElement('div');
        dataFlow.className = 'data-flow';
        dataFlow.style.position = 'absolute';
        dataFlow.style.width = '10px';
        dataFlow.style.height = '10px';
        dataFlow.style.borderRadius = '50%';
        dataFlow.style.background = '#ff0000';
        dataFlow.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.7)';
        dataFlow.style.zIndex = '2';
        dataFlow.style.top = '20%';
        dataFlow.style.left = '0';
        dataFlow.style.animation = 'dataFlowAnimation 8s linear infinite';
        
        circuitLines.appendChild(dataFlow);
        
        // Add CSS for data flow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes dataFlowAnimation {
                0% {
                    left: 0;
                    top: 20%;
                }
                25% {
                    left: 30%;
                    top: 20%;
                }
                30% {
                    left: 30%;
                    top: 20%;
                }
                50% {
                    left: 30%;
                    top: 70%;
                }
                55% {
                    left: 30%;
                    top: 70%;
                }
                75% {
                    left: 80%;
                    top: 70%;
                }
                80% {
                    left: 80%;
                    top: 70%;
                }
                100% {
                    left: 80%;
                    top: 20%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add scroll-triggered animations for feature items
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('feature-animated');
                
                // Add CSS for the animation
                const style = document.createElement('style');
                style.textContent = `
                    .feature-animated {
                        animation: featureAppear 0.8s forwards;
                    }
                    
                    @keyframes featureAppear {
                        0% {
                            transform: translateX(-20px);
                            opacity: 0;
                        }
                        100% {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    featureItems.forEach(item => {
        featureObserver.observe(item);
    });
    
    // Add animated gradient background to section
    const featuresBackground = document.querySelector('.features-section');
    if (featuresBackground) {
        featuresBackground.style.background = 'linear-gradient(135deg, #000, #111)';
        featuresBackground.style.backgroundSize = '400% 400%';
        featuresBackground.style.animation = 'gradientAnimation 15s ease infinite';
        
        // Add CSS for gradient animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes gradientAnimation {
                0% {
                    background-position: 0% 50%;
                }
                50% {
                    background-position: 100% 50%;
                }
                100% {
                    background-position: 0% 50%;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add animated underline to feature titles
    const featureTitles = document.querySelectorAll('.feature-title');
    
    featureTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            const divider = this.parentNode.querySelector('.feature-divider');
            if (divider) {
                divider.style.width = '80px';
                divider.style.background = 'linear-gradient(90deg, #ff0000, #ff3300)';
            }
        });
        
        title.addEventListener('mouseleave', function() {
            const divider = this.parentNode.querySelector('.feature-divider');
            if (divider) {
                divider.style.width = '40px';
                divider.style.background = 'linear-gradient(90deg, #ff0000, transparent)';
            }
        });
    });
    
    // Add particle effect to features section
    const featuresSectionElement = document.getElementById('features-section');
    
    if (featuresSectionElement && typeof particlesJS !== 'undefined') {
        // Create a container for particles
        const particlesContainer = document.createElement('div');
        particlesContainer.id = 'features-particles';
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.zIndex = '1';
        
        // Insert the container at the beginning of the section
        featuresSectionElement.insertBefore(particlesContainer, featuresSectionElement.firstChild);
        
        // Initialize particles
        particlesJS('features-particles', {
            "particles": {
                "number": {
                    "value": 40,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ff0000"
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.2,
                    "random": true,
                },
                "size": {
                    "value": 3,
                    "random": true,
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ff0000",
                    "opacity": 0.1,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.4
                        }
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Animation Overlay Section
    const initAnimationOverlay = () => {
        // Animate stats counter
        const animateCounters = () => {
            const statNumbers = document.querySelectorAll('.overlay-stats .stat-number');
            
            statNumbers.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                
                let start = 0;
                const increment = target / (duration / 16); // 60fps
                
                const updateCounter = () => {
                    start += increment;
                    if (start < target) {
                        counter.textContent = Math.floor(start);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        };
        
        // Start counter animation when stats section is in view
        const overlayStats = document.querySelector('.overlay-stats');
        if (overlayStats) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(overlayStats);
        }
        
        // Add parallax effect to glow orbs
        const overlaySection = document.querySelector('.animation-overlay-section');
        const glowOrbs = document.querySelectorAll('.glow-orb');
        
        if (overlaySection && glowOrbs.length) {
            window.addEventListener('mousemove', function(e) {
                const mouseX = e.clientX / window.innerWidth;
                const mouseY = e.clientY / window.innerHeight;
                
                glowOrbs.forEach((orb, index) => {
                    const speed = (index % 3 + 1) * 30;
                    const moveX = (mouseX - 0.5) * speed;
                    const moveY = (mouseY - 0.5) * speed;
                    
                    orb.style.transform = `translate(${moveX}px, ${moveY}px)`;
                });
            });
        }
    };
    
    // Initialize the animation overlay
    initAnimationOverlay();

    // Enhanced typewriter effect with highlighted sections
    const typewriterText = document.getElementById('typewriter-text');
    if (typewriterText) {
        // Clear any existing content first
        typewriterText.innerHTML = '';
        
        // The full text with parts that need highlighting
        const fullText = "ek(one) is India's first unified trucking platform designed to empower small truck owners, brokers, and shippers by seamlessly managing spot market trucks with real-time visibility, digital payments, and AI-driven load matching.";
        
        // Sections to highlight
        const highlight1 = "India's first unified trucking platform";
        const highlight2 = "to empower small truck owners, brokers, and shippers by seamlessly managing spot market trucks";
        
        // Find positions of highlights in the text
        const pos1Start = fullText.indexOf(highlight1);
        const pos1End = pos1Start + highlight1.length;
        const pos2Start = fullText.indexOf(highlight2);
        const pos2End = pos2Start + highlight2.length;
        
        // Break the text into parts
        const part1 = fullText.substring(0, pos1Start);
        const part2 = highlight1;
        const part3 = fullText.substring(pos1End, pos2Start);
        const part4 = highlight2;
        const part5 = fullText.substring(pos2End);
        
        // Create DOM structure with highlighted parts
        const span1 = document.createElement('span');
        span1.textContent = part1;
        
        const highlight1Span = document.createElement('span');
        highlight1Span.className = 'highlight-text';
        highlight1Span.textContent = part2;
        
        const span2 = document.createElement('span');
        span2.textContent = part3;
        
        const highlight2Span = document.createElement('span');
        highlight2Span.className = 'highlight-text';
        highlight2Span.textContent = part4;
        
        const span3 = document.createElement('span');
        span3.textContent = part5;
        
        // Set initial visibility
        [span1, highlight1Span, span2, highlight2Span, span3].forEach(el => {
            el.style.opacity = '0';
            typewriterText.appendChild(el);
        });
        
        // Animate each section with a delay
        setTimeout(() => animateElement(span1), 300);
        setTimeout(() => animateElement(highlight1Span), 1500);
        setTimeout(() => animateElement(span2), 3000);
        setTimeout(() => animateElement(highlight2Span), 3500);
        setTimeout(() => animateElement(span3), 5500);
        
        function animateElement(el) {
            el.style.transition = 'opacity 1s ease';
            el.style.opacity = '1';
        }
        
        // Add cursor at the end
        setTimeout(() => {
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.innerHTML = '|';
            typewriterText.appendChild(cursor);
        }, 6500);
    }

    // Run this code as early as possible
    (function() {
        // Function to initialize highlight animation
        function initHighlightAnimation() {
            // Get the highlight element
            const highlight = document.querySelector('.highlight');
            
            if (highlight) {
                // Get the text content
                const text = highlight.textContent || '60sec';
                
                // Clear the element's content
                highlight.textContent = '';
                
                // Add each character with its own span
                Array.from(text).forEach((char, index) => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.style.setProperty('--char-index', index);
                    charSpan.textContent = char;
                    highlight.appendChild(charSpan);
                });
                
                // Add glow effect on hover
                highlight.addEventListener('mouseover', function() {
                    this.style.textShadow = '0 0 20px rgba(255, 0, 0, 0.8), 0 0 30px rgba(255, 0, 0, 0.6)';
                });
                
                highlight.addEventListener('mouseout', function() {
                    this.style.textShadow = '0 0 15px rgba(255, 0, 0, 0.4)';
                });
            }
        }
        
        // Run immediately
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initHighlightAnimation);
        } else {
            initHighlightAnimation();
        }
        
        // Also run on window load to ensure it works even if the DOM is already loaded
        window.addEventListener('load', initHighlightAnimation);
    })();

    // Add this JavaScript to make the showcase more interactive
    const heroImageShowcase = document.querySelector('.hero-image-showcase');
    
    if (heroImageShowcase) {
        // Add data points and connection lines
        const dataPoint1 = document.createElement('div');
        dataPoint1.className = 'image-data-point data-point-1';
        
        const dataPoint2 = document.createElement('div');
        dataPoint2.className = 'image-data-point data-point-2';
        
        const dataPoint3 = document.createElement('div');
        dataPoint3.className = 'image-data-point data-point-3';
        
        const connectionLine1 = document.createElement('div');
        connectionLine1.className = 'connection-line connection-line-1';
        
        const connectionLine2 = document.createElement('div');
        connectionLine2.className = 'connection-line connection-line-2';
        
        heroImageShowcase.appendChild(dataPoint1);
        heroImageShowcase.appendChild(dataPoint2);
        heroImageShowcase.appendChild(dataPoint3);
        heroImageShowcase.appendChild(connectionLine1);
        heroImageShowcase.appendChild(connectionLine2);
        
        // Add 3D perspective effect on mouse move
        heroImageShowcase.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) { // Only on desktop
                const rect = this.getBoundingClientRect();
                const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
                const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
                
                const image1 = document.querySelector('.showcase-image-1');
                const image2 = document.querySelector('.showcase-image-2');
                const image3 = document.querySelector('.showcase-image-3');
                
                image1.style.transform = `translateX(-50%) translateZ(40px) rotateX(${mouseY * -10}deg) rotateY(${mouseX * 10}deg)`;
                image2.style.transform = `translateZ(20px) translateX(${mouseX * -30}px) rotateY(${10 + mouseX * 15}deg)`;
                image3.style.transform = `translateZ(30px) translateX(${mouseX * 30}px) rotateY(${-15 + mouseX * -15}deg)`;
            }
        });
        
        // Reset on mouse leave
        heroImageShowcase.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                const image1 = document.querySelector('.showcase-image-1');
                const image2 = document.querySelector('.showcase-image-2');
                const image3 = document.querySelector('.showcase-image-3');
                
                image1.style.transform = 'translateX(-50%) translateZ(40px) rotateX(5deg)';
                image2.style.transform = 'translateZ(20px) rotateY(10deg)';
                image3.style.transform = 'translateZ(30px) rotateY(-15deg)';
            }
        });
    }
});
