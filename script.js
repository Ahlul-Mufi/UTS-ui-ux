document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        const isVisible = nav.style.display === 'flex';
        nav.style.display = isVisible ? 'none' : 'flex';
    });
    
    // Close menu when clicking on a link (mobile)
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                nav.style.display = 'none';
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    });
});