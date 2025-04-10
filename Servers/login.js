const API_BASE_URL = 'http://localhost:3000/api';


function handleGoogleLogin() {
    window.location.href = '/auth/google';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert('Please fill in all the required fields.');
                return;
            }

            const loginData = {
                email: email,
                password: password,
            };

            try {
                const response = await fetch(`${API_BASE_URL}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (response.ok) {
                    const data = await response.json();
                    alert('Login successful!');

                    // Redirect based on role
                    if (data.role === 'Reviewer') {
                        window.location.href = './dashboard.html'; // Redirect to tutor's dashboard
                    } else if (data.role === 'Researcher') {
                        window.location.href = './dashboard.html'; // Redirect to student's dashboard
                    } 
                } else {
                    const errorData = await response.json();
                    alert('Error logging in: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error logging in:', error);
                alert('An error occurred while logging in.');
            }
        });
    } 
});