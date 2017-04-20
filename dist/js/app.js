'use strict';

let cellList = Array.prototype.slice.apply(document.querySelectorAll('.cell'));
let array = new Array(9);
let turn = 1;

function ganador(index, letter) {
  array[index] = letter;
  if (
    array[0] === letter && array[1] === letter && array[2] === letter ||
    array[3] === letter && array[4] === letter && array[5] === letter ||
    array[6] === letter && array[7] === letter && array[8] === letter ||
    array[0] === letter && array[3] === letter && array[6] === letter ||
    array[1] === letter && array[4] === letter && array[7] === letter ||
    array[2] === letter && array[5] === letter && array[8] === letter ||
    array[0] === letter && array[4] === letter && array[8] === letter ||
    array[2] === letter && array[4] === letter && array[6] === letter
  ) {
    alert('Ha ganado el Jugador ' + letter);
    document.location.reload();
  }
}

function laVieja(e) {
  let cellIndex = cellList.indexOf(e.target);
  if (turn % 2 === 1) {
    cellList[cellIndex].innerHTML = 'X';
    cellList[cellIndex].style.color = '#EF9A9A';
    ganador(cellIndex, 'X');
    cellList[cellIndex].removeEventListener('click', laVieja);
  } else {
    cellList[cellIndex].innerHTML = 'O';
    cellList[cellIndex].style.color = '#FFCDD2';
    ganador(cellIndex, 'O');
    cellList[cellIndex].removeEventListener('click', laVieja);
  }
  if (turn !== 9) {
    turn++;
  } else {
    alert('Ha sido un Empate!');
    document.location.reload();
  }
}

function ready() {
  for (let i = 0; i < cellList.length; i++) {
    cellList[i].addEventListener('click', laVieja);
  }
}

window.addEventListener('load', ready);