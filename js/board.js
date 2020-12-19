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

  append_piece = (piece, matrix) => {
    matrix[1][3] = piece[0];
    matrix[1][4] = piece[1];
    return matrix
  };
}

const board = new Board(8, 16);

