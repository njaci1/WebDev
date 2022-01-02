var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var randomChosenColour = buttonColours[nextSequence()];

gamePattern.push(randomChosenColour);

var selectedButton = $("#" + randomChosenColour);

function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  return randomNumber;
}
console.log(randomChosenColour);
console.log(selectedButton);

$(selectedButton).fadeIn(100).fadeOut(100).fadeIn(100, makeSound(randomChosenColour));

$(selectedButton).on("click", function(){$(selectedButton).fadeOut(100).fadeIn(100)});
$(selectedButton).on("click", function(){
  var audio = new Audio("sounds/"+randomChosenColour +".mp3");
  audio.play();
});

function makeSound(randomChosenColour){

  var audio = new Audio("sounds/"+randomChosenColour +".mp3");
  audio.play();
}
