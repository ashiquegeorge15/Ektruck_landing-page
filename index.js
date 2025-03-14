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
    
    // Create chart bars
    for (let i = 0; i < 5; i++) {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${20 + Math.random() * 60}%`;
        bar.style.width = '15%';
        bar.style.background = 'linear-gradient(to top, #ff0000, #ff3300)';
        bar.style.borderRadius = '3px';
        bar.style.position = 'absolute';
        bar.style.bottom = '15px';
        bar.style.left = `${15 + i * 20}%`;
        bar.style.transformOrigin = 'bottom';
        bar.style.transform = 'scaleY(0)';
        bar.style.transition = 'transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        bar.style.transitionDelay = `${i * 0.1}s`;
        
        container.appendChild(bar);
    }
    
    // Add title
    const title = document.createElement('div');
    title.textContent = 'Efficiency Gains';
    title.style.color = '#fff';
    title.style.fontSize = '12px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    
    container.insertBefore(title, container.firstChild);
    
    // Add to the benefits section
    benefitsSectionElement.appendChild(container);
    
    // Animate in when scrolled into view
    const vizObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
                
                // Animate bars
                const bars = container.querySelectorAll('.chart-bar');
                bars.forEach(bar => {
                    bar.style.transform = 'scaleY(1)';
                });
                
                vizObserver.unobserve(container);
            }
        });
    }, { threshold: 0.5 });
    
    vizObserver.observe(container);
};

// Create data visualization if benefits section exists
if (benefitsSectionElement) {
    createDataVisualization();
}
