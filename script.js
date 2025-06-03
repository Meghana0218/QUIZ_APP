const questions = {
  HTML: [
    { q: "What does HTML stand for?", o: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyperlink Text Markup Language"], a: 1 },
    { q: "Which tag is used to create a hyperlink?", o: ["<a>", "<link>", "<href>", "<url>"], a: 0 }
  ],
  CSS: [
    { q: "What does CSS stand for?", o: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], a: 2 },
    { q: "Which property is used to change text color?", o: ["font-color", "color", "text-color", "style"], a: 1 }
  ],
  JavaScript: [
    { q: "What is used to declare a variable in JavaScript?", o: ["var", "let", "const", "All of the above"], a: 3 },
    { q: "What will `typeof []` return?", o: ["object", "array", "list", "undefined"], a: 0 }
  ]
};

let currentQuestion = 0;
let score = 0;
let quizData = [];
let timerInterval;

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);

function startQuiz() {
  const selected = document.getElementById("topic").value;
  const custom = document.getElementById("customTopic").value.trim();
  const numQuestions = parseInt(document.getElementById("numQuestions").value) || 2;
  const timeLimit = parseInt(document.getElementById("timerInput").value) || 60;

  const topicKey = custom || selected;
  if (!questions[topicKey]) {
    alert("No questions found for that topic.");
    return;
  }

  quizData = questions[topicKey].slice(0, numQuestions);
  currentQuestion = 0;
  score = 0;

  document.getElementById("settings").classList.add("hidden");
  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("score-box").classList.add("hidden");

  startTimer(timeLimit);
  showQuestion();
}

function startTimer(seconds) {
  let timeLeft = seconds;
  document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;

  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question").textContent = q.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.o.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectOption(btn, i);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("notes").value = "";
  document.getElementById("nextBtn").style.display = "none";
}

function selectOption(button, index) {
  const correctIndex = quizData[currentQuestion].a;
  const buttons = document.querySelectorAll("#options button");
  buttons.forEach(btn => btn.disabled = true);

  if (index === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("quiz-box").classList.add("hidden");
  const scoreBox = document.getElementById("score-box");
  scoreBox.classList.remove("hidden");
  scoreBox.innerHTML = `You scored ${score} out of ${quizData.length}. <br><br><button onclick="location.reload()">Play Again</button>`;
}



