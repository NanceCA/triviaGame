//pseudocode
//player selects begin and questions load from object
//timer begins as a displayed to the DOM
//user answers questions, only one question can be answered
// if time is not run out then do not calculate scores, if timer has run out, calculate scores
//reset game


// Listening events 

$(document).on("click", "#start", function () {
    game.start();
});

$(document).on("click", "#done", function () {
    game.done();
});

var quizHolder = $("#quiz-area");

// objects to hold questions
var questions = [
    {
        question: "Who headlined at Coachella this year?",
        answers: ["Ariana Grande", "Kid Cudi", "Chris Lake"],
        correctAnswer: "Ariana Grande"
    },
    {
        question: "Which of the below is not a programming language?",
        answers: ["Python", "Node", "C++"],
        correctAnswer: "Node"
    }
];

// setInterval
var timer;

var game = {
    correct: 0,
    incorrect: 0,
    counter: 100,

    countdown: function () {
        game.counter--;
        $("#counter-number").html(game.counter);

        if (game.counter === 0) {
            console.log("Time is up");
            //sending to game is over function
            game.done();
        }
    },

    start: function () {
        timer = setInterval(game.countdown, 1100);

        $("#sub-wrapper").append(
            "<h2>Time Remaining: <span id='counter-number'>100</span> Seconds</h2>"
        );

        $("#start").remove();

        for (var i = 0; i < questions.length; i++) {
            quizHolder.append("<h2>" + questions[i].question + "</h2>");
            for (var k = 0; k < questions[i].answers.length; k++) {
                quizHolder.append("<input type='button' name='question-" + i +
                    "' value='" + questions[i].answers[k] + "''>" + questions[i].answers[k]);
            }
        }

        quizHolder.append("<button id='done'>Submit</button>");
    },


    //leveraged online playform for code, still trying to figure out a better way
    done: function () {
        var inputs = quizHolder.children("input:checked");
        for (var i = 0; i < inputs.length; i++) {
            if ($(inputs[i]).val() === questions[i].correctAnswer) { //.val method returns the user input value
                game.correct++; //increasing correct scores by one
            } else {
                game.incorrect++; //increasing incorrect scores by one
            }
        }
        this.result();
    },

    result: function () {
        clearInterval(timer);

        $("#sub-wrapper h2").remove();

        quizHolder.html("<h2>You're done!</h2>");
        quizHolder.append("<h3>Correct: " + game.correct + "</h3>");
        quizHolder.append("<h3>Incorrect: " + game.incorrect + "</h3>");
    }
};


