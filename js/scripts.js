
var roll = function() {
  var die = Math.floor((Math.random()*6)+1);
  return die;
}

var turnTotal = 0;
var bank = 0;

var checkDie = function(rollResult) {
  if (rollResult === 1) {
    turnTotal = 0;
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
  });

  $("#bankButton").click(function() {
    bank += turnTotal;
    turnTotal = 0;
    $("#bankTotal").text(bank);
  });


});
