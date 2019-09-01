$(document).ready(function () {
  $(".scoreboard").hide();
  hideArena();
  hideWinScreen();
  hideCharacterDisplay();
  hideBox();

  function hideCharacterDisplay () {
    $(".user-character-display").hide();
  }

  function hideBox (){
    $(".box").hide();
  }

  function hideArena (){
    $(".arena").hide();
  }

  function hideWinScreen () {
    $(".win-screen").hide();
  }

  function hideCharacterScreen () {
    $(".character-select-screen").hide();
  }

  function toggleArena (){
    $(".arena").toggle();
  }

  function toggleWinScreen () {
    $(".win-screen").toggle();
  }

  function toggleCharacterDisplay () {
    $(".user-character-display").toggle();
  }

  function toggleCharacterScreen () {
    $(".character-select-screen").toggle();
  }

  function toggleBox() {
    $(".box").toggle();
  }

  
  // main character variables

  var userCharacter = "";

  var computerCharacter = "";

  function emptyComputerCharacter (){
    computerCharacter ="";
  }

  // character values ------------------------------------------------------------------------------------------------------------------------
  var lukeSkywalker = {
    data: "lukeSkywalker",
    hp: 100,
    attack: 2,
    counterAttack: 2,
    display: "Luke Skywalker",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/lukeSkywalker-big.jpg",
  }

  var bobbaFett = {
    data: "bobbaFett",
    hp: 100,
    attack: 2,
    counterAttack: 2,
    display: "Bobba Fett",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/bobbaFett-big.jpg",
  }

  var chewbaca = {
    data: "chewbaca",
    hp: 100,
    attack: 2,
    counterAttack: 2,
    display: "Chewbaca",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/chewbaca-big.jpg"
  }

  var darthVader = {
    data: "darthVader",
    hp: 100,
    attack: 2,
    counterAttack: 2,
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
        }

          

 

// character arrays ----------------------------------------------------------------------------------------------------------------------------------------------------------------
  var characters = ["lukeSkywalker", "bobbaFett", "chewbaca", "darthVader"];
  var characterObject = [ lukeSkywalker, bobbaFett, chewbaca, darthVader];

// run createcharacterdiv
createCharacterDiv();
// run hover function
hoverCharacter();

  // create div's with images with for loop------------------------------------------------------------------------------------------------
  function createCharacterDiv () {
  for (i = 0; i < characters.length; i++) {
    var hitpoints = characterObject[i].hp;
    var charImgSrc = characterObject[i].imgSrc;
    var characterbtn = $("<div>");
    characterbtn.addClass("chara-button not-selected col col-6 float-left " + characters[i]);
    characterbtn.data("data", characters[i]);
    characterbtn.attr("imgSrc", charImgSrc)
    
    characterbtn.prependTo("#char-sel");
    characterImage();
    characterText();
    function characterText() {
      var charText = $("<p>");
      charText.addClass("char-text text-center");
      charText.text(hitpoints)
      charText.appendTo(characterbtn);
      };
    function characterImage() {
      var charImg = $("<img>");
      charImg.addClass("imgClear character-image img-fluid img-" + characters[i]);
      charImg.appendTo(characterbtn);
      charImg.attr("src", "../starwarsbattle/assets/images/coolCharacters/" + characters[i] + "-thumbnail.jpg");
      };
      }
      }

// chose a character----------------------------------------------------------------------------------------------------------------
  function charaSel() {
    $(".chara-button").on("click", function () {
      if (game.step < 1) {
        userCharacter = $(this).data();
        $(this).addClass("user-chara-sel");
        toggleCharacterDisplay();
        $(this).hide();
        $(".user-img").attr("src", $(this).attr("imgsrc"));
        game.state = compCharacterSel();
        game.step += 1;
        return "charaSel"
      } } )
      }

// chose a character for the computer------------------------------------------------------------------------------------------------------------------------- 

  function compCharacterSel() {
    $(".chara-button").on("click", function () {
      if (game.step < 2 && ($(this).hasClass("not-selected"))) {
        computerCharacter = $(this).data();
        $(this).addClass("comp-chara-sel");
        $(".comp-chara-sel").hide();
        game.state = attackState();
        game.step += 1;
        assignCharacterData();
        $(".user-hp-meter").attr('aria-valuenow', 100).css('width', 100 + '%');
        $(".comp-hp-meter").attr('aria-valuenow', 100).css('width', 100 + '%');
      } } )
      }



      function assignCharacterData () {
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

          } 
      }

// function to be run when player has chosen a character and chosen a character for computer player------------------------------------------
  function attackState() {
    hideCharacterScreen();
    toggleArena();
    toggleBox();
    $(".user-hp-meter").attr('aria-valuenow', userCharacter.hp).css('width', userCharacter.hp + '%');
    $(".comp-hp-meter").attr('aria-valuenow', computerCharacter.hp).css('width', computerCharacter.hp + '%');
    $("#attack-button").on("click", function () {
      if ((game.state == winState) || (game.state == loseState)) {

        console.log("error position one");


      } else if ((userCharacter.hp > 0) && (computerCharacter.hp > 0)) {

        userfightAction();

        console.log("error position two");

          if (computerCharacter.hp <= 0) {

            displayStuff();

          } else {

            computerfightAction();
            displayStuff();
            
          };
      } else if (userCharacter.hp <= 0) {
        
        displayStuff();

        console.log("error position six");

      } else {
        console.log("defeated character");
        defeatedCharacter();
        displayStuff();
      }
    } ) ; }

// calculate new character stats THIS SECTION NEEDS WORK-----------------------------------------------------------------------------------------

      function userfightAction() {
        userCharacter.attack = userCharacter.attack + 10;
        computerCharacter.hp = computerCharacter.hp - userCharacter.attack;
        } 

        function computerfightAction() {
          userCharacter.hp = userCharacter.hp - computerCharacter.counterAttack;
          } 
// ---------------------------------------------------------------------------------------------------------------------------------------------


  var defeatedName ="";

    function defeatedCharacter () {
      $(computerCharacter).removeClass("comp-chara-sel");
      $(computerCharacter).addClass("defeated");
      defeatedName = computerCharacter.display;
      emptyComputerCharacter();
      $(".defeated").hide();
      game.opponents-- ;
      game.step = 1;
      }

     // display the results of the attack state ------------------------------------------------------------------------------------------------------------------------
  function displayStuff() {
    if (!computerCharacter == false){
      $(".box-four").text(userCharacter.display + " did " + userCharacter.attack + " damage");
      $(".box-three").text(computerCharacter.display + " did " + computerCharacter.counterAttack + " damage");
      $(".user-hp-meter").attr('aria-valuenow', userCharacter.hp).css('width', userCharacter.hp + '%');
      $(".comp-hp-meter").attr('aria-valuenow', computerCharacter.hp).css('width', computerCharacter.hp + '%');
      $(".win").text("Win: " + game.wins);
      $(".losss").text("Lose: "+ game.losses);
      checkStats();
    } else if (!computerCharacter) {
      $(".user-hp-meter").attr('aria-valuenow', userCharacter.hp).css('width', userCharacter.hp + '%');
      $(".comp-hp-meter").attr('aria-valuenow', computerCharacter.hp).css('width', computerCharacter.hp + '%');
      $(".box-four").text(userCharacter.display + " did " + userCharacter.attack + " damage");
      $(".box-three").text(defeatedName + " was defeated! Please select the next enemy to defeat!");
      $(".win").text("Win: " + game.wins);
      $(".loss").text("Lose: "+ game.losses);
      toggleArena();
      toggleCharacterScreen();
      toggleBox();
      checkStats();
    } 
    $(".win").text("Win: " + game.wins);
    $(".loss").text("Lose: "+ game.losses);
  }

  // runs at the end of display stuff, final action of attack chain of functions.
    function checkStats () {
      if (game.opponents == 0) {
        game.state = winState();
      } else if ((userCharacter.hp <= 0) && (!userCharacter == false)) {
        userCharacter = "";
        game.state = loseState();
      } $(".scoreboard").show();
      }

      $("#reset").on("click", function () {
        reset();
      });

      function reset(){
        $(".chara-button").remove();
        console.log(game);
        userCharacter.attack = "";
        userCharacter.hp = "";
        userCharacter.imgSrc = "";
        userCharacter = "";

        computerCharacter = "";
        game.step = 0;
        game.opponents = 3;
        lukeSkywalker.hp = 100;
        lukeSkywalker.attack = 2;
        chewbaca.hp = 100;
        chewbaca.attack = 2;
        bobbaFett.hp = 100;
        bobbaFett.attack = 2; 
        darthVader.hp = 100;
        darthVader.attack = 2;
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

        }

  function winState () {
    hideCharacterScreen();
    toggleWinScreen();

    $(".victory-img").attr("src", userCharacter.imgSrc);
    game.wins++ ;
  }

  function loseState () {
    game.losses++
    $(".box-two").text("Wins: " + game.wins + "|| " + "Loses: " + game.losses);
    $(".box-four").text("You Lose")
    $(".box-three").text("");

  }

  // primary game object.
  var game = {
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

  var crawl = document.getElementById("crawl");

  $(".crawl").on("click", function (){
    crawl.style.animationPlayState = "running";
  })

  $("#log").on("click", function (){
    console.log("user character " + userCharacter.display);
    console.log("user character attack " + userCharacter.attack);
    console.log("user character hp " + userCharacter.hp )
    console.log("computer Character " + computerCharacter.display)
    console.log("computer Character attack " + computerCharacter.counterAttack)
    console.log("computer Character hp " + computerCharacter.hp)
    


    
  })
     
  
  })