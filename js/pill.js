'use strict'

import Board from './board.js'
import Randoms from './randoms.js'
import Game from './game.js'
import Mario from './mario.js'
import Virus from './virus.js'

export default class Pill {
  constructor(pill_id, color1, color2, rotation, state) {
    this.id = pill_id
    this.color = color1
    this.color2 = color2
    this.rotation = rotation
    this.rotation2 = this.rotation + 2
    this.state = state
    this.y = 3
    this.y2 = 3
    this.x = 13
    this.x2 = 14
  }

  static pill_counter = 0
  static pills = []

  static createPillInHand() {
    Pill.pills.push(new Pill(Pill.pill_counter, Randoms.randomColor(), Randoms.randomColor(), 1, 1))
    Board.appendPieceToHand(Pill.pills[Pill.pills.length - 1].pieces)
    Pill.pill_counter++
  }


  rotationUpdate(arg, arg2) {
    this.rotation = arg
    this.rotation2 = arg2
  }

  switch() {
    let color = this.color
    this.color = this.color2
    this.color2 = color
  }

  get pieces() {
    return [{
      id: this.id, color: this.color, state: this.state, rotation: this.rotation, coords: {
        y: this.y,
        x: this.x
      }
    },
      {
        id: this.id, color: this.color2, state: this.state, rotation: this.rotation2, coords: {
          y: this.y2,
          x: this.x2
        }
      }]
  }

  collide(matrix) {
    if (this.rotation === 1) return !matrix[this.y + 1] || matrix[this.y + 1][this.x] !== 0 ||
      matrix[this.y2 + 1][this.x2] !== 0
    else if (this.rotation === 0) return !matrix[this.y + 1] || matrix[this.y + 1][this.x] !== 0
  }


  async fall(matrix, flag = false) {
    if (Mario.isThrowing) return
    if (this.collide(matrix)) {
      matrix[this.y][this.x].state = 0
      matrix[this.y2][this.x2].state = 0
      Game.flag = false
      Game.keyPressed = true
      clearInterval(Game.gameInterval)
      try {
        await Game.destroy(matrix, this)
        if (this.y === 6 && this.y2 === 6) Game.end(false)
        else if (Virus.virusCounter === 0) Game.end(true)
        else {
          Mario.throw(Pill.pills[Pill.pills.length - 1])
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      flag ? clearInterval(Game.gameInterval) : null
      flag ? Game.active = false : null
      this.y++
      this.y2++
      matrix[this.y][this.x] = this.pieces[0]
      matrix[this.y2][this.x2] = this.pieces[1]
      this.rotation === 1 ? matrix[this.y - 1][this.x] = 0 : null // Dla poziomego usuwa także tego u góry drugiego
      matrix[this.y2 - 1][this.x2] = 0
      Board.draw(matrix)
      if (flag) {
        Game.gameInterval = setInterval(() => {
          this.fall(Board.matrix)
        }, 20)
      }
    }
  }

  rotate(direction, matrix) { //false UP/lewo true Shift/prawo
    if (Game.active) {
      if (this?.rotation === 1 && matrix[this.y - 1] && matrix[this.y - 1][this.x] === 0 && (Game.flag ? (this.x === 3 || this.x === 4 ? this.y > 5 : this.y > 6) : true)) {
        this.rotationUpdate(0, 2)
        this.y2--
        this.x2--
        direction ? this.switch() : null
        matrix[this.y][this.x] = this.pieces[0]
        matrix[this.y2][this.x2] = this.pieces[1]
        matrix[this.y][this.x + 1] = 0
        Board.draw(matrix)
      } else if (this?.rotation === 0 && matrix[this.y][this.x + 1] === 0 && this.x < 7) {
        this.rotationUpdate(1, 3)
        this.y2 = this.y
        this.x2 = this.x + 1
        !direction ? this.switch() : null
        matrix[this.y][this.x] = this.pieces[0]
        matrix[this.y2][this.x2] = this.pieces[1]
        matrix[this.y - 1][this.x] = 0
        Board.draw(matrix)
      } else if (this?.rotation === 0 && matrix[this.y][this.x - 1] === 0 &&
        (!matrix[this.y][this.x + 1] || this.x === 7)) {
        this.rotationUpdate(1, 3)
        matrix[this.y2][this.x2] = 0
        this.y2++
        this.x--
        !direction ? this.switch() : null
        matrix[this.y][this.x] = this.pieces[0]
        matrix[this.y2][this.x2] = this.pieces[1]
        Board.draw(matrix)
      }
    }
  }

  move(matrix, where, rotation) {
    this.x += where
    this.x2 += where
    matrix[this.y][this.x] = this.pieces[0]
    matrix[this.y2][this.x2] = this.pieces[1]
    if (where > 0) {
      matrix[this.y][this.x - 1] = 0
      rotation ? matrix[this.y2][this.x2 - 1] = 0 : null
    } else {
      matrix[this.y2][this.x2 + 1] = 0
      rotation ? matrix[this.y][this.x + 1] = 0 : null
    }
    Board.draw(matrix)
  }

  moveLeft(matrix, flag = true) {
    if (Game.active && (flag ? true : this.y > 5)) {
      if (this.rotation === 1 && matrix[this.y][this.x - 1] === 0) this.move(matrix, -1, false, this)
      else if (this.rotation === 0 && matrix[this.y][this.x - 1] === 0 && matrix[this.y2][this.x2 - 1] === 0 && (this.y === 6 ? this.x === 4 : true)) this.move(matrix, -1, true, this)
    }
  }

  moveRight(matrix, flag = true) {
    if (Game.active && (flag ? true : this.y > 5)) {
      if (this.rotation === 1 && matrix[this.y2][this.x2 + 1] === 0 && matrix[this.y2][this.x2 + 1] === 0 && this.x2 < 7) this.move(matrix, 1, false, this)
      else if (matrix[this.y][this.x + 1] === 0 && matrix[this.y - 1][this.x + 1] === 0 && this.x2 < 7 && (this.y === 6 ? this.x === 3 : true)) this.move(matrix, 1, true, this)
    }
  }

  moveUp(matrix) {
    this.y--
    this.y2--
    matrix[this.y][this.x] = this.pieces[0]
    matrix[this.y + 1][this.x] = 0
    matrix[this.y2][this.x2] = this.pieces[1]
    matrix[this.y2 + 1][this.x2] = 0
  }
}

