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

  fall = (matrix) => {
    let y = pill.findPill(1).row;
    let x = pill.findPill(1).id;
    let rotation = pill.findPill(1).rotation;
    if (rotation === 1) { // pozioma
      let current_level = matrix[y];
      let down_level = matrix[y + 1];
      if (!down_level || down_level[x] !== 0 || down_level[x + 1] !== 0) {
        matrix.forEach(row => {
          row.forEach(item => {
            if (item.state === 1) item.state = 0;
          })
        });
        clearInterval(game_interval);
        game.init();
        game.start();
      } else if (down_level[x] === 0 && down_level[x + 1] === 0) {
        down_level[x] = current_level[x];
        down_level[x + 1] = current_level[x + 1];
        current_level[x] = 0;
        current_level[x + 1] = 0
      }
    } else { //pionowa
      let prev_level = matrix[y - 1];
      let current_level = matrix[y];
      let down_level = matrix[y + 1];
      if (!down_level || down_level[x] !== 0) {
        matrix.forEach(row => {
          row.forEach(item => {
            if (item.state === 1) item.state = 0;
          })
        });
        clearInterval(game_interval);
        game.init();
        game.start();
      } else if (down_level[x] === 0) {
        down_level[x] = current_level[x];
        current_level[x] = prev_level[x];
        prev_level[x] = 0;

      }
    }
  };

  rotate = (direction, matrix) => { //false UP/lewo true Shift/prawo
    // if (game.active) {
    if (!direction) {
      let y = pill.findPill(1).row;
      let x = pill.findPill(1).id;
      let rotation = pill.findPill(1).rotation;
      if (rotation === 1 && matrix[y - 1][x] === 0) {
        matrix[y][x].rotation = 0;
        matrix[y][x + 1].rotation = 2;
        matrix[y - 1][x] = matrix[y][x + 1];
        matrix[y][x + 1] = 0;
        game.draw(matrix);
      } else if (rotation === 0 && matrix[y][x + 1] === 0) {
        let y = pill.findPill(3).row;
        let x = pill.findPill(3).id;
        matrix[y + 1][x + 1] = matrix[y + 1][x];
        matrix[y + 1][x + 1].rotation = 3;
        matrix[y + 1][x] = matrix[y][x];
        matrix[y + 1][x].rotation = 1;
        matrix[y][x] = 0;
        game.draw(matrix);
      } else if (rotation === 0 && matrix[y][x - 1] === 0 &&
        !matrix[y][x + 1]) {
        let y = pill.findPill(3).row;
        let x = pill.findPill(3).id;
        matrix[y + 1][x].rotation = 3;
        matrix[y + 1][x - 1] = matrix[y][x];
        matrix[y + 1][x - 1].rotation = 1;
        matrix[y][x] = 0;
        game.draw(matrix);
      }
    } else {
      let y = pill.findPill(1).row;
      let x = pill.findPill(1).id;
      let rotation = pill.findPill(1).rotation;
      if (rotation === 1 && matrix[y - 1][x] === 0) {
        matrix[y - 1][x] = matrix[y][x];
        matrix[y - 1][x].rotation = 2;
        matrix[y][x] = matrix[y][x + 1]
        matrix[y][x].rotation = 0;
        matrix[y][x + 1] = 0
        game.draw(matrix);
      } else if (rotation === 0 && matrix[y][x + 1] === 0) {
        let y = pill.findPill(3).row;
        let x = pill.findPill(3).id;
        matrix[y + 1][x + 1] = matrix[y][x];
        matrix[y + 1][x + 1].rotation = 3;
        matrix[y + 1][x].rotation = 1;
        matrix[y][x] = 0;
        game.draw(matrix);
      } else if (rotation === 0 && matrix[y][x - 1] === 0 &&
        !matrix[y][x + 1]) {
        let y = pill.findPill(3).row;
        let x = pill.findPill(3).id;
        matrix[y + 1][x - 1] = matrix[y + 1][x];
        matrix[y + 1][x] = matrix[y][x];
        matrix[y + 1][x].rotation = 3;
        matrix[y + 1][x - 1].rotation = 1;
        matrix[y][x] = 0;
        game.draw(matrix);
      }
    }
    // }


  };

  move_left = (matrix) => {
    if (game.active) {
      let y = pill.findPill(1).row;
      let x = pill.findPill(1).id;
      let rotation = pill.findPill(1).rotation;
      if (rotation === 1) { // Mamy je w poziomie
        if (matrix[y][x - 1] === 0) {
          matrix[y][x - 1] = matrix[y][x];
          matrix[y][x] = matrix[y][x + 1];
          matrix[y][x + 1] = 0;
          game.draw(matrix);
        }
      } else { // mamy je w pionie
        if (matrix[y][x - 1] === 0 && matrix[y - 1][x - 1] === 0) {
          matrix[y][x - 1] = matrix[y][x];
          matrix[y - 1][x - 1] = matrix[y - 1][x];
          matrix[y][x] = 0;
          matrix[y - 1][x] = 0;
          game.draw(matrix);
        }
      }
    }
  };

  move_right = (matrix) => {
    if (game.active) {
      let y = pill.findPill(1).row;
      let x = pill.findPill(1).id;
      let rotation = pill.findPill(1).rotation;
      if (rotation === 1) { // Mamy je w poziomie
        if (matrix[y][x + 2] === 0) {
          matrix[y][x + 2] = matrix[y][x + 1];
          matrix[y][x + 1] = matrix[y][x];
          matrix[y][x] = 0;
          game.draw(matrix);
        }
      } else { // mamy je w pionie
        if (matrix[y][x + 1] === 0 && matrix[y - 1][x + 1] === 0) {
          matrix[y][x + 1] = matrix[y][x];
          matrix[y - 1][x + 1] = matrix[y - 1][x];
          matrix[y][x] = 0;
          matrix[y - 1][x] = 0;
          game.draw(matrix);
        }
      }
    }

  };

}
