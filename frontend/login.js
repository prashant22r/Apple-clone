const loginButton = document.getElementById('login');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

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

loginButton.addEventListener('click', validateLogin);

function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    const email = emailInput.value;
    const password = passwordInput.value;

    // Fetch existing users
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            // Check if the user exists and the password matches
            const existingUser  = data.find(user => user.email === email);
            if(existingUser){
                if (existingUser .password !== password) {
                    // Password is incorrect
                    document.getElementById("user-exists-message").textContent = "Email or Password is incorrect";
                 }
                else if (existingUser .password === password) {
                    // Redirect to index.html if user exists
                    window.location.href = 'index.html';
                }
            } else {
                // Redirect to signup page if user does not exist
                document.getElementById("user-exists-message").textContent="User doesn't exists"; // Change to your actual signup page URL
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
}