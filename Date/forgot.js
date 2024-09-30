var secretQuestions;

// Function to fetch secret questions data
function loadSecretQuestions() {
    fetch('login.json')
        .then(response => response.json())
        .then(data => {
            secretQuestions = data;
            console.log("Secret questions loaded:", secretQuestions);
        })
        .catch(error => console.error('Error loading secret questions:', error));
}

// Function to display secret question based on username
function displaySecretQuestion(username) {
    var userQuestion = secretQuestions.find(user => user.username === username);
    if (userQuestion) {
        document.getElementById('secretQuestion').innerText = userQuestion.secret_question;
        document.getElementById('secretQuestionDiv').style.display = 'block';
        document.getElementById('submitButton').style.display = 'none';
    } else {
        alert('Username not found.');
    }
}

// Function to verify secret answer
function verifySecretAnswer(username, answer) {
    var userQuestion = secretQuestions.find(user => user.username === username);
    if (userQuestion && userQuestion.secret_answer.toLowerCase() === answer.toLowerCase()) {
        document.getElementById('passwordMessage').innerText = 'YAY!!!Here you go your Password: ' + userQuestion.password;
    } else {
        document.getElementById('passwordMessage').innerText = 'Incorrect answer. Please try again.';
    }
}

// Event listener for submit button click
document.getElementById('submitButton').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    displaySecretQuestion(username);
});

// Event listener for submit answer button click
document.getElementById('submitAnswer').addEventListener('click', function() {
    var username = document.getElementById('username').value;
    var answer = document.getElementById('secretAnswer').value;
    verifySecretAnswer(username, answer);
});

// Load secret questions data when the page loads
window.onload = function() {
    loadSecretQuestions();
};