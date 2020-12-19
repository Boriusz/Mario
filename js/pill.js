'use strict';

let pill_counter = 0;
class Pill {
  constructor(pill_id, color1, color2, rotation, state) {
    this.pill_id = pill_id;
    this.color = color1;
    this.color2 = color2;
    this.rotation = rotation;
    this.rotation2 = this.rotation + 2
    this.state = state;
    this.y = 1;
    this.y2 = 1;
    this.x = 3;
    this.x2 = 4;
  }

  rotation_update = (arg, arg2) => {
    this.rotation = arg
    this.rotation2 = arg2
  };

  switch_rotation = () => {
    let rotation = this.rotation
    this.rotation = this.rotation2
    this.rotation2 = rotation
  }

  switch = () => {
    let color = this.color
    this.color = this.color2
    this.color2 = color
  }

  return_piece = () => {
    return [{
      id: this.pill_id, color: this.color, state: this.state, rotation: this.rotation, coords: {
        y: this.y,
        x: this.x
      }
    },
      {
        id: this.pill_id, color: this.color2, state: this.state, rotation: this.rotation2, coords: {
          y: this.y2,
          x: this.x2
        }
      }]

  };
}

const create_pill = () => {
  pill_counter++;
  pill = new Pill(pill_counter, random_color(), random_color(), 1, 1);
};
