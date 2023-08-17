// Step 1: Initialize the game board, players, colors, and other variables
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  
  let players = ['X', 'O'];
  let colors = {
    Player1: [255, 0, 255], // player1
    Player2: [0, 255, 255], // player2
  };
  
  let currentPlayer;
  let available = [];
  
  // Step 2: Setup the canvas and initial player
  function setup() {
    let canvas = createCanvas(425, 425);
    canvas.parent('container'); // Attach canvas to the 'container' div
  
    // Randomly choose the starting player
    currentPlayer = floor(random(players.length));
  
    // Populate the available spots
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        available.push([i, j]);
      } 
    }
  
    // Display the initial turn message
    let turnMessage = document.getElementById('turn-message');
    turnMessage.innerHTML = `Player ${players[currentPlayer]}'s turn`;
  
    // Get the reset button element
    resetButton = select('#reset');
  
    // Add a click event listener to the reset button
    resetButton.mousePressed(resetGame);
  }
  
  // Function to reset the game
  function resetGame() {
    // Reset the board
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        board[i][j] = '';
      }
    }
  
    // Reset available spots
    available = [...Array(9)].map((_, i) => [floor(i / 3), i % 3]);
  
    // Randomly choose the starting player
    currentPlayer = floor(random(players.length));
  
    // Clear the canvas and restart the loop
    clear();
    loop();
  
    // Reset the turn message
    let turnMessage = select('#turn-message');
    turnMessage.html(`Player ${players[currentPlayer]}'s turn`);
  }
  
  // Step 3: Function to check if three spots are equal
  function equal3(a, b, c) {
    return a == b && b == c && a != '';
  }
  
  // Step 4: Function to check for a winner or a tie
  function checkWinner() {
    let winner = null;
  
    // Checking horizontally and vertically
    for (let i = 0; i < 3; i++) {
      if (equal3(board[i][0], board[i][1], board[i][2])) {
        winner = board[i][0];
      } else if (equal3(board[0][i], board[1][i], board[2][i])) {
        winner = board[0][i];
      }
    }
  
    // Checking diagonally
    if (equal3(board[0][0], board[1][1], board[2][2])) {
      winner = board[0][0];
    }
    if (equal3(board[2][0], board[1][1], board[0][2])) {
      winner = board[2][0];
    }
  
    if (winner == null && available.length == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }
  
  // Step 5: Function to handle mouse clicks
  function mousePressed() {
    let w = width / 3;
    let h = height / 3;
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
  
    if (board[j][i] === '' && checkWinner() === null) {
      // Update the board and available spots
      board[j][i] = players[currentPlayer];
      available.splice(available.indexOf([j, i]), 1);
      currentPlayer = (currentPlayer + 1) % players.length;
  
      // Update the turn message
      let turnMessage = select('#turn-message');
      turnMessage.html(`Player ${players[currentPlayer]}'s turn`);
    }
  
    // Check if the Reset button was clicked
    if (resetButton && resetButton.elt.contains(event.target)) {
      resetGame();
    }
  }
  
  // Step 6: Function to draw the game board
  function draw() {
    noFill();
    stroke(255);
    background(21,32,43);
    strokeWeight(2);

    let w = width / 3;
    let h = height / 3;
  
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);
  
    // Draw X and O symbols and update turn message
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let spot = board[j][i];
  
        let x = w * i + w / 2;
        let y = h * j + h / 2;
  
        if (spot == players[0]) {
          stroke(colors.Player1);
          let xr = w / 4;
          let yr = h / 4;
          line(x - xr, y - yr, x + xr, y + yr);
          line(x - xr, y + yr, x + xr, y - yr);
        } else if (spot == players[1]) {
          stroke(colors.Player2);
          ellipse(x, y, w / 2);
        }
      }
    }
  
    // Check for a winner or tie
    let result = checkWinner();
    if (result != null) {
      noLoop();
      let turnMessage = select('#turn-message');
      if (result === 'tie') {
        turnMessage.html('It\'s a tie!').style('color', '#FFF');
      } else {
        turnMessage.html(`Player ${result} wins!`).style('color', '#FFF');
      }
    }
  }
  