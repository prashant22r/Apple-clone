const form = document.getElementById('container');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const signinButton = document.getElementById('signin');
signinButton.addEventListener('click', validateForm);

document.getElementById('togglePasswd').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const passwordFieldType = passwordInput.getAttribute('type');

    if (passwordFieldType === 'password') {
        passwordInput.setAttribute('type', 'text'); // Change to text to show password
        this.src = './image2/eye.svg'
        

    } else {
        passwordInput.setAttribute('type', 'password'); // Change back to password
        this.src = './image2/eye-close.svg'; // Change icon back to indicate password is hidden
    }
});

document.getElementById('togglePasswdConfirm').addEventListener('click', function () {
    const passwordInput = document.getElementById('confirm-password');
    const passwordFieldType = passwordInput.getAttribute('type');

    if (passwordFieldType === 'password') {
        passwordInput.setAttribute('type', 'text'); // Change to text to show password
        this.src = './image2/eye.svg'

    } else {
        passwordInput.setAttribute('type', 'password'); // Change back to password
        this.src = './image2/eye-close.svg'; // Change icon back to indicate password is hidden
    }
});


function validateForm(event) {
    console.log("hello");
    event.preventDefault();
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    const usernameError = document.getElementById('username-error');
    usernameError.textContent = "";
    const emailError = document.getElementById('email-error');
    emailError.textContent = "";
    const passwordError = document.getElementById('password-error');
    passwordError.textContent = "";
    const confirmError = document.getElementById('confirm-error');
    confirmError.textContent = "";
    const accountCreatedMessage = document.getElementById('account-created-message');
    const userExistsMessage = document.getElementById('user-exists-message');

    const alphabetOnlyRegex = /^[a-zA-Z]+$/; // Regular expression to check for only alphabetic characters
    if (username.length < 1) {
        usernameError.textContent = 'Username is required';
        return;
    } else if (!alphabetOnlyRegex.test(username)) {
        usernameError.textContent = 'Username must contain only alphabetic characters';
        return;
    } else if (username.length < 3) {
        usernameError.textContent = 'Username should be at least 3 characters long';
        return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Invalid email address';
        return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character';
        return;
    }
    if (password !== confirmPassword) {
        confirmError.textContent = 'Passwords do not match';
        return;
    }
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            const existingUser = data.find(user => user.email === email);
            if (existingUser) {
                document.getElementById('user-exists-message').textContent = 'User already exists';
            } else {
                const newUser = { username, email, password };
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    body: JSON.stringify(newUser)
                })
                .then(response => {
                    if (response.ok) {
                        document.getElementById('account-created-message').textContent = 'Account created successfully';
                        window.location.href = 'login.html';

                    } else {
                        console.error('Error saving user data');
                    }
                })
                .catch(error => {
                    console.error('Error saving user data:', error);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

}

