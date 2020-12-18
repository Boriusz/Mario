'use strict';

class Board {
  constructor(w, h) {
    this.width = w;
    this.height = h + 1;
    this.matrix = this.create_matrix()
  }

  create_matrix = () => {
    const matrix = [];
    while (this.height--) {
      matrix.push(new Array(this.width).fill(0));
    }
    return matrix;
  };

  append_piece = (piece) => {
    this.matrix[1][3] = piece[0];
    this.matrix[1][4] = piece[1];
  };

  draw = () => {
    this.matrix.forEach((row, row_index) => {
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

  fall = () => {
    let pill_in_move = this.findPill();
    if (pill_in_move.rotation === 1) { // pozioma
      let current_level = this.matrix[pill_in_move.row];
      let down_level = this.matrix[pill_in_move.row + 1];
      if (!down_level || down_level[pill_in_move.id] !== 0 || down_level[pill_in_move.id + 1] !== 0) {
        this.matrix.forEach(row => {
          row.forEach(item => {
            if (item.state === 1) item.state = 0;
          })
        });
        clearInterval(game_interval);
        game.init();
        game.start();
      } else if (down_level[pill_in_move.id] === 0 && down_level[pill_in_move.id + 1] === 0) {
        down_level[pill_in_move.id] = current_level[pill_in_move.id];
        down_level[pill_in_move.id + 1] = current_level[pill_in_move.id + 1];
        current_level[pill_in_move.id] = 0;
        current_level[pill_in_move.id + 1] = 0
      }
    } else { //pionowa
      let prev_level = this.matrix[pill_in_move.row - 1];
      let current_level = this.matrix[pill_in_move.row];
      let down_level = this.matrix[pill_in_move.row + 1];
      if (!down_level || down_level[pill_in_move.id] !== 0) {
        this.matrix.forEach(row => {
          row.forEach(item => {
            if (item.state === 1) item.state = 0;
          })
        });
        clearInterval(game_interval);
        game.init();
        game.start();
      } else if (down_level[pill_in_move.id] === 0) {
        down_level[pill_in_move.id] = current_level[pill_in_move.id];
        current_level[pill_in_move.id] = prev_level[pill_in_move.id];
        prev_level[pill_in_move.id] = 0;

      }
    }

  };
  rotate = (direction) => { //false UP/lewo true Shift/prawo
    if (!direction) {
      let actual_pill = this.findPill();
      this.matrix[actual_pill.row][actual_pill.id].rotation = 0;
      this.matrix[actual_pill.row][actual_pill.id + 1].rotation = 2;
      this.matrix[actual_pill.row - 1][actual_pill.id] = this.matrix[actual_pill.row][actual_pill.id + 1];
      this.matrix[actual_pill.row][actual_pill.id + 1] = 0;
      this.draw();
    }
  };

  move_left = () => {
    let actual_pill = this.findPill().row;
    let pill_id = this.findPill().id;
    if (this.matrix[actual_pill][pill_id].rotation === 1) { // Mamy je w poziomie
      if (this.matrix[actual_pill][pill_id - 1] === 0) {
        this.matrix[actual_pill][pill_id - 1] = this.matrix[actual_pill][pill_id];
        this.matrix[actual_pill][pill_id] = this.matrix[actual_pill][pill_id + 1];
        this.matrix[actual_pill][pill_id + 1] = 0;
        board.draw()
      }
    } else { // mamy je w pionie
      if (this.matrix[actual_pill][pill_id - 1] === 0 && this.matrix[actual_pill - 1][pill_id - 1] === 0) {
        this.matrix[actual_pill][pill_id - 1] = this.matrix[actual_pill][pill_id];
        this.matrix[actual_pill - 1][pill_id - 1] = this.matrix[actual_pill - 1][pill_id];
        this.matrix[actual_pill][pill_id] = 0;
        this.matrix[actual_pill - 1][pill_id] = 0;
        board.draw()
      }
    }
  };

  move_right = () => {
    let actual_pill = this.findPill().row;
    let pill_id = this.findPill().id;
    if (this.matrix[actual_pill][pill_id].rotation === 1) { // Mamy je w poziomie
      if (this.matrix[actual_pill][pill_id + 2] === 0) {
        this.matrix[actual_pill][pill_id + 2] = this.matrix[actual_pill][pill_id + 1];
        this.matrix[actual_pill][pill_id + 1] = this.matrix[actual_pill][pill_id];
        this.matrix[actual_pill][pill_id] = 0;
        board.draw()
      }
    } else { // mamy je w pionie
      if (this.matrix[actual_pill][pill_id + 1] === 0 && this.matrix[actual_pill - 1][pill_id + 1] === 0) {
        this.matrix[actual_pill][pill_id + 1] = this.matrix[actual_pill][pill_id];
        this.matrix[actual_pill - 1][pill_id + 1] = this.matrix[actual_pill - 1][pill_id];
        this.matrix[actual_pill][pill_id] = 0;
        this.matrix[actual_pill - 1][pill_id] = 0;
        board.draw()
      }
    }

  };

  findPill = () => {
    for (let realm of this.matrix) {
      let returner = realm.findIndex(el => el.state === 1 && (el.rotation === 1 || el.rotation === 0));
      if (returner !== -1) return {
        row: this.matrix.findIndex(el => el === realm),
        id: returner, rotation: realm[returner].rotation
      };
    }
  }
}

const board = new Board(8, 16);

