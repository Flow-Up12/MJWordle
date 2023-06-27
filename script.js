//get the 5 character word
const apiUrl = "https://random-word-api.herokuapp.com/word?length=5";
const apiUrl2 = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var word = "";
let valid = true;
async function fetchWord() {
try {
while (true) {
 const response = await fetch(apiUrl);
 const data = await response.json();
 word = data[0].toUpperCase();

 if (await isValidWord(word)) {
   // Handle the valid word
   console.log(word);
   break; // Exit the loop if a valid word is found
 }
}
// Handle the retrieved word
console.log(word);
} catch (error) { 
// Handle any errors
console.error(error);
}
}   
 async function isValidWord(word){
     const response3 = await fetch(apiUrl2 + word);
     const data3 = await response3.json();
     console.log(data3);
     if (response3.status == 404){
           return false;
     }
     else {
         return true;
     }

 }
async function validWord() {
       var newWord = curWord.toLowerCase();
      const response2 = await fetch(apiUrl2 + newWord);
      const data2 = await response2.json();
      console.log(data2);
      if (response2.status == 404){
           valid = false;
           document.querySelector(".error").style.display= "block";
   }
  
}

fetchWord();

   var curWord = "";
   var curRow = 0;
 const boxes = Array.from(document.querySelectorAll('.box'));
   let currentIndex = 0;
   const del = document.getElementById("delete");
   const enter = document.getElementById("enter");


   
document.addEventListener('click', handleLetterClick);
del.addEventListener('click', deleteEventListener);
enter.addEventListener('click', enterKeyListener);







function handleLetterClick(event) {
const target = event.target;

if (target.classList.contains('letter')) {
const currentBox = boxes[currentIndex];
const currentCentered = currentBox.querySelector('.centered');
const letter = target.textContent;

if (currentIndex < (curRow * 5 + 5)) {
 currentCentered.textContent = letter;
 curWord += letter;
 currentIndex = (currentIndex + 1) % boxes.length;
}
}
}


function deleteEventListener(event){
 
 const currentBox = boxes[currentIndex - 1];
const currentCentered = currentBox.querySelector('.centered');
const letter = '';
const computedStyle = window.getComputedStyle(currentBox);
const backgroundColor = computedStyle.getPropertyValue('background-color');
const rgbValues = backgroundColor.match(/\d+/g); // Extract the RGB values

if (rgbValues[0] === '255' && rgbValues[1] === '255' && rgbValues[2] === '255' || currentIndex === 29) {
currentCentered.textContent = letter;
currentIndex = (currentIndex - 1 + boxes.length) % boxes.length; // Update currentIndex correctly
console.log(currentIndex % 5);
var updated = curWord.substring(0, currentIndex % 5);
curWord = updated;
valid = true;
}
             
} 
     
   
const buttonGrid = [];

// Iterate over the list items in the ul
const liItems = document.querySelectorAll('ul li');
liItems.forEach((li) => {
const row = [];

// Find the boxes within the current li item
const boxes = li.querySelectorAll('.box');
boxes.forEach((box) => {
row.push(box);
});

// Push the row into the buttonGrid array
buttonGrid.push(row);
});

function changeColors(curRow) {
const wordSet = new Set(); // Create a Set to keep track of unique letters in the word
const delay = 300; // Delay between each box flip in milliseconds
let delayIncrement = 0; // Increment for delay between each box

for (let i = 0; i < buttonGrid[0].length; i++) {
const box = buttonGrid[curRow][i];
const centered = box.querySelector('.centered');
const letter = centered.textContent;
const  l = document.getElementById(letter.toLowerCase());
if (letter === word.charAt(i)) {
 // If the letter is in the correct position
 setTimeout(() => {
 box.classList.add('flip');
 box.style.backgroundColor = 'green';
}, delayIncrement);
 wordSet.add(letter);
} else if (word.includes(letter) && !wordSet.has(letter)) {
 // If the letter exists in the word but hasn't been matched yet
 setTimeout(() => {
 box.classList.add('flip');
 box.style.backgroundColor = 'yellow';
}, delayIncrement);
 wordSet.add(letter);

} else {
 // Otherwise, set the box color to gray
 //set the corresponding letter to gray
 setTimeout(() => {
 box.classList.add('flip');
 box.style.backgroundColor = 'gray';
}, delayIncrement);
 
 l.style.backgroundColor = 'gray';
 
}

delayIncrement += delay;

}
}

