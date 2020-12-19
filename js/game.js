'use strict';

class Game {
  constructor() {
    this.active = false;
  }

  init() {
    create_pill();
    board.matrix = board.append_piece(pill.return_piece(), board.matrix);
  }

  start() {
    this.draw(board.matrix);
    game_interval = setInterval(() => {
      this.fall(board.matrix);
      this.draw(board.matrix);
    }, 500)
  };

  draw = (matrix) => {
    board.matrix = matrix;
    matrix.forEach((row, row_index) => {
      row.forEach((item, item_index) => {
        let actual = items[(row_index) * 8 + item_index];
        if (item !== 0) {
          actual.style.background = item.color;
          actual.setAttribute('rotation', item.rotation);
          actual.setAttribute('state', item.state);
        } else {
          actual.removeAttribute('style');
          actual.removeAttribute('rotation');
          actual.removeAttribute('state');
        }
      })
    })
  };
  collide = (matrix, rotation) => {
    if (rotation === 1) return !matrix[pill.y + 1] || matrix[pill.y + 1][pill.x] !== 0 ||
      matrix[pill.y2 + 1][pill.x2] !== 0;
    else if (rotation === 0) return !matrix[pill.y + 1] || matrix[pill.y + 1][pill.x] !== 0
  };

  fall = (matrix) => {
    let y = pill.y
    let y2 = pill.y2
    let x = pill.x
    let x2 = pill.x2
    let rotation = pill.rotation;
    if (rotation === 1) { // pozioma
      if (this.collide(board.matrix, pill.rotation)) {
        pill.state = 0;
        clearInterval(game_interval);
        game.init();
        game.start();
      } else {
        pill.y += 1;
        pill.y2 += 1;
        matrix[pill.y][x] = pill.return_piece()[0]
        matrix[pill.y2][x2] = pill.return_piece()[1]
        matrix[y][x] = 0
        matrix[y2][x2] = 0
      }
    } else { //pionowa
      if (this.collide(board.matrix, pill.rotation)) {
        pill.state = 0;
        clearInterval(game_interval);
        game.init();
        game.start();
      } else {
        pill.x2 = pill.x
        pill.y += 1;
        pill.y2 += 1;
        matrix[pill.y][pill.x] = pill.return_piece()[0]
        matrix[pill.y2][pill.x2] = pill.return_piece()[1]
        matrix[y - 1][x] = 0
        matrix[y2][x2] = 0
      }
    }
  };

  rotate = (direction, matrix) => { //false UP/lewo true Shift/prawo
    if (game.active) {
      if (!direction) {
        if (pill.rotation === 1 && matrix[pill.y - 1][pill.x] === 0) {
          pill.rotation_update(0, 2)
          pill.y2 = pill.y - 1
          pill.x2 = pill.x
          matrix[pill.y][pill.x] = pill.return_piece()[0]
          matrix[pill.y2][pill.x2] = pill.return_piece()[1]
          matrix[pill.y][pill.x + 1] = 0;
          game.draw(matrix);
        } else if (pill.rotation === 0 && matrix[pill.y][pill.x + 1] === 0) {
          pill.rotation_update(1, 3);
          pill.y2 = pill.y
          pill.x2 = pill.x + 1
          pill.switch()
          matrix[pill.y][pill.x] = pill.return_piece()[0]
          matrix[pill.y2][pill.x2] = pill.return_piece()[1]
          matrix[pill.y - 1][pill.x] = 0;
          game.draw(matrix);
        } else if (pill.rotation === 0 && matrix[pill.y][pill.x - 1] === 0 &&
          !matrix[pill.y][pill.x + 1]) {
          pill.rotation_update(1, 3)
          matrix[pill.y2][pill.x2] = 0;
          pill.y2++
          pill.x--
          pill.switch()
          matrix[pill.y][pill.x] = pill.return_piece()[0]
          matrix[pill.y2][pill.x2] = pill.return_piece()[1]
          game.draw(matrix);
        }
    } else {
        if (pill.rotation === 1 && matrix[pill.y - 1][pill.x] === 0) {
          pill.rotation_update(0, 2)
          pill.y2--
          pill.x2--
          pill.switch()
          matrix[pill.y][pill.x] = pill.return_piece()[0]
          matrix[pill.y2][pill.x2] = pill.return_piece()[1]
          matrix[pill.y][pill.x + 1] = 0;
          game.draw(matrix);
        } else if (pill.rotation === 0 && matrix[pill.y][pill.x + 1] === 0) {
          pill.rotation_update(1, 3);
          pill.y2 = pill.y
          pill.x2 = pill.x + 1
          matrix[pill.y][pill.x] = pill.return_piece()[0]
          matrix[pill.y2][pill.x2] = pill.return_piece()[1]
          matrix[pill.y - 1][pill.x] = 0;
          game.draw(matrix);
        } else if (pill.rotation === 0 && matrix[pill.y][pill.x - 1] === 0 &&
          !matrix[pill.y][pill.x + 1]) {
          pill.rotation_update(1, 3)
          matrix[pill.y2][pill.x2] = 0;
          pill.y2++
          pill.x--
          matrix[pill.y][pill.x] = pill.return_piece()[0]
          matrix[pill.y2][pill.x2] = pill.return_piece()[1]
          game.draw(matrix);
        }
      }
    }
  };

  move = (matrix, where, rotation) => {
    pill.x += where
    pill.x2 += where
    matrix[pill.y][pill.x] = pill.return_piece()[0]
    matrix[pill.y2][pill.x2] = pill.return_piece()[1]
    if (where > 0) {
      matrix[pill.y][pill.x - 1] = 0;
      rotation ? matrix[pill.y2][pill.x2 - 1] = 0 : null
    } else {
      matrix[pill.y2][pill.x2 + 1] = 0;
      rotation ? matrix[pill.y][pill.x + 1] = 0 : null
    }
    game.draw(matrix);
  }
  move_left = (matrix) => {
    if (game.active) {
      if (pill.rotation === 1 && matrix[pill.y][pill.x - 1] === 0) this.move(matrix, -1, false)
      else if (pill.rotation === 0 && matrix[pill.y][pill.x - 1] === 0 && matrix[pill.y2][pill.x2 - 1] === 0) this.move(matrix, -1, true)
    }
  };
  move_right = (matrix) => {
    if (game.active) {
      if (pill.rotation === 1 && matrix[pill.y2][pill.x2 + 1] === 0 && matrix[pill.y2][pill.x2 + 1] === 0) this.move(matrix, 1, false)
      else if (matrix[pill.y][pill.x + 1] === 0 && matrix[pill.y - 1][pill.x + 1] === 0) this.move(matrix, 1, true)
    }
  };
}
