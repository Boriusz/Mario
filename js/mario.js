'use strict'

import Board from './board.js'
import Game from './game.js'
import Pill from './pill.js'

export default class Mario {

  static isThrowing = false

  static setup() {
    Board.matrix[6][14] = 0
    Board.matrix[7][14] = 0

    Board.matrix[4][14] = 'up_1'
    Board.matrix[5][14] = 'up_2'
    Board.matrix[6][14] = 'up_3'
  }

  static weirdDrop(pill) {
    Board.matrix[pill.y + 1][pill.x] = pill.pieces[0]
    pill.y++
    Board.matrix[pill.y2 + 1][pill.x2] = pill.pieces[1]
    pill.y2++
    Board.matrix[pill.y - 1][pill.x] = 0
    Board.matrix[pill.y2 - 1][pill.x2] = 0
    Board.draw(Board.matrix)
  }

  static throw(pill) {
    Mario.isThrowing = true
    Game.flag = false
    Game.active = true
    const animations = [
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.moveUp(Board.matrix)
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.moveUp(Board.matrix)
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
        pill.moveLeft(Board.matrix)
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.moveLeft(Board.matrix)
        pill.fall(Board.matrix)
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.rotate(false, Board.matrix)
      },
      function () {
        pill.moveLeft(Board.matrix)
        pill.rotate(false, Board.matrix)
      },
      function () {
        Mario.weirdDrop(pill)
      }, function () {
        Mario.weirdDrop(pill)
      }, function () {
        Pill.createPillInHand()
        Mario.setup()
        Mario.weirdDrop(pill)
        Mario.weirdDrop(pill)
        Game.flag = true
        Game.keyPressed = false
      }, function () {
        Mario.weirdDrop(pill)
        Mario.isThrowing = false
        Game.gameInterval = setInterval(() => {
          pill.fall(Board.matrix)
        }, 500)
      },
    ]
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms))

    async function performAnimation() {
      for (let i = 0; i <= animations.length; i++) {
        if (i === animations.length) {
          pill.flag = true
        } else {
          animations[i]()
          await timer(15)
        }
      }
    }

    performAnimation()
  }


}
