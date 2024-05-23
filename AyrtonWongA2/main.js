// .style.visability = 'visable';
// .style.visability = 'hidden';
'use strict'

// Set maximum # of candidates to 10
const MAX_CANDIDATES = 10;
let numCandidates = 0; // Counter to keep track of the amount of candidates
let currentCandidateIndex = 0; // Counter to keep track of the index

// Create arrays for all of the inputs
let candidateName = new Array(MAX_CANDIDATES);
let candidateNumber = new Array(MAX_CANDIDATES);
let candidateGrade = new Array(MAX_CANDIDATES);
let candidatePosition = new Array(MAX_CANDIDATES);
let candidatePicture = new Array(MAX_CANDIDATES);
let candidateMessage = new Array(MAX_CANDIDATES);
// Create list to hold amount of votes for each candidate, parallel
let candidateVotes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Function to add new candidates
function addNewCandidate() {
    // Get id from the input elements
    const name = document.getElementById('nameInput');
    const studentNum = document.getElementById('studentNumInput');
    const grade = document.getElementById('gradeInput');
    const position = document.getElementById('positionInput');
    const picture = document.getElementById('pictureInput');
    const message = document.getElementById('messageInput');

    // Create constants to hold the trimed values
    const studentNumValue = studentNum.value.trim();
    const gradeValue = grade.value.trim();
    const nameValue = name.value.trim();
    const positionValue = position.value.trim();
    const pictureValue = picture.value.trim();
    const messageValue = message.value.trim();

    // Check for any empty fields
    let isEmptyField = false;
    const inputFields = [name, studentNum, name, picture, message];
    // Loop through the array and checks of there are any empty values
    for (const input of inputFields) {
        if (input.value === "") {
            isEmptyField = true;
            alert("Please fill out all fields!"); // Alert if there are empty values
            break; // Exit the for loop
        }
    }

    // Exit function if there's an empty field
    if (isEmptyField) {
        return;
    }

    // Exit the function if there is an invalid name
    if (!validateName(nameValue)) {
        return;
    }

    // Check if student number is empty or contains non-numeric characters
    // Check student number length and characters
    if (studentNumValue.length !== 9 || isNaN(studentNumValue)) {
        alert("Student Number must be a 9-digit number!");
        return;
    }

    // Exit the function if there is an invalid picture URL
    if (!validateImageURL(pictureValue)) {
        return;
    }

    // Exit the function if there is an invalid grade
    if (!validateGrade(gradeValue)) {
        alert("Invalid grade! Please enter 9, 10, 11, or 12."); // Alert the user
        return;
    }

    // Add the inputted values into the arrays
    candidateName[numCandidates] = nameValue;
    candidateNumber[numCandidates] = studentNumValue;
    candidateGrade[numCandidates] = gradeValue;
    candidatePosition[numCandidates] = positionValue;
    candidatePicture[numCandidates] = pictureValue;
    candidateMessage[numCandidates] = messageValue;

    // Update the candidate containers with the inputted name and picture
    updateMainScreen(candidateName[numCandidates], candidatePicture[numCandidates], numCandidates + 1);

    // Check if maximum number of candidates is reached
    if (numCandidates === MAX_CANDIDATES) {
        alert("Maximum number of candidates reached!");
        return;
    }

    // Increment numCandidates
    numCandidates++;

    // Clear the input fields for the next candidate to be added
    clearInputFields();
}

// Function to validate the candidate's name
function validateName(nameValue) {
    // Create a constant to get the index of the first space in the value
    const firstSpaceIndex = nameValue.indexOf(' ');

    // if there isn't a space it means that they havent inputted a last name or they didnt space it correctly
    if (firstSpaceIndex === -1) {
        alert("Please enter a first and last name separated by a space."); // Alert user that they need to have a First and Last name
        return false; // return false 
    }

    // Check capitalization of first letter of both the first and last anmes
    if (nameValue.substring(0, 1).toLowerCase() === nameValue.substring(0) ||
        nameValue.substring(firstSpaceIndex + 1, firstSpaceIndex + 2).toLowerCase() === nameValue.substring(firstSpaceIndex + 1, firstSpaceIndex + 2)) {
        alert("The first letter of your name and last name must be capitalized."); // Alert if the first name or last name are not capitalized
        return false; // Return false if not capitalized
    }

    return true; // Return true if all criteria is met
}

