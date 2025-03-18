window.onload = function () {
    Particles.init({
        selector: ".background",
        color: ["#ff0000", "#ffffff", "#00ff99", "#33ccff"],
        connectParticles: true,
        maxParticles: 200,
        sizeVariations: 6,
        speed: 2,
        minDistance: 80,
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 5,
                size_min: 1,
                sync: false
            }
        },
        opacity: {
            value: 0.9,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                opacity_min: 0.4,
                sync: false
            }
        },
        move: {
            enable: true,
            speed: 2.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
                enable: true,
                rotateX: 1000,
                rotateY: 1800
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.6,
            width: 2
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 120,
                    color: ["#ff0000", "#ffffff", "#00ff99", "#33ccff"],
                    connectParticles: true,
                    size: {
                        value: 3,
                        random: true
                    }
                }
            }
        ]
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const splash = document.querySelector('.splash');
    const splashLogo = document.querySelector('.splash-logo');
    const changingText = document.querySelector('.changing-text');
    const logo = document.querySelector('.logo');
    
    // Array of text to display
    const texts = ['ek', 'one', 'ஒன்று', 'ಒಂದು', 'एक', 'ek'];
    let currentIndex = 0;

    // Create truck text with registered symbol after 'k'
    const truckText = document.createElement('div');
    truckText.className = 'truck-text';
    truckText.innerHTML = '<sub style="font-size: 130px">truck</sub><sup style="font-size: 30px">®</sup>';
    
    // Add to logo
    logo.appendChild(truckText);

    // Add tire elements
    const frontTire = document.createElement('div');
    frontTire.className = 'tire front-tire';
    
    const rearTire1 = document.createElement('div');
    rearTire1.className = 'tire rear-tire-1';
    
    const rearTire2 = document.createElement('div');
    rearTire2.className = 'tire rear-tire-2';
    
    logo.appendChild(frontTire);
    logo.appendChild(rearTire1);
    logo.appendChild(rearTire2);

    // Initially hide the logo
    logo.style.display = 'none';

    function fitText(element, text) {
        const logoWidth = logo.offsetWidth - 30; // Increased padding for better fit
        const logoHeight = logo.offsetHeight - 40; // Increased padding for better fit
        let fontSize = 100;
        
        // Create temporary span to measure text
        const temp = document.createElement('span');
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        temp.style.whiteSpace = 'nowrap';
        temp.style.fontFamily = "'Poppins', sans-serif";
        temp.style.fontWeight = '600';
        temp.style.letterSpacing = '0px';
        temp.innerHTML = text;
        document.body.appendChild(temp);

        // Binary search for the best fitting font size
        let min = 1;
        let max = 200;
        
        while (min <= max) {
            fontSize = Math.floor((min + max) / 2);
            temp.style.fontSize = fontSize + 'px';
            
            if (temp.offsetWidth <= logoWidth && temp.offsetHeight <= logoHeight) {
                min = fontSize + 1;
            } else {
                max = fontSize - 1;
            }
        }

        // Set the calculated font size with a slightly smaller value for safety
        const finalSize = Math.max(fontSize - 15, 30); // Ensure minimum size of 30px, increased safety margin
        element.style.fontSize = finalSize + 'px';
        
        // Update truck text size to match
        if (truckText) {
            truckText.style.fontSize = finalSize + 'px';
        }
        
        document.body.removeChild(temp);
        
        // Position the text at the bottom of the red box
        element.style.fontFamily = "'Poppins', sans-serif";
        element.style.fontWeight = '600';
        element.style.letterSpacing = '0px';
        element.style.lineHeight = '1';
        element.style.position = 'absolute';
        element.style.bottom = '20px'; // Position at the bottom with some padding
        element.style.left = '50%';
        element.style.transform = 'translateX(-50%)';
        element.style.textAlign = 'center';
        element.style.width = 'auto';
        element.style.padding = '0 10px';
        
        // Ensure the text is visible
        element.style.opacity = '1';
    }

    function changeText() {
        if (currentIndex < texts.length) {
            changingText.textContent = texts[currentIndex];
            fitText(changingText, texts[currentIndex]);
            positionTextAtBottom(); // Ensure text is positioned at the bottom after each change
            currentIndex++;
            
            if (currentIndex < texts.length) {
                setTimeout(changeText, 800); // 800ms delay between changes
            }
        }
    }

    function showFinalContent() {
        const stackingTexts = document.querySelectorAll('.stacking-text');
        const finalContent = document.querySelector('.final-content');
        const finalLogo = document.querySelector('.final-logo');
        const futureText = document.querySelector('.future-text');

        stackingTexts.forEach((text, index) => {
            const characters = text.textContent.split('');
            text.textContent = '';
            characters.forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char;
                const direction = charIndex % 2 === 0 ? '100vw' : '-100vw';
                span.style.setProperty('--split-direction', direction);
                text.appendChild(span);
            });

            setTimeout(() => {
                text.classList.add('exit');
                // Remove the element after animation completes
                text.addEventListener('animationend', () => {
                    text.style.display = 'none'; // Hide the element after animation
                }, { once: true }); // Ensure event listener runs only once
            }, index * 200);
        });

        // After stacking text disperses, show and animate the logo
        setTimeout(() => {
            logo.style.display = 'flex'; // Show the logo
            logo.style.animation = 'boxGrowFromTop 1s ease-out forwards';
            
            // Start text changes after box grows
            setTimeout(() => {
                changeText();
                updateTextStyles(); // Update text styles after text changes
                positionTextAtBottom(); // Position the text at the bottom
                setTimeout(addTruck, 5000);
            }, 1000);
        }, 2000);
    }

    function showStackingText() {
        const container = document.querySelector('.stacking-container');
        const texts = container.querySelectorAll('.stacking-text');
        
        container.style.display = 'block';
        
        // Animate each text line with delay
        texts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('animate');
            }, index * 1000);
        });

        // Start final content animation after last text appears
        setTimeout(showFinalContent, texts.length * 1000 + 1500);
    }

    function addTruck() {
        // Create container for truck and registered symbol
        const truckContainer = document.createElement('div');
        truckContainer.className = 'truck-container';
        truckContainer.style.position = 'absolute';
        truckContainer.style.left = '100vw';
        truckContainer.style.bottom = '10px';
        truckContainer.style.fontFamily = "'Poppins', sans-serif";
        
        // Add truck text
        truckText.style.display = 'block';
        truckText.style.position = 'relative';
        truckText.style.left = '0';
        truckText.style.fontFamily = "'Poppins', sans-serif";
        truckText.style.fontWeight = '600';
        
        // Create registered symbol and add it to truck text
        const regSymbol = document.createElement('span');
        regSymbol.innerHTML = '®';
        regSymbol.className = 'registered-symbol';
        regSymbol.style.position = 'absolute';
        regSymbol.style.right = '-15px';
        regSymbol.style.top = '0';
        regSymbol.style.fontSize = '12px';
        regSymbol.style.fontFamily = "'Poppins', sans-serif";
        truckText.appendChild(regSymbol);
        
        // Add elements to container
        truckContainer.appendChild(truckText);
        
        // Add container to logo
        logo.appendChild(truckContainer);
        
        // Add slide-in animation to container
        truckContainer.classList.add('slide-in');

        // Add sliding animation to registered symbol after truck joins
        setTimeout(() => {
            regSymbol.classList.add('slide-in');
        }, 2200);

        // Rest of the animations remain the same
        setTimeout(() => {
            // Show front tire
            frontTire.style.display = 'block';
            frontTire.classList.add('slide-up');
            
            // Show rear tire 1
            setTimeout(() => {
                rearTire1.style.display = 'block';
                rearTire1.classList.add('slide-up');
            }, 200);
            
            // Show rear tire 2
            setTimeout(() => {
                rearTire2.style.display = 'block';
                rearTire2.classList.add('slide-up');
                
                // After the last wheel appears, show the tagline
                setTimeout(() => {
                    const tagline = document.querySelector('.ektruck-tagline');
                    tagline.classList.add('show');
                    
                    // Wait longer before starting morphic transition
                    setTimeout(() => {
                        // Instead of exit animation, start morphic transition
                        startMorphicTransition();
                    }, 2000); // Wait 2 seconds before transition
                }, 1000);
            }, 400);
        }, 1800);
    }

    // Modify the startMorphicTransition function for a cleaner transition
    function startMorphicTransition() {
        // Get elements needed for transition
        const ektruckContainer = document.querySelector('.ektruck-container');
        const splashLogo = document.querySelector('.logo');
        const tagline = document.querySelector('.ektruck-tagline');
        const frontTire = document.querySelector('.front-tire');
        const rearTire1 = document.querySelector('.rear-tire-1');
        const rearTire2 = document.querySelector('.rear-tire-2');
        const changingText = document.querySelector('.changing-text');
        const truckText = document.querySelector('.truck-text');
        const splash = document.querySelector('.splash');
        
        // Store the current position of the logo for the transition
        const logoRect = splashLogo.getBoundingClientRect();
        sessionStorage.setItem('comingFromSplash', 'true');
        sessionStorage.setItem('splashLogoPosition', JSON.stringify({
            top: logoRect.top,
            left: logoRect.left,
            width: logoRect.width,
            height: logoRect.height
        }));
        
        // Create a loading overlay for smooth transition
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.style.position = 'fixed';
        loadingOverlay.style.top = '0';
        loadingOverlay.style.left = '0';
        loadingOverlay.style.width = '100%';
        loadingOverlay.style.height = '100%';
        loadingOverlay.style.backgroundColor = '#1a1a1a';
        loadingOverlay.style.zIndex = '900';
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.transition = 'opacity 0.5s ease';
        loadingOverlay.style.fontFamily = "'Poppins', sans-serif";
        document.body.appendChild(loadingOverlay);
        
        // Preserve the "ek" text but hide the truck text
        changingText.style.opacity = '1';
        truckText.classList.add('truck-text-shrink');
        
        // Hide the tires with animation
        frontTire.classList.add('shrinking-tires');
        rearTire1.classList.add('shrinking-tires');
        rearTire2.classList.add('shrinking-tires');
        
        // Fade out the tagline
        tagline.classList.add('fading-out');
        
        // After a short delay, start fading in the overlay
        setTimeout(() => {
            loadingOverlay.style.opacity = '1';
            
            // After the overlay is visible, navigate to landing-page.html
            setTimeout(() => {
                window.location.href = 'landing-page.html';
            }, 500);
        }, 800);
    }

    // Add typewriter function with cursor animation
    function typeWriter(element, text, index, speed) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(() => typeWriter(element, text, index, speed), speed);
        } else {
            // Add blinking cursor after typing is complete
            element.style.borderRight = '2px solid #ffffff';
            setInterval(() => {
                element.style.borderRight = element.style.borderRight === '2px solid #ffffff' ? 
                    '2px solid transparent' : '2px solid #ffffff';
            }, 700);
        }
    }

    // Start with stacking text only
    setTimeout(showStackingText, 1000);

    // Add this function to update existing text styles
    function updateTextStyles() {
        // Update changing text styles
        const changingText = document.querySelector('.changing-text');
        if (changingText) {
            changingText.style.fontFamily = "'Poppins', sans-serif";
            changingText.style.fontWeight = '600';
            changingText.style.letterSpacing = '0px';
            changingText.style.background = 'linear-gradient(180deg, #fff 0%, #d4d4d4 100%)';
            changingText.style.backgroundClip = 'text';
            changingText.style.webkitBackgroundClip = 'text';
            changingText.style.webkitTextFillColor = 'transparent';
        }
        
        // Update truck text styles
        const truckText = document.querySelector('.truck-text');
        if (truckText) {
            truckText.style.fontFamily = "'Poppins', sans-serif";
            truckText.style.fontWeight = '600';
            truckText.style.letterSpacing = '0px';
            truckText.style.background = 'linear-gradient(180deg, #fff 0%, #d4d4d4 100%)';
            truckText.style.backgroundClip = 'text';
            truckText.style.webkitBackgroundClip = 'text';
            truckText.style.webkitTextFillColor = 'transparent';
        }
        
        // Update tagline styles
        const tagline = document.querySelector('.ektruck-tagline');
        if (tagline) {
            tagline.style.fontFamily = "'Poppins', sans-serif";
            tagline.style.fontWeight = '500';
            tagline.style.letterSpacing = '1px';
        }
    }

    // Call the updateTextStyles function when the DOM is loaded
    updateTextStyles();

    // Add this function to ensure the text is positioned at the bottom of the red box
    function positionTextAtBottom() {
        const changingText = document.querySelector('.changing-text');
        const logo = document.querySelector('.logo');
        
        if (changingText && logo) {
            // Get the logo dimensions
            const logoHeight = logo.offsetHeight;
            
            // Position the text at the bottom with some padding
            changingText.style.bottom = '25px';
            changingText.style.left = '50%';
            changingText.style.transform = 'translateX(-50%)';
            
            // Ensure the truck text is also positioned correctly
            const truckText = document.querySelector('.truck-text');
            if (truckText) {
                truckText.style.bottom = '20px';
            }
        }
    }

    // Also call it when the window is resized
    window.addEventListener('resize', positionTextAtBottom);
});

