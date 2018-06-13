'use strict';

//variables
var PAPER = 'paper';
var ROCK = 'rock';
var SCISSORS = 'scissors';
var playerWin = 0;
var computerWin = 0;
var round = 0;
var numberRounds = 0;

//gets buttons by id

var buttonNewGame = document.getElementById('newGame');
var output = document.getElementById('output');
var paperButton = document.getElementById('button1');
var rockButton = document.getElementById('button2');
var scissorsButton = document.getElementById('button3');

//function creating move of the computer

var lottery = function() {
  var computerMove = Math.floor(Math.random() * 3) + 1;
  switch(computerMove) {
    case 1: return PAPER;
    case 2: return ROCK;
    case 3: return SCISSORS;
  }
}  




/*new game function, that enables buttons after they were disabled, prompting new window, 
checking the input and returning number of rounds player want to play */
 var newGame = function() {
  endGame();
  enabledButtons();
 numberRounds = window.prompt('How many rounds would you like to play? ', 'number');
  if (!numberRounds || isNaN(numberRounds)){
    output.innerHTML = 'Incorrect number. Please try again';  
  } else {
  roundsNumber.innerHTML = numberRounds;
  return numberRounds;
  }  
} 
// function reseting the statistics, and clenaing the results
 var endGame = function() {
  playerWin = 0;
  computerWin = 0;
  round = 0;
  numberRounds = 0;
  
  output.innerHTML = ('');
  rounds.innerHTML = ('');
  roundsNumber.innerHTML = ('');
} 
 
// function checking who won: computer or player, and tracking number of rounds 
function checkWinner(player, computer) {

  if (player === computer) {
    round +=1;
    return 'It\'s draw: you played '+player+' , computer played '+computer+' !<br><br>';
  
  } else if (
    player === PAPER && computer === ROCK ||
    player === ROCK && computer === SCISSORS ||
    player === SCISSORS && computer === PAPER
  ) {
    playerWin+=1;
    round+=1;
    return 'YOU WON: you played '+player+' , computer played '+computer+' !<br><br>';
  
  } else {
    computerWin+=1;
    round+=1;
    return 'YOU LOST: you played '+player+' , computer played '+computer+' !<br><br>';
  }
};

var checkRounds = function() {
  if (round == numberRounds ) {
    if (computerWin > playerWin) {
      output.innerHTML = 'YOU LOST! </br>';
    } else if (computerWin === playerWin) {
        output.innerHTML ='IT IS A DRAW! </br>';
    } else {
        output.innerHTML ='YOU WON! </br>';   
    }
    disabledButtons();
  }
};

//function disabling the buttons
  var disabledButtons = function(){
    paperButton.disabled = true; 
    rockButton.disabled = true; 
    scissorsButton.disabled = true;
  };
//function enabling the buttons
var enabledButtons = function(){
  paperButton.disabled = false; 
   rockButton.disabled = false; 
   scissorsButton.disabled = false;
  };

  // function inputing results to site
var checkResults = function() {
  rounds.innerHTML =  "Number of rounds " + round +'<br> Player winning '+ playerWin + '<br>Computer winning '+computerWin;
  checkRounds();
};

output.innerHTML = 'Click the button! If you want to start a game !' + '<br><br>' + output.innerHTML; 

 //buttons listeners for every playable button 
paperButton.addEventListener('click', function(){
  
  output.innerHTML = checkWinner(PAPER, lottery());
  checkResults();
  
}); 

rockButton.addEventListener('click', function(){
  output.innerHTML = checkWinner(ROCK, lottery());
  checkResults();
  
}); 
  
scissorsButton.addEventListener('click', function(){
  output.innerHTML = checkWinner(SCISSORS, lottery()); 
checkResults();  
}); 

//button listener initializing newGame function after cliking the button
  buttonNewGame.addEventListener('click', function(){
  disabledButtons();
  newGame();        
});