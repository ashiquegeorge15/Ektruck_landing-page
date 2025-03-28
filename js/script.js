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

// Function to check if splash screen should be shown
function shouldShowSplashScreen() {
    // Get last splash screen timestamp from localStorage
    const lastSplashTimestamp = localStorage.getItem('lastSplashTimestamp');
    const currentTime = new Date().getTime();
    
    // 20 hours in milliseconds
    const twentyHoursInMs = 20 * 60 * 60 * 1000;
    
    // If no timestamp exists or the time difference is more than 20 hours
    if (!lastSplashTimestamp || (currentTime - parseInt(lastSplashTimestamp)) > twentyHoursInMs) {
        // Set the current timestamp
        localStorage.setItem('lastSplashTimestamp', currentTime.toString());
        return true;
    }
    
    return false;
}

document.addEventListener('DOMContentLoaded', () => {
    const splash = document.querySelector('.splash');
    const content = document.querySelector('.content');
    const splashLogo = document.querySelector('.splash-logo');
    const changingText = document.querySelector('.changing-text');
    const logo = document.querySelector('.logo');
    
    // Check if we should show the splash screen
    const showSplash = shouldShowSplashScreen();
    
    if (!showSplash && splash && content) {
        // Hide splash and show content immediately if we shouldn't show splash
        splash.style.display = 'none';
        content.style.display = 'block';
        content.style.opacity = '1';
        content.style.visibility = 'visible';
        
        // Dispatch an event that the splash is complete
        window.dispatchEvent(new CustomEvent('splashComplete'));
        
        // Initialize AOS
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: true,
                    offset: 100
                });
            }, 100);
        }
        
        return; // Skip the rest of splash animation setup
    }
    
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
        const splash = document.querySelector('.splash');
        const content = document.querySelector('.content');
        
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
        
        // Fade in the overlay
        setTimeout(() => {
            loadingOverlay.style.opacity = '1';
            
            // After the overlay is visible, show main content
            setTimeout(() => {
                if (splash && content) {
                    // Completely hide the splash
                    splash.style.display = 'none';
                    
                    // Show the content with explicit styling
                    content.style.display = 'block';
                    content.style.opacity = '1';
                    content.style.visibility = 'visible';
                    content.style.position = 'relative';
                    content.style.zIndex = '50';
                    
                    // Add additional styling to make content visible
                    document.body.style.overflow = 'auto';
                    document.body.style.height = 'auto';
                    
                    // Fade out the overlay
                    loadingOverlay.style.opacity = '0';
                    
                    // Remove any skip button that might be present
                    const skipBtn = document.querySelector('.skip-button');
                    if (skipBtn) {
                        skipBtn.style.transition = 'opacity 0.5s ease';
                        skipBtn.style.opacity = '0';
                        setTimeout(() => skipBtn.remove(), 500);
                    }
                    
                    // Remove overlay after fade out
                    setTimeout(() => {
                        loadingOverlay.remove();
                        
                        // Force a window resize to ensure all elements are properly rendered
                        window.dispatchEvent(new Event('resize'));
                    }, 500);
                    
                    // Initialize AOS animations if they exist
                    if (typeof AOS !== 'undefined') {
                        setTimeout(() => {
                            AOS.init({
                                duration: 800,
                                easing: 'ease-in-out',
                                once: true
                            });
                        }, 100);
                    }
                    
                    // Dispatch an event that the splash is complete
                    window.dispatchEvent(new CustomEvent('splashComplete'));
                    
                    // Update localStorage timestamp to remember this session
                    const currentTime = new Date().getTime();
                    localStorage.setItem('lastSplashTimestamp', currentTime.toString());
                }
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

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Handle dropdowns in mobile menu
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
            if (dropdownToggle) {
                dropdownToggle.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                    }
                });
            }
        });
    }
    
    // Hide navbar on scroll down, show on scroll up
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.classList.add('hidden');
            } else {
                navbar.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }
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
        // Skip animation and show main content
        const splash = document.querySelector('.splash');
        const content = document.querySelector('.content');
        
        // Handle splash element
        if (splash) {
            // Completely hide the splash
            splash.style.display = 'none';
        }
        
        // Handle content element
        if (content) {
            // Show the content with explicit styling
            content.style.display = 'block';
            content.style.opacity = '1';
            content.style.visibility = 'visible';
            content.style.position = 'relative';
            content.style.zIndex = '50';
        }
        
        // Add additional styling to make content visible
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
        
        // Force a window resize to ensure all elements are properly rendered
        window.dispatchEvent(new Event('resize'));
        
        // Initialize AOS animations if they exist
        setTimeout(() => {
            if (typeof AOS !== 'undefined') {
                try {
                    AOS.init({
                        duration: 800,
                        easing: 'ease-in-out',
                        once: true
                    });
                    console.log('AOS animations initialized from skip button');
                } catch (e) {
                    console.error('Error initializing AOS from skip button:', e);
                }
            }
        }, 300);
        
        // Dispatch an event that the splash is complete
        window.dispatchEvent(new CustomEvent('splashComplete'));
        
        // Update localStorage timestamp to remember this session
        const currentTime = new Date().getTime();
        localStorage.setItem('lastSplashTimestamp', currentTime.toString());
        
        // Remove the skip button after it's used
        skipButton.remove();
    };
    
    // Only add the skip button if splash screen should be shown
    if (shouldShowSplashScreen()) {
        document.body.appendChild(skipButton);
    }
    
    // Auto-remove skip button when content is fully loaded
    const contentObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.target.style.opacity === '1' && 
                mutation.target.style.display === 'block') {
                // Content is now visible, remove skip button
                const skipBtn = document.querySelector('.skip-button');
                if (skipBtn) {
                    // Add fade out animation
                    skipBtn.style.transition = 'opacity 0.5s ease';
                    skipBtn.style.opacity = '0';
                    
                    // Remove after animation
                    setTimeout(() => {
                        skipBtn.remove();
                    }, 500);
                }
                
                // Disconnect observer since we no longer need it
                contentObserver.disconnect();
            }
        });
    });
    
    // Start observing the content element
    const content = document.querySelector('.content');
    if (content) {
        contentObserver.observe(content, { 
            attributes: true,
            attributeFilter: ['style']
        });
    }
    
    // Additional failsafe: Remove skip button after animation complete (typical timing)
    setTimeout(() => {
        const skipBtn = document.querySelector('.skip-button');
        if (skipBtn && document.querySelector('.content').style.opacity === '1') {
            // Add fade out animation
            skipBtn.style.transition = 'opacity 0.5s ease';
            skipBtn.style.opacity = '0';
            
            // Remove after animation
            setTimeout(() => {
                skipBtn.remove();
            }, 500);
        }
    }, 15000); // 15 seconds is typically enough for the splash animation
    
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

