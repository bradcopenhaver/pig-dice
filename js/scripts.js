function Player(name){
  this.bank = 0;
  this.name = name;
}

var roll = function() {
  var die = Math.floor((Math.random()*6)+1);
  return die;
}

var switchPlayer = function() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
}

var player1 = new Player("Player 1");
var player2 = new Player("Player 2");
var currentPlayer = player1;

var turnTotal = 0;
var bank = 0;

var checkDie = function(rollResult) {
  if (rollResult === 1) {
    turnTotal = 0;
    switchPlayer();
  } else {
    turnTotal += rollResult;
  }
}


$(document).ready(function(){


  $("#rollButton").click(function() {
    var rollResult = roll();
    $("#rollOutput").text(rollResult);
    checkDie(rollResult);
    $("#turnTotal").text(turnTotal);
    $("#currentPlayer").text(currentPlayer.name);
  });

  $("#bankButton").click(function() {
    currentPlayer.bank += turnTotal;
    turnTotal = 0;
    $("#p1BankTotal").text(player1.bank);
    $("#p2BankTotal").text(player2.bank);
    switchPlayer();
    $("#currentPlayer").text(currentPlayer.name);
  });


});
