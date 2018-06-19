var numQuestions = questions.length;
var currentQuestion = -1;
var startingTime = 45;
var timeLeft = 45;
var currentAnswer;
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;
var finalScore;
    
$(document).ready(function() {
    
    
    $("#startingTime").text(startingTime);
    var countdownTimer = setInterval(updateTime, 1000);
    function updateTime() {
        timeLeft--;
        $("#countdownTimer").text(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            setInterval(function() {
                alert("Time's Up!");
            }, 100);
        }
    }
    
    $("#numQuestions").text(numQuestions);
        
    $("#start").click(function(){
        $("#gameStartScreen").addClass("d-none");
        $("#questionScreen").removeClass("d-none");
        nextQuestion();
    });
   
    $(".possibleAnswers").click(function() {
        clearInterval(countdownTimer);
        $("#countdownTimer").addClass("d-none");
        $("#nextQuestion").removeClass("d-none"); 
        currentAnswer = $(this).text();
        questionResult();
    });
   
    $("#nextQuestion").click(function() { 
        $("#nextQuestion").addClass("d-none");
        nextQuestion();
    })
    
    function nextQuestion() {
    
        $("#countdownTimer").removeClass("d-none");
        timeLeft = startingTime;
    
    
        $(".possibleAnswers").each(function () {
            $(this).removeClass("btn-danger");
            $(this).removeClass("btn-success");
        });
    
      
        $("#questionResult").addClass("d-none");
            
        currentQuestion++;
        currentAnswer = null;
        if (currentQuestion < questions.length) {
            $(".currentQuestion").text(questions[currentQuestion].question);
            $(".possibleAnswers").each(function(index) {
                $(this).text(questions[currentQuestion].distractors[index]);
            });
        } else {
            gameResults();
        }
    };
    
    function questionResult() {
            if (currentAnswer === questions[currentQuestion].correctAnswer) {
                numCorrect++;
            } else if (currentAnswer === null) {
                numUnanswered++;
            } else {
                numIncorrect++;
            }
    
            $(".possibleAnswers").each(function(index) {
                if ($(this).text() === questions[currentQuestion].correctAnswer) {
                    $(this).addClass("btn-success");
                } else if ($(this).text() === currentAnswer) {
                    $(this).addClass("btn-danger");
                }
            });
        
            $("#questionResult").removeClass("d-none");
        };
    
        function gameResults() {
            $("#questionScreen").addClass("d-none");
            finalScore = Math.floor((numCorrect / (numIncorrect + numUnanswered + numCorrect))*100);
            $("#finalScore").text(finalScore);
            $("#numCorrect").text(numCorrect);
            $("#numIncorrect").text(numIncorrect);
            $("#numUnanswered").text(numUnanswered);
            $("#gameOverScreen").removeClass("d-none");
        };
         document.getElementById("reset").onclick = function() {}
    });

