'use strict';

class Pill {
  constructor(color1, color2, rotation, state) {
    this.color1 = color1;
    this.color2 = color2;
    this.rotation = rotation;
    this.state = state;
  }

  return_piece = () => {
    if (this.rotation === 0) {
      return [
        [this.color2, 0],
        [this.color1, 0],
      ];
    } else {
      return [
        [0, 0],
        [this.color1, this.color2],
      ]
    }
  };
}

const create_pill = () => {
  pill = new Pill(random_color(), random_color(), random_0_1(), 0);
};
