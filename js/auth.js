console.log("Auth.js loaded successfully");

// Sign up functionality
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    console.log("Signup form found");
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Signup form submitted");
        
        // Get user info
        const firstName = signupForm.querySelector('#firstName').value.trim();
        const email = signupForm.querySelector('#email').value.trim();
        const password = signupForm.querySelector('#password').value;
        
        console.log("Form data:", { firstName, email });
        
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
            
            console.log("Creating user...");
            // Create user
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            
            console.log("User created, saving details to Firestore...");
            // Store additional user data in Firestore
            await db.collection('users').doc(user.uid).set({
                firstName: firstName,
                email: email,
                createdAt: new Date()
            });
            
            // Redirect to home page
            console.log("Account created successfully!");
            alert('Account created successfully!');
            window.location.href = 'home.html';
        } catch (error) {
            console.error("Signup error:", error);
            alert(error.message);
        }
    });
} else {
    console.log("Signup form not found on this page");
}

// Login functionality
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    console.log("Login form found");
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Login form submitted");
        
        // Get user info
        const email = loginForm.querySelector('#email').value.trim();
        const password = loginForm.querySelector('#password').value;
        const rememberMe = loginForm.querySelector('#rememberMe').checked;
        
        console.log("Form data:", { email, rememberMe });
        
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
            
            console.log("Logging in...");
            // Sign in user
            await auth.signInWithEmailAndPassword(email, password);
            
            // Redirect to home page
            console.log("Login successful!");
            alert('Login successful!');
            window.location.href = 'home.html';
        } catch (error) {
            console.error("Login error:", error);
            alert(error.message);
        }
    });
} else {
    console.log("Login form not found on this page");
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
        
        // Optional: Redirect to login if trying to access protected pages
        const currentPath = window.location.pathname;
        if (currentPath.includes('home.html')) {
            window.location.href = 'login.html';
        }
    }
});

// Logout functionality
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    console.log("Logout button found");
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        console.log("Logging out...");
        auth.signOut().then(() => {
            console.log("Logout successful!");
            window.location.href = 'login.html';
        }).catch(error => {
            console.error("Logout error:", error);
        });
    });
} else {
    console.log("Logout button not found on this page");
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