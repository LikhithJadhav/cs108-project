document.getElementById('moddagud').addEventListener('click', function(event) {
    event.preventDefault();
    const rollNumberInput = document.getElementById('rollno');
    const nameInput = document.getElementById('name');
    const yearOfStudyInput = document.getElementById('year');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');
    const genderInputs = document.getElementsByName('Option');
    const interestInputs = document.getElementsByName('interest');
    const hobbyInputs = document.getElementsByName('hobbies');
    const input_data = {};
    input_data.rollNumber = rollNumberInput.value;
    input_data.name = nameInput.value;
    input_data.yearOfStudy = yearOfStudyInput.value;
    input_data.age = ageInput.value;
    input_data.email = emailInput.value;
    if (
        rollNumberInput.value === '' ||
        nameInput.value === '' ||
        yearOfStudyInput.value === '' ||
        ageInput.value === '' ||
        emailInput.value === ''
    ) {
        alert('Fill out all the required fields.');
        return;
    }

    for (genderInput of genderInputs) {
        if (genderInput.checked) {
            input_data.gender = genderInput.value;
            break;
        }
    }
    
    // Retrieve the selected interests
    input_data.interests = [];
    for (const i of interestInputs) {
        if (i.checked) {
            input_data.interests.push(i.value);
        }
    }
    
    // Retrieve the selected hobbies
    input_data.hobbies = [];
    for (const a of hobbyInputs) {
        if (a.checked) {
            input_data.hobbies.push(a.value);
        }
    }
    if(input_data.gender == null){
        alert('Select your gender');
        return;
    }
    if(input_data.interests.length == 0 ){
        alert('Select atleast one interest of yours')
        return;
    }
    if(input_data.hobbies.length == 0 ){
        alert('Select atleast one hobby of yours')
        return;
    }
    fetch('students.json')
    .then(response => response.json())
    .then(students => {
        let bestMatches = [];
        let maxScore = 0;
        let oppositeGenderStudents;
        if (input_data.gender === 'Other') {
            oppositeGenderStudents = students.filter(student => student.Gender === 'Other');
        } else {    
            oppositeGenderStudents = students.filter(student => student.Gender !== input_data.gender && student.Gender !== 'Other');
        }
        
        // Iterate over student data
        for ( student of oppositeGenderStudents) {
            // Calculate matching score
            const commonInterests = student.Interests.filter(interest => input_data.interests.includes(interest)).length;
            const commonHobbies = student.Hobbies.filter(hobby => input_data.hobbies.includes(hobby)).length;
            const score = commonInterests + commonHobbies;

            // Update best matches if the current student has a higher score
            if (score > maxScore) {
                bestMatches = [student];
                maxScore = score;
            } else if (score === maxScore) {
                // If the score is the same as the current maximum, add the student to the list of best matches
                bestMatches.push(student);
            }
        }

        // Handle tiebreakers
        if (bestMatches.length > 0) {
            // Sort bestMatches based on additional criteria like age or year of study
            bestMatches.sort((a, b) => {
                // For example, if you want to prioritize based on age
                return a.Age - b.Age; // Sort by ascending age
            });

            // Get the best match
            const bestMatch = bestMatches[0];
            localStorage.setItem('bestMatch', JSON.stringify(bestMatch));

            // Redirect to the matched.html page
            window.location.href = 'best_match.html';

            // Display the best match
// Display the best match
        //const matchedProfileContainer = document.createElement('div');
        //matchedProfileContainer.id = 'matched-profile';
        //matchedProfileContainer.innerHTML = `

            // Clear the existing content of the body
            //document.body.innerHTML = '';
            //Append the matched profile to the body
            //document.body.appendChild(matchedProfileContainer);
        } else {
            document.getElementById('nomatch').innerHTML = 'Oops! No match is found. Please try again!'
        }
    })
    // Construct query string
    .catch(error => console.error('Error loading student data:', error));
})