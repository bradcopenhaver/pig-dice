
var roll = function() {
  var die = Math.floor((Math.random()*6)+1);
  return die;
}



$(document).ready(function(){


  $("#roll").click(function() {
    $("#rollOutput").text(roll());
  });

  $("#bank").click(function() {

  });


});
