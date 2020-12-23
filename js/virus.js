'use strict';

let viruses = []

class Virus {
  constructor(color, y, x) {
    this.color = color;
    this.y = y;
    this.x = x;
  }
}

const create_viruses = (counter) => {
  while (counter--) {
    let virus = new Virus(random_color(), randomize(10, 21), randomize(0, 7));
    if (viruses.find(el => el?.y === virus.y && el?.x === virus.x)) {
      counter++
    } else viruses[counter] = virus
  }
};
