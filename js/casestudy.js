$(document).ready(function() {
    // Hide the loading screen after the page has loaded
    setTimeout(function() {
        $('.loading-screen').fadeOut(500);
    }, 1500);

    // Initialize AOS animations
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Handle case study card flip - "Read Full Case Study" button
    $('.btn-read-more').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.card-inner').addClass('flipped');
    });

    // Handle case study card flip - backward button
    $('.btn-flip-back').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.card-inner').removeClass('flipped');
    });

    // Make sure clicking anywhere on the front card flips it (except on text elements)
    $('.card-front').on('click', function(e) {
        // Don't flip if clicking on text elements, links, or buttons
        if ($(e.target).is('p, h3, h4, li, ul, .problem-statement, .key-points, .stats-bar, .stat, .btn-read-more')) {
            return;
        }
        
        // Don't flip if clicking inside problem statement or key points sections
        if ($(e.target).closest('.problem-statement, .key-points, .stats-bar, .btn-read-more').length > 0) {
            return;
        }
        
        $(this).closest('.card-inner').addClass('flipped');
    });

    // Show the back-to-top button when scrolled down
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').addClass('visible');
        } else {
            $('.back-to-top').removeClass('visible');
        }
    });

    // Smooth scroll to top when back-to-top button is clicked
    $('.back-to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // Handle case study modal display
    $('.btn-full-case').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get case study ID from data attribute
        var caseId = $(this).data('case-id');
        $('.case-study-modal[data-case-id="' + caseId + '"]').fadeIn(300);
        $('body').addClass('modal-open');
    });

    // Close modal when clicking the close button or outside the modal
    $('.close-modal, .case-study-modal').on('click', function(e) {
        if ($(e.target).closest('.modal-content').length === 0 || $(e.target).hasClass('close-modal') || $(e.target).closest('.close-modal').length > 0) {
            $('.case-study-modal').fadeOut(300);
            $('body').removeClass('modal-open');
        }
    });

    // Prevent closing when clicking inside the modal content
    $('.modal-content').on('click', function(e) {
        e.stopPropagation();
    });

    // Handle tab navigation for filtering case studies
    $('.tab-btn').on('click', function() {
        var target = $(this).data('target');
        
        // Update active tab
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // Apply filtering logic for cards
        if (target === 'all') {
            $('.case-study-card').fadeIn(400);
        } else {
            $('.case-study-card').hide();
            $('.case-study-card[data-category="' + target + '"]').fadeIn(400);
        }
        
        // Re-run AOS for newly visible elements
        AOS.refresh();
    });

    // Smooth scroll for navigation links
    $('a.nav-link').on('click', function(e) {
        if (this.hash !== '') {
            e.preventDefault();
            
            var hash = this.hash;
            
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 70
            }, 800);
        }
    });

    // Add active class to current nav link based on scroll position
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop();
        
        // Assign active class to nav links while scrolling
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a').eq(i).addClass('active');
            }
        });
    }).scroll();

    // Activate the nav link for "Case Studies" when on this page
    $('.navbar-nav .nav-link').removeClass('active');
    $('.navbar-nav .nav-link[href="case-study/"]').addClass('active');

    // Handle navbar behavior on scroll
    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    // Mobile menu toggle
    $('.navbar-toggler, .menu-toggle').on('click', function() {
        $('.navbar-collapse, .nav-menu').toggleClass('show');
        $(this).toggleClass('active');
    });

    // Dropdown menu on mobile
    $('.dropdown-toggle').on('click', function(e) {
        if ($(window).width() < 992) {
            e.preventDefault();
            $(this).parent().toggleClass('show');
            $(this).next('.dropdown-menu').toggleClass('show');
        }
    });

    // Close dropdown when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.dropdown').length) {
            $('.dropdown').removeClass('show');
            $('.dropdown-menu').removeClass('show');
        }
    });

    // Prevent event bubbling on dropdown menu clicks
    $('.dropdown-menu').on('click', function(e) {
        e.stopPropagation();
    });

    // Stats counter animation with number formatting
    $('.stat-value, .metric-value').each(function() {
        var $this = $(this);
        var countTo = $this.text();
        
        // Skip if not a number
        if (isNaN(parseInt(countTo))) return;
        
        $this.prop('Counter', 0).animate({
            Counter: countTo
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $this.text(Math.ceil(now));
            },
            complete: function() {
                // Add % sign back if needed
                if ($this.text().indexOf('%') === -1 && countTo.indexOf('%') !== -1) {
                    $this.text($this.text() + '%');
                }
            }
        });
    });

    // Add SVG animations to the case study cards
    function animateCards() {
        $('.case-study-card').each(function(index) {
            var delay = index * 150;
            var $card = $(this);
            
            setTimeout(function() {
                $card.addClass('animated');
            }, delay);
        });
    }

    // Call the animation function after a slight delay
    setTimeout(animateCards, 1000);
    
    // Modal download button functionality (for demo purposes)
    $('.btn-download-case').on('click', function() {
        alert('This would download a PDF of the case study in a real implementation.');
    });
    
    // Escape key closes modals
    $(document).keydown(function(e) {
        if (e.keyCode === 27) { // ESC key
            $('.case-study-modal').fadeOut(300);
            $('body').removeClass('modal-open');
        }
    });
}); 