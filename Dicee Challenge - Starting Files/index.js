

function randNumGenerator() {
  var randomNumber1 = 0;

  while (randomNumber1 < 1 || randomNumber1> 6 ){
    newRandomNumber = Math.floor(Math.random()*10) +1;
    randomNumber1 = newRandomNumber;
  }

  return randomNumber1;
}
var player1 = Math.floor(Math.random()*6) +1;
var player2 = Math.floor(Math.random()*6) +1;

function randNumGenerator2() {
  var randomNumber2 = 0;

  while (randomNumber2 < 1 || randomNumber2> 6 ){
    newRandomNumber = Math.floor(Math.random()*10) +1;
    randomNumber2 = newRandomNumber;
  }

  return randomNumber2;
}

document.querySelector(".img1").setAttribute("src", "images/dice"+player1+ ".png");
document.querySelector(".img2").setAttribute("src", "images/dice"+player2+ ".png");



if(player1 === player2){

  document.querySelector("h1").innerText="Draw!";
}
else if (player1 > player2) {

  document.querySelector("h1").innerText="Player1 Won!";

}
else {document.querySelector("h1").innerText="Player2 Won!";}
