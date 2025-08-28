// Advanced JavaScript functionality for Giotsas website

document.addEventListener('DOMContentLoaded', function() {
    
    // Animated counters for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const increment = target / 200;
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Enhanced search functionality
    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchDropdown = document.getElementById('searchDropdown');
        const searchPlaceholder = document.getElementById('searchPlaceholder');
        
        if (!searchInput) return;
        
        const searchData = [
            { title: 'Python Development', url: 'skills.html#python', type: 'skill' },
            { title: 'Web Development', url: 'skills.html#web', type: 'skill' },
            { title: 'Our Story', url: 'about.html', type: 'page' },
            { title: 'Projects', url: 'projects.html', type: 'page' },
            { title: 'Portfolio Website', url: 'projects.html#portfolio', type: 'project' },
            { title: 'Python Scripts', url: 'projects.html#python-scripts', type: 'project' },
            { title: 'Learning Blog', url: 'blog.html', type: 'page' }
        ];
        
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            
            clearTimeout(searchTimeout);
            
            if (query.length === 0) {
                hideSearchDropdown();
                showPlaceholder();
                return;
            }
            
            hidePlaceholder();
            
            searchTimeout = setTimeout(() => {
                const results = searchData.filter(item => 
                    item.title.toLowerCase().includes(query)
                ).slice(0, 5);
                
                showSearchResults(results, query);
            }, 150);
        });
        
        searchInput.addEventListener('focus', hidePlaceholder);
        searchInput.addEventListener('blur', function() {
            setTimeout(() => {
                if (this.value.length === 0) showPlaceholder();
                hideSearchDropdown();
            }, 200);
        });
        
        function showSearchResults(results, query) {
            if (results.length === 0) {
                searchDropdown.innerHTML = '<div class="search-suggestion">No results found</div>';
                searchDropdown.style.display = 'block';
                return;
            }
            
            const html = results.map(result => `
                <div class="search-suggestion" onclick="window.location.href='${result.url}'">
                    <strong>${highlightMatch(result.title, query)}</strong>
                    <small>${result.type}</small>
                </div>
            `).join('');
            
            searchDropdown.innerHTML = html;
            searchDropdown.style.display = 'block';
        }
        
        function highlightMatch(text, query) {
            const regex = new RegExp(`(${query})`, 'gi');
            return text.replace(regex, '<mark>$1</mark>');
        }
        
        function hideSearchDropdown() {
            searchDropdown.style.display = 'none';
        }
        
        function showPlaceholder() {
            if (searchPlaceholder) searchPlaceholder.style.display = 'block';
        }
        
        function hidePlaceholder() {
            if (searchPlaceholder) searchPlaceholder.style.display = 'none';
        }
    }
    
    // Project filtering
    function initProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card[data-category]');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => card.style.opacity = '1', 50);
                    } else {
                        card.style.opacity = '0';
                        setTimeout(() => card.style.display = 'none', 300);
                    }
                });
            });
        });
    }
    
    // Newsletter form
    function initNewsletterForm() {
        const form = document.getElementById('newsletterForm');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('newsletterEmail').value;
            const button = form.querySelector('button');
            const originalText = button.innerHTML;
            
            // Simple email validation
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            button.innerHTML = '<span>Subscribing...</span>';
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                alert('Thanks for following our journey! We\'ll keep you updated.');
                form.reset();
                button.innerHTML = originalText;
                button.disabled = false;
                
                // Reset search placeholder if it exists
                const placeholder = document.getElementById('searchPlaceholder');
                if (placeholder) placeholder.style.display = 'block';
            }, 1500);
        });
    }
    
    // Smooth reveal animations
    function initRevealAnimations() {
        const elements = document.querySelectorAll('.preview-card, .project-card, .blog-card, .focus-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Tilt effect for cards
    function initTiltEffect() {
        const tiltCards = document.querySelectorAll('[data-tilt]');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', handleTilt);
            card.addEventListener('mouseleave', resetTilt);
        });
        
        function handleTilt(e) {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const rotateX = (e.clientY - centerY) / 10;
            const rotateY = (centerX - e.clientX) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
        
        function resetTilt(e) {
            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    }
    
    // Progress bar animations
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const targetWidth = progressBar.style.width;
                    
                    progressBar.style.width = '0%';
                    setTimeout(() => {
                        progressBar.style.transition = 'width 2s ease';
                        progressBar.style.width = targetWidth;
                    }, 100);
                    
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        progressBars.forEach(bar => observer.observe(bar));
    }
    
    // Initialize all functions
    animateCounters();
    initSearch();
    initProjectFilter();
    initNewsletterForm();
    initRevealAnimations();
    initTiltEffect();
    initProgressBars();
    
    // Page load performance
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
});