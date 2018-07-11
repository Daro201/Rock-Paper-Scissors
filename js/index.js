'use strict';

//variables
var params = { 
PAPER: 'paper',
ROCK: 'rock',
SCISSORS: 'scissors',
playerWin: 0,
computerWin: 0,
round: 0,
numberRounds: 0,
progress: []
}


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
    	case 1: return params.PAPER;
    	case 2: return params.ROCK;
    	case 3: return params.SCISSORS;
  	}
};  

//function adding show class and removing it 
var showModal = function(choice) {
    document.querySelector('#'+ choice).classList.add('show');
    buildTable(choice);
};

var hideModal = function(choice) {
    document.querySelector(choice).classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal');

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', function(event) {
        hideModal('#' + event.currentTarget.className.split(' ')[1]);
    });
}


/*new game function, that enables buttons after they were disabled, prompting new window, 
checking the input and returning number of rounds player want to play */
var newGame = function() {
	endGame();
	enabledButtons();
	params.numberRounds = window.prompt('How many rounds would you like to play? ', 'number');
	if (!params.numberRounds || isNaN(params.numberRounds)){
    	output.innerHTML = 'Incorrect number. Please try again';  
  	} else {
  		roundsNumber.innerHTML = params.numberRounds;
  		return params.numberRounds;
  	}  
};


var buildTable = function(choice) {
  var table = document.querySelector('#body-'+ choice);
  params.progress.forEach(function(progressResult) {
    var row = document.createElement('tr');
    table.appendChild(row);
    for (var key in progressResult) {
      tableCell(progressResult[key], row);
    }
  })
};

// this function build td in table
var tableCell = function(value, row) {
    var td = document.createElement('td');
    td.innerHTML = value;
    row.appendChild(td);

};


// function reseting the statistics, and clenaing the results
 var endGame = function() {
  params.playerWin = 0;
  params.computerWin = 0;
  params.round = 0;
  params.numberRounds = 0;
  
  params.progress = [];
  output.innerHTML = ('');
  rounds.innerHTML = ('');
  roundsNumber.innerHTML = ('');
} 
 
// function checking who won: computer or player, and tracking number of rounds 
function checkWinner(player, computer) {
  if (player === computer) {
    params.round +=1;
    return 'It\'s draw: you played '+player+' , computer played '+computer+' !<br><br>';
  } else if (
    player === params.PAPER && computer === params.ROCK ||
    player === params.ROCK && computer === params.SCISSORS ||
    player === params.SCISSORS && computer === params.PAPER
  ) {
    params.playerWin+=1;
    params.round+=1;
    return 'YOU WON: you played '+player+' , computer played '+computer+' !<br><br>';
  } else {
    params.computerWin+=1;
    params.round+=1;
    return 'YOU LOST: you played '+player+' , computer played '+computer+' !<br><br>';
  }
};
// function showing the final result
var checkRounds = function() {
     if (params.round == params.numberRounds) {
        if (params.computerWin === params.playerWin) { 
            showModal('draw');
        } else if (params.computerWin < params.playerWin) {
            showModal('win');
        } else {
            showModal('lost');
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
  rounds.innerHTML =  "Number of rounds " + params.round +'<br> Player winning '+ params.playerWin + '<br>Computer winning '+ params.computerWin;
  checkRounds();

};

output.innerHTML = 'Click the button! If you want to start a game !' + '<br><br>' + output.innerHTML; 

//function listenging to the buttons  
var buttons = document.getElementsByClassName('player-move');
	for (var i=0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', function(){
		var attribute = this.getAttribute("data-move");
		output.innerHTML = checkWinner(attribute, lottery());
	
    params.progress.push({
      gameRounds: params.round,
      gamePlayerMove: attribute,
      gameComputerMove: lottery(),
      finalResult: params.playerWin + ' - ' + params.computerWin

    });
    checkResults();
	})
}
 
disabledButtons();

//button listener initializing newGame function after cliking the button
  buttonNewGame.addEventListener('click', function(){
  newGame();        
});
 


