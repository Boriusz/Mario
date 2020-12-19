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
  column.forEach(() => {
    let element2 = document.createElement('div');
    element2.classList.add('item');
    element.appendChild(element2);
  })
});
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
  clearInterval(game_interval)
  game.active = true;
  game.start();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') game.move_left(board.matrix);
  else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') game.move_right(board.matrix);
  else if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') game.rotate(false, board.matrix);
  else if (e.key === 'Shift') game.rotate(true, board.matrix);
  else if (e.code === 'Space') {
    if (!game.active) {
      clearInterval(game_interval)
      game.active = true;
      game.start();
    } else {
      clearInterval(game_interval)
      game.active = false;
    }
  }
});





