// Campus Placement Portal JavaScript

class PlacementPortal {
    constructor() {
        this.currentSection = 'btech-2026';
        this.registrationCounts = new Map();
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupNavigation();
        this.loadOpportunities();
        this.setupEventListeners();
        this.ensureProperInitialScroll();
    }

    // Ensure page loads at the top
    ensureProperInitialScroll() {
        // Force scroll to top on page load
        window.scrollTo(0, 0);
        
        // Also handle page refresh case
        if (window.performance && window.performance.navigation) {
            if (window.performance.navigation.type === 1) { // Page refresh
                setTimeout(() => {
                    window.scrollTo(0, 0);
                }, 100);
            }
        }
    }

    // Theme Management
    setupTheme() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Setup theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Update icons based on current theme
        this.updateThemeIcons();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcons();
        
        // Show theme change feedback
        this.showThemeFeedback();
    }

    updateThemeIcons() {
        const lightIcon = document.getElementById('lightIcon');
        const darkIcon = document.getElementById('darkIcon');
        
        if (lightIcon && darkIcon) {
            if (this.currentTheme === 'dark') {
                lightIcon.style.opacity = '0';
                lightIcon.style.transform = 'rotate(180deg)';
                darkIcon.style.opacity = '1';
                darkIcon.style.transform = 'rotate(0deg)';
            } else {
                lightIcon.style.opacity = '1';
                lightIcon.style.transform = 'rotate(0deg)';
                darkIcon.style.opacity = '0';
                darkIcon.style.transform = 'rotate(180deg)';
            }
        }
    }

    showThemeFeedback() {
        const feedback = document.createElement('div');
        const themeText = this.currentTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
        const icon = this.currentTheme === 'dark' ? '🌙' : '☀️';
        
        feedback.className = 'theme-feedback';
        feedback.innerHTML = `
            <div class="feedback-content">
                <span class="theme-icon">${icon}</span>
                <span>${themeText} activated</span>
            </div>
        `;
        
        feedback.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--card-bg);
            color: var(--text-color);
            border: 1px solid var(--border-color);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px var(--shadow-medium);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        feedback.querySelector('.feedback-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        `;
        
        feedback.querySelector('.theme-icon').style.cssText = `
            font-size: 1.2rem;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(feedback)) {
                    document.body.removeChild(feedback);
                }
            }, 300);
        }, 2000);
    }

    // Navigation setup
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.switchSection(targetSection);
            });
        });
    }

    switchSection(sectionId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current nav link
        const currentNavLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
        if (currentNavLink) {
            currentNavLink.classList.add('active');
        }

        // Smooth scroll to target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            this.currentSection = sectionId;
        }
    }

    // Load opportunities data and render cards
    loadOpportunities() {
        console.log('Loading opportunities...');
        const opportunities = this.getOpportunitiesData();
        console.log('Opportunities data:', opportunities);
        
        Object.keys(opportunities).forEach(section => {
            console.log(`Rendering cards for section: ${section}, count: ${opportunities[section].length}`);
            this.renderCards(section, opportunities[section]);
        });
        console.log('All opportunities loaded successfully');
    }

    // Get opportunities data structure
    getOpportunitiesData() {
        return {
            'btech-2026': [
                {
                    company: 'Google',
                    description: 'Software Developer Engineer',
                    ctc: '₹45 LPA',
                    deadline: '15 Aug 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Full-time'
                },
                {
                    company: 'Microsoft',
                    description: 'Software Engineer',
                    ctc: '₹42 LPA',
                    deadline: '20 Aug 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfBqM3VsfVdPjArGXn1BeFY2DEDD1fyGjoSSlUdipFZYwxXrw/viewform?usp=dialog',
                    type: 'Full-time'
                },
                {
                    company: 'Amazon',
                    description: 'Software Development Engineer',
                    ctc: '₹38 LPA',
                    deadline: '10 Sep 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Full-time'
                },
                {
                    company: 'Apple',
                    description: 'iOS Developer',
                    ctc: '₹50 LPA',
                    deadline: '25 Aug 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Full-time'
                },
                {
                    company: 'Netflix',
                    description: 'Backend Engineer',
                    ctc: '₹55 LPA',
                    deadline: '30 Aug 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Full-time'
                },
                {
                    company: 'Meta',
                    description: 'Frontend Developer',
                    ctc: '₹48 LPA',
                    deadline: '05 Sep 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Full-time'
                }
            ],
            'btech-dual-2027': [
                {
                    company: 'Goldman Sachs',
                    description: 'Technology Summer Analyst',
                    ctc: '₹1.2 LPM',
                    deadline: '28 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'JPMorgan Chase',
                    description: 'Software Engineer Intern',
                    ctc: '₹1.0 LPM',
                    deadline: '05 Mar 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Uber',
                    description: 'Backend Engineering Intern',
                    ctc: '₹80K PM',
                    deadline: '15 Mar 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Salesforce',
                    description: 'Cloud Developer Intern',
                    ctc: '₹90K PM',
                    deadline: '20 Mar 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Adobe',
                    description: 'UI/UX Design Intern',
                    ctc: '₹85K PM',
                    deadline: '10 Mar 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Tesla',
                    description: 'ML Engineer Intern',
                    ctc: '₹95K PM',
                    deadline: '25 Mar 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                }
            ],
            'btech-2027': [
                {
                    company: 'Flipkart',
                    description: 'Software Developer Intern',
                    ctc: '₹60K PM',
                    deadline: '12 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Zomato',
                    description: 'Full Stack Intern',
                    ctc: '₹50K PM',
                    deadline: '18 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Paytm',
                    description: 'Mobile App Intern',
                    ctc: '₹45K PM',
                    deadline: '22 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Swiggy',
                    description: 'Data Science Intern',
                    ctc: '₹55K PM',
                    deadline: '08 Mar 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Razorpay',
                    description: 'FinTech Developer Intern',
                    ctc: '₹65K PM',
                    deadline: '25 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Myntra',
                    description: 'Frontend Developer Intern',
                    ctc: '₹52K PM',
                    deadline: '15 Mar 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                }
            ],
            'btech-dual-2028': [
                {
                    company: 'Infosys',
                    description: 'Software Engineering Intern',
                    ctc: '₹25K PM',
                    deadline: '30 Jan 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'TCS',
                    description: 'Digital Technology Intern',
                    ctc: '₹20K PM',
                    deadline: '05 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Wipro',
                    description: 'AI/ML Intern',
                    ctc: '₹30K PM',
                    deadline: '15 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'HCL Technologies',
                    description: 'Cloud Computing Intern',
                    ctc: '₹28K PM',
                    deadline: '20 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Capgemini',
                    description: 'Data Analytics Intern',
                    ctc: '₹32K PM',
                    deadline: '25 Jan 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                },
                {
                    company: 'Accenture',
                    description: 'Technology Consulting Intern',
                    ctc: '₹35K PM',
                    deadline: '10 Feb 2025',
                    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSfqAa75Wq9W2ts-3XigaqkD0aozMopXhTVYz6KTA4mIpv9buA/viewform?usp=dialog',
                    type: 'Internship'
                }
            ]
        };
    }

    // Render opportunity cards for a section
    renderCards(sectionId, opportunities) {
        console.log(`Rendering cards for ${sectionId}`);
        const container = document.getElementById(`${sectionId}-cards`);
        
        if (!container) {
            console.error(`Container not found for ${sectionId}-cards`);
            return;
        }

        if (opportunities.length === 0) {
            console.log(`No opportunities for ${sectionId}, showing empty state`);
            container.innerHTML = this.createEmptyState();
            return;
        }

        console.log(`Creating ${opportunities.length} cards for ${sectionId}`);
        const cardsHTML = opportunities.map(opportunity => 
            this.createOpportunityCard(opportunity, sectionId)
        ).join('');
        
        container.innerHTML = cardsHTML;
        console.log(`Cards rendered successfully for ${sectionId}`);
    }

    // Create opportunity card HTML
    createOpportunityCard(opportunity, sectionId) {
        const cardId = `${sectionId}-${opportunity.company.toLowerCase().replace(/\s+/g, '-')}`;
        const registeredCount = this.getRegistrationCount(cardId);

        return `
            <div class="opportunity-card" data-card-id="${cardId}">
                <div class="card-header">
                    <div>
                        <h3 class="company-name">${opportunity.company}</h3>
                    </div>
                    <span class="opportunity-type">${opportunity.type}</span>
                </div>
                
                <p class="job-description">"${opportunity.description}"</p>
                
                <div class="card-details">
                    <div class="detail-row">
                        <span class="detail-label">
                            <i class="fas fa-rupee-sign"></i>
                            CTC/Stipend
                        </span>
                        <span class="detail-value ctc-value">${opportunity.ctc}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">
                            <i class="fas fa-calendar-alt"></i>
                            Application Deadline
                        </span>
                        <span class="detail-value deadline-value">${opportunity.deadline}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">
                            <i class="fas fa-users"></i>
                            Registered
                        </span>
                        <span class="registered-count" id="count-${cardId}">${registeredCount}</span>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="apply-btn" onclick="placementPortal.handleApply('${opportunity.formUrl}', '${cardId}')">
                        <i class="fas fa-external-link-alt"></i>
                        Apply Now
                    </button>
                </div>
            </div>
        `;
    }

    // Create empty state HTML
    createEmptyState() {
        return `
            <div class="empty-state">
                <i class="fas fa-briefcase"></i>
                <h3>No Opportunities Available</h3>
                <p>Currently, there are no opportunities available for this category. Please check back later or contact the Training & Placement Cell for updates.</p>
            </div>
        `;
    }

    // Handle apply button click
    handleApply(formUrl, cardId) {
        // Increment registration count
        this.incrementRegistrationCount(cardId);
        
        // Update the display
        this.updateRegistrationDisplay(cardId);
        
        // Open Google Form in new tab
        window.open(formUrl, '_blank', 'noopener,noreferrer');
        
        // Show feedback to user
        this.showApplyFeedback();
    }

    // Get registration count for a card
    getRegistrationCount(cardId) {
        if (!this.registrationCounts.has(cardId)) {
            // Initialize with random count between 5-50 for demonstration
            const initialCount = Math.floor(Math.random() * 46) + 5;
            this.registrationCounts.set(cardId, initialCount);
        }
        return this.registrationCounts.get(cardId);
    }

    // Increment registration count
    incrementRegistrationCount(cardId) {
        const currentCount = this.getRegistrationCount(cardId);
        this.registrationCounts.set(cardId, currentCount + 1);
        
        // Store in localStorage for persistence
        this.saveRegistrationCounts();
    }

    // Update registration count display
    updateRegistrationDisplay(cardId) {
        const countElement = document.getElementById(`count-${cardId}`);
        if (countElement) {
            const newCount = this.getRegistrationCount(cardId);
            countElement.textContent = newCount;
            
            // Add animation effect
            countElement.style.animation = 'none';
            countElement.offsetHeight; // Trigger reflow
            countElement.style.animation = 'pulse 0.6s ease-in-out';
        }
    }

    // Show apply feedback
    showApplyFeedback() {
        // Create temporary feedback element
        const feedback = document.createElement('div');
        feedback.className = 'apply-feedback';
        feedback.innerHTML = `
            <div class="feedback-content">
                <i class="fas fa-check-circle"></i>
                <span>Application form opened! Your registration has been counted.</span>
            </div>
        `;
        
        // Add styles for feedback
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        feedback.querySelector('.feedback-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
        `;
        
        document.body.appendChild(feedback);
        
        // Animate in
        setTimeout(() => {
            feedback.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            feedback.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 3000);
    }

    // Save registration counts to localStorage
    saveRegistrationCounts() {
        const countsObject = Object.fromEntries(this.registrationCounts);
        localStorage.setItem('registrationCounts', JSON.stringify(countsObject));
    }

    // Load registration counts from localStorage
    loadRegistrationCounts() {
        const saved = localStorage.getItem('registrationCounts');
        if (saved) {
            const countsObject = JSON.parse(saved);
            this.registrationCounts = new Map(Object.entries(countsObject));
        }
    }

    // Setup additional event listeners
    setupEventListeners() {
        // Load saved registration counts
        this.loadRegistrationCounts();
        
        // Setup intersection observer for scroll-based navigation
        this.setupScrollNavigation();
        
        // Handle browser back/forward buttons for navigation
        window.addEventListener('popstate', (e) => {
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                this.switchSection(hash);
            }
        });
        
        // Handle initial hash in URL - but ensure proper scroll position
        window.addEventListener('load', () => {
            // Always start at top
            window.scrollTo(0, 0);
            
            const hash = window.location.hash.substring(1);
            if (hash && document.getElementById(hash)) {
                // Wait a bit for the page to fully load before scrolling to section
                setTimeout(() => {
                    this.switchSection(hash);
                }, 300);
            }
        });
        
        // Add CSS for pulse animation
        if (!document.querySelector('#pulse-animation-style')) {
            const style = document.createElement('style');
            style.id = 'pulse-animation-style';
            style.textContent = `
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Setup scroll-based navigation highlighting
    setupScrollNavigation() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const observer = new IntersectionObserver((entries) => {
            // Find the section that's most visible
            let mostVisibleSection = null;
            let maxIntersectionRatio = 0;
            
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxIntersectionRatio) {
                    mostVisibleSection = entry.target;
                    maxIntersectionRatio = entry.intersectionRatio;
                }
            });
            
            // Update navigation if we found a visible section
            if (mostVisibleSection) {
                const sectionId = mostVisibleSection.id;
                
                // Update active nav link
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
                
                // Update current section
                this.currentSection = sectionId;
                
                // Update URL hash without scrolling
                if (window.location.hash !== `#${sectionId}`) {
                    history.replaceState(null, null, `#${sectionId}`);
                }
            }
        }, {
            threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
            rootMargin: '-80px 0px -80px 0px'
        });
        
        sections.forEach(section => observer.observe(section));
        
        // Also add a scroll listener as backup for smoother updates
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateActiveNavOnScroll();
            }, 50);
        });
    }
    
    // Update active navigation based on scroll position
    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 150; // Account for sticky nav
        
        let currentSection = sections[0].id; // Default to first section
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-section="${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        this.currentSection = currentSection;
    }
}

// Simple scroll restoration control
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Simple scroll to top on page load
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

window.scrollTo(0, 0);

// Initialize the portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.placementPortal = new PlacementPortal();
});

// Handle smooth scrolling for anchor links
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        // Ensure focused elements are visible
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.scrollIntoView) {
            focusedElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }
    }
});

// Performance optimization: Lazy load images if any are added later
const observeImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Call image observer on load
window.addEventListener('load', observeImages);
