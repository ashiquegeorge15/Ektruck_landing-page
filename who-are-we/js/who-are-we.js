// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Initialize Particles.js
    particlesJS('particles', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#e20000', '#ffffff', '#333333']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#e20000',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Add interactive hover effects for team members
    addTeamInteractivity();
    
    // Add parallax effects to backgrounds
    addParallaxEffect();
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