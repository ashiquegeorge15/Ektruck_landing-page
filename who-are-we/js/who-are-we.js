// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize particles.js for background effect
    if (document.querySelector('.particles')) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
            },
            interactivity: {
                detect_on: 'canvas',
                events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // Initialize Swiper with advanced 3D effects
    const heroSwiper = new Swiper('.hero-swiper', {
        effect: 'creative',
        creativeEffect: {
            prev: {
                // Will set `translateZ(-400px)` on previous slides
                translate: [0, 0, -400],
                opacity: 0
            },
            next: {
                // Will set `translateX(100%)` on next slides
                translate: ['100%', 0, 0],
                opacity: 0
            },
        },
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        on: {
            init: function() {
                // Add custom animation class to show slide is active
                document.querySelector('.swiper-slide-active').classList.add('active-slide');
            },
            slideChangeTransitionStart: function() {
                // Reset animations when slide changes
                document.querySelectorAll('.swiper-slide').forEach(slide => {
                    slide.classList.remove('active-slide');
                });
            },
            slideChangeTransitionEnd: function() {
                // Add animations to active slide
                document.querySelector('.swiper-slide-active').classList.add('active-slide');
                
                // Create parallax effect for slide content
                const activeSlide = document.querySelector('.swiper-slide-active');
                const slideImage = activeSlide.querySelector('.slide-image img');
                
                // Reset transforms
                slideImage.style.transform = 'scale(1.05)';
                
                // Add 3D depth effect with slight delay
                setTimeout(() => {
                    // Apply subtle floating animation to enhance 3D feel
                    applyFloatingEffect(activeSlide);
                }, 300);
            }
        }
    });
    
    // Helper function to apply floating effect to elements
    function applyFloatingEffect(element) {
        const randomFactor = Math.random() * 0.3 + 0.85; // Between 0.85 and 1.15
        element.style.animation = `floatElement ${4 * randomFactor}s infinite ease-in-out`;
    }
    
    // Add mouse move parallax effect to slider
    const sliderContainer = document.querySelector('.hero-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = sliderContainer.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            const swiper = document.querySelector('.hero-swiper');
            const activeSlide = document.querySelector('.swiper-slide-active');
            
            if (swiper && activeSlide) {
                // Apply subtle rotation based on mouse position
                swiper.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
                
                // Apply parallax to active slide content
                const slideImage = activeSlide.querySelector('.slide-image img');
                if (slideImage) {
                    slideImage.style.transform = `scale(1.05) translateX(${x * -20}px) translateY(${y * -20}px)`;
                }
                
                // Shadow effect follows mouse
                const shadow = document.querySelector('.slider-cube-shadow');
                if (shadow) {
                    shadow.style.transform = `rotateX(80deg) translateZ(-50px) translateX(${x * 30}px) translateY(${y * 30}px)`;
                }
            }
        });
        
        // Reset transforms when mouse leaves
        sliderContainer.addEventListener('mouseleave', () => {
            const swiper = document.querySelector('.hero-swiper');
            const activeSlide = document.querySelector('.swiper-slide-active');
            
            if (swiper) {
                swiper.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
            }
            
            if (activeSlide) {
                const slideImage = activeSlide.querySelector('.slide-image img');
                if (slideImage) {
                    slideImage.style.transform = 'scale(1.05)';
                }
            }
            
            const shadow = document.querySelector('.slider-cube-shadow');
            if (shadow) {
                shadow.style.transform = 'rotateX(80deg) translateZ(-50px)';
            }
        });
    }
    
    // Member card flip functionality
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', () => {
            member.querySelector('.member-card').classList.add('flipped');
        });
        
        member.addEventListener('mouseleave', () => {
            member.querySelector('.member-card').classList.remove('flipped');
        });
    });
});

// Add interactive hover effects for team members
function addTeamInteractivity() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Add floating animation randomly
        const randomDelay = Math.random() * 5; // Random delay between 0-5s
        const memberCard = member.querySelector('.member-card');
        
        // Apply floating animation to some cards for subtle movement
        if (Math.random() > 0.5) {
            // Since cards are flipped by default, apply animation to the back side
            memberCard.style.animation = `floatUp 6s ease-in-out ${randomDelay}s infinite`;
        }
        
        // Add sound effect on flip (optional - uncomment if needed)
        /*
        member.addEventListener('mouseenter', () => {
            const audio = new Audio('sound/flip.mp3');
            audio.volume = 0.2;
            audio.play();
        });
        */
    });
    
    // Add glowing border effect on scroll
    const addGlowEffect = () => {
        const scrollPosition = window.scrollY + window.innerHeight;
        teamMembers.forEach(member => {
            const memberPosition = member.getBoundingClientRect().top + window.scrollY;
            
            if (scrollPosition > memberPosition) {
                member.classList.add('visible');
                
                // Add shadow effect - now to the back face by default
                setTimeout(() => {
                    member.style.filter = 'drop-shadow(0 0 10px rgba(226, 0, 0, 0.7))';
                }, 300);
            }
        });
    };
    
    window.addEventListener('scroll', addGlowEffect);
    // Call once on load
    addGlowEffect();
}

// Add parallax effect to backgrounds
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Apply parallax to sections with .parallax class
        document.querySelectorAll('.values, .team, .purpose').forEach(section => {
            const sectionTop = section.offsetTop;
            const distance = (sectionTop - scrollPosition) * 0.1;
            
            // Create subtle parallax effect
            if (section.querySelector('::before')) {
                section.querySelector('::before').style.transform = `translateY(${distance}px)`;
            }
        });
    });
}

// Add special effect for vision and mission section
document.addEventListener('DOMContentLoaded', () => {
    const visionBox = document.querySelector('.vision-box');
    const missionBox = document.querySelector('.mission-box');
    
    if (visionBox && missionBox) {
        // Add mousemove effect
        [visionBox, missionBox].forEach(box => {
            box.addEventListener('mousemove', (e) => {
                const rect = box.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) - 0.5;
                const y = ((e.clientY - rect.top) / rect.height) - 0.5;
                
                // Apply subtle 3D transform
                box.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) scale(1.02)`;
                
                // Add highlight effect
                const highlight = `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(226, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%)`;
                box.style.backgroundImage = highlight;
            });
            
            // Reset on mouseout
            box.addEventListener('mouseleave', () => {
                box.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) scale(1)';
                box.style.backgroundImage = 'none';
            });
        });
    }
}); 