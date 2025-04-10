// Fix splash screen
document.addEventListener('DOMContentLoaded', function() {
    // Force show the splash screen if it exists and should be shown
    setTimeout(function() {
        const splash = document.querySelector('.splash');
        if (splash && shouldShowSplashScreen()) {
            splash.style.display = 'block';
            splash.style.opacity = '1';
            splash.style.visibility = 'visible';
        }
    }, 100);
});
