'use strict';

let pill_counter = 0;
class Pill {
  constructor(pill_id, color1, color2, rotation, state) {
    this.pill_id = pill_id;
    this.color1 = color1;
    this.color2 = color2;
    this.rotation = rotation;
    this.state = state;
  }

  return_piece = () => {
    return [{id: this.pill_id, color: this.color1, state: this.state, rotation: this.rotation},
      {id: this.pill_id, color: this.color2, state: this.state, rotation: this.rotation + 2}]

  };

  findPill = (rot) => {
    for (let realm of board.matrix) {
      let returner = realm.findIndex(el => el.state === 1 && (el.rotation === rot || el.rotation === rot - 1));
      if (returner !== -1) return {
        row: board.matrix.findIndex(el => el === realm),
        id: returner, rotation: realm[returner].rotation
      };
    }
  };

}

const create_pill = () => {
  pill_counter++;
  pill = new Pill(pill_counter, random_color(), random_color(), 1, 1);
};
