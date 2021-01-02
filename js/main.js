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
    if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') Pill.pills[Pill.pills.length - 2].move_left(board.matrix);
    else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') Pill.pills[Pill.pills.length - 2].move_right(board.matrix);
    else if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') Pill.pills[Pill.pills.length - 2].rotate(false, board.matrix);
    else if (e.key === 'Shift') Pill.pills[Pill.pills.length - 2].rotate(true, board.matrix);
    else if (e.code === 'ArrowDown') Pill.pills[Pill.pills.length - 2].fall(board.matrix, true);
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
mario.setup()
const player = new Player();
game.init();
board.draw(board.matrix);






