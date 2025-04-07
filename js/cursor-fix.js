// Fix for custom cursor overflow in hero section
document.addEventListener('DOMContentLoaded', function() {
    // Find the existing custom cursor or create a new one if it doesn't exist
    let customCursor = document.querySelector('.custom-cursor');
    
    if (!customCursor) {
        // If the cursor doesn't exist, no need to continue
        return;
    }
    
    // Get hero section
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Add overflow control to the hero section
    heroSection.style.overflow = 'hidden';
    
    // Replace the existing event listeners with improved ones
    
    // Remove existing mousemove event listeners from hero section
    const oldMouseMove = heroSection.onmousemove;
    heroSection.onmousemove = null;
    
    // Add a new mousemove listener with bounds checking
    heroSection.addEventListener('mousemove', function(e) {
        // Get hero section boundaries
        const rect = heroSection.getBoundingClientRect();
        
        // Check if mouse is within hero section boundaries
        if (e.clientX >= rect.left && e.clientX <= rect.right && 
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            
            // Show cursor
            customCursor.style.opacity = '1';
            
            // Update cursor position with transform for better performance
            requestAnimationFrame(() => {
                customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
        } else {
            // Hide cursor when outside hero section
            customCursor.style.opacity = '0';
        }
    });
    
    // Ensure cursor is hidden when mouse leaves the window
    document.addEventListener('mouseleave', function() {
        customCursor.style.opacity = '0';
    });
    
    // Handle scroll events to hide cursor when scrolling away from hero section
    window.addEventListener('scroll', function() {
        const rect = heroSection.getBoundingClientRect();
        // If hero section is out of view, hide cursor
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
            customCursor.style.opacity = '0';
        }
    });
    
    // Prevent cursor from causing horizontal scrollbar
    document.body.style.overflowX = 'hidden';
    
    // Fix for mobile: hide custom cursor on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        customCursor.style.display = 'none';
    }
}); 