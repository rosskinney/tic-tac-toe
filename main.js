
// Using NaN instead of null is a clever hack. See checkForWinner for details.
var spaces = [
  NaN, NaN, NaN,
  NaN, NaN, NaN,
  NaN, NaN, NaN
];

var player1 = 'veggies';
var player2 = 'junkfood';
var currentPlayer = null;
var game_over = false

var setNextTurn = function () {
  if (currentPlayer === player1) {
    currentPlayer = player2;
  }
  else {
    currentPlayer = player1;
  }
  $('#turn-label').text(currentPlayer);
};

var checkForWinner = function () {
  // Because (NaN === NaN) is always false, we can safely assume
  // that if three spaces in a row are the same, all three spaces are
  // marked by a player, and not all empty.
  // (0,1,2), (3,4,5), (6,7,8), (0,3,6), (1,4,7), (2,5,8),(0,4,8) or (2,4,6).

  if ( spaces[0] === spaces[1] && spaces[1] === spaces[2]
    || spaces[3] === spaces[4] && spaces[4] === spaces[5]
    || spaces[6] === spaces[7] && spaces[7] === spaces[8]
    || spaces[0] === spaces[3] && spaces[3] === spaces[6]
    || spaces[1] === spaces[4] && spaces[4] === spaces[7]
    || spaces[2] === spaces[5] && spaces[5] === spaces[8]
    || spaces[0] === spaces[4] && spaces[4] === spaces[8]
    || spaces[2] === spaces[4] && spaces[4] === spaces[6]
    // TODO: Check for rest of game winning cases
  )
  {
    // TODO: Trigger 'game-win' event with the winning player as the event data
   console.log(currentPlayer + ' has won');

   $(document).trigger('game-win', currentPlayer);

  }
};
// Add code to test for truthy condtion on NAN
$(document).on('click', '#board .space', function (e) {
  var spaceNum = $(e.currentTarget).index();
  if (game_over ===  true) {
     alert("Game is over!");
     console.log(spaces[spaceNum]);
  }
  else if (spaces[spaceNum]) {
     alert("You can't do that!");
     console.log(spaces[spaceNum]);
  }
  else {
    console.log('You clicked on space #' + spaceNum);

    // Marks the space with the current player's name
    // TODO: Don't mark it unless the space is blank
    spaces[spaceNum] = currentPlayer;
    // Adds a class to elem so css can take care of the visuals
    $('#board .space:eq(' + spaceNum + ')').addClass(currentPlayer);

    checkForWinner();
    setNextTurn();
  };
});

$(document).on('game-win', function (e, winner) {
  // TODO: Alert who won the game
  alert(currentPlayer + " has won!");
  game_over = true;
});

// Start the game
setNextTurn();
