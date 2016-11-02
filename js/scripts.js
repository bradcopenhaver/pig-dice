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
    activePlayer();
  } else {
    turnTotal += rollResult;
  }
}

var newGame = function() {
  turnTotal = 0;
  player1.bank = 0;
  player2.bank = 0;
  currentPlayer = player1;
  updateBank();
}

var win = function(finalTurnTotal) {
  if (currentPlayer.bank + finalTurnTotal >= 10) {
    return true;
  }
}

/// UI

var activePlayer = function() {
  if (currentPlayer === player1) {
    $("#player1Working").addClass("currentPlayer");
    $("#player2Working").removeClass("currentPlayer");
  } else {
    $("#player2Working").addClass("currentPlayer");
    $("#player1Working").removeClass("currentPlayer");
  }
}

var updateBank = function() {
  $("#p1BankTotal").text(player1.bank);
  $("#p2BankTotal").text(player2.bank);
}

$(document).ready(function(){

  $("#startGame").click(function() {
    $(".nameEntry1").show();
    $("#startGame").hide();
    activePlayer();
  });

  $("#rollButton").click(function() {
    var rollResult = roll();
    $("#rollOutput").text(rollResult);
    var output = "&#x268" + (rollResult-1) + ";";
     $(".displayDice").html(output);
    checkDie(rollResult);
    $("#turnTotal").text(turnTotal);
    $("#currentPlayer").text(currentPlayer.name);
    if (win(turnTotal)) {
      $("#winner").show();
      $("#winner").text(currentPlayer.name + " Wins! Bank: " + currentPlayer.bank + " Current roll:" + turnTotal);
      $("#nextGame").show();
      $("#rollButton").hide();
      $("#bankButton").hide();
      $("#rollOutput").text("");
      $("#turnTotal").text("");
      $("#currentPlayer").text("");
    }
  });

  $("#nextGame").click(function(){
    newGame();
    $("#nextGame").hide();
    $(".nameEntry1").show();
    $("#winner").hide();
    $("#p1NameOutput").text("Player 1");
    $("#p2NameOutput").text("Player 2");
  });

  $("#bankButton").click(function() {
    currentPlayer.addToBank(turnTotal);
    turnTotal = 0;
    updateBank();
    switchPlayer();
    activePlayer();
    $("#rollOutput").text("");
    $("#turnTotal").text("");
    $("#currentPlayer").text(currentPlayer.name);
  });

  $("#p1NameSubmit").click(function(){
    var name = $("#p1Name").val();
    player1.addName(name);
    $("#p1NameOutput").text(player1.name);
    $(".nameEntry1").hide();
    $(".nameEntry2").show();
    $("#player2Working").addClass("currentPlayer");
    $("#player1Working").removeClass("currentPlayer");
  });

  $("#p2NameSubmit").click(function(){
    var name = $("#p2Name").val();
    player2.addName(name);
    $("#p2NameOutput").text(player2.name);
    $(".nameEntry2").hide();
    $("#player1Working").addClass("currentPlayer");
    $("#player2Working").removeClass("currentPlayer");
    $("#rollButton").show();
    $("#bankButton").show();
  });
});
