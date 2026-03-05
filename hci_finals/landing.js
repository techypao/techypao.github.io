document.addEventListener('DOMContentLoaded', () => {
    let isListView = false;

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#list') {
                e.preventDefault();
                toggleListView();
                return;
            }
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Toggle list view functionality
    function toggleListView() {
        isListView = !isListView;
        const containers = [
            document.querySelector('.approach-cards'),
            document.querySelector('.features-grid'),
            document.querySelector('.steps-container')
        ];

        containers.forEach(container => {
            if (container) {
                if (isListView) {
                    container.classList.add('list-view');
                } else {
                    container.classList.remove('list-view');
                }
            }
        });
    }

    // Button click handlers
    const getStartedBtn = document.querySelector('.btn-primary');
    const learnMoreBtn = document.querySelector('.btn-secondary');

    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }

    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', () => {
            // Scroll to "Why Choose SolMate" section
            const whyChoose = document.querySelector('.why-choose');
            if (whyChoose) {
                whyChoose.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
