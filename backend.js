$(document).ready(function(){
  $(".score")[0].innerHTML = 0;
  $(".score")[1].innerHTML = localStorage['highscore'] || 0;
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
      $("#" + arr[i]).addClass("activated");
      $("#sound-" + arr[i])[0].play();
      setTimeout(function() {$("#" + arr[i]).removeClass("activated");}, 250);
      i++;
      if (i >= arr.length) {
        clearInterval(iv);
      }
    }, 1000);
  };
  var nextRound = function() {
    score++;
    $(".score")[0].innerHTML(score);
    if(score > localStorage['highscore']){
      $(".score")[1].innerHTML(score);
      localStorage['highscore'] = score;
    }
  };
  var resetGame = function() {
    score = 0;
    $(".score")[0].innerHTML = 0;
    rightOrder = [];
    if (strict === false) {
      lastChance = true;
    }
    userOrder = [];
  };
  var startGame = function() {
    $(".mode").off();
    arr.push(colors[Math.floor(Math.random() * colors.length)]);
    animateOrderButton(rightOrder);
    $(".btn").off().on("click", function() {
      $("#sound-" + $(this).attr("id"))[0].play();
      userOrder.push($(this).attr("id"));
      for (var i = 0; i < userOrder.length; i++) {
        if (JSON.stringify(rightOrder) === JSON.stringify(userOrder)) {
          userOrder = [];
          nextRound();
          startGame();
          break;
        }
        if (JSON.stringify(rightOrder) !== JSON.stringify(userOrder)) {
          if (strict === false && lastChance === true) {
            lastChance = false;
            alert("Don't fail again ;)");
            userOrder = [];
            animateOrderButton(rightOrder);
          } else if (lastChance === false) {
            alert("You lost :(");
            resetGame();
            break;
          }
        }
      }
    });
  };
  $(".mode").on("click", function() {
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
    startGame();
  });
});