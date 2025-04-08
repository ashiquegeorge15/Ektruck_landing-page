/**
 * Right-click Protection Script
 * Disables various ways users might try to copy content from the website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Disable right-click on the entire document
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable dragging of images
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.draggable = false;
        img.style.webkitUserDrag = 'none';
    });

    // Prevent drag and drop of images
    document.addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    }, true);
    
    // Prevent keyboard shortcuts that might be used for saving
    document.addEventListener('keydown', function(e) {
        // Ctrl+S, Ctrl+P, Ctrl+Shift+S, F12, PrtScn
        if ((e.ctrlKey && (e.key === 's' || e.key === 'p' || 
            (e.shiftKey && e.key === 's'))) || 
            e.key === 'F12' || e.key === 'PrintScreen') {
            e.preventDefault();
            return false;
        }
    });
    
    // Add CSS to prevent screenshots and text selection
    const style = document.createElement('style');
    style.textContent = `
        body {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
        
        /* Allow selection in form inputs and textareas */
        input, textarea {
            -webkit-user-select: auto !important;
            -moz-user-select: auto !important;
            -ms-user-select: auto !important;
            user-select: auto !important;
        }
        
        @media print {
            body {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    console.log('Content protection initialized');
});

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