// Function to validate the img URL
function validateImageURL(imageURL) {
    // Array to hold the valid img format 
    const validExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    let isValidImage = false; // flag for checking if img is valid
    let len = imageURL.length; // hold the length of the inputted string
    let ifPeriod = imageURL.indexOf('.'); // check if there is a period in the string

    // Loop through the array to see if the characters from the period to the end of the string
    for (const extension of validExtensions) {
        // check to see if the characters match up with one of the validExtensions 
        if (imageURL.substring(ifPeriod, len).toLowerCase() === extension) {
            isValidImage = true; // turn variable to true
            break; // exit the loop
        }
    }

    // if it is not a valid img format alert and return false
    if (!isValidImage) {
        alert("Invalid image format! Please use JPG, JPEG, or PNG.");
        return false;
    }

    return true; // return true of img extension is valid
}

// Function to validate the grade
function validateGrade(grade) {
    const validGrades = [9, 10, 11, 12]; // Array to hold the valid grades
    return validGrades.includes(parseInt(grade)); // return if the inputted strings is one of the valid grades (true or false)
}

// Function to clear all of the inputs
function clearInputFields() {
    // Clear the input fields
    document.getElementById("nameInput").value = "";
    document.getElementById("studentNumInput").value = "";
    document.getElementById("gradeInput").value = "";
    document.getElementById("positionInput").selectedIndex = 0; // Reset select to first option
    document.getElementById("pictureInput").value = "";
    document.getElementById("messageInput").value = "";
}

// Print the current candidate in the viewCandidate container
function printCurrentCandidate() {
    // Get id from the input elements
    const name = document.getElementById('name');
    const studentNum = document.getElementById('number');
    const grade = document.getElementById('grade');
    const position = document.getElementById('position');
    const picture = document.getElementById('picture');
    const message = document.getElementById('message');
    const numOfVotes = document.getElementById('numOfVotes');
    const title = document.getElementById('candidateTitle');

    // Update the text for each element to the value of the corresponding array index at the current index
    name.innerText = candidateName[currentCandidateIndex];
    studentNum.innerText = candidateNumber[currentCandidateIndex];
    grade.innerText = candidateGrade[currentCandidateIndex];
    position.innerText = candidatePosition[currentCandidateIndex];
    picture.src = "./imgs/" + candidatePicture[currentCandidateIndex];
    numOfVotes.innerText = candidateVotes[currentCandidateIndex];
    title.innerText = "Candidate" + " " + (currentCandidateIndex + 1);

    // Define variable to the value of the array at this index
    // Format the message and update text
    let messageInput = candidateMessage[currentCandidateIndex];
    message.innerText = formatMessage(messageInput);
}

// Function to format the message
function formatMessage(messageValue) {
    let formattedMessage = ""; // Empty string to hold the formatted message
    let startIndex = 0; // Start index at 0 in the beginning

    // for loop to loop through the length of message inputted
    for (let i = 0; i < messageValue.length; i++) {
        const char = messageValue[i]; // Define char as the value of the current character 

        // Check for sentence ending punctuation (.?!)
        if (char === '.' || char === '?' || char === '!') {
            // Check for multiple punctuation marks together
            let endIndex = i + 1;
            while (endIndex < messageValue.length && (messageValue[endIndex] === '.' || messageValue[endIndex] === '?' || messageValue[endIndex] === '!')) {
                endIndex++;
            }

            // Extract the sentence and append to formatted message
            const sentence = messageValue.substring(startIndex, endIndex);
            formattedMessage += sentence + "\n";

            // Set i = end index because it loops to prevent double loop on the same character
            i = endIndex;
            // Update starting index for the next sentence
            startIndex = endIndex;
        }
    }

    // Append the last sentence if it exists
    if (startIndex < messageValue.length) {
        formattedMessage += messageValue.substring(startIndex);
    }

    return formattedMessage; // return the formatted message
}

// Function to update the canidate containers
// (inputted canidate name, inputted candidate img URL, current index)
function updateMainScreen(candidateName, candidateImg, candidateIndex) {

    // Selector for the specific candidate container using the index
    const candidateSelector = `.candidate` + candidateIndex;
    const candidateElement = document.querySelector(candidateSelector); // Select the candidate container 

    if (candidateElement) {
        // Update elements within the candidate container
        candidateElement.querySelector('p').textContent = candidateName;
        candidateElement.querySelector('img').src = "./imgs/" + candidateImg;
    }
}

