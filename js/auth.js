// Sign up functionality
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get user info
        const firstName = signupForm['firstName'].value.trim();
        const email = signupForm['email'].value.trim();
        const password = signupForm['password'].value;
        
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Validate password length
            if (password.length < 8) {
                alert('Password must be at least 8 characters long');
                return;
            }
            
            // Create user
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            // Store additional user data in Firestore
            await db.collection('users').doc(user.uid).set({
                firstName: firstName,
                email: email,
                createdAt: new Date()
            });
            
            // Redirect to home page
            alert('Account created successfully!');
            window.location.href = 'home.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get user info
        const email = loginForm['email'].value.trim();
        const password = loginForm['password'].value;
        const rememberMe = loginForm['rememberMe'].checked;
        
        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Set persistence based on rememberMe
            const persistence = rememberMe ? 
                firebase.auth.Auth.Persistence.LOCAL : 
                firebase.auth.Auth.Persistence.SESSION;
            
            await auth.setPersistence(persistence);
            
            // Sign in user
            await auth.signInWithEmailAndPassword(email, password);
            
            // Redirect to home page
            alert('Login successful!');
            window.location.href = 'home.html';
        } catch (error) {
            alert(error.message);
        }
    });
}

// Password reset functionality
const resetPasswordLink = document.getElementById('resetPassword');
if (resetPasswordLink) {
    resetPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = prompt('Enter your email address to receive a password reset link:');
        if (email) {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    alert('Password reset email sent! Check your inbox.');
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    });
}

// Auth state listener
auth.onAuthStateChanged(user => {
    if (user) {
        // User is signed in
        console.log('User logged in:', user.email);
        
        // Redirect if on login/signup page
        const currentPath = window.location.pathname;
        if (currentPath.includes('login.html') || currentPath.includes('signup.html')) {
            window.location.href = 'home.html';
        }
    } else {
        // User is signed out
        console.log('User logged out');
    }
});

// Logout functionality
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            window.location.href = 'login.html';
        });
    });
}