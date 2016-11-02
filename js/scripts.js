function Player(name){
  this.bank = 0;
  this.name = name;
}
Player.prototype.addToBank = function(total) {
  this.bank += total;
}
Player.prototype.addName = function(name) {
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

var newGame = function() {
  turnTotal = 0;
  player1.bank = 0;
  player2.bank = 0;
  currentPlayer= player1;
  updateBank();
}

var win = function(finalTurnTotal) {
  if (currentPlayer.bank + finalTurnTotal >= 15) {
    var winner = currentPlayer.name;
    newGame();
    return winner + " Wins!";
  }
}



var updateBank = function() {
  $("#p1BankTotal").text(player1.bank);
  $("#p2BankTotal").text(player2.bank);
}

$(document).ready(function(){


  $("#rollButton").click(function() {
    var rollResult = roll();
    $("#rollOutput").text(rollResult);
    checkDie(rollResult);
    $("#turnTotal").text(turnTotal);
    $("#currentPlayer").text(currentPlayer.name);
    $("#winner").text(win(turnTotal));
  });

  $("#bankButton").click(function() {
    currentPlayer.addToBank(turnTotal);
    turnTotal = 0;
    updateBank();
    switchPlayer();
    $("#currentPlayer").text(currentPlayer.name);
  });

  $("#p1NameSubmit").click(function(){
    var name = $("#p1Name").val();
    player1.addName(name);
    $("#p1NameOutput").text(player1.name);
  })
});
