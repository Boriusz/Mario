'use strict';

class Board {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }

  create_matrix = () => {
    const matrix = [];
    while (this.height--) {
      matrix.push(new Array(this.width).fill(0));
    }
    return matrix;
  };

  draw = () => {

  }
}

const board = new Board(8, 16);

