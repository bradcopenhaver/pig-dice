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
var roll = function(dice) {
  var die=[];
  for(var i=0; i<dice; i++)
  die.push(Math.floor((Math.random()*6)+1));
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

var checkDie = function(rollResult) {
  var die1 = rollResult[0];
  var die2 = rollResult[1];
  if (die2) {
    if (die1 === 1 && die2 === 1){
      currentPlayer.bank=0;
      turnTotal = 0;
      switchPlayer();
      activePlayer();
      updateBank();
    } else if (die1 === 1 || die2 === 1){
      turnTotal = 0;
      switchPlayer();
      activePlayer();
    } else  {
      turnTotal += (die1 + die2);
    }
  } else {
    if (die1 === 1) {
    turnTotal = 0;
    switchPlayer();
    activePlayer();
  } else {
    turnTotal += die1;
    }
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
  if (currentPlayer.bank + finalTurnTotal >= 100) {
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
    newGame();
    $("#gameStart").hide();
    $(".nameEntry1").show();
    $("#winner").hide();
    $("#p1NameOutput").text("Player 1");
    $("#p2NameOutput").text("Player 2");
    activePlayer();
  });

  $("#rollButton").click(function() {

    var type = $("#gameType").val();
    var rollResult = roll(type);
    for (var i=0; i<type; i++) {
      var output1 = "&#x268" + (rollResult[i]-1) + ";";
      $(".displayDice"+(i+1)).html(output1);
    }

    // var output2 = "&#x268" + (rollResult[1]-1) + ";";
    // $(".displayDice2").html(output2);
    checkDie(rollResult);
    $("#turnTotal").text(turnTotal);
    $("#currentPlayer").text(currentPlayer.name);
    if (win(turnTotal)) {
      $("#winner").show();
      $("#winner").text(currentPlayer.name + " Wins! Bank: " + currentPlayer.bank + " Current roll:" + turnTotal);
      $("#startGame").show();
      $("#rollButton").hide();
      $("#bankButton").hide();
      $("#rollOutput").text("");
      $("#turnTotal").text("");
      $("#currentPlayer").text("");
    }
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
