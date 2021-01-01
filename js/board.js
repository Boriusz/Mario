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

  draw = (matrix) => {
    matrix.forEach((row, row_index) => {
      row.forEach((item, item_index) => {
        let actual;
        if (row_index > 8) actual = items[((row_index) * 8 + item_index) + 56];
        else actual = items[((row_index) * 15 + item_index)];
        if (actual) {
          if (item !== 0 && Object.keys(item).length === 5) {
            actual.style.backgroundImage = `url(./img/${item.color}_${item.rotation}.png)`;
            actual.style.backgroundRepeat = `no-repeat`;
            actual.style.backgroundSize = `100% 100%`;
            actual.setAttribute('color', item.color);
            actual.setAttribute('state', item.state);
          } else if (typeof item === "object" && Object.keys(item).length === 4) {
            actual.style.background = `url(./img/covid_${item.color}.png)`
            actual.style.backgroundSize = `100% 100%`;
            actual.setAttribute('color', item.color);
            actual.setAttribute('state', item.state);
          } else if (typeof item === "string") {
            actual.style.backgroundImage = `url(./img/hands/${item}.png`
            actual.style.backgroundRepeat = `no-repeat`;
            actual.style.backgroundSize = `100% 100%`;
          } else {
            actual.removeAttribute('style');
            actual.removeAttribute('state');
            actual.removeAttribute('color');
          }
        }
      })
    })
  };

  append_piece_to_hand = (piece, matrix) => {
    matrix[3][13] = piece[0];
    matrix[3][14] = piece[1];
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