async function enterKeyListener(event){
event.preventDefault(); // Prevent form submission and page refresh
validWord();
if (curWord.length == 5 && await isValidWord(curWord)) {
document.querySelector(".error").style.display= "none";
console.log(curWord);
if (curWord === word) { // Check if the current word matches the target word
 console.log("Congratulations! You found the word.");
 setTimeout(function() {
document.querySelector(".correct img").style.display = "block";
const img = document.querySelector(".correct img");
img.classList.add('slide');

setTimeout(function() {
 document.querySelector(".correct img").style.display = "none";
}, 2000);
}, 1600);

}
curWord = '';
changeColors(curRow);
curRow++; 
if (curRow == 6 && curWord!=word){
 document.getElementById("word").innerHTML = "The Word Was: " + word;
 setTimeout(function() {
   document.querySelector(".incorrect").style.display = "block";
}, 1600);
}

}
else {
console.log(curWord);
validWord();
}
}

console.log(curWord);
const letterMapping = {
KeyQ: 'Q',
KeyW: 'W',
KeyE: 'E',
KeyR: 'R',
KeyT: 'T',
KeyY: 'Y',
KeyU: 'U',
KeyI: 'I',
KeyO: 'O',
KeyP: 'P',
KeyA: 'A',
KeyS: 'S',
KeyD: 'D',
KeyF: 'F',
KeyG: 'G',
KeyH: 'H',
KeyI: 'I',
KeyJ: 'J',
KeyK: 'K',
KeyL: 'L',
KeyZ: 'Z',
KeyX: 'X',
KeyC: 'C',
KeyV: 'V',
KeyB: 'B',
KeyN: 'N',
KeyM: 'M',
};

window.addEventListener("keydown", async function(event) {
if (event.code === "Enter") {
event.preventDefault(); // Prevent form submission and page refresh
validWord();
if (curWord.length == 5 && await isValidWord(curWord)) {
document.querySelector(".error").style.display= "none";
console.log(curWord);
if (curWord === word) { // Check if the current word matches the target word
 console.log("Congratulations! You found the word.");
 setTimeout(function() {
document.querySelector(".correct img").style.display = "block";
const img = document.querySelector(".correct img");
img.classList.add('slide');

setTimeout(function() {
 document.querySelector(".correct img").style.display = "none";
}, 2000);
}, 1600);

}
curWord = '';
changeColors(curRow);
curRow++; 
if (curRow == 6 && curWord!=word){
 document.getElementById("word").innerHTML = "The Word Was: " + word;
 setTimeout(function() {
   document.querySelector(".incorrect").style.display = "block";
}, 1600);
}

}
else {
console.log(curWord);
validWord();
}
} 
if (event.code === "Backspace") {
const currentBox = boxes[currentIndex - 1];
const currentCentered = currentBox.querySelector('.centered');
const letter = '';
const computedStyle = window.getComputedStyle(currentBox);
const backgroundColor = computedStyle.getPropertyValue('background-color');
const rgbValues = backgroundColor.match(/\d+/g); // Extract the RGB values

if (rgbValues[0] === '255' && rgbValues[1] === '255' && rgbValues[2] === '255' || currentIndex === 29) {
currentCentered.textContent = letter;
currentIndex = (currentIndex - 1 + boxes.length) % boxes.length; // Update currentIndex correctly
console.log(currentIndex % 5);
var updated = curWord.substring(0, currentIndex % 5);
curWord = updated;
valid = true;
}
}

else {
const letter = letterMapping[event.code];
if (letter) {
 const currentBox = boxes[currentIndex];
 const currentCentered = currentBox.querySelector('.centered');

 if (currentIndex < (curRow * 5 + 5)) {
   console.log(currentIndex);
 currentCentered.textContent = letter;
 curWord += letter;
 currentIndex = (currentIndex + 1) % boxes.length;
}
} 

}
});
