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

  throw = async (pill) => {
    for (const pill of Pill.pills) {
      await game.destroy(board.matrix, pill)
    }
    game.active = true
    const animations = [
      function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.move_up(board.matrix)
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.move_up(board.matrix)
        board.matrix[4][14] = 0
        board.matrix[5][14] = 0
        board.matrix[6][14] = 0

        board.matrix[5][13] = 'middle_11'
        board.matrix[5][14] = 'middle_12'
        board.matrix[6][13] = 'middle_21'
        board.matrix[6][14] = 'middle_22'
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
        board.matrix[5][13] = 0
        board.matrix[5][14] = 0
        board.matrix[6][13] = 0
        board.matrix[6][14] = 0

        board.matrix[6][14] = 'down_1'
        board.matrix[7][14] = 'down_2'
      }, // reka w dol
      function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      }, function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      }, function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      }, function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      }, function () {
        pill.move_left(board.matrix)
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.move_left(board.matrix)
        pill.fall(board.matrix)
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.move_left(board.matrix)
        pill.rotate(false, board.matrix)
      },
      function () {
        pill.fall(board.matrix)
      }, function () {
        pill.fall(board.matrix)
      }, function () {
        Pill.create_pill_in_hand();
        mario.setup()
        pill.fall(board.matrix)
      }, function () {
        pill.fall(board.matrix)
        game.flag = true
        game_interval = setInterval(() => {
          pill.fall(board.matrix);
        }, 500)
      },
    ]
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

    async function perform_animation() {
      for (let i = 0; i <= animations.length; i++) {
        if (i === animations.length) {
          pill.flag = true
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
