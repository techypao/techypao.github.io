document.addEventListener('DOMContentLoaded', () => {
    // utility helpers for user storage
    function getUsers() {
        const raw = localStorage.getItem('users');
        return raw ? JSON.parse(raw) : [];
    }

    function saveUsers(arr) {
        localStorage.setItem('users', JSON.stringify(arr));
    }

    function findUser(email) {
        return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    }

    function setCurrentUser(user) {
        // store minimal info; sessionStorage used so it clears on tab close
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    }

    function getCurrentUser() {
        const raw = sessionStorage.getItem('currentUser');
        return raw ? JSON.parse(raw) : null;
    }

    // login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            if (!email || !password) {
                alert('Please fill in both fields.');
                return;
            }
            const user = findUser(email);
            if (!user) {
                alert('No account found for that email.');
                return;
            }
            if (user.password !== password) {
                alert('Incorrect password.');
                return;
            }
            setCurrentUser(user);
            // redirect to dashboard
            window.location.href = 'dashboard.html';
        });
    }

    // registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const last = document.getElementById('lastName').value.trim();
            const first = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim();
            const contact = document.getElementById('contact').value.trim();
            const address = document.getElementById('address').value.trim();
            const pwd = document.getElementById('password').value;
            const confirm = document.getElementById('confirm').value;

            if (!last || !first || !email || !pwd || !confirm) {
                alert('Please complete all required fields.');
                return;
            }
            if (pwd !== confirm) {
                alert('Passwords do not match.');
                return;
            }
            if (findUser(email)) {
                alert('An account with that email already exists.');
                return;
            }
            const newUser = {
                firstName: first,
                lastName: last,
                email,
                contact,
                address,
                password: pwd
            };
            const users = getUsers();
            users.push(newUser);
            saveUsers(users);
            alert('Registration successful! You will be redirected to login.');
            window.location.href = 'login.html';
        });
    }

    const googleBtn = document.getElementById('googleSignIn');
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            alert('Google registration clicked (not implemented)');
        });
    }
});
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

        // Update link text
        const viewToggle = document.getElementById('viewToggle');
        if (viewToggle) {
            viewToggle.textContent = isListView ? 'Card View' : 'List View';
        }
    }

    // Button click handlers
    // only target buttons inside hero section (landing page)
    const getStartedBtn = document.querySelector('.hero .btn-primary');
    const learnMoreBtn = document.querySelector('.hero .btn-secondary');

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

// dashboard slider behavior
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const slidesContainer = document.querySelector('.dashboard-hero .slides');
        const slides = document.querySelectorAll('.dashboard-hero .slides img');
        let index = 0;

        if (!slidesContainer || slides.length === 0) return;

        function update() {
            const width = slidesContainer.clientWidth;
            slidesContainer.style.transform = `translateX(-${index * width}px)`;
        }

        window.addEventListener('resize', update);

        const nextBtn = document.querySelector('.dashboard-hero .next');
        const prevBtn = document.querySelector('.dashboard-hero .prev');

        nextBtn && nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            index = (index + 1) % slides.length;
            update();
        });

        prevBtn && prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            index = (index - 1 + slides.length) % slides.length;
            update();
        });

        // auto advance every 5 seconds
        setInterval(() => {
            index = (index + 1) % slides.length;
            update();
        }, 5000);

        // initialize
        update();
    });
})();

// calculator form interaction
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // group by property (system/property)
                const siblings = btn.parentElement.querySelectorAll('.toggle-btn');
                siblings.forEach(s => s.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        const form = document.getElementById('savingsForm');
        if (form) {
            form.addEventListener('submit', e => {
                e.preventDefault();
                e.stopPropagation();
                // simple dummy calculation based on bill
                const bill = parseFloat(document.getElementById('bill').value) || 0;
                const monthlySavings = (bill * 0.3).toFixed(2);
                const systemSize = (bill * 0.1).toFixed(1) + ' kW';
                const estimatedCost = (systemSize.replace(' kW','') * 50000).toLocaleString();
                const payback = (estimatedCost / (monthlySavings * 12)).toFixed(1) + ' yrs';
                const projection = ((monthlySavings * 12 * 20) - estimatedCost).toLocaleString();

                document.getElementById('resSize').textContent = systemSize;
                document.getElementById('resCost').textContent = '₱' + estimatedCost;
                document.getElementById('resSavings').textContent = '₱' + monthlySavings;
                document.getElementById('resPayback').textContent = payback;
                document.getElementById('resProjection').textContent = '₱' + projection;

                // warn user that quotation feature coming soon (no logout)
                alert('Quotation request feature coming soon!');
                return false; // just in case
            });
        }

        const quoteBtn = document.getElementById('quoteBtn');
        if (quoteBtn) {
            quoteBtn.addEventListener('click', () => {
                alert('Quotation request feature coming soon!');
            });
        }
    });
})();