// Temperature Monitoring Solutions JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations
    initHeroAnimations();
    initFeatureCards();
    initTemperatureDisplay();
    initTemperatureGraph();
    createDeviceStatusIndicators();
    initScrollBasedAnimations();
    
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