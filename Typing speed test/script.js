const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const typingSpeedDiv = document.querySelector(".wordspermin")

var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false; // timerRunning is required to make sure multiple timers dont get triggered

// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time){
    if (time <= 9){
      time = "0" + time;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
function runTimer(){
  let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2])
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor((timer[3]/100)/60); //timer[0] is mins. timer[3] is 1000th of a second
  timer[1] = Math.floor((timer[3]/100) - (timer[0]*60)); // timer[1] is secs.
  timer[2] = Math.floor(timer[3] - (timer[1]*100)  - (timer[0] * 6000)); // timer[2] is 100th of a sec
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.innerHTML.substring(0, textEntered.length);

  if (textEntered == originText.innerHTML){
    clearInterval(interval);
    testWrapper.style.borderColor = "#429890";
    typingSpeed(textEntered.split(" ").length, timer[3]);
  }else{
    if (textEntered == originTextMatch){
      testWrapper.style.borderColor = "#65CCF3";
    }else{
      testWrapper.style.borderColor = "#E95D0F";
    }
  }
  //console.log(textEntered);
}


// Start the timer:
function start(){
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning){
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
  console.log(textEnteredLength);
}


// Reset everything:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
}

//Typing speed
function typingSpeed(totalWords, totalTime){
    let min = (totalTime/100)/60;
    console.log(min);
    console.log(totalWords);
    let wordsPerMin = Math.floor(totalWords/min);
    typingSpeedDiv.innerHTML = "Typing Speed: " + wordsPerMin + " words/min";
    typingSpeedDiv.style.visibility = "visible";

}

//Randomly selecting a snippet to type when page is reloaded or reset button is clicked
function chooseSnippetToType(){
  snippets = ["Home is behind, the world ahead, and there are many paths to tread through shadows to the edge of night, until the stars are all alight", "Some who have read the book, or at any rate have reviewed it, have found it boring, absurd, or contemptible, and I have no cause to complain, since I have similar opinions of their works, or of the kinds of writing that they evidently prefer.", "I am old, Gandalf. I don't look it, but I am beginning to feel it in my heart of hearts.Well-preserved indeed! Why, I feel all thin, sort of stretched, if you know what I mean: like butter that has been scraped over too much bread. That can't be right. I need a change, or something.", "Pay heed to the tales of old wives. It may well be that they alone keep in memory what it was once needful for the wise to know."]
  originText.innerHTML = snippets[Math.floor(Math.random()*snippets.length)];
  console.log(originText.innerHTML);

}

// Event listeners for keyboard input and the reset button:
onload = chooseSnippetToType();
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
resetButton.addEventListener("click", chooseSnippetToType, false);
