/* global getWinner */
/* global clicker */
var state = {
  items: []
};
var ls = localStorage.getItem('game');
if (ls) {
  state = JSON.parse(ls);
}
window.addEventListener('load', function main1() {
  'use strict';
  var gameField = document.querySelector('.field');
  var errorDiv = document.querySelector('.error-message');
  var buttonGenField = document.querySelector('.generateField');
  var inputCount = document.querySelector('.count');
  var mainGameField = document.querySelector('.mainGame');
  var startGameField = document.querySelector('.startGame');
  var startGameButton = document.querySelector('.startNewGame');
  var winMess = document.querySelector('.winner-message');
  var res;
  var hod;
  // Функция проверки является ли число десятичным
  function isDec(d) {
    if (d.length > 1 && Number(d[0]) !== 0 || d.length === 1) {
      res = true;
    } else res = false;
    return res;
  }
// Функция проверки кооректности введенного числа
  function currentNumber(n) {
    return ( !isNaN(parseInt(n, 10)) && isFinite(n) && isDec(n) && !((n + '').indexOf('.') > 0) && parseInt(n, 10) >= 5 && parseInt(n, 10) <= 15);
  }
// Добавить слушателя на поле, чтоб еслинт не задрачивал
  function createField() {
    var numberFields = inputCount.value;
    var j;
    winMess.style.display = 'none';
    if (!currentNumber(numberFields)) {
      errorDiv.innerText = 'Вы ввели некорректное число';
    } else {
      state.items = [];
      for (j = 0; j < numberFields * numberFields; j++) {
        state.items.push('');
      }
      localStorage.setItem('game', JSON.stringify(state));
      drawField();
    }
  }
  // Функция начала игры(ДОРАБОТАТЬ)
  function startGame() {
    buttonGenField.removeEventListener('click', createField);
    hod = 0;
    // Удалить ячейки
    winMess.style.display = 'none';
    // rows = document.querySelectorAll('.row');
    while (gameField.firstChild) {
      gameField.removeChild(gameField.firstChild);
    }
    gameField.innerText = '';

    startGameField.style.display = 'block';
    startGameButton.style.display = 'none';
    buttonGenField.addEventListener('click', createField);
  }
  function drawField() {
    var nc;
    var nr;
    var numberCells = state.items.length;
    var nuberRows = Math.sqrt(numberCells);
    var rows;
    var createRow;
    var createCell;
    hod = 0;
    errorDiv.innerText = '';
    gameField.innerHTML = '';
    mainGameField.style.display = 'inline-block';
    startGameButton.style.display = 'block';
    startGameField.style.display = 'none';
    winMess.style.display = 'none';
    for (nr = 0; nr < nuberRows; nr++) {
      createRow = document.createElement('div');
      createRow.classList.add('row');
      gameField.appendChild(createRow);
    }
    rows = document.querySelectorAll('.row');
    for (nc = 0; nc < numberCells; nc++) {
      createCell = document.createElement('div');
      createCell.classList.add('cell');
      if (state.items[nc] === 'x') {
        createCell.classList.add('x');
        hod++;
      }
      if (state.items[nc] === 'o') {
        createCell.classList.add('o');
        hod++;
      }
      rows[(Math.floor(nc / nuberRows))].appendChild(createCell);
    }
    startGameButton.style.display = 'block';
    startGameButton.addEventListener('click', startGame);
    gameField.addEventListener('click', clicker);
  }
  function clicker(event) {
    var winner;
    // console.log(event.target.classList);
    var cellIndex = Array.prototype.indexOf.call(document.querySelectorAll('.cell'), event.target);
    startGameField.style.display = 'none';
    if (event.target.classList.contains('cell')) {
      if (!event.target.classList.contains('x') && !event.target.classList.contains('o')) {
        if (hod % 2 === 0) {
          state.items[cellIndex] = 'x';
        } else {
          state.items[cellIndex] = 'o';
        }
        hod++;
        localStorage.setItem('game', JSON.stringify(state));
        drawField();
        winner = getWinner();
        if (winner) {
          if (winner === 'x') document.querySelector('.winner-message').innerHTML = 'Крестик победил';
          if (winner === 'o') document.querySelector('.winner-message').innerHTML = 'Нолик победил';
          winMess.style.display = 'block';
          gameField.removeEventListener('click', clicker);
          state.items = [];
          localStorage.setItem('game', JSON.stringify(state));
        }
      }
    }
  }

  if (state.items.length > 5) {
    drawField();
  } else {
    buttonGenField.addEventListener('click', createField);
  }
});


