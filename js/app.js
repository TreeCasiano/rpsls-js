//global functions
var number_of_games = 0;
var player_score = 0;
var computer_score = 0;


// "How to Play" Lightbox Display

var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");

$overlay.append($image);

$("body").append($overlay);

// Capture click event on "How to Play" button
$("#rules").click(function(event) {
  event.preventDefault();
  var imageLocation = $(this).attr("href");
  // Update overlay with rules image
  $image.attr("src", imageLocation);
  // Show the overlay
  $overlay.show();
});

// Hide overlay when clicked
$overlay.click(function() {
  $overlay.hide();
});


// ROCK PAPER LIZARD SCISSORS SPOCK GAME
// (Player vs. Computer)

//  convert button click to player's choice (player_name)

  var player_name = "";
  // event listeners trigger game

  $('#rock').click(function(){
    player_name = "Rock";
    console.log("You have chosen ROCK.");
    rpsls_game(player_name);
  });
  $('#paper').click(function(){
    player_name = "Paper";
    console.log("You have chosen PAPER.");
    rpsls_game(player_name);
  });
  $('#scissors').click(function(){
    player_name = "Scissors";
    console.log("You have chosen SCISSORS.");
    rpsls_game(player_name);
  });
  $('#lizard').click(function(){
    player_name = "Lizard";
    console.log("You have chosen LIZARD.");
    rpsls_game(player_name);
  });
  $('#spock').click(function(){
    player_name = "Spock";
    console.log("You have chosen SPOCK.");
    rpsls_game(player_name);
  });

// HELPER FUNCTIONS

  // convert player's choice name to a number

function name_to_number(player_name){

    if(player_name === "Rock") {
      player_name = 0;
      return player_name;
  } else if (player_name === "Spock") {
      player_name = 1;
      return player_name;
  } else if (player_name === "Paper") {
      player_name = 2;
      return player_name;
  } else if (player_name === "Lizard") {
      player_name = 3;
      return player_name;
  } else if (player_name === "Scissors") {
      player_name = 4;
      return player_name;
  } else {
           // temporarily sending output to console
      console.log("That is not one of the options. Please choose only rock, paper, scissors, lizard, or Spock.");
  }
}

  // convert computer's number to a name
function number_to_name(computer_number){

    var computer_name;

    if (computer_number === 0) {
      computer_name = "Rock";
      return computer_name;
    } else if (computer_number === 1){
        computer_name = "Spock";
        return computer_name;
    } else if (computer_number === 2){
        computer_name = "Paper";
        return computer_name;
    } else if (computer_number === 3){
        computer_name = "Lizard";
        return computer_name;
    } else if (computer_number === 4){
        computer_name = "Scissors";
        return computer_name;
    } else {
              // temporarily sending output to console (error msg)
      console.log("Error! The computer has chosen a number other than 0, 1, 2, 3, or 4. There must be something wrong with the random number generator.");
    }
}

// reset game scores

function reset(){
    number_of_games = 0;
    player_score = 0;
    computer_score = 0;
}

// GAME CODE
// triggered by image/button click

function rpsls_game(player_name) {
    var computer_choice;
    var difference;
    var player_number;

    // convert player's choice (player_name) to player_number using the function name_to_number()
    player_number = name_to_number(player_name);

    // compute random guess for computer_number using random.randrange()
    var computer_number = Math.floor(Math.random(0, 5) * 5);

    // convert comp_number to comp_choice using the function number_to_name()
    computer_choice = number_to_name(computer_number);

    // output the message for computer's choice
    console.log("Computer chooses " + computer_choice + ".");

    // compute difference between computer_number and player_number modulo 5

// Unlike Python, JavaScript does not have a true modular operator. Instead, you have to do use this formula:  [Dividend-{Math.floor(Dividend/Divisor)*Divisor}]

    difference = ((player_number-computer_number)-(Math.floor((player_number-computer_number)/5)*5));

    number_of_games +=1;
    console.log("RESULTS OF GAME #" + number_of_games + ":");
// determine winner, output winner message
    var outcome = $('.outcome h4');
    var wins = $('.wins h4');
    var losses = $('.losses h4');
    if (difference === 1 || difference === 2) {
        console.log("Player wins!");
        player_score += 1;
        outcome.html("You win! " + player_name + " beats " + computer_choice + "!");
        wins.html(player_score);
        losses.html(computer_score);
        console.log("Player Score: " + player_score);
        console.log("Computer Score: " + computer_score);
        console.log("\n");

    } else if (difference === 3 || difference === 4) {
        console.log("Computer wins!");
        computer_score +=1;
        outcome.html("Computer wins! " + computer_choice + " beats " + player_name + "!");
        wins.html(player_score);
        losses.html(computer_score);
        console.log("Player Score: " + player_score);
        console.log("Computer Score: " + computer_score);
        console.log("\n");
    } else {
        outcome.html("No one wins. Try again!");
        console.log("Player and computer tie.");
        console.log("\n");
    }
}


/* This code was originally developed in Python and based on tutorials from Rice University's Coursera Course called Interactive Programming in Python course
(https://www.coursera.org/course/interactivepython).

The rules of the game:

Scissors cut paper. Paper covers rock. Rock crushes lizard. Lizard poisons Spock. Spock smashes scissors. Scissors decapitate lizard. Lizard eats paper. Paper disproves Spock. Spock vaporizes rock. Rock crushes scissors.

The key idea of this program is to equate the strings
"rock", "paper", "scissors", "lizard", "Spock" to numbers, as follows, and use modular arithmetic to determine which item beats the other:

0 - rock
1 - Spock
2 - paper
3 - lizard
4 - scissors

Each item will beat the item that comes before it
and be vanquished by the item that comes afer.
For example, paper beats Spock but is defeated by lizard.

What about scissors vs. rock or rock vs. paper? If we imagine these numbers on a clock, with the rock in the 12 o'clock position (0), you can determine the winner like so:

---You always beat counterclockwise opponents (paper beats Spock and rock).
---You lose to clockwise opponents (paper loses to lizard and scissors).

To mathematically determine the winner, you subtract the number assigned to the second item from the number assigned to the first item.
If the difference is 1 or 2, the first item wins.
If the difference is 3 or 4, the second item wins.

Sometimes the difference will be a negative number. For example, if the player chooses paper and the computer chooses scissors, we have 2(scissors)-4(paper) = -2. Using modular arithmetic is required to properly determine the winner. In this case, modulo 5 will provide the correct answer.  -2 % 5 = 3, and thus, scissors beats paper.

For an explanation of modular arithmetic, visit http://www.artofproblemsolving.com/Wiki/index.php/Modular_arithmetic/Introduction.
*/