// Stats Counter Animation
document.addEventListener('DOMContentLoaded', function() {
    // Get all stats number elements
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Only proceed if stat numbers exist
    if (statNumbers && statNumbers.length > 0) {
        // Create Intersection Observer for stats
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start the counter animation when the stats section is visible
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, { threshold: 0.5 });
        
        // Observe each stat number
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    // Function to animate counter
    function animateCounter(statElement) {
        if (!statElement) return;
        
        const targetAttr = statElement.getAttribute('data-count');
        if (!targetAttr) return;
        
        const target = parseInt(targetAttr);
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // Assuming 60fps (1000ms/60 ≈ 16ms per frame)
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                statElement.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                statElement.textContent = target;
            }
        };
        
        requestAnimationFrame(updateCounter);
    }
});

// Animate SVG elements when they enter viewport
document.addEventListener('DOMContentLoaded', function() {
    const animatedIcons = document.querySelectorAll('.animated-icon');
    
    // Only proceed if animatedIcons exist
    if (animatedIcons && animatedIcons.length > 0) {
        const iconObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        animatedIcons.forEach(icon => {
            iconObserver.observe(icon);
        });
    }
});

// Initialize AOS animations when the content is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure all elements are ready
    setTimeout(() => {
        // Check if AOS is loaded
        if (typeof AOS !== 'undefined') {
            try {
                AOS.init({
                    duration: 800,
                    easing: 'ease-in-out',
                    once: false,
                    mirror: false,
                    offset: 100
                });
                console.log('AOS animations initialized');
            } catch (error) {
                console.error('Error initializing AOS:', error);
            }
        } else {
            console.log('AOS library not loaded');
        }
    }, 200);
});

// Partners Marquee Animation
document.addEventListener('DOMContentLoaded', function() {
    // Function to adjust marquee animation speed based on screen width
    function adjustMarqueeSpeed() {
        const marqueeContainers = document.querySelectorAll('.marquee-container');
        if (!marqueeContainers || marqueeContainers.length === 0) return;
        
        const screenWidth = window.innerWidth;
        let speed;
        
        // Adjust speed based on screen width
        if (screenWidth <= 480) {
            speed = '20s';
        } else if (screenWidth <= 768) {
            speed = '25s';
        } else {
            speed = '35s';
        }
        
        // Apply speed to all marquee containers
        marqueeContainers.forEach(container => {
            container.style.setProperty('--marquee-speed', speed);
        });
    }
    
    // Add mouse interaction to marquee
    const marqueeTrack = document.querySelector('.marquee-track');
    if (marqueeTrack) {
        // Pause marquee on mouse hover
        marqueeTrack.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        // Resume marquee on mouse leave
        marqueeTrack.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
        
        // Add touch capability for mobile
        marqueeTrack.addEventListener('touchstart', function() {
            this.style.animationPlayState = 'paused';
        }, { passive: true });
        
        marqueeTrack.addEventListener('touchend', function() {
            this.style.animationPlayState = 'running';
        }, { passive: true });
    }
    
    // Initial adjustment
    adjustMarqueeSpeed();
    
    // Adjust on window resize
    window.addEventListener('resize', adjustMarqueeSpeed);
});

