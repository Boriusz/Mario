'use strict';

class Mario {
  constructor() {
  }

  throw = (matrix) => {
    console.log('throwing')
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
        game.fall(board.matrix)
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
        game.fall(board.matrix)
      }, function () {
        game.fall(board.matrix)
      }, function () {
        create_pill_in_hand();
        game.fall(board.matrix)
      }, function () {
        game.fall(board.matrix)
        game_interval = setInterval(() => {
          game.fall(board.matrix);
        }, 500)
      },
    ]
    const timer = ms => new Promise(res => setTimeout(res, ms))

    async function perform_animation() { // We need to wrap the loop into an async function for this to work
      for (let i = 0; i <= animations.length; i++) {
        if (i === animations.length) {
          game.flag = true
          add_listeners()
        } else {
          animations[i]()
          await timer(20);
        } // then the created Promise can be awaited
      }
    }

    perform_animation();
  }
}
