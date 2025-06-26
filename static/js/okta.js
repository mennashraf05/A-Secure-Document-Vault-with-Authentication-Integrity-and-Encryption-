// Okta Authentication Handler
document.addEventListener('DOMContentLoaded', function() {
    const oktaLoginBtn = document.getElementById('oktaLoginBtn');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    if (oktaLoginBtn) {
        oktaLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show loading overlay
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }
            
            // Add loading state to button
            this.classList.add('loading');
            this.disabled = true;
            
            // Store the current URL for redirect after login
            sessionStorage.setItem('okta_redirect_url', window.location.href);
            
            // Redirect to Okta login
            window.location.href = this.href;
        });
    }
    
    // Handle Okta callback
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('error')) {
        const errorMessage = urlParams.get('error_description') || 'An error occurred during Okta authentication';
        showOktaError(errorMessage);
    }
});

// Show Okta error message
function showOktaError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'okta-error';
    errorDiv.textContent = message;
    
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.insertBefore(errorDiv, formContainer.firstChild);
    }
}

// Show Okta success message
function showOktaSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'okta-success';
    successDiv.textContent = message;
    
    const formContainer = document.querySelector('.form-container');
    if (formContainer) {
        formContainer.insertBefore(successDiv, formContainer.firstChild);
    }
}

// Handle Okta session timeout
function handleOktaSessionTimeout() {
    const sessionTimeout = 3600000; // 1 hour in milliseconds
    let lastActivity = Date.now();
    
    // Update last activity on user interaction
    document.addEventListener('click', function() {
        lastActivity = Date.now();
    });
    
    // Check session timeout every minute
    setInterval(function() {
        if (Date.now() - lastActivity > sessionTimeout) {
            // Redirect to login page
            window.location.href = '/login?session_expired=true';
        }
    }, 60000);
}

// Initialize Okta session timeout handler
handleOktaSessionTimeout(); 