// Event listener to see if user clicks the next button
document.getElementById("next").addEventListener("click", () => { // empty function
    currentCandidateIndex++; // Add 1 to the candidate index when next is pressed
    // Check to see if the current index is greater or equal to the number of candidates
    if (currentCandidateIndex >= numCandidates) {
        currentCandidateIndex = numCandidates - 1; // Prevent going out of bounds
    }
    printCurrentCandidate(); // Update the current candidate container
});

// Event listener to see if user clicks the previous button
document.getElementById("previous").addEventListener("click", () => {
    currentCandidateIndex--; // Subtract 1 to the candidate index when previous is pressed
    // Check to see if the current index is less than 0
    if (currentCandidateIndex < 0) {
        currentCandidateIndex = 0; // Prevent going below 0
    }
    printCurrentCandidate(); // Update the current candidate container
});

// Function to add a vote to a candidate
function vote() {
    candidateVotes[currentCandidateIndex] = candidateVotes[currentCandidateIndex] + 1; // Add 1 vote to the index of the current candidate
    printCurrentCandidate(); // Update the current candidate container
}

// Function to edit the candidate info
function editCandidate() {
    // Get the values from the input elements
    const name = document.getElementById('nameEdit');
    const studentNum = document.getElementById('studentNumEdit');
    const grade = document.getElementById('gradeEdit');
    const position = document.getElementById('positionEdit');
    const picture = document.getElementById('pictureEdit');
    const message = document.getElementById('messageEdit');

    // Create constants to hold the trimed values
    const studentNumValue = studentNum.value.trim();
    const gradeValue = grade.value.trim();
    const nameValue = name.value.trim();
    const positionValue = position.value.trim();
    const pictureValue = picture.value.trim();
    const messageValue = message.value.trim();

    // Check for any empty fields
    let isEmptyField = false;
    const inputFields = [name, studentNum, name, picture, message];
    // Loop through the array and checks of there are any empty values
    for (const input of inputFields) {
        if (input.value === "") {
            isEmptyField = true;
            alert("Please fill out all fields!"); // Alert if there are empty values
            break; // Exit the for loop
        }
    }

    // Exit function if there's an empty field
    if (isEmptyField) {
        return;
    }

    // Exit the function if there is an invalid name
    if (!validateName(nameValue)) {
        return;
    }

    // Check if student number is empty or contains non-numeric characters
    // Check student number length and characters
    if (studentNumValue.length !== 9 || isNaN(studentNumValue)) {
        alert("Student Number must be a 9-digit number!");
        return;
    }

    // Exit the function if there is an invalid picture URL
    if (!validateImageURL(pictureValue)) {
        return;
    }

    // Exit the function if there is an invalid grade
    if (!validateGrade(gradeValue)) {
        alert("Invalid grade! Please enter 9, 10, 11, or 12."); // Alert the user
        return;
    }

    // Add the inputted values into the arrays
    candidateName[currentCandidateIndex] = nameValue;
    candidateNumber[currentCandidateIndex] = studentNumValue;
    candidateGrade[currentCandidateIndex] = gradeValue;
    candidatePosition[currentCandidateIndex] = positionValue;
    candidatePicture[currentCandidateIndex] = pictureValue;
    candidateMessage[currentCandidateIndex] = messageValue;

    // Update the candidate containers with the inputted name and picture
    updateMainScreen(candidateName[currentCandidateIndex], candidatePicture[currentCandidateIndex], currentCandidateIndex + 1);
    printCurrentCandidate(); // Update the current candidate container
}

// Function to show the edit candidate container
function showEditCandidate(currentCandidateIndex) {
    // Get the id of the edit candidate container
    const editCandidate = document.getElementById('editCandidate');
    editCandidate.style.display = 'block'; // Make visible

    // Fill in the input fields with candidate information of the current index
    nameEdit.value = candidateName[currentCandidateIndex];
    studentNumEdit.value = candidateNumber[currentCandidateIndex];
    gradeEdit.value = candidateGrade[currentCandidateIndex];
    positionEdit.value = candidatePosition[currentCandidateIndex];
    messageEdit.value = candidateMessage[currentCandidateIndex];
    pictureEdit.value = candidatePicture[currentCandidateIndex];
}

