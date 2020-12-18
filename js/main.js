'use strict';
const bottle = document.querySelector('#bottle');
const start = document.querySelector('#start');
let game_interval;
const item_dom = document.createElement('div');
item_dom.classList.add('item');
board.matrix.forEach(column => {
  let element = document.createElement('div');
  element.classList.add('row');
  bottle.appendChild(element);
  column.forEach(row => {
    let element2 = document.createElement('div');
    element2.classList.add('item');
    element.appendChild(element2);
  })
});
const rows = document.querySelectorAll('.row');
const items = document.querySelectorAll('.item');
let pill;
const colors = [
  '#808080',
  '#FFFF00',
  '#0000FF'
];
const game = new Game();
game.init();
start.addEventListener('click', () => {
  game.start();
});






