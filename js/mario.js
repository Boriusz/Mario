'use strict';

class Mario {
  constructor() {
  }

  setup() {
    board.matrix[6][14] = 0
    board.matrix[7][14] = 0

    board.matrix[4][14] = 'up_1'
    board.matrix[5][14] = 'up_2'
    board.matrix[6][14] = 'up_3'
  }

  throw = (pill) => {
    const animations = [
      function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.move_up(board.matrix, pill)
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.move_up(board.matrix, pill)
        board.matrix[4][14] = 0
        board.matrix[5][14] = 0
        board.matrix[6][14] = 0

        board.matrix[5][13] = 'middle_11'
        board.matrix[5][14] = 'middle_12'
        board.matrix[6][13] = 'middle_21'
        board.matrix[6][14] = 'middle_22'
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
        board.matrix[5][13] = 0
        board.matrix[5][14] = 0
        board.matrix[6][13] = 0
        board.matrix[6][14] = 0

        board.matrix[6][14] = 'down_1'
        board.matrix[7][14] = 'down_2'
      }, // reka w dol
      function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      }, function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      }, function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      }, function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      }, function () {
        game.move_left(board.matrix, pill)
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.move_left(board.matrix, pill)
        game.fall(board.matrix, pill)
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.move_left(board.matrix, pill)
        game.rotate(false, board.matrix, pill)
      },
      function () {
        game.fall(board.matrix, pill)
      }, function () {
        game.fall(board.matrix, pill)
      }, function () {
        create_pill_in_hand();
        mario.setup()
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
