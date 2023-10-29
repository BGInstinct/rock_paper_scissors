let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, loses: 0, drows: 0 }

function getResult(computerMove, yourMove) {
  if (yourMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Drow'
    }
    else if (computerMove === 'paper') {
      result = 'Lost'
    }
    else {
      result = 'Won'
    }
  }

  if (yourMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'Won'
    }
    else if (computerMove === 'paper') {
      result = 'Drow'
    }
    else {
      result = 'Lost'
    }
  }

  if (yourMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'Lost'
    }
    else if (computerMove === 'paper') {
      result = 'Won'
    }
    else {
      result = 'Drow'
    }
  }

  if (result === 'Won') {
    score.wins += 1
  }
  else if (result === 'Lost') {
    score.loses += 1
  }
  else {
    score.drows += 1
  }

  localStorage.setItem('score', JSON.stringify(score));
  console.log(score);
  return result


}

function pickComputerMove() {
  const randomNum = Math.random();
  let computerMove = '';

  if (randomNum >= 0 && randomNum < 1 / 3) {
    computerMove = 'rock';
  }
  else if (randomNum >= 1 / 3 && randomNum < 2 / 3) {
    computerMove = 'paper';
  }
  else {
    computerMove = 'scissors';
  }
  return computerMove
}

function updateResult(result) {
  document.querySelector('.js-result').innerHTML = `You: ${result}`;
}

function updateScore() {

  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Drows: ${score.drows}`;
}

function updateMoves(computerMove, yourMove) {
  if (computerMove == 'rock') {computerMove = '✊';}
  if (computerMove == 'paper') {computerMove = '🖐️';}
  if (computerMove =='scissors') {computerMove = '✌️';}
  if (yourMove == 'rock') {yourMove = '✊';}
  if (yourMove == 'paper') {yourMove = '🖐️';}
  if (yourMove =='scissors') {yourMove = '✌️';}
  document.querySelector('.js-moves').innerHTML = `You pickt: ${yourMove} VS Computer pickt: ${computerMove}`;
}

function buttonRockPaperScissors(yourMove) {
  computerMove = pickComputerMove();
  result = getResult(computerMove, yourMove);
  updateMoves(computerMove, yourMove);
  updateResult(result);
  updateScore();
}

function reset () {
  score = {wins: 0, loses: 0, drows: 0};
  localStorage.removeItem('score'); 
  document.querySelector(".js-result").innerHTML = null;
  document.querySelector('.js-moves').innerHTML = null;
  updateScore();
}

let isAutoPlaying = false;
let intervalId;

function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function() {
      const player = pickComputerMove();
      buttonRockPaperScissors(player);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {buttonRockPaperScissors('rock')});

document.querySelector('.js-paper-button').addEventListener('click', () => {buttonRockPaperScissors('paper')});

document.querySelector('.js-scissors-button').addEventListener('click', () => {buttonRockPaperScissors('scissors')});

document.querySelector('.js-reset-button').addEventListener('click', reset);

document.querySelector('.js-auto-play-button').addEventListener('click', autoplay);
