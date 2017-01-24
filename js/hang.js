$(document).ready(function(){
  $(".button-collapse").sideNav({
    menuWidth: 300, // Default is 240
     edge: 'left', // Choose the horizontal origin
     closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
     draggable: true // Choose whether you can drag to open on touch screens
   });
  $('select').material_select();
  $('.modal').modal();

  // Create Letter buttons
  createButtons();
  // chooseAWord returns a color, dash Replace, replaces the letters with dashes and appends to page
  dashReplace(chooseAWord());
  // UNCOMMENT THIS IN THE FUTURE 
  // dashReplace(chooseAHero());



$(document).on("click", ".choice-btn", function(){
  console.log($(this).data("letter"));
  var dataChoice = $(this).data("letter");
  $("#lettersGuessed").append(dataChoice+"   ");

  checkLetters(dataChoice);
  checkWin();


});

$("#restartButton").on("click", function(){
  restartGame();
});



}); // end of Document Ready

var guessTheWord;
var guessTheWordLength;
// array containing dashes
var dashArray;
var lettersGuessedArray = [];
var playerLives = 10;
var playerWins = 0;
var playerLosses = 0;

function createButtons() {
    var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z", "-"
    ];
    $("#letterChoices").html("");
    for (var i = 0; i < letters.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("light-blue waves-effect waves-light btn choice-btn");
        newButton.attr("data-letter", letters[i]);
        newButton.text(letters[i]);
        newButton.css({
            "margin": "5px",
            "width": "30px",
            //    "flex": "1",
            "text-align": "center",
            "max-width": "48px",
            "min-width": "48px"
        });

        $("#letterChoices").append(newButton);

    }
}

function chooseAHero(){
  var heroArray = ["Green Lantern", "The Flash", "Thor", "The Hulk", "Captain America", "Wolverine", "Superman", "Iron Man", "Spider-Man", "Batman"];
  var randomize = Math.floor(Math.random() * 10);
  // guessTheWord = heroArray[randomize].toUpperCase().toString();
  guessTheWord = "Green Lantern";
  console.log("THE HERO is " + guessTheWord);
  guessTheWordLength = guessTheWord.length;

  return guessTheWord;
}

function chooseAWord(){
  var colorChoice = ["red", "orange", "yellow", "green", "blue", "purple", "black", "white"];
  var randomize = Math.floor(Math.random() * 8);
  // console.log(randomize);
  guessTheWord = colorChoice[randomize].toUpperCase().toString();
  console.log("THE WORD is " + guessTheWord);
  guessTheWordLength = guessTheWord.length;

  return guessTheWord;
}

function dashReplace(string){
  dashArray = [];
  var newArray = string.split(" ");

  for(var i = 0; i < newArray.length;i++){
    for(var x = 0; x < newArray[i].length;x++){
      dashArray.push("_ ");
    }

  }
  $("#displayArea").html(dashArray);
}

function checkLetters(possibleLetter){

  for(var i = 0; i < guessTheWordLength;i++){
    if(possibleLetter === guessTheWord.charAt(i)){
      dashArray.splice(i, 1, possibleLetter);
      console.log("matching");
      $("#displayArea").html(dashArray);
    }
  }
  if(guessTheWord.indexOf(possibleLetter) === -1){
    console.log(playerLives);
    updateLives();

  }

  lettersGuessedArray.push(possibleLetter);
  $("#lettersGuessed").html(lettersGuessedArray);
}

function checkWin(){
  if((dashArray.indexOf("_ ") === -1) && (playerLives > 0)){
    addWin();
    $("#letterChoices").html("<h4>YOU WIN!</h4>");
    $("#letterChoices").append("<h5>Click on the <span class='enhance'>New Game</span> or <span class='enhance'>Restart</span> Buttons to play again</h5>");
    console.log("You Win!");

  }
}
function updateLives(){
  playerLives--;
  $("#livesArea").html(playerLives);
  if(checkLoss()){
    // alert("Game Over!");
    addLoss();
    $("#letterChoices").html("<h4>GAME OVER!</h4>");
    $("#letterChoices").append("<h5>You are out of lives! Click on the <span class='enhance'>New Game</span> or <span class='enhance'>Restart</span> Buttons</h5>");

  }

}

function checkLoss(){
  if(playerLives === 0){
    return true;
  }
}
function addWin(){
  playerWins++;
  $("#winsArea").html(playerWins);
}
function addLoss(){
  playerLosses++;
  $("#lossArea").html(playerLosses);
}

function restartGame(){

  playerLives = 10;
  $("#livesArea").html(playerLives);
  // Create Letter buttons
  createButtons();
  // chooseAWord returns a color, dash Replace, replaces the letters with dashes and appends to page
  dashReplace(chooseAWord());
  lettersGuessedArray = [];
  $("#lettersGuessed").html(lettersGuessedArray);





}