// Add this at the end of your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Add a skip button that doesn't interfere with existing elements
    const skipButton = document.createElement('button');
    skipButton.textContent = 'Skip';
    skipButton.className = 'skip-button';
    skipButton.style.position = 'fixed';
    skipButton.style.bottom = '20px';
    skipButton.style.right = '20px';
    skipButton.style.padding = '10px 20px';
    skipButton.style.background = 'rgba(255, 0, 0, 0.7)';
    skipButton.style.color = 'white';
    skipButton.style.border = 'none';
    skipButton.style.borderRadius = '5px';
    skipButton.style.cursor = 'pointer';
    skipButton.style.zIndex = '999';
    skipButton.style.fontFamily = "'Poppins', sans-serif";
    skipButton.style.fontWeight = '500';
    skipButton.style.fontSize = '14px';
    skipButton.onclick = function() {
        window.location.href = 'landing-page.html';
    };
    document.body.appendChild(skipButton);
    
    // Disable particles animation without removing elements
    window.onload = function() {
        // Store the original Particles.init function
        const originalParticlesInit = window.Particles && window.Particles.init;
        
        // Override the Particles.init function to do nothing
        if (window.Particles) {
            window.Particles.init = function() {
                console.log('Particles animation disabled');
                return {
                    destroy: function() {}
                };
            };
        }
        
        // Call any existing onload functions that might be defined elsewhere
        if (typeof originalOnload === 'function') {
            originalOnload();
        }
    };
});
