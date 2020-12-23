'use strict';

class Board {
  constructor(w, h) {
    this.width = w + 7;
    this.height = h + 6;
    this.matrix = this.create_matrix()
  }

  create_matrix = () => {
    const matrix = [];
    while (this.height--) {
      if (this.height <= 13) matrix.push(new Array(8).fill(0));
      else matrix.push(new Array(this.width).fill(0));

    }
    return matrix;
  };

  append_piece = (piece, matrix) => {
    matrix[6][3] = piece[0];
    matrix[6][4] = piece[1];
    return matrix
  };

  append_virus = (viruses, matrix) => {
    viruses.forEach(virus => {
      matrix[virus.y][virus.x] = virus;
    })
    return matrix
  }
}

const board = new Board(8, 16);

