document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Sticky Header Shadow
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
            }
        });
    }

    const navContainer = document.querySelector('.nav-container');
    const mainNav = document.querySelector('.main-nav');
    
    if (navContainer && mainNav) {
        // Only create toggle if it doesn't exist
        let navToggle = document.querySelector('.mobile-nav-toggle');
        if (!navToggle) {
            navToggle = document.createElement('button');
            navToggle.className = 'mobile-nav-toggle';
            navToggle.setAttribute('aria-label', 'toggle navigation');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            navContainer.appendChild(navToggle);
        }
        
        // Clone Request Callback button for mobile menu ONLY if it doesn't exist there
        const headerBtn = document.querySelector('header .btn-primary');
        if (headerBtn && !mainNav.querySelector('.mobile-only-btn')) {
            const mobileBtn = headerBtn.cloneNode(true);
            mobileBtn.classList.add('mobile-only-btn');
            mainNav.appendChild(mobileBtn);
        }

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
                // Close all submenus when closing main nav
                document.querySelectorAll('.mega-box').forEach(box => box.style.display = 'none');
            }
        });

        // Mobile Submenu Toggle
        const menuItemsWithSub = document.querySelectorAll('.main-nav > ul > li > a');
        menuItemsWithSub.forEach(item => {
            item.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    const megaBox = item.parentElement.querySelector('.mega-box');
                    if (megaBox) {
                        e.preventDefault();
                        const isVisible = megaBox.style.display === 'block';
                        // Close other submenus
                        document.querySelectorAll('.mega-box').forEach(box => box.style.display = 'none');
                        megaBox.style.display = isVisible ? 'none' : 'block';
                    }
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !navToggle.contains(e.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggle.querySelector('i').className = 'fas fa-bars';
                document.querySelectorAll('.mega-box').forEach(box => box.style.display = 'none');
            }
        });

        // Smooth Scroll for Anchor Links (integrated to handle closing menu)
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') {
                    e.preventDefault();
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    // Close mobile menu if open
                    if (mainNav.classList.contains('active')) {
                        mainNav.classList.remove('active');
                        navToggle.querySelector('i').className = 'fas fa-bars';
                    }
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
});
