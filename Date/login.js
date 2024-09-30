document.querySelector('.login-container form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Call the login function to validate credentials and redirect
    login();
});

function login() {
    // Get the entered username and password
    var username = document.querySelector('.login-container input[type="text"]').value;
    var password = document.querySelector('.login-container input[type="password"]').value;

    // Fetch the registered usernames and passwords from login.json
    fetch('login.json')
        .then(response => response.json())
        .then(data => {
            // checking if the entered username and password match any user in the data
            var user = data.find(user => user.username === username && user.password === password);
            if (user) {
                // if username and password entered are right,then
                window.location.href = 'dating.html';
               
            } else {
                // Display an error message if the username or password is incorrect
                
                document.getElementById('LoginMessage').innerText = 'Incorrect Username or Password. Please try again.';
            }
        })
        .catch(error => console.error('Error fetching login data:', error));
}