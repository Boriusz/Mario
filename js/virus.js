'use strict'

import Randoms from './randoms.js'
import Game from './game.js'
import {player} from './player.js'
import {frames} from './variables.js'

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
          child.style.backgroundImage = `url(./img/lupa/${colorOfChild}/padaka${Math.ceil(this.state / 2)}.png)`
        } else {
          child.style.backgroundImage = `url(./img/lupa/${colorOfChild}/${this.state}.png)`
        }
      }
    }
  }

  static createViruses = (counter) => {
    Virus.virusCounter = counter
    for (let i = 0; i < counter; i++) {
      let virus = new Virus(Randoms.colors[i % 3], Randoms.randomize(11, 21), Randoms.randomize(0, 7))
      if (Virus.viruses.find(el => el?.y === virus.y && el?.x === virus.x)) {
        i--
      } else {
        Virus.viruses[i] = virus
      }
    }

  }
}




