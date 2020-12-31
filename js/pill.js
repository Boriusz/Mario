'use strict';

class Pill {
  constructor(pill_id, color1, color2, rotation, state) {
    this.id = pill_id;
    this.color = color1;
    this.color2 = color2;
    this.rotation = rotation;
    this.rotation2 = this.rotation + 2
    this.state = state;
    this.y = 3;
    this.y2 = 3;
    this.x = 13;
    this.x2 = 14;
  }

  static pill_counter = 0;
  static pills = []

  rotation_update = (arg, arg2) => {
    this.rotation = arg
    this.rotation2 = arg2
  };

  switch = () => {
    let color = this.color
    this.color = this.color2
    this.color2 = color
  }

  return_piece = () => {
    return [{
      id: this.id, color: this.color, state: this.state, rotation: this.rotation, coords: {
        y: this.y,
        x: this.x
      }
    },
      {
        id: this.id, color: this.color2, state: this.state, rotation: this.rotation2, coords: {
          y: this.y2,
          x: this.x2
        }
      }]

  };
}

const create_pill_in_hand = () => {
  Pill.pill_counter++;
  Pill.pills.push(new Pill(Pill.pill_counter, random_color(), random_color(), 1, 1))
  board.matrix = board.append_piece_to_hand(Pill.pills[Pill.pills.length - 1].return_piece(), board.matrix);
};
