'use strict'

import Randoms from './randoms.js'
import Game from './game.js'
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
  static frames = [
    {br: {brTop: 90, brLeft: 50}, yl: {ylTop: 40, ylLeft: 170}, bl: {blTop: 150, blLeft: 152}},
    {br: {brTop: 125, brLeft: 67}, yl: {ylTop: 25, ylLeft: 135}, bl: {blTop: 130, blLeft: 185}},
    {br: {brTop: 140, brLeft: 84}, yl: {ylTop: 30, ylLeft: 110}, bl: {blTop: 110, blLeft: 194}},
    {br: {brTop: 160, brLeft: 101}, yl: {ylTop: 33, ylLeft: 90}, bl: {blTop: 90, blLeft: 201}},
    {br: {brTop: 160, brLeft: 118}, yl: {ylTop: 50, ylLeft: 80}, bl: {blTop: 70, blLeft: 201}},
    {br: {brTop: 160, brLeft: 135}, yl: {ylTop: 65, ylLeft: 65}, bl: {blTop: 60, blLeft: 181}},
    {br: {brTop: 150, brLeft: 152}, yl: {ylTop: 90, ylLeft: 50}, bl: {blTop: 42, blLeft: 152}},

    {yl: {ylTop: 125, ylLeft: 67}, bl: {blTop: 25, blLeft: 135}, br: {brTop: 130, brLeft: 185}},
    {yl: {ylTop: 140, ylLeft: 84}, bl: {blTop: 30, blLeft: 110}, br: {brTop: 110, brLeft: 194}},
    {yl: {ylTop: 160, ylLeft: 101}, bl: {blTop: 33, blLeft: 90}, br: {brTop: 90, brLeft: 201}},
    {yl: {ylTop: 160, ylLeft: 118}, bl: {blTop: 50, blLeft: 80}, br: {brTop: 70, brLeft: 201}},
    {yl: {ylTop: 160, ylLeft: 135}, bl: {blTop: 65, blLeft: 65}, br: {brTop: 60, brLeft: 181}},
    {yl: {ylTop: 150, ylLeft: 152}, bl: {blTop: 90, blLeft: 50}, br: {brTop: 42, brLeft: 152}},

    {bl: {blTop: 125, blLeft: 67}, br: {brTop: 25, brLeft: 135}, yl: {ylTop: 130, ylLeft: 185}},
    {bl: {blTop: 140, blLeft: 84}, br: {brTop: 30, brLeft: 110}, yl: {ylTop: 110, ylLeft: 194}},
    {bl: {blTop: 160, blLeft: 101}, br: {brTop: 33, brLeft: 90}, yl: {ylTop: 90, ylLeft: 201}},
    {bl: {blTop: 160, blLeft: 118}, br: {brTop: 50, brLeft: 80}, yl: {ylTop: 70, ylLeft: 201}},
    {bl: {blTop: 160, blLeft: 135}, br: {brTop: 65, brLeft: 65}, yl: {ylTop: 60, ylLeft: 181}},
  ]
  static currentFrame = 0
  static viruses = []

  static animateViruses = () => {
    player.updateDetails()
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
        this.currentFrame === this.frames.length - 1 ? this.currentFrame = 0 : this.currentFrame++
        const {brTop, brLeft} = this.frames[this.currentFrame].br
        const {ylTop, ylLeft} = this.frames[this.currentFrame].yl
        const {blTop, blLeft} = this.frames[this.currentFrame].bl
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




