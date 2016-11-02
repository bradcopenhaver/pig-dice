
var roll = function() {
  var die = Math.floor((Math.random()*6)+1);
  return die;
}

var turnTotal = 0;

var checkDie = function(rollResult) {
  if (rollResult === 1) {
    turnTotal = 0;
  } else {
    turnTotal += rollResult;
  }
}


$(document).ready(function(){


  $("#roll").click(function() {
    var rollResult = roll();
    $("#rollOutput").text(rollResult);
    checkDie(rollResult);
    $("#turnTotal").text(turnTotal);
  });

  $("#bank").click(function() {

  });


});
