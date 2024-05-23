'use strict'

// create a list to hold all of the text that will be displayed
const challengeText = [
    "A faint inscription on the device hints at the solution: \"As the celestial bodies dance across the sky, so too must their essence be mirrored.\"",
    "Success!",
    "After successfully clicking the buttons in the correct order, the door unlocks with a creaking groan. A sliver of light spills from within, beckoning you forward. The story continues on the next page."
];

// assign constant variables that take the id of elements
const sunImprint = document.getElementById('sunImprint');
const moonImprint = document.getElementById('moonImprint');
const starImprint = document.getElementById('starImprint');
const messageElement = document.getElementById('message');
const nextButton = document.getElementById('next-button');
const device = document.getElementById('device');

// keep track of which imprints have been solved
let sunSolved = false;
let moonSolved = false;
let starSolved = false;

// store the number of times the imprints have been clicked
let sunClicks = 0;
let moonClicks = 0;
let starClicks = 0;

// variable to store the current page number
let currentPage = 0;

// this function will simulate a typewriter effect when displaying story text
// elementId will represent the ID of the element where the text will be displayed
// text is the string of text that will be typed out
// speed is the speed of the typing effect in milleseconds 
function typewriter(elementId, text, speed) {
    // declare constant anmed element
    // retrieves the element that matches the id
    const element = document.getElementById(elementId);

    // keeps track of the current character index in the text string
    let textIndex = 0;

    // this function creates an interval, it schedules a function to be called repeated after a time delay (speed parameter)
    const typewriterInterval = setInterval(() => {
        if (textIndex >= text.length) { // check to see if textIndex has reached the lenght of the text string
            clearInterval(typewriterInterval); // if so, clear interval to stop the typing animation
            return; // Exit the loop if all characters are typed
        }

        element.textContent += text.charAt(textIndex); // appends the chracter to the content of the target element
        textIndex++; // move to the next character in the text
    }, speed);
}

// this function will handle the clicking of the imprints
function handleClick(event) {

    // retrieves the element that was clicked
    const clickedImprint = event.target;

    // check if the sun imprint was clicked, if so add 1 to sunClicks variable
    if (clickedImprint.id === 'sunImprint') {
        sunClicks++;
        // check if sun was clicked 3 times
        if (sunClicks === 3) {
            device.src = "challenge1Sun.png"; // Change image on success
            sunSolved = true; // change sunSolved to true
            messageElement.innerText = 'Sun Imprint Solved!'; // print success message
            // hide the sun imprint and unhide the moon imprint
            sunImprint.hidden = true;
            moonImprint.hidden = false;
            // if sun was not clicked 3 times, move the image to a random x location and display a try again message
        } else {
            moveImageRandomly(clickedImprint); // Move clicked imprint on failure
            messageElement.innerText = 'Try Again!';
        }
        // check if moon imprint was clicked, if so add 1 to moonClicks variable
    } else if (clickedImprint.id === 'moonImprint') {
        moonClicks++;
        // check if moon was clicked 3 times
        if (moonClicks === 3) {
            device.src = "challenge1Moon.png"; // Change image on success
            moonSolved = true; // change moonSolved to true
            messageElement.innerText = 'Moon Imprint Solved!'; // print success message
            // hide the moon and unhide the star
            moonImprint.hidden = true;
            starImprint.hidden = false;
            // if moon was not clicked 3 times, move the image to a random x location and display a try again message
        } else {
            moveImageRandomly(clickedImprint); // Move clicked imprint on failure
            messageElement.innerText = 'Try Again!';
        }
        // check if star imprint was clicked, if so add 1 to starClicks variable
    } else if (clickedImprint.id === 'starImprint') {
        starClicks++;
        // check if star was clicked 3 times 
        if (starClicks === 3) {
            device.src = "challenge1.jpeg"; // Change image on success
            starSolved = true; // change starSolved to true
            messageElement.innerText = 'Star Imprint Solved!'; // print sucess message
            // if the star was not clicked 3 times, move the image to a random x location adn display a try again message
        } else {
            moveImageRandomly(clickedImprint); // Move clicked imprint on failure
            messageElement.innerText = 'Try Again!';
        }
    }

    // check if all of the imprints were solved
    if (sunSolved === true && moonSolved === true && starSolved === true) {
        erase(); // erase function will erase everything on the screen
        typewriter('storyText', challengeText[1], 30); // display the challenge text with index 1 on element with id 'storyText' at 30ms
        document.getElementById('continueButton').disabled = false; // enable continue button
        currentPage++; // add one to current page
        // if all the imprints were not solved keep the continue button disabled
    } else {
        document.getElementById('continueButton').disabled = true;
    }
}

// this fucntion will allow the image to move to a random x location every time the image is pressed
function moveImageRandomly(imageElement) {
    // Get the container element's width
    const containerWidth = imageElement.parentElement.clientWidth;
    // Generate a random horizontal position within the container's width
    const randomX = Math.floor(Math.random() * (containerWidth - imageElement.clientWidth));
    // Set the image's left style to the random position
    imageElement.style.left = `${randomX}px`;
}

// this function will erase the text and hide all the imprints
function erase() {
    document.getElementById('storyText').innerText = "";
    messageElement.innerText = '';
    document.getElementById('sunImprint').hidden = true;
    document.getElementById('moonImprint').hidden = true;
    document.getElementById('starImprint').hidden = true;
}

// attach event listener to element with id continueButton, listens for a click event on that element
// creates anonymous function that will be executed
document.getElementById("continueButton").addEventListener("click", () => {
    currentPage++; // add one to currentPage 
    // check if the current page is 2
    if (currentPage === 2) {
        erase(); // erase the text on the screen
        device.src = 'challenge1Complete.jpeg'; // change the device image
        typewriter('storyText', challengeText[2], 30); // display the challenge text with index 2 on element with id 'storyText' at 30ms
    }
    // check if current page is 3, if so redirect the page back to the story
    if (currentPage === 3) {
        window.location.href = 'story.html';
    }
});

// attach event listener to element with id exitButton, listens for a click on that element
// creates anonymous function that will be executed
document.getElementById("exitButton").addEventListener("click", () => {
    // confirm alert will popup 
    // if the user clicks yes to exiting the game it will redirect them back to the start menu and clear anything in the local storage
    if (confirm("Are you sure you want to exit the game?")) {
        window.location.href = "index.html";
        localStorage.clear();
    }
});

// listen for a click on each element and the handleClick function will be executed
sunImprint.addEventListener('click', handleClick);
moonImprint.addEventListener('click', handleClick);
starImprint.addEventListener('click', handleClick);

// hide the moon and star imprints on load
moonImprint.hidden = true;
starImprint.hidden = true;

/*create function later...*/
// disable the continue button on load
document.getElementById('continueButton').disabled = true;
// display the page number
document.getElementById('pageNumber').innerText = "Challenge 1: Align the Heavens! ";
// display the challenge text with index 0 on element with id 'storyText' at 30ms on load
typewriter('storyText', challengeText[0], 30);
