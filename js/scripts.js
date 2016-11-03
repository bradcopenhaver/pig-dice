var type = 0;
var players=0;
var player1 = new Player("Player 1");
var player2 = new Player("Player 2");
var currentPlayer = player1;

var turnTotal = 0;
var timeoutID=0;
function Player(name){
  this.bank = 0;
  this.name = name;
}
Player.prototype.addToBank = function(total) {
  this.bank += total;
  turnTotal = 0;
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

var switchPlayer = function(players) {
  debugger;

  if (currentPlayer === player1) {
    currentPlayer = player2;
  } else {
    currentPlayer = player1;
  }
  if (players === "1" && currentPlayer === player2) {
    window.setTimeout(computer, 2000, type);
  }
}

var checkDie = function(rollResult) {
  var die1 = rollResult[0];
  var die2 = rollResult[1];
  if (die2) {
    if (die1 === 1 && die2 === 1){
      currentPlayer.bank=0;
      turnTotal = 0;
      switchPlayer(players);
      window.setTimeout(activePlayerUI, 1000);
      updateBank();
    } else if (die1 === 1 || die2 === 1){
      turnTotal = 0;
      switchPlayer(players);
      window.setTimeout(activePlayerUI, 1000);
    } else  {
      turnTotal += (die1 + die2);
      return 1;
    }
  } else {
    if (die1 === 1) {
    turnTotal = 0;
    switchPlayer(players);
    window.setTimeout(activePlayerUI, 1000);
  } else {
    turnTotal += die1;
    return 1;
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
var computer = function(type) {
  var rollResult = roll(type);
  displayRoll(rollResult);
  var firstRoll = checkDie(rollResult);
  updateFields();

  if (firstRoll === 1){
    rollResult = roll(type);
    firstRoll = checkDie(rollResult);
    window.setTimeout(displayRoll, 1000, rollResult);
    window.setTimeout(updateFields, 1000);
  }
  if (firstRoll === 1){

    window.setTimeout(currentPlayer.addToBank, 1000, turnTotal);
    switchPlayer(players);
    window.setTimeout(activePlayerUI, 3000);
  }
  window.setTimeout(updateBank, 3000);

}
/// UI

var activePlayerUI = function() {
  if (currentPlayer === player1) {
    $("#player1Working").addClass("currentPlayer");
    $("#player2Working").removeClass("currentPlayer");
  } else {
    $("#player2Working").addClass("currentPlayer");
    $("#player1Working").removeClass("currentPlayer");
  }
  $("#currentPlayer").text(currentPlayer.name);
}

var updateBank = function() {
  $("#p1BankTotal").text(player1.bank);
  $("#p2BankTotal").text(player2.bank);
}

var displayRoll = function(rollResult) {
  for (var i=0; i<type; i++) {
    var output1 = "&#x268" + (rollResult[i]-1) + ";";
    $(".displayDice"+(i+1)).html(output1);
  }
}

var updateFields = function() {
  $("#p1BankTotal").text(player1.bank);
  $("#p2BankTotal").text(player2.bank);
  $("#turnTotal").text(turnTotal);
  $("#currentPlayer").text(currentPlayer.name);
}

var clearFields = function() {
  $("#rollOutput").text("");
  $("#turnTotal").text("");
  $("#currentPlayer").text("");
}

$(document).ready(function(){

  $("#gameType").change(function() {
    var diceNumber = $("#gameType").val();
    if (diceNumber === "1") {
      $("#twoDice").hide();
      $("#oneDie").show();
    } else {
      $("#twoDice").show();
      $("#oneDie").hide();
    }

  });

  $("#startGame").click(function() {
    newGame();
    $("#gameStart").hide();
    $(".nameEntry1").show();
    $("#winner").hide();
    $("#p1NameOutput").text("Player 1");
    $("#p2NameOutput").text("Player 2");
    type = $("#gameType").val();
    players = $("#playerCount").val();
    activePlayerUI();
  });

  $("#rollButton").click(function() {
    var rollResult = roll(type);
    displayRoll(rollResult);
    checkDie(rollResult);
    updateFields();
    //$("#turnTotal").text(turnTotal);
    //$("#currentPlayer").text(currentPlayer.name);
    if (win(turnTotal)) {
      $("#winner").show();
      $("#winner").text(currentPlayer.name + " Wins! Bank: " + currentPlayer.bank + " Current roll:" + turnTotal);
      $("#startGame").show();
      $("#rollButton").hide();
      $("#bankButton").hide();
      clearFields();
      // $("#rollOutput").text("");
      // $("#turnTotal").text("");
      // $("#currentPlayer").text("");
    }
  });

  $("#bankButton").click(function() {
    currentPlayer.addToBank(turnTotal);
    updateBank();
    switchPlayer(players);
    activePlayerUI();
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
