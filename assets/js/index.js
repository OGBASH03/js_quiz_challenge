//VARIABLES WERE CREATED AND USED DOCUEMNT QUERRYSELECOR (ID)
var head = document.getElementById("head");
var intro = document.getElementById("introduction");
var questions = document.getElementById("question");
var startBtn = document.getElementById("start-quiz");
var finalScore = document.getElementById("finalscore");
var userScore = document.getElementById("playerscore")
var scores = document.getElementById("scores");
var hiScores = document.getElementById("highscores");
var time = document.getElementById("time");
var clock = document.getElementById("clock");
//QUESTIONS FOR QUIZ
var questionArray = [{
    question: "Which of the following is NOT a data type in JavaScript?",
    choices: ["Number", "String", "Boolean", "Character"],
    solution: "Character"
 },
 {
    question: "What is the purpose of the 'return' statement in JavaScript?",
    choices: ["To end a loop", "To define a new function", "To output a value from a function", "To declare a variable"],
    solution: "To output a value from a function"
 },
 {
    question: "Which of the following is an example of a JavaScript event?",
    choices: ["Clicking a button on a webpage", "Inserting data into a database", "Running a query on a database", "Writing to a file"],
    solution: "Clicking a button on a webpage"
 },
 {
    question: "Which of the following is NOT a comparison operator in JavaScript?",
    choices: ["==", "!=", "<=", "><"],
    solution: "><"
 },
 {
    question: "Which of the following is the correct way to declare a variable in JavaScript?",
    choices: ["var myVariable = 'hello';", "myVariable = 'hello';", "let myVariable = 'hello';", "const myVariable = 'hello';"],
    solution: "let myVariable = 'hello';"
}]
// THIS FUNCTION MAKES AN ARRAY THAT IS THE USER'S SCORE THAT GETS STINGIFIED
var scoresArray = JSON.parse(localStorage.getItem("highscore")) || [];
var user = document.getElementById("user");
var winners = document.getElementById("winners")
// VARIABLE STARTS THE TIMER VALUE
var timeRemaining = questionArray.length * 15;
var clockId;
// THIS FUNCTION ALLOWS THE QUIZ AND THE TIMER TO START
startButtom.addEventListener("click", function () {
    intro.classList.add("hide");
    questions.classList.remove("hide");
    clockId = setInterval(startTimer, 1000)
    displayQuestion();
})

var index = 0
// THIS FUNCTION IS IN CHRAGE OF MAKING THE QUESTIONS DISPLAY IN THE WINDOW
function displayQuestion() {
   questions.innerHTML = `
   <h2>${questionArray[index].question}</h2>
   <ol>
       <li><button class="btn btn-secondary">${questionArray[index].choices[0]}</button></li>
       <li><button class="btn btn-secondary">${questionArray[index].choices[1]}</button></li>
       <li><button class="btn btn-secondary">${questionArray[index].choices[2]}</button></li>
       <li><button class="btn btn-secondary">${questionArray[index].choices[3]}</button></li>
   </ol>
   `
   var li = document.querySelectorAll(".btn-secondary");
   for (i = 0; i < li.length; i++) {


       li[i].addEventListener('keypress', function (event) {
           if (event.key === "Enter") {
               event.preventDefault();


           }
       })


       li[i].addEventListener("click", nextQuestion);






    }
}






// THIS FUNCTION CHECKS FOR RIGHT ANSWERS AND IF THE ANSWER IS COREECT IT JUMPS TO NEXT
function nextQuestion() {
   console.log(this.textContent);


   if (questionArray[index].solution === this.textContent) {
       var correctAnswer = document.createElement("p");
       correctAnswer.textContent = "Correct!";
       const underLine = document.createElement("hr");
       correctAnswer.appendChild(underLine);
       questions.appendChild(correctAnswer);
   }
   else {
       var incorrectAnswer = document.createElement("p");
       incorrectAnswer.textContent = "Incorrect!";
       const underLine = document.createElement("hr");
       incorrectAnswer.appendChild(underLine)
       questions.appendChild(incorrectAnswer);


       timeRemaining = timeRemaining - 10
   }
   setTimeout(() => {
       index++
// THIS CHECKS FOR THE TIMER AND STOPS IT ONLY IF QUIZ IS DONE
if (index >= questionArray.length) {
    scores.classList.remove("hide");
    questions.classList.add("hide");
    clearInterval(clockId)
    finalScore.textContent = clock.textContent


}
else {
    displayQuestion();
}


}, 1000)




}
function startTimer() {
// FUNCTION RECIEVES THE TIME REM AND SETS IT AS THE SCORE
if (timeRemaining === 0) {
scores.classList.remove("hide");
questions.classList.add("hide");
clearInterval(clockId)
finalScore.textContent = clock.textContent
}
clock.textContent = timeRemaining--
}


// FUNCTION STAVES THE HISCORE IN LOCAL STORAGE
playerScore.addEventListener("click", function () {
scoresArray.push(user.value + "-" + clock.textContent);
localStorage.setItem("highscore", JSON.stringify(scoresArray));
scores.classList.add("hide");
head.classList.add("hide");
hiScores.classList.remove("hide");        
winners.innerHTML = "";
for (var i = 0; i < scoresArray.length; i++) {
var li = document.createElement("li");
li.textContent = scoresArray[i];
winners.appendChild(li);
}
})


var backButton = document.getElementById("back");
var clearScores = document.getElementById("clear");


//FUNCTION IS TO START OVER THE QUIZ
backButton.addEventListener("click", function () {
    location.reload();
 })
 
 
 //FUNCTION CLEARS THE HISCORES
 clearScores.addEventListener("click", function () {
    localStorage.setItem("highscore", JSON.stringify([]))
    winners.innerHTML = "";
 
 
 })
 
 
 var checkScores = document.getElementById("checkScores");
 
 
 //FUNCTION CHECKS THE PREVIOUS SCORES
 checkScores.addEventListener("click", function () {
    intro.classList.add("hide");
    questions.classList.add("hide");
    scores.classList.add("hide");
    head.classList.add("hide");
    hiScores.classList.remove("hide");
    winners.innerHTML = "";
    for (var i = 0; i < scoresArray.length; i++) {
        var li = document.createElement("li");
        li.textContent = scoresArray[i];
        winners.appendChild(li);
    }
 }) 