'use strict'

import {randomize, colors} from './variables.js'
import Game from './game.js'
import {frames} from './variables.js'
import Board from './board.js'
import {player} from './player.js'

const virusContainer = document.querySelector('#magnifier')
const virusBr = document.querySelector('#virus_br')
const virusYl = document.querySelector('#virus_yl')
const virusBl = document.querySelector('#virus_bl')

export default class Virus {
  constructor(color, y, x) {
    this.color = color
    this.y = y
    this.x = x
    this.kek = 'kek'
  }

  static stopMove = false
  static virusCounter
  static state = 1
  static currentFrame = 0
  static viruses = []

  static animateViruses = () => {
    if (Game.over) {
      if (this.state !== 2) {
        this.state = 2
      } else this.state += 2
      for (const child of virusContainer.children) {
        const colorOfChild = [child.id[child.id.length - 2], child.id[child.id.length - 1]].join('')
        child.style.backgroundImage = `url(./img/lupa/${colorOfChild}/${this.state}.png)`
      }
    } else {
      if (this.state === 4 && !this.stopMove) {
        this.currentFrame === frames.length - 1 ? this.currentFrame = 0 : this.currentFrame++
        const {brTop, brLeft} = frames[this.currentFrame].br
        const {ylTop, ylLeft} = frames[this.currentFrame].yl
        const {blTop, blLeft} = frames[this.currentFrame].bl
        virusBr.style.top = brTop
        virusBr.style.left = brLeft
        virusYl.style.top = ylTop
        virusYl.style.left = ylLeft
        virusBl.style.top = blTop
        virusBl.style.left = blLeft
        this.state = 1
      } else if (this.state === 4) this.state = 1
      else this.state++
      for (const child of virusContainer.children) {
        const colorOfChild = [child.id[child.id.length - 2], child.id[child.id.length - 1]].join('')
        if (this.viruses.find(el => el.color === colorOfChild && el.kek === 'dying')) {
          child.style.backgroundSize = '92px'
          child.style.backgroundImage = `url(./img/lupa/${colorOfChild}/padaka${Math.ceil(this.state / 2)}.png)`
        } else {
          child.style.backgroundSize = 'auto'
          child.style.backgroundImage = `url(./img/lupa/${colorOfChild}/${this.state}.png)`
        }
      }
    }
  }

  static createViruses = (counter) => {
    this.virusCounter = counter
    for (let i = 0; i < counter; i++) {
      let virus = new Virus(colors[i % 3], randomize(21, 11), randomize(7, 0))
      if (this.viruses.find(el => el?.y === virus.y && el?.x === virus.x)) {
        i--
      } else {
        this.viruses[i] = virus
      }
    }

  }

  static destroyVirus(virus) {
    this.virusCounter--
    player.updateDetails()
    this.stopMove = true
    this.viruses[this.viruses.findIndex(el => el === virus)].kek = 'dying'
    setTimeout(() => {
      this.stopMove = false
      this.viruses.splice(this.viruses.findIndex(el => el === virus), 1)
      Board.draw(Board.matrix)
    }, 2000)

    player.score += 100
    if (player.score > parseInt(localStorage.getItem('topScore'))) {
      localStorage.setItem('topScore', player.score.toString())
    }
  }
}




