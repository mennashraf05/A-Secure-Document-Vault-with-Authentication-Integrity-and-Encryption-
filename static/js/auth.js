// Description: This file contains the code for login and signup page.

// Ensure flash messages are visible
document.addEventListener('DOMContentLoaded', function() {
    const flashMessages = document.querySelectorAll('.alert');
    flashMessages.forEach(message => {
        message.style.display = 'block';
        message.style.opacity = '1';
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.style.display = 'none';
            }, 600);
        }, 5000);
    });
});

const authFormComponent = {
  loginForm: document.getElementById("loginForm"),
  adminLoginForm: document.getElementById("adminLoginForm"),
  signupForm: document.getElementById("signupForm"),
  emailInput: document.getElementById("email"),
  usernameInput: document.getElementById("username"),
  passwordInput: document.getElementById("password"),
  confirmPasswordInput: document.getElementById("confirmPassword"),
  remember: document.getElementById("Remember"),
  term: document.getElementById("term"),
  genderInput: document.getElementById("gender"),
  dateOfBirthInput: document.getElementById("dateOfBirth"),
  phoneNumberInput: document.getElementById("phoneNumber"),
  countryInput: document.getElementById("country")
};

const validateFunction = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email) || email === "" ? "" : "Invalid email format!";
  },
  username: (username) => {
    const regex = /^[a-zA-Z0-9_]+$/;
    if (username === "") {
      return "";
    } else if (!regex.test(username)) {
      return "Username can only contain letters, numbers and _";
    } else if (username.length < 6 || username.length > 20) {
      return "Username must be between 6 and 20 characters!";
    }
    return "";
  },
  password: (password) => {
    return password.length > 6 || password === ""
      ? ""
      : "Password must be at least 6 characters!";
  },
  confirmPassword: (password, confirmPassword) => {
    return password === confirmPassword || confirmPassword === ""
      ? ""
      : "Password does not match!";
  },
  gender: (gender) => {
    return gender ? "" : "Please select your gender!";
  },
  dateOfBirth: (date) => {
    if (!date) return "";
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 13 ? "" : "You must be at least 13 years old!";
  },
  phoneNumber: (phone) => {
    const regex = /^\+?[0-9]{10,15}$/;
    return regex.test(phone) || phone === "" ? "" : "Invalid phone number format!";
  },
  country: (country) => {
    return country ? "" : "Please select your country!";
  }
};

function presentError(errorMsg, message, input) {
  if (errorMsg) {
    errorMsg.textContent = message;
    errorMsg.style.display = "block";
  }
  if (input) {
    input.closest(".form-group").style.border = "1px solid red";
    input.closest(".form-group").style.boxShadow = "0 0 4px 1px red";
    input.focus();
  }
}

function hideError(errorMsg, input) {
  if (errorMsg) {
    errorMsg.style.display = "none";
  }
  if (input) {
    input.closest(".form-group").style.border = "";
    input.closest(".form-group").style.boxShadow = "";
  }
}

function validateForm(input, idError) {
  let errorMsg = document.getElementById(idError);
  if (!input || !errorMsg) return;

  input.addEventListener("input", () => hideError(errorMsg, input));

  input.addEventListener("blur", () => {
    const value = input.value;
    let message = "";

    switch (input.id) {
      case "email":
        message = validateFunction.email(value);
        break;
      case "username":
        message = validateFunction.username(value);
        break;
      case "password":
        message = validateFunction.password(value);
        break;
      case "confirmPassword":
        message = validateFunction.confirmPassword(
          authFormComponent.passwordInput.value,
          value
        );
        break;
    }

    if (message) {
      presentError(errorMsg, message, input);
    } else {
      hideError(errorMsg, input);
    }
  });
}

// Initialize form validation
if (authFormComponent.loginForm) {
  authFormComponent.loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const { emailInput, passwordInput, remember } = authFormComponent;

    let email = emailInput.value;
    let password = passwordInput.value;
    
    // The form will be submitted normally since we're using Flask's form handling
    this.submit();
  });
}

// Initialize form validation for admin login
if (authFormComponent.adminLoginForm) {
  authFormComponent.adminLoginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const { emailInput, passwordInput, remember } = authFormComponent;

    let email = emailInput.value;
    let password = passwordInput.value;
    
    // The form will be submitted normally since we're using Flask's form handling
    this.submit();
  });
}

if (authFormComponent.signupForm) {
  authFormComponent.signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const {
      emailInput,
      usernameInput,
      passwordInput,
      confirmPasswordInput,
      remember,
      term,
      genderInput,
      dateOfBirthInput,
      phoneNumberInput,
      countryInput
    } = authFormComponent;

    let errorMsg = document.getElementById("errorTerm");
    if (!term.checked) {
      presentError(errorMsg, "Please accept the terms!");
      return;
    }

    // Validate all fields before submitting
    const emailError = validateFunction.email(emailInput.value);
    const usernameError = validateFunction.username(usernameInput.value);
    const passwordError = validateFunction.password(passwordInput.value);
    const confirmPasswordError = validateFunction.confirmPassword(
      passwordInput.value,
      confirmPasswordInput.value
    );
    const genderError = validateFunction.gender(genderInput.value);
    const dateError = validateFunction.dateOfBirth(dateOfBirthInput.value);
    const phoneError = validateFunction.phoneNumber(phoneNumberInput.value);
    const countryError = validateFunction.country(countryInput.value);

    if (emailError || usernameError || passwordError || confirmPasswordError ||
        genderError || dateError || phoneError || countryError) {
      return;
    }

    // If all validations pass, submit the form
    this.submit();
  });
}

// Add validation to all form fields
validateForm(authFormComponent.emailInput, "errorEmail");
validateForm(authFormComponent.usernameInput, "errorUsername");
validateForm(authFormComponent.passwordInput, "errorPassword");
validateForm(authFormComponent.confirmPasswordInput, "errorMsg");
validateForm(authFormComponent.genderInput, "errorGender");
validateForm(authFormComponent.dateOfBirthInput, "errorDate");
validateForm(authFormComponent.phoneNumberInput, "errorPhone");
validateForm(authFormComponent.countryInput, "errorCountry");

// Password visibility toggle
document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    if (togglePassword && password) {
        togglePassword.addEventListener('click', function() {
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            password.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    if (toggleConfirmPassword && confirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPassword.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }
}); 