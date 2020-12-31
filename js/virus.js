'use strict';


class Virus {
  constructor(color, y, x) {
    this.color = color;
    this.y = y;
    this.x = x;
  }

  static viruses = []

  static create_viruses = (counter) => {
    for (let i = 0; i < counter; i++) {
      let virus = new Virus(colors[i % 3], randomize(10, 21), randomize(0, 7));
      if (Virus.viruses.find(el => el?.y === virus.y && el?.x === virus.x)) {
        i--
      } else Virus.viruses[i] = virus
    }

  };
}




