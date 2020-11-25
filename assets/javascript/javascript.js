$(document).ready(function () {
  $(".scoreboard").hide();
  $("#character-select-button").hide();
  hideArena();
  hideWinScreen();
  hideCharacterDisplay();
  hideBox();




  function hideCharacterDisplay () {
    console.log("hide character display")
    $(".user-character-display").hide();
  }

  function hideBox (){
    console.log("hide box")
    $(".box").hide();
  }

  function hideArena (){
    console.log("hide arena")
    $(".arena").hide();
  }

  function hideWinScreen () {
    console.log("hide win screen")
    $(".win-screen").hide();
  }

  function hideCharacterScreen () {
    console.log("hide character screen")
    $(".character-select-screen").hide();
  }

  function toggleArena (){
    console.log("toggle arena")
    $(".arena").toggle();
    $("#attack-button").show();
  }

  function toggleWinScreen () {
    console.log("toggle win screen")
    $(".win-screen").toggle();
  }

  function toggleBox() {
    console.log("toggle box")
    $(".box").show();
  }


  // main character variables

  let userCharacter = "";

  let computerCharacter = "";



  // character values ------------------------------------------------------------------------------------------------------------------------
  let lukeSkywalker = {
    data: "lukeSkywalker",
    hp: 120,
    ratio: 1.2,
    attack: 1,
    counterAttack: 15,
    display: "Luke Skywalker",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/lukeSkywalker-big.jpg",
  }

  let bobbaFett = {
    data: "bobbaFett",
    hp: 130,
    ratio: 1.3,
    attack: 2,
    counterAttack: 1,
    display: "Bobba Fett",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/bobbaFett-big.jpg",
  }

  let chewbaca = {
    data: "chewbaca",
    hp: 100,
    ratio: 1,
    attack: 5,
    counterAttack: 10,
    display: "Chewbaca",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/chewbaca-big.jpg"
  }

  let darthVader = {
    data: "darthVader",
    hp: 145,
    ratio: 1.45,
    attack: 3,
    counterAttack: 5,
    display: "Darth Vader",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/darthVader-big.jpg",
  }

  function hoverCharacter() {
    $( ".img-lukeSkywalker" ).hover(
      function() {
        $(".charDisplay").attr("src","../starwarsbattle/assets/images/coolCharacters/lukeSkywalker-big.jpg" );
      }, function() {
        $(".charDisplay" ).attr("src","").empty();
      }
    );

    $( ".img-bobbaFett" ).hover(
      function() {
        $(".charDisplay").attr("src","../starwarsbattle/assets/images/coolCharacters/bobbaFett-big.jpg" );
      }, function() {
        $(".charDisplay" ).attr("src","").empty();
      }
    );

    $( ".img-darthVader" ).hover(
      function() {
        $(".charDisplay").attr("src","../starwarsbattle/assets/images/coolCharacters/darthVader-big.jpg" );
      }, function() {
        $(".charDisplay" ).attr("src","").empty();
      }
    );

    $( ".img-chewbaca" ).hover(
      function() {
        $(".charDisplay").attr("src","../starwarsbattle/assets/images/coolCharacters/chewbaca-big.jpg" );
      }, function() {
        $(".charDisplay" ).attr("src","").empty();
      }
    );
  };





// character arrays ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  const characters = ["lukeSkywalker", "bobbaFett", "chewbaca", "darthVader"];
  let characterObject = [ lukeSkywalker, bobbaFett, chewbaca, darthVader];

// run createcharacterdiv
createCharacterDiv();
// run hover function
hoverCharacter();

  // create div's with images with for loop------------------------------------------------------------------------------------------------
    function createCharacterDiv () {
      console.log("create character div")
      for (i = 0; i < characters.length; i++) {
        let hitpoints = characterObject[i].hp;
        let charImgSrc = characterObject[i].imgSrc;
        let displayName = characterObject[i].display;
        let characterbtn = $("<div>");
        characterbtn.addClass("chara-button not-selected col col-6 float-left " + characters[i]);
        characterbtn.data("data", characters[i]);
        characterbtn.attr("imgSrc", charImgSrc);
        characterbtn.attr("data", displayName);
        characterbtn.prependTo("#char-sel");
        characterImage();
        characterText();
        function characterText() {
          console.log("character text")
          let charText = $("<p>");
          charText.addClass("char-text text-center");
          charText.text(hitpoints)
          charText.appendTo(characterbtn);
          };
        function characterImage() {
          console.log("character image")
          let charImg = $("<img>");
          charImg.addClass("imgClear character-image img-fluid img-" + characters[i]);
          charImg.appendTo(characterbtn);
          charImg.attr("src", "../starwarsbattle/assets/images/coolCharacters/" + characters[i] + "-thumbnail.jpg");
          };
      };
    };

// chose a character----------------------------------------------------------------------------------------------------------------
    function charaSel() {
      console.log("chara sel");
      $(".chara-button").on("click", function () {
        console.log("character button click");
        if (game.step < 1) {
          userCharacter = $(this).data();
          $(this).addClass("user-chara-sel");
          $(".user-character-display").show();;
          $(this).hide();
          $(".user-img").attr("src", $(this).attr("imgsrc"));
          console.log($(this).attr("displayName"));
          $(".user-img-text").text();
          game.state = compCharacterSel();
          game.step = game.step + 1;
          return "charaSel" ;
        };
      });
    };

// chose a character for the computer-------------------------------------------------------------------------------------------------------------------------

    function compCharacterSel() {
      console.log("computer character select");
      $(".chara-button").on("click", function () {
        defeatedCharacterState = false;
        console.log("computer character click");
        if (game.step < 2 && ($(this).hasClass("not-selected"))) {
          computerCharacter = $(this).data();
          $(this).addClass("comp-chara-sel");
          $(".comp-chara-sel").hide();
          game.state = attackState();
          game.step = game.step + 1;
          assignCharacterData();
          let userHpDisplay = healthRatio(userCharacter.hp, userCharacter.ratio);
          let computerHpDisplay = healthRatio(computerCharacter.hp, computerCharacter.ratio);
          $(".user-hp-meter").attr('aria-valuenow', userHpDisplay).css('width', userHpDisplay + '%');
          $(".comp-hp-meter").attr('aria-valuenow', computerHpDisplay).css('width', computerHpDisplay + '%');
        };
      });
    };



    function assignCharacterData () {
      console.log("assign character data")
      // if computer character has not been chosen, do nothing
    if (!computerCharacter) {
      ;
      // if computer character has been choosen, run the following loop to assign character data to the div.
    } else if (!computerCharacter == false){
      // for however many items in the characater object array
      for (j = 0; j < characterObject.length; j++) {
        // if user character data matches the data of the current index of character object assign that data to user characater
        if (userCharacter.data == characterObject[j].data) {
          userCharacter = characterObject[j];
          // if computer character data matches the data of the current index of character object assign that data to computercharacater
        } else if (computerCharacter.data == characterObject[j].data) {
          computerCharacter = characterObject[j];
        } else {;}
        }
        $(".comp-character-attack-img").attr("src", computerCharacter.imgSrc);
        $(".user-character-attack-img").attr("src", userCharacter.imgSrc);
        console.log(computerCharacter);
        }
    };

  let attacking = false;

// function to be run when player has chosen a character and chosen a character for computer player------------------------------------------
    function attackState() {
      console.log("attack state")
      $("#character-select-button").hide();
      hideCharacterScreen();
      toggleArena();
      toggleBox();
      let userHpDisplay = healthRatio(userCharacter.hp, userCharacter.ratio);
      let computerHpDisplay = healthRatio(computerCharacter.hp, computerCharacter.ratio);
      $(".user-hp-meter").attr('aria-valuenow', userHpDisplay).css('width', userHpDisplay + '%');
      $(".comp-hp-meter").attr('aria-valuenow', computerHpDisplay).css('width', computerHpDisplay + '%');
      let newButton = $("<button>");
      newButton.addClass("attack-button btn");
      newButton.text("ATTACK");
      newButton.appendTo($(".button-div"));
      $(newButton).on("click", function () {
        x += 1;
        if ((userCharacter.hp > 0)) {
          console.log("attack button click");
          userfightAction();
          displayStuff();
        } else {
          displayStuff();
        };
      });
    };

      let x = 0;
// calculate new character stats -----------------------------------------------------------------------------------------

    function userfightAction() {
      console.log(x)
      console.log("user fight action")
      userCharacter.attack = userCharacter.attack + 10;
      computerCharacter.hp = computerCharacter.hp - userCharacter.attack;
      if ((computerCharacter.hp > 0) && (!computerCharacter === false)){
        computerfightAction();
        console.log(computerCharacter);
        console.log(userCharacter);
      } else if (!computerCharacter) {
        ;
      } else {
        console.log(computerCharacter);
        console.log(userCharacter);
        defeatedCharacter();
      };
    };

    function computerfightAction() {
      console.log("computer fight action");
      userCharacter.hp = userCharacter.hp - computerCharacter.counterAttack;
      let userHpDisplay = healthRatio(userCharacter.hp, userCharacter.ratio);
      let computerHpDisplay = healthRatio(computerCharacter.hp, computerCharacter.ratio);
      $(".user-hp-meter").attr('aria-valuenow', userHpDisplay).css('width', userHpDisplay + '%');
      $(".comp-hp-meter").attr('aria-valuenow', computerHpDisplay).css('width', computerHpDisplay + '%');
      };
// ---------------------------------------------------------------------------------------------------------------------------------------------


    let defeatedName ="";

    function defeatedCharacter () {
      console.log("defeated character");
      let userHpDisplay = healthRatio(userCharacter.hp, userCharacter.ratio);
      let computerHpDisplay = healthRatio(computerCharacter.hp, computerCharacter.ratio);
      $(".user-hp-meter").attr('aria-valuenow', userHpDisplay).css('width', userHpDisplay + '%');
      $(".comp-hp-meter").attr('aria-valuenow', computerHpDisplay).css('width', computerHpDisplay + '%');
      $(computerCharacter).removeClass("comp-chara-sel");
      $(computerCharacter).addClass("defeated");
      defeatedName = computerCharacter.display;
      computerCharacter.hp = 100;
      computerCharacter = "";
      $(".defeated").hide();
      game.opponents-- ;
      game.step = 1;
      $("#character-select-button").show();
      characterSelectButton();
      $(".attack-button").remove();
      checkStats();
    };

    function characterSelectButton (){
      $("#character-select-button").on("click",function (){
      $(".arena").hide();
      $(".character-select-screen").show();
      });
    };

     // display the results of the attack state ------------------------------------------------------------------------------------------------------------------------
  function displayStuff() {
    console.log("display stuff");
    if (game.state == "Win State") {
      console.log("if statement 1");
      let userHpDisplay = healthRatio(userCharacter.hp, userCharacter.ratio);
      let computerHpDisplay = healthRatio(computerCharacter.hp, computerCharacter.ratio);
      $(".user-hp-meter").attr('aria-valuenow', userHpDisplay).css('width', userHpDisplay + '%');
      $(".comp-hp-meter").attr('aria-valuenow', computerHpDisplay).css('width', computerHpDisplay + '%');
      $(".box-four").text(userCharacter.display + " did " + userCharacter.attack + " damage");
      $(".box-three").text(userCharacter.display + " wins!");
      $(".win").text("Win: " + game.wins);
      $(".loss").text("Lose: "+ game.losses);

    } else if (!computerCharacter == false){
      console.log("if statement two");
      $(".box-four").text(userCharacter.display + " did " + userCharacter.attack + " damage");
      $(".box-three").text(computerCharacter.display + " did " + computerCharacter.counterAttack + " damage");
      let userHpDisplay = healthRatio(userCharacter.hp, userCharacter.ratio);
      let computerHpDisplay = healthRatio(computerCharacter.hp, computerCharacter.ratio);
      $(".user-hp-meter").attr('aria-valuenow', userHpDisplay).css('width', userHpDisplay + '%');
      $(".comp-hp-meter").attr('aria-valuenow', computerHpDisplay).css('width', computerHpDisplay + '%');
      $(".win").text("Win: " + game.wins);
      $(".losss").text("Lose: "+ game.losses);

    } else if (!computerCharacter) {
      console.log("If statement three");
      let userHpDisplay = healthRatio(userCharacter.hp, userCharacter.ratio);
      let computerHpDisplay = healthRatio(computerCharacter.hp, computerCharacter.ratio);
      $(".user-hp-meter").attr('aria-valuenow', userHpDisplay).css('width', userHpDisplay + '%');
      $(".comp-hp-meter").attr('aria-valuenow', computerHpDisplay).css('width', computerHpDisplay + '%');
      $(".box-four").text(userCharacter.display + " did " + userCharacter.attack + " damage");
      $(".box-three").text(defeatedName + " was defeated! Please select the next enemy to defeat!");
      $(".win").text("Win: " + game.wins);
      $(".loss").text("Lose: "+ game.losses);
    };
  };

  // runs at the end of display stuff, final action of attack chain of functions.
    function checkStats () {
      console.log("check stats")
      if (game.opponents == 0) {
        game.state = winState();
      } else if ((userCharacter.hp <= 0) && (!userCharacter == false)) {
        userCharacter = "";
        game.state = loseState();
      ;}
      $(".scoreboard").show();
      };

      $("#reset").on("click", function () {
        console.log("reset click")
        reset();
      });

      function reset(){
        console.log("reset")
        $(".chara-button").remove();
        userCharacter.attack = "";
        userCharacter.hp = "";
        userCharacter = "";
        computerCharacter = "";
        game.step = 0;
        game.opponents = 3;
        lukeSkywalker.hp = 120;
        lukeSkywalker.attack = 1;
        chewbaca.hp = 100;
        chewbaca.attack = 5;
        bobbaFett.hp = 130;
        bobbaFett.attack = 2;
        darthVader.hp = 140;
        darthVader.attack = 3;
        createCharacterDiv();
        charaSel();
        $(".box-one").text("");
        $(".box-three").text("");
        $(".box-four").text("");
        game.state = charaSel();
        $(".arena").hide();
        $(".character-select-screen").show();
        hoverCharacter();
        resetAnimation();
        hideWinScreen();
        hideCharacterDisplay();
        hideBox();
        $(".user-img").attr("src", "");
      };

  function winState () {
    console.log("win state")
    hideCharacterScreen();
    toggleWinScreen();
    hideArena();
    displayStuff();
    $(".victory-img").attr("src", userCharacter.imgSrc);
    game.wins++ ;
    return "Win State";
  };

  function loseState () {
    console.log("lose state")
    game.losses++
    $(".box-two").text("Wins: " + game.wins + "|| " + "Loses: " + game.losses);
    $(".box-four").text("You Lose")
    $(".box-three").text("");
  };

  // primary game object.
  let game = {
    state: charaSel(),
    step: 0,
    opponents: 3,
    wins:0,
    losses:0,
    }

//  auxillary disply functions -------------------------------------------------------------------------------
 // reset the transition by...
 function resetAnimation(){
  $(".character-select-screen").hide();
  $(".arena").show();
  $(".arena").hide();
  $(".character-select-screen").show();
  crawl.style.animationPlayState = "paused";
  }

  let crawl = document.getElementById("crawl");

  $(".crawl").on("click", function (){
    crawl.style.animationPlayState = "running";
  });

  // Console log functions for testing
  // $("#log").on("click", function (){
  //   console.log("user character " + userCharacter.display);
  //   console.log("user character attack " + userCharacter.attack);
  //   console.log("user character hp " + userCharacter.hp )
  //   console.log("computer Character " + computerCharacter.display)
  //   console.log("computer Character attack " + computerCharacter.counterAttack)
  //   console.log("computer Character hp " + computerCharacter.hp)
  //   console.log("Game" + game)
  // });


  // math functions
  function healthRatio(a,b){
    return a/b
  }


});