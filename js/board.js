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

}

const board = new Board(8, 16);

