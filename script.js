// Quiz questions and answers
const questions = [
    {
      question: "Inside which HTML element do we put the JavaScript?",
      choices: ["<script>", "<js>", "<javascript>", "<scripting>"],
      answer: "<script>"
    },
    {
      question: "Which of the following methods can be used to display data in some form using Javascript?",
      choices: ["document.write()", "console.log()", "window.alert()", "All of above"],
      answer: "All of above"
    },
    {
      question: "Arrays in Javascript can be used to store _____",
      choices: ["Numbers & strings", "Other Arrays", "Booleans", "All of the above"],
      answer: "Booleans"
    },
    {
      question: "What is the correct syntax to declare a function in JavaScript?",
      choices: ["function myFunction()", "func myFunction()", "myFunction = function()", "function myFunction()"],
      answer: "function myFunction()"
    },
    {
      question: "What is the result of the following expression: 10 + '5'?",
      choices: ["15", "105", "'10' + '5'", "'105'"],
      answer: "'105'"
    }
  ];
  
  const startButton = document.getElementById("start");
  const quizContainer = document.getElementById("quiz");
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const timerElement = document.getElementById("time");
  const gameOverContainer = document.getElementById("game-over");
  const initialsInput = document.getElementById("initials");
  const saveButton = document.getElementById("save");
  const scoreboard = document.getElementById("scoreboard");
  
  let currentQuestionIndex = 0;
  let time = 60;
  let score = 0;
  let timerInterval;
  
  // Function to start the quiz
  function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    timerInterval = setInterval(updateTimer, 1000);
  
    showQuestion();
  }
  
  // Function to show a question
  function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
  
    choicesElement.innerHTML = "";
  
    for (let i = 0; i < question.choices.length; i++) {
      const choice = question.choices[i];
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = choice;
      li.appendChild(button);
      choicesElement.appendChild(li);
      button.addEventListener("click", checkAnswer);
    }
  }
  
  // Function to check the selected answer
  function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const question = questions[currentQuestionIndex];
  
    if (selectedAnswer === question.answer) {
      // Correct answer
      score += 10;
    } else {
      // Wrong answer - Deduct 15 seconds
      time -= 15;
      if (time < 0) {
        time = 0;
      }
    }
  
    currentQuestionIndex++;
    showNextQuestion();
  }
  // Function to show the feedback for the selected answer
  function showAnswerFeedback(isCorrect) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.style.display = "block";
    feedbackElement.textContent = isCorrect ? "Correct!" : "Wrong!";
    feedbackElement.className = isCorrect ? "correct" : "wrong";
}
  
  // Function to show the next question or end the game
  function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      endGame();
    }
  }
  
  // Function to end the game
  function endGame() {
    clearInterval(timerInterval);
  
    quizContainer.style.display = "none";
    gameOverContainer.style.display = "block";
  
    scoreboard.textContent = `Your score: ${score}`;
  
    saveButton.addEventListener("click", saveScore);
  }
  
  // Function to save the score
  function saveScore() {
    const initials = initialsInput.value;
  
    // TODO: Save the initials and score to storage or perform any desired action
  
    alert(`Score saved: ${initials}  ${score}`);
  }
  
  // Function to update the timer
  function updateTimer() {
    time--;
    timerElement.textContent = time;
  
    if (time <= 0) {
      endGame();
    }
  }
  
  // Event listener for the start button
  startButton.addEventListener("click", startQuiz);