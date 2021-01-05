'use strict'

import Board from './board.js'
import Game from './game.js'
import Pill from './pill.js'

export default class Mario {

  static setup() {
    Board.matrix[6][14] = 0
    Board.matrix[7][14] = 0

    Board.matrix[4][14] = 'up_1'
    Board.matrix[5][14] = 'up_2'
    Board.matrix[6][14] = 'up_3'
  }

  static throw(pill) {
    Game.flag = false
    Game.active = true
    const animations = [
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.move_up(Board.matrix)
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.move_up(Board.matrix)
        Board.matrix[4][14] = 0
        Board.matrix[5][14] = 0
        Board.matrix[6][14] = 0

        Board.matrix[5][13] = 'middle_11'
        Board.matrix[5][14] = 'middle_12'
        Board.matrix[6][13] = 'middle_21'
        Board.matrix[6][14] = 'middle_22'
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
        Board.matrix[5][13] = 0
        Board.matrix[5][14] = 0
        Board.matrix[6][13] = 0
        Board.matrix[6][14] = 0

        Board.matrix[6][14] = 'down_1'
        Board.matrix[7][14] = 'down_2'
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      }, function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      }, function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      }, function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      }, function () {
        pill.move_left(Board.matrix)
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.move_left(Board.matrix)
        pill.fall(Board.matrix)
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.move_left(Board.matrix)
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.fall(Board.matrix)
      }, function () {
        pill.fall(Board.matrix)
      }, function () {
        Pill.create_pill_in_hand()
        Mario.setup()
        pill.fall(Board.matrix)
        Game.flag = true
        document.onkeydown = (e) => {
          if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') Pill.pills[Pill.pills.length - 2].move_left(Board.matrix)
          else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') Pill.pills[Pill.pills.length - 2].move_right(Board.matrix)
          else if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') Pill.pills[Pill.pills.length - 2].rotate(false, Board.matrix)
          else if (e.key === 'Shift') Pill.pills[Pill.pills.length - 2].rotate(true, Board.matrix)
          else if (e.code === 'ArrowDown') Pill.pills[Pill.pills.length - 2].fall(Board.matrix, true)
          else if (e.code === 'Space') {
            if (!Game.active) {
              clearInterval(Game.game_interval)
              Game.active = true
              Mario.throw(Pill.pills[Pill.pills.length - 1])
            } else {
              clearInterval(Game.game_interval)
              Game.active = true
            }
          }
        }
      }, function () {
        pill.fall(Board.matrix)
        Game.game_interval = setInterval(() => {
          pill.fall(Board.matrix)
        }, 500)
      },
    ]
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

    async function perform_animation() {
      for (let i = 0; i <= animations.length; i++) {
        if (i === animations.length) {
          pill.flag = true
        } else {
          animations[i]()
          await timer(15)
        }
      }
    }

    perform_animation()
  }


}
