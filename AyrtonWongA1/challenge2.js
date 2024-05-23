'use strict'

// create a list to hold all of the text that will be displayed
const challengeText = [
    "Find the key to unlock the door to the secret passage.",
    "The passage is unlocked. The story continues on the next page."
];

// assign constant variables that take the id of elements
const portrait = document.getElementById("portrait");
const key = document.getElementById("key");
const globe = document.getElementById("globe");
const door = document.getElementById("door");
const message = document.getElementById("message");

let keyEquipped = false; // variable to hold the state of the key

// keep track of the things searched
let portraitClicked = false;
let globeClicked = false;
let doorUnlocked = false;

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

// Handle portrait click - Open table compartment and reveal key
portrait.addEventListener("click", () => {
    // if portrait was clicked reveal the key, display message and set portraitClicked to true
    if (!portraitClicked) {
        key.hidden = false;
        message.textContent = "You opened the table compartment. A key is revealed!";
        portraitClicked = true;
    // if the portrait is clicked afterwards again, display you've already looked here message
    } else {
        message.textContent = "You've already looked here.";
    }
});

// Handle key clicked - Hold key in inventory and display message
key.addEventListener("click", () => {
    keyEquipped = true;
    message.innerText = "You've collected the key. Find the hidden door.";
});

// Handle globe click - Check if key is equipped and reveal door
globe.addEventListener("click", () => {
    globeClicked = true; // hold that the globe has been clicked
    // if the key is equiped and they clicked the globe show the hidden door (locked) and display message
    if (keyEquipped) {
        door.src = "lockedDoor.jpeg";
        message.innerText = "The globe unlocks a hidden passage! Drag the key to the door to open it.";
    // if the globe is clicked before key is equiped display message
    } else {
        message.innerText = "Find the key.";
    }
});

let isDragging = false; // track dragging state
let keyOffsetX, keyOffsetY; // store offsets during drag

// check to to see if user presses on the key
key.addEventListener("mousedown", (event) => {
    isDragging = true; // set dragging state to true
    // caculates offsets to track the initial pos of the mouse compared to the key
    keyOffsetX = event.clientX - key.offsetLeft; 
    keyOffsetY = event.clientY - key.offsetTop;

    event.preventDefault(); // Prevent default dragging behavior
});

// check to see if mouse is moving
document.addEventListener("mousemove", (event) => {
    // updates the pos of the key element based on the mouse movement and offests if flag is true
    if (isDragging) {
        key.style.left = event.clientX - keyOffsetX + "px";
        key.style.top = event.clientY - keyOffsetY + "px";
    }
});

// check to see if mouse button is released
document.addEventListener("mouseup", (event) => {
    isDragging = false; // set flag to false

    // get the bounding rect for the door and check if key is over door on mouseup (drag and drop)
    const doorRect = door.getBoundingClientRect();
    const isOverDoor = event.clientX >= doorRect.left && event.clientX <= doorRect.right &&
        event.clientY >= doorRect.top && event.clientY <= doorRect.bottom;

    // check only if over door
    if (isOverDoor) {
        // check if key is equiped and the door was revealed
        if (keyEquipped && globeClicked) {
            door.src = "unlockedDoor.jpeg"; // show the unlocked door iamge
            document.getElementById('storyText').innerText = ""; // clear the text
            typewriter('storyText', challengeText[1], 30); // display the challenge text with index 1 on element with id 'storyText' at 30ms
            keyEquipped = false; // reset key state to prevent multiple unlocks
            key.hidden = true; // hide the key
            message.hidden = true; // hide the message
            doorUnlocked = true; // set the door variable as unlocked
            document.getElementById('continueButton').disabled = false;
        // if the globe was not clicked (door not revealed) display message
        } else if (!globeClicked){
            message.innerText = "Find the hidden door.";
        // if none of the conditions are matched display message
        } else {
            message.innerText = "Find the key.";
        }
    }
});

// attach event listener to element with id continueButton, listens for a click event on that element
// creates anonymous function that will be executed
document.getElementById("continueButton").addEventListener("click", () => {
    window.location.href = 'story.html'; // redirect to the story
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

// hide the key onload
key.hidden = true;
// disable the continue button on load
document.getElementById('continueButton').disabled = true;
// display the page number
document.getElementById('pageNumber').innerText = "Challenge 2: Find the hidden passage!";
// display the challenge text with index 0 on element with id 'storyText' at 30ms on load
typewriter('storyText', challengeText[0], 30);