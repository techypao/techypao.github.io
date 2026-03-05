document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            // simple validation
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            if (!email || !password) {
                alert('Please fill in both fields.');
                return;
            }
            // replace with actual login logic
            console.log('Logging in', { email, password });
            alert('Login submitted (see console)');
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            const last = document.getElementById('lastName').value.trim();
            const first = document.getElementById('firstName').value.trim();
            const email = document.getElementById('email').value.trim();
            const contact = document.getElementById('contact').value.trim();
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
            console.log('Registering', { last, first, email, contact });
            alert('Registration submitted (see console)');
        });
    }

    const googleBtn = document.getElementById('googleSignIn');
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            alert('Google registration clicked (not implemented)');
        });
    }
});