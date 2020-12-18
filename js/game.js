'use strict';

class Game {
  constructor(points, level) {
    this.points = points;
    this.level = level;
  }

  init() {
    create_pill();
    board.append_piece(pill.return_piece());
  }

  start() {
    board.draw();
    game_interval = setInterval(() => {
      board.fall();
      board.draw();
    }, 500)
  };
}
