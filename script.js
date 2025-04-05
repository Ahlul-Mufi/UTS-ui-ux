document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 500);
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks?.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger?.classList.remove('active');
                    }
                }
            }
        });
    });

    // Highlight active navigation item
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (sections.length && navItems.length) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
                
                if (pageYOffset >= (sectionTop - headerHeight - 50)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${current}`) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
        });
    }

    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .secondary-button, .add-to-cart');
    
    buttons.forEach(button => {
        button?.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button?.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .service-card, .testimonial-card, .tip-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
                element.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.product-card, .service-card, .testimonial-card, .tip-card');
    animatedElements.forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px) scale(0.95)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });

    // Run animations
    if (animatedElements.length) {
        animateOnScroll();
        window.addEventListener('scroll', animateOnScroll);
    }

    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button?.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('h3')?.textContent || 'Product';
                const productPrice = productCard.querySelector('.product-price')?.textContent || '';
                
                alert(`Added ${productName} (${productPrice}) to your cart!`);
                
                this.textContent = 'Added!';
                setTimeout(() => {
                    this.textContent = 'Add to Cart';
                }, 1500);
            }
        });
    });
});