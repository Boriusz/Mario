'use strict';

const bottle = document.querySelector('#bottle');
const item_dom = document.createElement('div');
item_dom.classList.add('item');
const colors = [
  'br',
  'yl',
  'bl'
];
let game_interval;
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

function add_listeners() {
  document.onkeydown = (e) => {
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') game.move_left(board.matrix, Pill.pills[Pill.pills.length - 2]);
    else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') game.move_right(board.matrix, Pill.pills[Pill.pills.length - 2]);
    else if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') game.rotate(false, board.matrix, Pill.pills[Pill.pills.length - 2]);
    else if (e.key === 'Shift') game.rotate(true, board.matrix, Pill.pills[Pill.pills.length - 2]);
    else if (e.code === 'ArrowDown') game.fall(board.matrix, Pill.pills[Pill.pills.length - 2], true);
    else if (e.code === 'Space') {
      if (!game.active) {
        clearInterval(game_interval)
        game.active = true;
        mario.throw(Pill.pills[Pill.pills.length - 1])
      } else {
        clearInterval(game_interval)
        game.active = true;
      }
    }
  };
}

add_listeners()
const items = document.querySelectorAll('.item');
const game = new Game();
const mario = new Mario();
const player = new Player();
game.init();
game.draw(board.matrix);






