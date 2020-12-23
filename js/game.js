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
        let actual;
        if (row_index > 8) actual = items[((row_index) * 8 + item_index) + 56];
        else actual = items[((row_index) * 15 + item_index)];
        if (actual) {
          if (item !== 0) {
            actual.style.backgroundImage = `url(./img/${item.color}_${item.rotation}.png)`;
            actual.style.backgroundRepeat = `no-repeat`;
            actual.style.backgroundSize = `100% 100%`;
            actual.setAttribute('state', item.state);
          } else {
            actual.removeAttribute('style');
            actual.removeAttribute('state');
          }
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
    if (this.collide(board.matrix, pill.rotation)) {
      pill.state = 0;
      clearInterval(game_interval);
      game.init();
      game.start();
    } else {
      pill.y++;
      pill.y2++;
      matrix[pill.y][pill.x] = pill.return_piece()[0]
      matrix[pill.y2][pill.x2] = pill.return_piece()[1]
      pill.rotation === 1 ? matrix[pill.y - 1][pill.x] = 0 : null // Dla poziomego usuwa także tego u góry drugiego
      matrix[pill.y2 - 1][pill.x2] = 0
    }
  };

  rotate = (direction, matrix) => { //false UP/lewo true Shift/prawo
    if (game.active) {
      if (pill.rotation === 1 && matrix[pill.y - 1][pill.x] === 0 && (pill.x === 3 || pill.x === 4 ? pill.y > 5 : pill.y > 6)) {
        pill.rotation_update(0, 2)
        pill.y2--
        pill.x2--
        direction ? pill.switch() : null
        matrix[pill.y][pill.x] = pill.return_piece()[0]
        matrix[pill.y2][pill.x2] = pill.return_piece()[1]
        matrix[pill.y][pill.x + 1] = 0;
        game.draw(matrix);
      } else if (pill.rotation === 0 && matrix[pill.y][pill.x + 1] === 0 && pill.x < 7) {
        pill.rotation_update(1, 3);
        pill.y2 = pill.y
        pill.x2 = pill.x + 1
        !direction ? pill.switch() : null
        matrix[pill.y][pill.x] = pill.return_piece()[0]
        matrix[pill.y2][pill.x2] = pill.return_piece()[1]
        matrix[pill.y - 1][pill.x] = 0;
        game.draw(matrix);
      } else if (pill.rotation === 0 && matrix[pill.y][pill.x - 1] === 0 &&
        (!matrix[pill.y][pill.x + 1] || pill.x === 7)) {
        pill.rotation_update(1, 3)
        matrix[pill.y2][pill.x2] = 0;
        pill.y2++
        pill.x--
        !direction ? pill.switch() : null
        matrix[pill.y][pill.x] = pill.return_piece()[0]
        matrix[pill.y2][pill.x2] = pill.return_piece()[1]
        game.draw(matrix);
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
      else if (pill.rotation === 0 && matrix[pill.y][pill.x - 1] === 0 && matrix[pill.y2][pill.x2 - 1] === 0 && (pill.y === 6 ? pill.x === 4 : true)) this.move(matrix, -1, true)
    }
  };
  move_right = (matrix) => {
    if (game.active) {
      if (pill.rotation === 1 && matrix[pill.y2][pill.x2 + 1] === 0 && matrix[pill.y2][pill.x2 + 1] === 0 && pill.x2 < 7) this.move(matrix, 1, false)
      else if (matrix[pill.y][pill.x + 1] === 0 && matrix[pill.y - 1][pill.x + 1] === 0 && pill.x2 < 7 && (pill.y === 6 ? pill.x === 3 : true)) this.move(matrix, 1, true)
    }
  };
}
