// Loading Screen Management
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        console.log('Loader detected');
    
        document.body.classList.add('loading');
        document.body.style.overflow = 'hidden';
        loadingScreen.style.display = 'flex';
    } else {
        console.log('No loader on this page — skipping loader logic');
        document.body.classList.remove('loading');
        document.body.style.overflow = '';
    }
    
    // Wait for loading animation to complete (3 seconds)
    setTimeout(() => {
        // Instantly hide loading screen and show content
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }

        // Show main content immediately
        document.body.classList.remove('loading');
        document.body.classList.add('loaded');
        document.body.style.overflow = '';
    }, 3000);
});

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
        // Create mobile navigation toggle
        let navToggle = document.querySelector('.mobile-nav-toggle');
        if (!navToggle) {
            navToggle = document.createElement('button');
            navToggle.className = 'mobile-nav-toggle';
            navToggle.setAttribute('aria-label', 'toggle navigation');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            navContainer.appendChild(navToggle);
        }

        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            // Hide hamburger when menu is open (close button is inside the nav)
            if (mainNav.classList.contains('active')) {
                navToggle.style.display = 'none';
            } else {
                navToggle.style.display = 'block';
                // Close all submenus when closing main nav
                document.querySelectorAll('.mega-box').forEach(box => box.style.display = 'none');
            }
        });

        // Mobile Nav Close Button (inside the nav panel)
        const closeBtn = document.querySelector('.mobile-nav-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mainNav.classList.remove('active');
                navToggle.style.display = 'block';
                document.querySelectorAll('.main-nav > ul > li').forEach(li => li.classList.remove('open'));
            });
        }

        // Mobile Accordion Submenu (CLEAN)
        const menuParents = document.querySelectorAll('.main-nav > ul > li[data-has-submenu="true"]');

        menuParents.forEach(li => {
            const link = li.querySelector('.nav-link');
            if (!link) return; // Skip if no nav-link found

            link.addEventListener('click', (e) => {
                if (window.innerWidth > 768) return;

                e.preventDefault();
                e.stopPropagation();

                const isOpen = li.classList.contains('open');

                // Close all other submenus
                menuParents.forEach(other => other.classList.remove('open'));

                // Toggle current
                if (!isOpen) {
                    li.classList.add('open');
                    
                    // Only scroll if the parent link is not fully visible
                    setTimeout(() => {
                        const navContainer = li.closest('.main-nav');
                        if (navContainer) {
                            const linkRect = link.getBoundingClientRect();
                            const navRect = navContainer.getBoundingClientRect();
                            
                            // Check if parent link is above the visible area
                            if (linkRect.top < navRect.top) {
                                // Scroll just enough to show the parent at the top
                                const scrollAmount = navContainer.scrollTop + (linkRect.top - navRect.top) - 10;
                                navContainer.scrollTo({
                                    top: Math.max(0, scrollAmount),
                                    behavior: 'smooth'
                                });
                            }
                        }
                    }, 100);
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

    // Service Search Logic
    const searchInput = document.getElementById('service-search');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        let rootPath = "";
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; i++) {
            const src = scripts[i].getAttribute('src');
            if (src && src.includes('script.js')) {
                rootPath = src.replace('script.js', '');
                break;
            }
        }

        const services = [
            // Incorporation Registration
            { name: "Private Limited Company", url: "services/company-registration/private-limited-company.html" },
            { name: "LLP Registration", url: "services/company-registration/llp-registration.html" },
            { name: "One Person Company", url: "services/company-registration/one-person-company.html" },
            { name: "Public Limited Company", url: "services/company-registration/public-limited-company.html" },
            { name: "Section 8 Company", url: "services/company-registration/section-8-company.html" },
            { name: "Nidhi Company", url: "services/company-registration/nidhi-company.html" },
            { name: "Indian Subsidiary", url: "services/company-registration/indian-subsidiary.html" },
            // Compliance
            { name: "Director DIN e-KYC", url: "services/company-registration/din-kyc.html" },
            { name: "Appointment of Director", url: "services/company-registration/appointment-director.html" },
            { name: "Removal of Director", url: "services/company-registration/removal-director.html" },
            { name: "Annual Compliance Filing", url: "services/company-registration/annual-compliance.html" },
            { name: "Increase Authorized Capital", url: "services/company-registration/increase-capital.html" },
            { name: "Registered Office Change", url: "services/company-registration/change-registered-office.html" },
            { name: "Change Company Name", url: "services/company-registration/change-company-name.html" },
            // Conversions & others
            { name: "OPC to Pvt Ltd Conversion", url: "services/company-registration/opc-to-pvt.html" },
            { name: "Pvt to Public Ltd Conversion", url: "services/company-registration/pvt-to-public.html" },
            { name: "LLP to Pvt Ltd Conversion", url: "services/company-registration/llp-to-pvt.html" },
            { name: "Share Transfer", url: "services/company-registration/share-transfer.html" },
            { name: "MOA Amendment", url: "services/company-registration/moa-amendment.html" },
            // Winding Up
            { name: "Pvt Ltd Winding Up", url: "services/company-registration/pvt-ltd-winding-up.html" },
            { name: "LLP Winding Up", url: "services/company-registration/llp-winding-up.html" },
            // Trademark
            { name: "Trademark Registration", url: "services/trademark/trademark-registration.html" },
            { name: "Trademark Renewal", url: "services/trademark/trademark-renewal.html" },
            { name: "Trademark Objection", url: "services/trademark/trademark-objection.html" },
            { name: "Trademark Opposition", url: "services/trademark/trademark-opposition.html" },
            { name: "Copyright Registration", url: "services/trademark/copyright-registration.html" },
            // GST
            { name: "GST Registration", url: "services/gst/gst-registration.html" },
            { name: "GST Return Filing", url: "services/gst/gst-return-filing.html" },
            { name: "GST Modification", url: "services/gst/gst-modification.html" },
            { name: "GST Cancellation", url: "services/gst/gst-cancellation.html" },
            // Licenses
            { name: "FSSAI Registration", url: "services/licenses/fssai-registration.html" },
            { name: "FSSAI Renewal", url: "services/licenses/fssai-renewal.html" },
            { name: "FSSAI Modification", url: "services/licenses/fssai-modification.html" },
            { name: "FSSAI Annual Return", url: "services/licenses/fssai-annual-return.html" },
            { name: "Import Export Code", url: "services/licenses/import-export-code.html" },
            { name: "IEC Modification", url: "services/licenses/iec-modification.html" },
            { name: "BIS Certificate", url: "services/licenses/bis-certificate.html" },
            { name: "ISO Certification", url: "services.html" },
            // General
            { name: "Legal Dispute", url: "services.html" },
            { name: "Consumer Dispute", url: "services.html" }
        ];

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            searchResults.innerHTML = '';
            
            if (query.length < 2) {
                searchResults.style.display = 'none';
                return;
            }

            const matches = services.filter(s => s.name.toLowerCase().includes(query));

            if (matches.length > 0) {
                matches.forEach(match => {
                    const div = document.createElement('a');
                    div.href = rootPath + match.url;
                    div.className = 'search-result-item';
                    div.textContent = match.name;
                    searchResults.appendChild(div);
                });
                searchResults.style.display = 'block';
            } else {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.textContent = 'No matching services found';
                searchResults.appendChild(div);
                searchResults.style.display = 'block';
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });

        // Mega Menu Viewport Boundary Detection
        const adjustMegaMenuPosition = () => {
            const megaBoxes = document.querySelectorAll('.mega-box');

            megaBoxes.forEach(box => {
                const parentLi = box.closest('.main-nav > ul > li');
                if (!parentLi) return;

                // Reset positioning classes
                box.classList.remove('mega-left', 'mega-right');

                // Calculate positions
                const boxRect = box.getBoundingClientRect();
                const parentRect = parentLi.getBoundingClientRect();
                const viewportWidth = window.innerWidth;

                // Check if centered box would overflow left or right
                const centerPosition = parentRect.left + parentRect.width / 2;
                const boxLeftEdge = centerPosition - box.offsetWidth / 2;
                const boxRightEdge = centerPosition + box.offsetWidth / 2;

                if (boxLeftEdge < 20) {
                    // Would overflow left - align to left edge of parent
                    box.classList.add('mega-left');
                } else if (boxRightEdge > viewportWidth - 20) {
                    // Would overflow right - align to right edge of parent
                    box.classList.add('mega-right');
                }
                // Otherwise keep centered (default)
            });
        };

        // Adjust on hover (desktop) and window resize
        document.addEventListener('mouseover', (e) => {
            if (window.innerWidth > 900) { // Only on desktop
                const megaBox = e.target.closest('.main-nav > ul > li')?.querySelector('.mega-box');
                if (megaBox) {
                    setTimeout(adjustMegaMenuPosition, 10); // Small delay to ensure positioning is calculated after display
                }
            }
        });

        // Adjust on window resize
        window.addEventListener('resize', adjustMegaMenuPosition);

        // Initial adjustment
        adjustMegaMenuPosition();
    }
});
