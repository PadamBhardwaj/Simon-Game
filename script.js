var buttonColours = ["red", "blue", "green", "yellow"]
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});
$(".btn2").click(function () {
    if (!started) {
        $("#level-title").text("level "+level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function () {
    var chosenColour = $(this).attr("id");
    userClickedPattern.push(chosenColour);
    playSound(chosenColour);
    anim("." + chosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function nextSequence() {
    level++;
    $("#level-title").text("level " + level);
    var randomnum = Math.random();
    randomnum = randomnum * 4;
    randomnum = Math.floor(randomnum);
    var randomColour = buttonColours[randomnum];

    gamePattern.push(randomColour);
    $("#" + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColour);
}
function playSound(name) {
    var gameAudio = new Audio("sounds/" + name + ".mp3")

    gameAudio.play();
}

function anim(name) {
    $(name).addClass("pressed");
    setTimeout(function () {
        $(name).removeClass("pressed");
    }, 50);
}
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            console.log("success");
            setTimeout(function () {
                nextSequence();
              }, 1000);
            userClickedPattern=[];
        }
    }
    else{
        console.log("wrong");
        var wrongSound=new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        
        $("h1").text("Game Over, Press any key to restart");
        startOver();
    }
}
function startOver(){
    started=false;
    level=0;
    gamePattern=[];
    userClickedPattern=[];
}