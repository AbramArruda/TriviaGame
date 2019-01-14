var panel = $("#quiz-area");
var countStartNumber = 30;

// Question set
var questions = [
  {
    question: "What is the most common element in the human body?",
    answers: ["Carbon", "Hydrogen", "Oxygen", "Calcium"],
    correctAnswer: "Oxygen",
    image: "https://media.giphy.com/media/xT9IgmI3DZkt15qgWk/giphy.gif"
  },
  {
    question:
      "What is the scientific term for the production of light by living organisms?",
    answers: [
      "Synergy",
      "Bioluminescence",
      "Photosynthesis",
      "Luminary Effervescence"
    ],
    correctAnswer: "Bioluminescence",
    image: "assets/images/spicegirls.gif"
  },
  {
    question: "Unlike most other fish, sharks have no _____?",
    answers: ["Liver", "Gills", "Heart", "Bones"],
    correctAnswer: "Bones",
    image: "assets/images/bulls.gif"
  },
  {
    question: "What human organ cleans 50 gallons of blood a day?",
    answers: ["Kidneys", "Liver", "Heart", "Pancreas"],
    correctAnswer: "Kidneys",
    image: "assets/images/nirvanabark.gif"
  },
  {
    question:
      "What illness accounted for 40 percent of U. S. military casualties during World War I?",
    answers: ["Smallpox", "Influenza", "Syphilis", "Gangrene"],
    correctAnswer: "Influenza",
    image: "assets/images/lionking.gif"
  },
  {
    question: "What living animal has the heaviest brain",
    answers: [
      "Blue Whale",
      "Black Rhinoceros",
      "Sperm Whale",
      "African Bush Elephant"
    ],
    correctAnswer: "Sperm Whale",
    image: "assets/images/fresh.gif"
  },
  {
    question: " What was the first genetically engineered organism?",
    answers: ["Sheep", "Corn", "Tobacco", "Rat"],
    correctAnswer: "Tobacco",
    image: "assets/images/skeeter.gif"
  },
  {
    question: "Which of the following has more bones?",
    answers: ["Baby", "Teenager", "Adult", "All are the same"],
    correctAnswer: "Baby",
    image: "assets/images/belding.gif"
  }
];

// Variable to hold our setInterval
var timer;

var game = {
  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    this.counter--;
    $("#counter-number").text(this.counter);
    if (this.counter === 0) {
      console.log("TIME UP");
      this.timeUp();
    }
  },

  loadQuestion: function() {
    timer = setInterval(this.countdown.bind(this), 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append(
        "<button class='answer-button' id='button' data-name='" +
          questions[this.currentQuestion].answers[i] +
          "'>" +
          questions[this.currentQuestion].answers[i] +
          "</button>"
      );
    }
  },

  nextQuestion: function() {
    this.counter = window.countStartNumber;
    $("#counter-number").text(this.counter);
    this.currentQuestion++;
    this.loadQuestion.bind(this)();
  },

  timeUp: function() {
    clearInterval(window.timer);

    $("#counter-number").text(this.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append(
      "<h3>The Correct Answer was: " +
        questions[this.currentQuestion].correctAnswer
    );
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results, 3 * 1000);
    } else {
      setTimeout(this.nextQuestion, 3 * 1000);
    }
  },

  results: function() {
    clearInterval(window.timer);

    panel.html("<h2>All done, heres how you did!</h2>");

    $("#counter-number").text(this.counter);

    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append(
      "<h3>Unanswered: " +
        (questions.length - (this.incorrect + this.correct)) +
        "</h3>"
    );
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(window.timer);
    if (
      $(e.target).attr("data-name") ===
      questions[this.currentQuestion].correctAnswer
    ) {
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {
    this.incorrect++;

    clearInterval(window.timer);

    panel.html("<h2>Nope!</h2>");
    panel.append(
      "<h3>The Correct Answer was: " +
        questions[this.currentQuestion].correctAnswer +
        "</h3>"
    );
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    } else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  answeredCorrectly: function() {
    clearInterval(window.timer);

    this.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (this.currentQuestion === questions.length - 1) {
      setTimeout(this.results.bind(this), 3 * 1000);
    } else {
      setTimeout(this.nextQuestion.bind(this), 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", game.reset.bind(game));

$(document).on("click", ".answer-button", function(e) {
  game.clicked.bind(game, e)();
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend(
    "<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>"
  );
  game.loadQuestion.bind(game)();
});
