'use strict';

class Board {
  constructor(w, h) {
    this.width = w;
    this.height = h;
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
    this.matrix[0][3] = piece[0];
    this.matrix[0][4] = piece[1];
  };

  draw = () => {
    // console.log(this.matrix);
    this.matrix.forEach((row, row_index) => {
      row.forEach((item, item_index) => {
        if (item !== 0) {
          console.log(item_index);
          items[(row_index) * 8 + (item_index)].style.background = item.color;
          items[(row_index) * 8 + (item_index)].setAttribute('rotation', item.rotation);
          items[(row_index) * 8 + (item_index)].setAttribute('state', item.state);
        } else {

        }
      })
    })
  };

  fall = () => {
    let pill_in_move = this.findPill();
    let current_level = this.matrix[pill_in_move.row];
    let down_level = this.matrix[pill_in_move.row + 1];
    if (down_level[pill_in_move.id] === 0 && down_level[pill_in_move.id + 1] === 0) {
      down_level[pill_in_move.id] = current_level[pill_in_move.id];
      down_level[pill_in_move.id + 1] = current_level[pill_in_move.id + 1];
      current_level[pill_in_move.id] = 0;
      current_level[pill_in_move.id + 1] = 0
    }
  };

  findPill = () => {
    for (let realm of this.matrix) {
      let returner = realm.findIndex(el => el.state === 1 && (el.rotation === 1 || el.rotation === 0));
      if (returner !== -1) return {row: this.matrix.findIndex(el => el === realm), id: returner};
    }
  }
}

const board = new Board(8, 16);

