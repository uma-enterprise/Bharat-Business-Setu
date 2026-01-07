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
            { name: "GST Registration", url: "services.html#gst" },
            { name: "GST Return Filing", url: "services.html#gst" },
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
    }
});
