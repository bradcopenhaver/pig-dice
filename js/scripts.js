
var roll = function() {
  var die = Math.floor((Math.random()*6)+1);
  return die;
}

var turnTotal = 0;


$(document).ready(function(){


  $("#roll").click(function() {
    var rollResult = roll();
    $("#rollOutput").text(rollResult);
    turnTotal += rollResult;
    $("#turnTotal").text(turnTotal);
  });

  $("#bank").click(function() {

  });


});
