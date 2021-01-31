'use strict'

import Board from './board.js'
import Game from './game.js'
import {getAnimations} from './variables.js'

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
    const timer = ms => new Promise(resolve => setTimeout(resolve, ms))
    const animations = getAnimations(pill)
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
