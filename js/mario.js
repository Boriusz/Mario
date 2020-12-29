'use strict';

class Mario {
  constructor() {
  }

  throw = () => {
    pill = pill_in_hand;
    const animations = [
      function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.move_up(board.matrix)
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.move_up(board.matrix)
        game.rotate(false, board.matrix)
      }, //reka w dol
      function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      }, // reka w dol
      function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      }, function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      }, function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      }, function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      }, function () {
        game.move_left(board.matrix)
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.move_left(board.matrix)
        game.fall(board.matrix, pill)
        game.rotate(false, board.matrix)
      },
      function () {
        game.rotate(false, board.matrix)
      },
      function () {
        game.move_left(board.matrix)
        game.rotate(false, board.matrix)
      },
      function () {
        game.fall(board.matrix, pill)
      }, function () {
        game.fall(board.matrix, pill)
      }, function () {
        create_pill_in_hand();
        game.fall(board.matrix, pill)
      }, function () {
        game.fall(board.matrix, pill)
        game_interval = setInterval(() => {
          game.fall(board.matrix, pill);
        }, 500)
      },
    ]
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

    async function perform_animation() {
      for (let i = 0; i <= animations.length; i++) {
        if (i === animations.length) {
          game.flag = true
          add_listeners()
        } else {
          animations[i]()
          await timer(15);
        }
      }
    }

    perform_animation();
  }
}