// Function to hide the edit candidate container
function hideEdit() {
    // Get the id of the edit candidate container
    const editCandidate = document.getElementById('editCandidate');

    // Toggle visibility based on current state
    // If edit candidate container is not visable (true = make it visible) (false (means that it is visible) = make it hidden)
    editCandidate.style.display = editCandidate.style.display === 'none' ? 'block' : 'none';

    clearInputFields(); // clear the input fields
}

// Function to show or hide the add candidate container
function toggleAddCandidateForm() {
    // Get the id of the add candidate container
    const addCandidate = document.querySelector('.addCandidate');

    // Toggle visibility based on current state
    // If add candidate container is not visable (true = make it visible) (false (means that it is visible) = make it hidden)
    addCandidate.style.display = addCandidate.style.display === 'none' ? 'block' : 'none';

    clearInputFields(); // clear the input fields
}

// Function to show the view candidate container
function showViewCandidate() {
    // If there are no candidates alert the user that they have to enter a candidate first
    if (numCandidates === 0) {
        alert('Please add a candidate.');
    } else { // if there are candidates show the view candidate container
        const viewCandidate = document.querySelector('.viewCandidate');
        viewCandidate.style.display = 'block'; // Set display to block (visible)
        printCurrentCandidate(); // Update candidate information
    }

}

// Function to hide the view candidate container
function hideViewCandidate() {
    // Get id of the view candiidate container
    const viewCandidate = document.querySelector('.viewCandidate');
    viewCandidate.style.display = 'none'; // Set display to non (hidden)
}

// Function to finish voting
function finishVoting() {
    // Set a varaible to hold the number of votes
    let totalVotes = 0;
    // For loop to loop through the candidateVotes array
    for (let i = 0; i < candidateVotes.length; i++) {
        totalVotes += candidateVotes[i]; // Add the amount of each candidate's votes to the total amount
    }

    // If the number of candidates is 0 alert the user they have to add a candidate before finishing voting
    if (numCandidates === 0) {
        alert('Please add a candidate before voting');
    // If the number of votes is 0 alert the user they have to vote for a candidate first before finishing
    } else if (totalVotes === 0) {
        alert('No votes have been cast yet!');
    // if number of candidates isnt 0 and votes isnt 0
    } else {
        console.log("Total votes:", totalVotes); // Log the total number of votes in the console
        // Show the view candidate container
        showViewCandidate();
        // Clear all input fields
        clearInputFields();
        // Get id of all containers and buttons (except the view candidate container button)
        const addCandidate = document.querySelector('.addCandidate');
        const candidateContainer = document.querySelector('.candidateContainer');
        const editCandidate = document.getElementById('editCandidate');
        const addCandidateBtn = document.getElementById('addCandidate');
        const finishVoting = document.getElementById('finishVoting');
        const edit = document.getElementById('edit');
        const vote = document.querySelector('.vote');

        // Hide all containers and buttons except for the view candidate button and container
        addCandidate.style.display = "none";
        candidateContainer.style.display = "none";
        editCandidate.style.display = "none";
        addCandidateBtn.style.display = "none";
        finishVoting.style.display = "none";
        finishVoting.style.display = "none";
        edit.style.display = "none";
        vote.style.display = "none";
    }
}

// Test function
// Inputs all of the values into the add candidate input boxes
function runTest() {
    const name = document.getElementById('nameInput');
    const studentNum = document.getElementById('studentNumInput');
    const grade = document.getElementById('gradeInput');
    const position = document.getElementById('positionInput');
    const picture = document.getElementById('pictureInput');
    const message = document.getElementById('messageInput');
    name.value = 'Timothée Chalamet';
    studentNum.value = '341146421';
    grade.value = '9';
    position.value = 'Co-President';
    picture.value = 'timothee.webp';
    message.value = 'Hi!!! My name is Timothee? Chalamet.. 10928120. Hi';
}

function runTest2(){
    const name = document.getElementById('nameInput');
    const studentNum = document.getElementById('studentNumInput');
    const grade = document.getElementById('gradeInput');
    const position = document.getElementById('positionInput');
    const picture = document.getElementById('pictureInput');
    const message = document.getElementById('messageInput');
    name.value = 'Scarlett Johansson';
    studentNum.value = '124641143';
    grade.value = '12';
    position.value = 'Logistics';
    picture.value = 'scarlett.jpg';
    message.value = 'Hi!!! My name is Scarlett?.. 10928120...............';
}