// Navbar scroll effect and mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    // Get navbar elements
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            if (navMenu) {
                navMenu.classList.toggle('active');
            }
        });
    }
    
    // Dropdown toggle for mobile
    if (dropdownItems && dropdownItems.length > 0) {
        dropdownItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            if (link) {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 991) {
                        e.preventDefault();
                        item.classList.toggle('show-dropdown');
                        
                        // Close other dropdowns
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('show-dropdown');
                            }
                        });
                    }
                });
            }
        });
    }
    
    // Navbar scroll effect
    function handleScroll() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('active') && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.menu-toggle')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Hero Screenshots Animation
document.addEventListener('DOMContentLoaded', function() {
    // Interactive Hero Screenshots with Click-to-Reveal functionality
    const heroSection = document.querySelector('.hero-section');
    const heroInteractive = document.querySelector('.hero-interactive-area');
    const clickInstruction = document.querySelector('.hero-click-instruction');
    const screenshotsContainer = document.getElementById('hero-screenshots-container');
    
    if (!heroSection || !heroInteractive || !screenshotsContainer) return;
    
    // Get all screenshot images from assets/slider folder
    const screenshotImages = [
        'assets/slider/ss1.jpeg',
        'assets/slider/ss2.jpeg',
        'assets/slider/ss3.jpeg',
        'assets/slider/ss4.jpeg',
        'assets/slider/ss5.jpeg',
        'assets/slider/ss6.jpeg',
    
    ];
    
    let clickCount = 0;
    let activeScreenshots = [];
    const maxActiveScreenshots = 5; // Maximum number of screenshots visible at once
    
    // Click on the hero section to reveal a screenshot
    heroInteractive.addEventListener('click', function(e) {
        // Get click position relative to the hero section
        const rect = heroSection.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Create and show a new screenshot
        showScreenshotAtPosition(x, y);
        
        // Hide instruction after first click
        if (clickInstruction && !clickInstruction.classList.contains('hide')) {
            clickInstruction.classList.add('hide');
        }
        
        // Count clicks
        clickCount++;
    });
    
    // Show a screenshot at the specified position
    function showScreenshotAtPosition(x, y) {
        // Randomly select an image
        const randomIndex = Math.floor(Math.random() * screenshotImages.length);
        const imageSrc = screenshotImages[randomIndex];
        
        // Create screenshot element
        const screenshot = document.createElement('div');
        screenshot.className = 'hero-screenshot';
        
        // Create image element
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'App Screenshot';
        img.loading = 'lazy';
        
        // Add image to screenshot
        screenshot.appendChild(img);
        
        // Position the screenshot initially below the visible area
        screenshot.style.left = `${x - 125}px`; // Center horizontally on click position
        screenshot.style.top = `${y - 100}px`; // Position vertically
        
        // Set random exit rotation
        const exitRotation = Math.random() * 40 - 20; // -20 to 20 degrees
        screenshot.style.setProperty('--exit-rotate', `${exitRotation}deg`);
        
        // Add screenshot to container
        screenshotsContainer.appendChild(screenshot);
        
        // Track this screenshot
        activeScreenshots.push(screenshot);
        
        // Enforce maximum number of active screenshots
        if (activeScreenshots.length > maxActiveScreenshots) {
            // Remove oldest screenshot
            const oldestScreenshot = activeScreenshots.shift();
            if (oldestScreenshot) {
                oldestScreenshot.classList.add('exit');
                
                // Remove from DOM after animation completes
                setTimeout(() => {
                    oldestScreenshot.remove();
                }, 1200); // Match the exit animation duration
            }
        }
        
        // Make screenshot visible after a small delay to trigger animation
        requestAnimationFrame(() => {
            screenshot.classList.add('visible');
        });
        
        // Auto remove after some time
        setTimeout(() => {
            if (activeScreenshots.includes(screenshot)) {
                // Remove from active list
                const index = activeScreenshots.indexOf(screenshot);
                if (index > -1) {
                    activeScreenshots.splice(index, 1);
                }
                
                // Start exit animation
                screenshot.classList.remove('visible');
                screenshot.classList.add('exit');
                
                // Remove from DOM after animation completes
                setTimeout(() => {
                    screenshot.remove();
                }, 1200); // Match the exit animation duration
            }
        }, 4000 + Math.random() * 2000); // Random display time between 4-6 seconds
    }
    
    // Recreate screenshot container when window is resized
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Clear all screenshots on resize
            screenshotsContainer.innerHTML = '';
            activeScreenshots = [];
        }, 300);
    });
});
