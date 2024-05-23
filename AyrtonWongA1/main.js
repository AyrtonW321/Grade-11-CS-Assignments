'use strict'

// get the users name from the local storage and convert to string
let userName = localStorage.getItem('userName');
userName = String(userName);

// object to hold all of the story text
// opted for an object isntead of a list because we will skip over the challenge pages
const storyText = {
  // takes the users name and displays their name
  0: `You are ${userName}, a curious and resourceful young librarian. You\'ve always loved exploring the dusty shelves of the city\'s grand library, your nose buried in ancient tomes and fantastical stories. But today, a sense of unease hangs in the air.`,
  1: "An unsettling silence hangs heavy in the air of the once bustling library. The massive oak doors stand before you, locked by a curious device on the handle. It has three empty slots and three buttons adorned with celestial symbols: a sun, a moon, and a star. You recall a passage from an ancient book you once read, something about the language of the stars...",
  3: "You step inside the library, bracing yourself for the musty smell of old paper. The scene is chaotic, bookshelves are toppled, and papers litter the floor. A single book lies open on a desk, its pages illuminated by an ethereal glow.",
  4: "The book reveals a map of the library, but it's different from any you've seen before. Strange symbols mark specific locations. You remember the library's hidden passages from the old stories...",
  6: "You descend into the hidden passage, the air thick with dust and the scent of forgotten memories. The only light comes from your flashlight, barely illuminating the damp stone walls. You hear a faint dripping sound echoing in the distance.",
  7: "You emerge into a vast cavern, its walls adorned with forgotten treasures. Glowing crystals illuminate the space, revealing an ancient figure cloaked in darkness. Their voice booms: \"Who dares disturb my slumber?\"",
  9: "The guardian dissipates, leaving behind a shimmering key. You pocket the key, knowing your journey is far from over. The true adventure has just begun..."
}

// object to hold all the images for the story
const storyImages = {
  0: 'scene1.jpeg',
  1: 'scene2.jpeg',
  3: 'scene3.jpeg',
  4: 'scene4.jpeg',
  6: 'scene5.jpeg',
  7: 'scene6.jpeg',
  9: 'scene7.jpeg'
}

// object to hold the files for the challenges
// challenges will be on index 2, 5, 8 (pages 3, 6, 9)
const challengePages = {
  2: 'challenge1.html',
  5: 'challenge2.html',
  8: 'challenge3.html'
};

// variable to hold the current page number
// starts at -1 because we will add 1 at the start of the program and I want it to start on index 0
let currentPage = -1;

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

  // the continue and back buttons will be disabled while the typewriter effect is in progress
  document.getElementById('continueButton').disabled = true;
  document.getElementById('backButton').disabled = true;

  // this function creates an interval, it schedules a function to be called repeated after a time delay (speed parameter)
  const typewriterInterval = setInterval(() => {
    if (textIndex >= text.length) { // check to see if textIndex has reached the lenght of the text string
      clearInterval(typewriterInterval); // if so, clear interval to stop the typing animation
      // enable the continue and back button after the type writer effect is done
      document.getElementById('continueButton').disabled = false;
      document.getElementById('backButton').disabled = false;
      return; // Exit the loop if all characters are typed
    }

    element.textContent += text.charAt(textIndex); // appends the chracter to the content of the target element
    textIndex++; // move to the next character in the text
  }, speed);
}

// this function will be run when the page loads
function start() {

  // set current page to the value that is assigned to the local storage currentPage value
  currentPage = localStorage.getItem('currentPage');

  // if the currentPage returns as null then set the current page to -1
  // if the user has not completed the first challenge
  if (currentPage === null) {
    currentPage = -1;
    // if the currentPage variable doesn't return null set the currentPage to that value
  } else {
    // turn the currentPage value back into an integer
    // local storage will hold the value as an object
    currentPage = parseInt(currentPage);
  }
  // page loads onto page 1 of the story
  changePage(1);
}

// this function will change the page 
function changePage(changePage) {

  // make constant variables that take the id of the story image and page number elements
  const image = document.getElementById('storyImage');
  const page = document.getElementById('pageNumber');

  //adds the changePage value to the currentPage, indicating the new page to display
  currentPage += changePage

  // Check for challenge pages and redirect accordingly
  if (currentPage in challengePages) {
    localStorage.setItem('currentPage', currentPage); // store the current page in local storage so the user will return to the next page when they complete the challenge
    window.location.href = challengePages[currentPage]; // Redirect to the specified challenge HTML file
  }

  page.innerText = "The Mystery of the Lost Library:  Page " + (currentPage + 1); // Show the page number on top

  document.getElementById('storyText').innerText = ""; // clear the story text when the user changes the page so the new text can be displayed
  image.src = ""; // clear the image so new image can be displayed next page

  image.src = storyImages[currentPage]; // display the image that correlates to the current page

  // use the typewriter effect to display the text that correlates to the current page
  // display the text on the element with id 'storyText', the speed is 50ms
  typewriter('storyText', storyText[currentPage], 30);
}

// attach event listener to element with id continueBUtton, listens for a click event on that element
// creates anonymous function that will be executed
document.getElementById("continueButton").addEventListener("click", () => {
  // check for page 10 (index 9)
  // if currentPage is 9 then redirect the user to "final.html"
  if (currentPage === 9) {
    window.location.href = "final.html";
    // if currentPage is not 9 then change page by 1 count
  } else {
    changePage(1);
  }
});

// attach event listener to element with id backButton, listens for a click on that element
// creates anonymous function that will be executed
document.getElementById("backButton").addEventListener("click", () => {
  // check for page 0
  // if current page is 0 then the back button will be disabled
  // this way the user cannot go back a page that is lower than 0
  if (currentPage === 0) {
    document.getElementById('backButton').disabled = true;
    // if the current page is not 0 then change page back by 1 count
  } else {
    changePage(-1);
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