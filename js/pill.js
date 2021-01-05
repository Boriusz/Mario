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

  static create_pill_in_hand = () => {
    Pill.pills.push(new Pill(Pill.pill_counter, Randoms.random_color(), Randoms.random_color(), 1, 1))
    Board.append_piece_to_hand(Pill.pills[Pill.pills.length - 1].pieces)
    Pill.pill_counter++
  }


  rotation_update = (arg, arg2) => {
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
    if (this.collide(matrix)) {
      matrix[this.y][this.x].state = 0
      matrix[this.y2][this.x2].state = 0
      Game.flag = false
      document.onkeydown = null
      clearInterval(Game.game_interval)
      try {
        await Game.destroy(matrix, this)
        // eslint-disable-next-line no-unused-vars
        for (const item of Pill.pills) {
          await Game.destroy(matrix, item)
        }
        if (this.y === 6 && this.y2 === 6) Game.end(false)
        else if (Virus.viruses.length === 0) Game.end(true)
        else {
          Mario.throw(Pill.pills[Pill.pills.length - 1])
        }
      } catch (e) {
        console.log(e)
      }
    } else {
      flag ? clearInterval(Game.game_interval) : null
      flag ? Game.active = false : null
      this.y++
      this.y2++
      matrix[this.y][this.x] = this.pieces[0]
      matrix[this.y2][this.x2] = this.pieces[1]
      this.rotation === 1 ? matrix[this.y - 1][this.x] = 0 : null // Dla poziomego usuwa także tego u góry drugiego
      matrix[this.y2 - 1][this.x2] = 0
      Board.draw(matrix)
      if (flag) {
        Game.game_interval = setInterval(() => {
          this.fall(Board.matrix)
        }, 20)
      }
    }
  }

  rotate(direction, matrix) { //false UP/lewo true Shift/prawo
    if (Game.active) {
      if (this?.rotation === 1 && matrix[this.y - 1][this.x] === 0 && (Game.flag ? (this.x === 3 || this.x === 4 ? this.y > 5 : this.y > 6) : true)) {
        this.rotation_update(0, 2)
        this.y2--
        this.x2--
        direction ? this.switch() : null
        matrix[this.y][this.x] = this.pieces[0]
        matrix[this.y2][this.x2] = this.pieces[1]
        matrix[this.y][this.x + 1] = 0
        Board.draw(matrix)
      } else if (this?.rotation === 0 && matrix[this.y][this.x + 1] === 0 && this.x < 7) {
        this.rotation_update(1, 3)
        this.y2 = this.y
        this.x2 = this.x + 1
        !direction ? this.switch() : null
        matrix[this.y][this.x] = this.pieces[0]
        matrix[this.y2][this.x2] = this.pieces[1]
        matrix[this.y - 1][this.x] = 0
        Board.draw(matrix)
      } else if (this?.rotation === 0 && matrix[this.y][this.x - 1] === 0 &&
        (!matrix[this.y][this.x + 1] || this.x === 7)) {
        this.rotation_update(1, 3)
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

  move = (matrix, where, rotation) => {
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
  move_left = (matrix) => {
    if (Game.active) {
      if (this.rotation === 1 && matrix[this.y][this.x - 1] === 0) this.move(matrix, -1, false, this)
      else if (this.rotation === 0 && matrix[this.y][this.x - 1] === 0 && matrix[this.y2][this.x2 - 1] === 0 && (this.y === 6 ? this.x === 4 : true)) this.move(matrix, -1, true, this)
    }
  }
  move_right = (matrix) => {
    if (Game.active) {
      if (this.rotation === 1 && matrix[this.y2][this.x2 + 1] === 0 && matrix[this.y2][this.x2 + 1] === 0 && this.x2 < 7) this.move(matrix, 1, false, this)
      else if (matrix[this.y][this.x + 1] === 0 && matrix[this.y - 1][this.x + 1] === 0 && this.x2 < 7 && (this.y === 6 ? this.x === 3 : true)) this.move(matrix, 1, true, this)
    }
  }

  move_up = (matrix) => {
    this.y--
    this.y2--
    matrix[this.y][this.x] = this.pieces[0]
    matrix[this.y + 1][this.x] = 0
    matrix[this.y2][this.x2] = this.pieces[1]
    matrix[this.y2 + 1][this.x2] = 0
  }
}

