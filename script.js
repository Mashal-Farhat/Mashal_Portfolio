document.addEventListener('DOMContentLoaded', function () {
    // ========== MOBILE NAVIGATION ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', function () {
        this.classList.toggle('active');
        navLinks?.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // ========== STICKY NAVBAR ==========
    const navbar = document.querySelector('.navbar');
    const navbarHeight = navbar?.offsetHeight || 80;

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    }

    // ========== BACK TO TOP BUTTON ==========
    const backToTopButton = document.querySelector('.back-to-top');

    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton?.classList.add('active');
        } else {
            backToTopButton?.classList.remove('active');
        }
    }

    // ========== ACTIVE NAV LINK ==========
    const sections = document.querySelectorAll('section[id]');

    function setActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - navbarHeight - 100) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        updateNavbar();
        updateBackToTop();
        setActiveLink();
    });
    updateNavbar();
    updateBackToTop();
    setActiveLink();

    backToTopButton?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        });
    });

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            try {
                await new Promise(resolve => setTimeout(resolve, 1500));
                showToast('Message sent successfully!', 'success');
                this.reset();
            } catch (error) {
                showToast('Failed to send message. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ========== SKILLS ANIMATION ==========
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.querySelector('.progress');
                    const width = progress.dataset.width || progress.style.width;
                    progress.style.width = '0';
                    progress.style.transition = 'none';
                    void progress.offsetWidth;
                    progress.style.transition = 'width 1.5s ease-out';
                    setTimeout(() => {
                        progress.style.width = width;
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        skillItems.forEach(item => {
            const progress = item.querySelector('.progress');
            progress.dataset.width = progress.style.width;
            observer.observe(item);
        });
    }

    // ========== PROJECT FILTERING ==========
    const filterButtons = document.querySelectorAll('.project-filter button');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filterValue = this.dataset.filter;

                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.tags.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ========== ANIMATE ELEMENTS ON SCROLL ==========
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    if (animateElements.length) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(element => {
            animationObserver.observe(element);
        });
    }

    // ========== THEME SWITCHER ==========
    const themeSwitcher = document.querySelector('.theme-switcher');
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
            const icon = this.querySelector('i');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        });

        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
            const icon = themeSwitcher.querySelector('i');
            icon.className = 'fas fa-sun';
        }
    }

    // ========== PRELOADER ==========
    window.addEventListener('load', function () {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => preloader.remove(), 500);
            }, 500);
        }
    });

    // ========== RESUME MODAL ==========
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtn = document.getElementById('open-resume');
    const closeModalBtn = document.querySelector('.close-modal');

    if (openResumeBtn && resumeModal) {
        openResumeBtn.addEventListener('click', function (e) {
            e.preventDefault();
            resumeModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });

        closeModalBtn?.addEventListener('click', function () {
            resumeModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });

        window.addEventListener('click', function (e) {
            if (e.target === resumeModal) {
                resumeModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

});
