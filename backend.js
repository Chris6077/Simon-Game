$(document).ready(function(){
  $(".score")[0].innerHTML = "Score: 0";
  $(".score")[1].innerHTML = "Steps: 1";
  $(".mode")[0].innerHTML = "STRICT";
  var rightOrder = [];
  var userOrder = [];
  var score = 0;
  var strict = true;
  var lastChance = false;
  var colors = ["green", "red", "yellow", "blue"];
  var animateOrderButton = function(arr) {
    var i = 0;
    var iv = setInterval(function() {
      $(".btn").off().on("click", function(){
        alert("Come on! Don't cheat :/");
      });
      var ob = $("#" + arr[i]);
      ob.addClass("activated");
      $("#sound-" + arr[i])[0].load();
      $("#sound-" + arr[i])[0].play();
      setTimeout(function() {ob.removeClass("activated");}, 250);
      i++;
      if (i >= arr.length) {
        clearInterval(iv);
        $(".btn").off().on("click", function() {
        	var x = $(this).attr("id");
        	$("#sound-" + x)[0].load();
            $("#sound-" + x)[0].play();
            setTimeout(function(){
	            userOrder.push(x);
	            for (var i = 0; i < userOrder.length; i++) {
	              if (JSON.stringify(rightOrder) === JSON.stringify(userOrder)) {
	                userOrder = [];
	                nextRound();
	                startGame();
	                break;
	              }
	              if (rightOrder[i] !== userOrder[i]) {
	                if (strict === false && lastChance === true) {
	                  lastChance = false;
	                  alert("Don't fail again ;)");
	                  userOrder = [];
	                  animateOrderButton(rightOrder);
	                } else if (lastChance === false) {
						$("#sound-fail")[0].load();
		                $("#sound-fail")[0].play();
		                $(".btn").off();
		                setTimeout(function(){alert("You lost :(");}, 500);
		                resetGame();
		                break;
	                }
	            }
            }
          }, 500);
        });
      }
    }, 1000);
  };
  var nextRound = function() {
    score++;
    if (score === 20) {
      alert("Congratulations! You won :)");
      resetGame();
    }
    $(".score")[0].innerHTML = "Score: " + score;
    $(".score")[1].innerHTML = "Steps: " + (score + 1);
    if(score > localStorage['highscore']){
      $(".score")[1].innerHTML = score;
      localStorage['highscore'] = score;
    }
  };
  var resetGame = function() {
    score = 0;
    $(".score")[0].innerHTML = "Score: 0";
    $(".score")[1].innerHTML = "Steps: 1";
    rightOrder = [];
    if (strict === false) {
      lastChance = true;
    }
    userOrder = [];
  };
  var startGame = function() {
    rightOrder.push(colors[Math.floor(Math.random() * colors.length)]);
    animateOrderButton(rightOrder);
  };
  $(".mode").on("click", function() {
    resetGame();
    switch (strict) {
      case true:
        strict = false;
        lastChance = true;
        $(".mode")[0].innerHTML = "Relaxed";
        break;
      case false:
        strict = true;
        lastChance = false;
        $(".mode")[0].innerHTML = "Strict";
        break;
    }
  });
  $(".start").on("click", function() {
    resetGame();
    startGame();
  });
});
