// This script should be added to index.html to handle the incoming transition
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're coming from splash page
    if (sessionStorage.getItem('comingFromSplash') === 'true') {
        // Get the navbar logo element
        const navbarLogo = document.querySelector('.logo img') || document.querySelector('.navbar .logo') || document.querySelector('.navbar-brand');
        
        if (navbarLogo) {
            // Get stored position data
            const storedPosition = JSON.parse(sessionStorage.getItem('splashLogoPosition'));
            
            // Create a loading screen that will fade out
            const loadingScreen = document.createElement('div');
            loadingScreen.className = 'transition-loading-screen';
            loadingScreen.style.position = 'fixed';
            loadingScreen.style.top = '0';
            loadingScreen.style.left = '0';
            loadingScreen.style.width = '100%';
            loadingScreen.style.height = '100%';
            loadingScreen.style.backgroundColor = '#1a1a1a';
            loadingScreen.style.zIndex = '9998';
            loadingScreen.style.opacity = '1';
            loadingScreen.style.transition = 'opacity 0.8s ease';
            loadingScreen.style.fontFamily = "'Poppins', sans-serif";
            document.body.appendChild(loadingScreen);
            
            // Create a container for the morphing logo
            const morphingContainer = document.createElement('div');
            morphingContainer.className = 'morphing-logo-container';
            morphingContainer.style.fontFamily = "'Poppins', sans-serif";
            document.body.appendChild(morphingContainer);
            
            // Create the morphing logo content (red box)
            const morphingContent = document.createElement('div');
            morphingContent.className = 'morphing-logo-content';
            morphingContainer.appendChild(morphingContent);
            
            // Add the "ek" text that will be preserved
            const ekText = document.createElement('div');
            ekText.className = 'morphing-ek-text preserve-ek';
            ekText.textContent = 'ek';
            ekText.style.fontFamily = "'Poppins', sans-serif";
            ekText.style.fontWeight = '600';
            morphingContent.appendChild(ekText);
            
            // Hide the original logo during transition
            navbarLogo.classList.add('smooth-logo-transition');
            navbarLogo.style.opacity = '0';
            
            // Start the morphing animation
            setTimeout(() => {
                // Get the final position of the actual logo
                const finalRect = navbarLogo.getBoundingClientRect();
                
                // Animate the morphing content
                morphingContent.style.transition = 'all 1.2s cubic-bezier(0.39, 0.575, 0.565, 1)';
                morphingContent.style.width = `${finalRect.width}px`;
                morphingContent.style.height = `${finalRect.height}px`;
                morphingContent.style.position = 'fixed';
                morphingContent.style.top = `${finalRect.top}px`;
                morphingContent.style.left = `${finalRect.left}px`;
                
                // Shrink the ek text
                ekText.style.fontSize = '0';
                ekText.style.opacity = '0';
                
                // Fade out the loading screen
                loadingScreen.style.opacity = '0';
                
                // After the animation completes
                setTimeout(() => {
                    // Show the original logo
                    navbarLogo.style.opacity = '1';
                    
                    // Fade out the morphing elements
                    morphingContent.style.opacity = '0';
                    
                    // Remove the elements after they've faded out
                    setTimeout(() => {
                        morphingContainer.remove();
                        loadingScreen.remove();
                        
                        // Clear session storage
                        sessionStorage.removeItem('comingFromSplash');
                        sessionStorage.removeItem('splashLogoPosition');
                    }, 500);
                }, 1200);
            }, 200);
        }
    }
}); 