
    document.getElementById('moddagud').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve form data
    const rollNo = document.getElementById('rollno').value; // Changed variable name to follow convention
    const name = document.getElementById('name').value+'';
    const yearOfStudy = document.getElementById('year').value;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="Option"]:checked').value;
    const email = document.getElementById("email").value;
    const interests = [...document.querySelectorAll('input[name="interest"]:checked')].map(input => input.value);
    const hobbies = [...document.querySelectorAll('input[name="hobbies"]:checked')].map(input => input.value);
   
   

    // Ensure all required fields are filled
    if (!name || !yearOfStudy || !age || !email || !rollNo) {
        alert('Kindly Fill in all required fields.');
        return; // Exit the function if any required field is empty
    }
    if(gender == null){
        alert('Select your gender');
        return;
    }
    if(interests.length == 0 ){
        alert('Select atleast one interest of yours')
        return;
    }
    if(hobbies.length == 0 ){
        alert('Select atleast one hobby of yours')
        return;
    }

    const formData = {
        "rollNo": rollNo, // Changed key to follow convention
        "name": name,
        "yearOfStudy": yearOfStudy,
        "age": age,
        "gender": gender,
        "email": email,
        "interests": interests,
        "hobbies": hobbies
    };

    fetch("students.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((students) => {
            // Filter students based on gender
            let oppGenderStudents;
            if (formData.gender === 'Other') {
                oppGenderStudents = students.filter(student => student.Gender === 'Other');
            } else {    
                oppGenderStudents = students.filter(student => student.Gender !== formData.gender && student.Gender !== 'Other');
            }

            // Calculate best match
            let matches = [];
            let maxScore = 0;
            oppGenderStudents.forEach(student => {
                const commonInterests = student.Interests.filter(interest => formData.interests.includes(interest)).length;
                const commonHobbies = student.Hobbies.filter(hobby => formData.hobbies.includes(hobby)).length;
                const score = commonInterests + commonHobbies;

                if (score > maxScore) {
                    maxScore = score;
                    matches = [student];
                   
                } else if (score === maxScore) {
                    matches.push(student);
                }
            });

            if (matches.length > 0) {
                // Sort bestMatches based on additional criteria like age or year of study
                matches.sort((a, b) => a.yearOfStudy - b.yearOfStudy);

                const bestMatch = matches[0];
                localStorage.setItem('bestMatch', JSON.stringify(bestMatch));
                window.location.href = 'best_match.html';
            } else {
                document.getElementById('nomatch').innerHTML = 'OH NO!! Sorry No Matches Found,Please Try Again';
            }
        })
        .catch(error => {
            console.error('Error fetching student data:', error);
            // Handle error, e.g., show an error message to the user
        });
});