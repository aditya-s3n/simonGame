/*********************** create pattern ***********************/
var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
function nextSequence() {
    randomNum = Math.floor(Math.random() * 4);

    var newColor = buttonColors[randomNum];
    gamePattern.push(newColor);
    $("." + newColor).fadeOut(100).fadeIn(100);

    playSound(newColor);

    level++;
    $("#level-title").html("Level " + level);

}

/*********************** Restart Game ***********************/
function restartGame() {
    gamePattern = [];
    gameStarted = false;
    level = 0;
    userClickedPattern = [];
}

/*********************** Play Game ***********************/
var gameStarted = false;
var level = 0;
function checkAnswer(currentLevel) {
    var failed = false;

    if (userClickedPattern.length > currentLevel) {
        var failureSound = new Audio("sounds/wrong.mp3");
        failureSound.play();

        $("body").addClass("game-over");
        setTimeout(() => { $("body").removeClass("game-over"); }, 200);
        $("#level-title").html("Game Over, Press Any Button to Play Again");
        
        restartGame();

        failed = true;
    }
    else {
        for (var i = 0; i < userClickedPattern.length; i++) {
            if (userClickedPattern[i] === gamePattern[i]) {
                console.log("success");
            }
            else {
                var failureSound = new Audio("sounds/wrong.mp3");
                failureSound.play();

                $("body").addClass("game-over");
                setTimeout(() => { $("body").removeClass("game-over"); }, 200);
                $("#level-title").html("Game Over, Press Any Button to Play Again");

                restartGame();

                failed = true;
            }
        }

        if (failed === false && !(userClickedPattern.length < currentLevel)) {
            setTimeout(function() { 
                nextSequence();
                userClickedPattern = []; 
            }, 1000);
        }
    }
}


/*********************** keydown activations ***********************/
//target document
$(document).on("keydown", function () {
    if (gameStarted === false) {
        nextSequence();
        gameStarted = true;
    }
    
    
});


/*********************** button onclicks ***********************/
var userClickedPattern = [];
$(".btn").on("click", function() {
    if ($(this).hasClass("green")) {
        userClickedPattern.push("green");
        playSound("green");
        animatePress("green");
    }
    else if ($(this).hasClass("red")) {
        userClickedPattern.push("red");
        playSound("red");
        animatePress("red");
    }
    else if ($(this).hasClass("yellow")) {
        userClickedPattern.push("yellow");
        playSound("yellow");
        animatePress("yellow");
    }
    else if ($(this).hasClass("blue")) {
        userClickedPattern.push("blue");
        playSound("blue");
        animatePress("blue");
    }

    checkAnswer(level);
    
});

/*********************** Miscellaneous Functions for Effiency  ***********************/
//Sound
function playSound(color) {
    var newSound = new Audio("sounds/" + color + ".mp3");
    newSound.play();
}

//Button Pressed Animation
function animatePress(color) {
    $("." + color).addClass("pressed");

    setTimeout(function () {
        $("." + color).removeClass("pressed");
    }, 100);
}