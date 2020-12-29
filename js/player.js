'use strict';

class Player {
  constructor() {
    this.score = 0
    this.viruses = 0
  }

  update_score = (value) => {
    this.score += value
  }
  destroy_virus = () => {
    this.viruses--
  }
}
