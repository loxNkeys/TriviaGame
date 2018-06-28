// $('h1').click(function(){
// 	alert('hi');
// });

// Timer
$('#startGame').on('click', function () {

var fragmentTime;

$('.timeout_message_show').hide();

var minutes = jQuery('span.minute').text();

var seconds = jQuery('span.second').text();

minutes = parseInt(minutes);
seconds = parseInt(seconds);

if (isNaN(minutes)) {
minutes = 00;
}
if (isNaN(seconds)) {
seconds = 00;
}

if (minutes == 60) {
minutes = 59;
}

if (seconds == 60) {
seconds = 59;
}

fragmentTime = (60 * minutes) + (seconds);

displayMinute = document.querySelector('span.minute');

displaySecond = document.querySelector('span.second');

startTimer(fragmentTime, displayMinute, displaySecond);
});

function startTimer(duration, displayMinute, displaySecond) {
var timer = duration,
displayMinute, displaySecond;
var timeIntervalID = setInterval(function () {
minutes = parseInt(timer / 60, 10)
seconds = parseInt(timer % 60, 10);
minutes = minutes < 10 ? "0" + minutes : minutes;
seconds = seconds < 10 ? "0" + seconds : seconds;
displayMinute.textContent = minutes;
displaySecond.textContent = seconds;

if (--timer < 0) {
timer = 0;
if (timer == 0) {
clearInterval(timeIntervalID);
alert(jQuery('.timeout_message_show').text());
      }
    }
  }, 1000);
}
// Game
$('#startGame').on('click', function () {
  const myQuestions = [
    {
      question: "Which car company made the Cougar?",
      answers: {
        a: "Chevrolet",
        b: "Dodge",
        c: "Ford"
      },
      correctAnswer: "c"
    },
    {
      question: "What pi?",
      answers: {
        a: "Delicious",
        b: "Eww! Gross! Cake all day!",
        c: "3.14...."
      },
      correctAnswer: "c"
    },
    {
      question: "Which is the best Star Wars character",
      answers: {
        a: "Jar-Jar",
        b: "An Ewok",
        c: "Darth Vader",
        d: "The one who loves Star Trek"
      },
      correctAnswer: "d"
    }
  ];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "lightgreen";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }
// Slide animations
  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // start quiz when timer starts
  $('#startGame').on('click', buildQuiz());
  // buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
});

