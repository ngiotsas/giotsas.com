// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const searchPlaceholder = document.querySelector('.sprite-search-text');
    
    if (searchInput && searchPlaceholder) {
        searchInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                searchPlaceholder.style.display = 'none';
            } else {
                searchPlaceholder.style.display = 'block';
            }
        });

        searchInput.addEventListener('focus', function() {
            searchPlaceholder.style.display = 'none';
        });

        searchInput.addEventListener('blur', function() {
            if (this.value.length === 0) {
                searchPlaceholder.style.display = 'block';
            }
        });
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                alert('Thank you for your message! We\'ll get back to you soon.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Reset search placeholder if it exists
                if (searchPlaceholder) {
                    searchPlaceholder.style.display = 'block';
                }
            }, 2000);
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading states to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't prevent default for navigation links
            if (this.href && !this.href.includes('#')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                
                // Reset after a short delay to show loading state
                setTimeout(() => {
                    this.textContent = originalText;
                }, 500);
            }
        });
    });

    // Interactive hover effects for sprite icons
    const spriteIcons = document.querySelectorAll('.sprite, .sprite-social, .sprite-webdev');
    spriteIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Add fade-in animation for cards on page load
    const cards = document.querySelectorAll('.preview-card, .skill-detail, .contact-card, .stat-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});