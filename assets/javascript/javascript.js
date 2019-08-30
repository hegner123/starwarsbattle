$(document).ready(function () {
  $(".scoreboard").hide();
  hiddenArena();
  
  // main character variables

  var userCharacter = "";

  var computerCharacter = "";

  // character values ------------------------------------------------------------------------------------------------------------------------
  var lukeSkywalker = {
    data: "lukeSkywalker",
    hp: 90,
    attack: 2,
    counterAttack: 2,
    display: "Luke Skywalker",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/lukeSkywalker-big.jpg",
  }

  var bobbaFett = {
    data: "bobbaFett",
    hp: 95,
    attack: 2,
    counterAttack: 2,
    display: "Bobba Fett",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/bobbaFett-big.jpg",
  }

  var chewbaca = {
    data: "chewbaca",
    hp: 120,
    attack: 2,
    counterAttack: 2,
    display: "Chewbaca",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/chewbaca-big.jpg"
  }

  var darthVader = {
    data: "darthVader",
    hp: 200,
    attack: 35,
    counterAttack: 35,
    display: "Darth Vader",
    imgSrc:"../starwarsbattle/assets/images/coolCharacters/darthVader-big.jpg",
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
    var characterbtn = $("<div>");
    characterbtn.addClass("chara-button not-selected col col-6 float-left " + characters[i]);
    characterbtn.data("data", characters[i]);
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
        

        game.state = compCharacterSel();
       
        game.step += 1;
        return "charaSel"
      } else {;}
      } )
      }

// chose a character for the computer------------------------------------------------------------------------------------------------------------------------- 

  function compCharacterSel() {
    $(".chara-button").on("click", function () {
      if (game.step < 2 && ($(this).hasClass("not-selected"))) {
        computerCharacter = $(this).data();
        $(this).addClass("comp-chara-sel");
        $(".comp-chara-sel").appendTo("#attack-target");
        game.state = attackState();
        
        game.step += 1;
        assignCharacterData();
      } else {;}
      } )
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
    $(".character-select-screen").hide();
    $(".arena").show();
    
    $("#attack-button").on("click", function () {
      console.log("hi");
      if ((game.state == winState) || (game.state == loseState)) {
        ;
      } else if ((userCharacter.hp > 0) && (computerCharacter.hp > 0)) {
        userfightAction();
          if (computerCharacter.hp < 0) {
            displayStuff()
          } else {
            computerfightAction();
            defeatedCharacter();
            displayStuff();
          };
      } else if ((userCharacter.hp <= 0) || (computerCharacter.hp <= 0)) {
        defeatedCharacter();
        displayStuff();
        
      } else {;}
      } );
      }

// calculate new character stats THIS SECTION NEEDS WORK-----------------------------------------------------------------------------------------
  function computerfightAction() {
      userCharacter.hp = userCharacter.hp - computerCharacter.counterAttack;
      } 

      function userfightAction() {
        userCharacter.attack = userCharacter.attack + userCharacter.display.length;
        computerCharacter.hp = computerCharacter.hp - userCharacter.attack;
        } 
// ---------------------------------------------------------------------------------------------------------------------------------------------


  var defeatedName ="";

    function defeatedCharacter () {
      if (computerCharacter.hp <= 0){
      $("div.attack-target > div").removeClass("comp-chara-sel");
      $("div.attack-target > div").addClass("defeated");
      defeatedName = computerCharacter.display;
      console.log(defeatedName);
      console.log(computerCharacter.display);
      computerCharacter = "";
      $(".defeated").hide();
      $(".arena").hide();
      $(".character-select-screen").show();
      game.opponents-- ;
      game.step = 1;
      } else {;}
      }

     // display the results of the attack state ------------------------------------------------------------------------------------------------------------------------
  function displayStuff() {
    if (!computerCharacter == false){
      $("div.user-chara-sel > p").text(userCharacter.hp);
      $("div.comp-chara-sel > p").text(computerCharacter.hp);
      $(".box-four").text(userCharacter.display + " did " + userCharacter.attack + " damage");
      $(".box-three").text(computerCharacter.display + " did " + computerCharacter.counterAttack + " damage");
      $(".box-two").text("Wins: " + game.wins + "|| " + "Loses: " + game.losses);
      $(".box-one").text("  ");
      $(".win").text("Win: " + game.wins);
      $(".losss").text("Lose: "+ game.losses);
      checkStats();
    } else if (!computerCharacter) {
      $("div.user-chara-sel > p").text(userCharacter.hp);
      $(".box-four").text(userCharacter.display + " did " + userCharacter.attack + " damage");
      $(".box-three").text(defeatedName + " was defeated! Please select the next enemy to defeat!");
      $(".box-two").text("Wins: " + game.wins + "|| " + "Loses: " + game.losses);
      $(".box-one").text("  ");
      $(".win").text("Win: " + game.wins);
      $(".loss").text("Lose: "+ game.losses);
      checkStats();
    } else {;}
    }

  // runs at the end of display stuff, final action of attack chain of functions.
    function checkStats () {
      if (game.opponents == 0) {
        game.state = winState();
      } else if ((userCharacter.hp <= 0) && (!userCharacter == false)) {
        userCharacter = "";
        game.state = loseState();
      } else {;}
      $(".scoreboard").show();
      }

      $("#reset").on("click", function () {
        reset();
      });

      function reset(){
        $(".chara-button").remove();
        console.log(game);
        userCharacter = "";
        computerCharacter = "";
        game.step = 0;
        game.opponents = 3;
        lukeSkywalker.hp = 90;
        lukeSkywalker.attack = 2;
        chewbaca.hp = 120;
        chewbaca.attack = 20;
        bobbaFett.hp = 95;
        bobbaFett.attack = 20 
        darthVader.hp = 200;
        darthVader.attack = 10;
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
        }

  function winState () {
    console.log("win")
    game.wins++
    $(".box-two").text("Wins: " + game.wins + "|| " + "Loses: " + game.losses);
    $(".box-four").text("You Win")
    $(".box-three").text("");
  }

  function loseState () {
    console.log("lose")
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

    function hiddenArena (){
      $(".arena").hide();
    }

    

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
     
  
  })