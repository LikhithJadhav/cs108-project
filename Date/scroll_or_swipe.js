function fetchStudentData() {
    return fetch('students.json')
        .then(response => response.json())
        .catch(error => console.error('Error fetching student data:', error));
}

// Function to generate profile cards
function generateProfileCards(students) {
    const profileContainer = document.getElementById('profile-container');

    students.forEach(student => {
        const profileCard = document.createElement('div');
        profileCard.classList.add('profile-card');
        profileCard.dataset.gender = student.Gender.toLowerCase(); // Convert gender to lowercase for consistency
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle Details';

        const profileImage = document.createElement('img');
        profileImage.src = student.Photo;
        profileImage.alt = student.Name;
        profileCard.appendChild(profileImage);

        const profileDetails = document.createElement('div');
        profileDetails.classList.add('profile-details');
        profileDetails.innerHTML = `
            <h2>${student.Name}</h2>
            <p><strong>Roll Number:</strong> ${student['IITB Roll Number']}</p>
            <p><strong>Year of Study:</strong> ${student['Year of Study']}</p>
            <p><strong>Age:</strong> ${student.Age}</p>
            <p><strong>Gender:</strong> ${student.Gender}</p>
            <p><strong>Email:</strong> ${student.Email}</p>
            <p><strong>Interests:</strong> ${student.Interests.join(', ')}</p> <!-- Join interests array into a string -->
            <p><strong>Hobbies:</strong> ${student.Hobbies.join(', ')}</p> <!-- Join hobbies array into a string -->
        `;
        profileCard.appendChild(profileDetails);

        profileContainer.appendChild(profileCard);
    });

    // Add padding at the end to ensure the last card is fully visible
    profileContainer.style.paddingBottom = '30px'; 
}

document.addEventListener('DOMContentLoaded', function() {
    const genderFilter = document.getElementById('gender-filter');
    const interestFilter = document.getElementById('interest-filter');
    const hobbiesFilter = document.getElementById('hobbies-filter');
    const applyFilterBtn = document.getElementById('apply-filter-btn');
    const profileContainer = document.getElementById('profile-container');

    applyFilterBtn.addEventListener('click', function() {
        const genderValue = genderFilter.value;
        const interestValues = [...interestFilter.selectedOptions].map(option => option.value);
        const hobbiesValues = [...hobbiesFilter.selectedOptions].map(option => option.value);

        filterProfiles(genderValue, interestValues, hobbiesValues, profileContainer);
    });

    function filterProfiles(gender, interests, hobbies, container) {
        const profileCards = container.querySelectorAll('.profile-card');

        profileCards.forEach(card => {
            const cardGender = card.dataset.gender;
            const cardInterestsElement = card.querySelector('.profile-details p:nth-child(8)');
            const cardHobbiesElement = card.querySelector('.profile-details p:nth-child(9)');
            if (cardInterestsElement && cardHobbiesElement) {
                const cardInterests = cardInterestsElement.textContent.trim().split(', ');
                const cardHobbies = cardHobbiesElement.textContent.trim().split(', ');

                const showCard = (
                    (gender === 'all' || cardGender === gender) &&
                    (interests.length === 0 || interests.some(interest => cardInterests.includes(interest))) &&
                    (hobbies.length === 0 || hobbies.some(hobby => cardHobbies.includes(hobby)))
                );

                card.style.display = showCard ? 'block' : 'none';
            } else {
                console.error("Error: Required elements not found.");
            }
        });
    }

    initializeScrollSwipe();
});

function initializeScrollSwipe() {
    fetchStudentData()
        .then(students => {
            generateProfileCards(students);
        });
}
