'use strict'

// create a list to hold all of the text that will be displayed
const challengeText = [
  "This is a speed-clicking challenge. Click on the glowing crystals as fast as possible to weaken the guardian's shield. Once the shield is down, click on the guardian to defeat them."
];

// assign constant variables that take the id of elements
const dragonImage = document.getElementById('dragon-image');
const dragonHealthBar = document.getElementById('dragon-health-bar');
const userHealthBar = document.getElementById('user-health-bar');
const crystal1Image = document.getElementById('crystal-1-image');
const crystal2Image = document.getElementById('crystal-2-image');
const crystal3Image = document.getElementById('crystal-3-image');
const timerDisplay = document.getElementById('timer');

// keep track of hp
let dragonHealth = 50;
let userHealth = 100;
// keep track of clicks on the crystals
let crystal1Clicks = 0;
let crystal2Clicks = 0;
let crystal3Clicks = 0;
let timeLeft = 30; // 30 seconds

// object to hold all the ids for the crystals
const crystalImages = {
  1: crystal1Image,
  2: crystal2Image,
  3: crystal3Image,
};

// object to hold the amount of clicks on crystals
const crystalClicks = {
  1: crystal1Clicks,
  2: crystal2Clicks,
  3: crystal3Clicks,
};

// start dragon attack interval (every 3 seconds)
const attackInterval = setInterval(dragonAttack, 3000);

// start timer interval
const timerInterval = setInterval(updateTimer, 1000);

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

// update timer display every second
function updateTimer() {
  // subtract a second every second
  timeLeft--;
  // display the time left
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  // if the time reaches 0 clear the attack and timer intervals
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    clearInterval(attackInterval);
    // store loss result in local storage and redirect to final page
    localStorage.setItem('final', false);
    window.location.href = "final.html";
  }
}

// update dragon health bar visually
function updateDragonHealthBar(health) {
  dragonHealthBar.value = health;
}

// update user health bar visually
function updateUserHealthBar(health) {
  userHealthBar.value = health;
}

// function to handle dragon attack (every 3 seconds)
function dragonAttack() {
  // while the time is greater than 0 take 5 hp from the user 
  if (timeLeft > 0) {
    userHealth -= 5;
    updateUserHealthBar(userHealth);
    dragonImage.src = "dragonAttack.png"; // show the dragon attacking every time it attacks

    // set a delay for when the attack and non attack images are displayed
    setTimeout(function() {
      dragonImage.src = "dragon.png"; // change back to original image after delay
    }, 1000); // change back after 1 second

    // if the user reaches 0 hp clear the attack and timer intervals
    if (userHealth <= 0) {
      clearInterval(attackInterval);
      clearInterval(timerInterval);
      // store loss result in local storage and redirect to final page
      localStorage.setItem('final', false);
      window.location.href = "final.html";
    }
  }
}

// function to handle crystal clicks
function handleCrystalClick(crystalId) {
  // if the crystal has been clicked less than 5 times add 1 to the value of the crystal everytime it is clicked
  if (crystalClicks[crystalId] < 5) {
    crystalClicks[crystalId]++;
    // if the crystal has been clicked 5 times replace image with cracked crystal image 
    if (crystalClicks[crystalId] === 5) {
      crystalImages[crystalId].src = 'crystalCracked.png';
    }
  }

  // allow attacking dragon only after all crystals are broken 
  if (crystalClicks[1] === 5 && crystalClicks[2] === 5 && crystalClicks[3] === 5) {
    dragonImage.addEventListener('click', handleDragonAttack);
  }
}

// function to handle dragon attack by user (after crystals are broken)
function handleDragonAttack() {
  // subtract 1 health every time dragon is clicked
  dragonHealth--;
  // function to update the health bar values
  updateDragonHealthBar(dragonHealth);
  // if the dragon's hp is lower than or equal to 0 clear attack and timer intervals
  if (dragonHealth <= 0) {
    clearInterval(attackInterval);
    clearInterval(timerInterval);
    // store win result in local storage and redirect to final page
    localStorage.setItem('final', true);
    window.location.href = 'story.html'; 
  }
}

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

// Event listeners for crystal clicks, will execute handleCrystalClick function
crystal1Image.addEventListener('click', () => handleCrystalClick(1));
crystal2Image.addEventListener('click', () => handleCrystalClick(2));
crystal3Image.addEventListener('click', () => handleCrystalClick(3));
// display the page number
document.getElementById('pageNumber').innerText = "Challenge 3: Face the guardian!";
// display the challenge text with index 0 on element with id 'storyText' at 30ms on load
typewriter('storyText', challengeText[0], 20);
