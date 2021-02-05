'use strict'

import Virus from './virus.js'
import Board from './board.js'
import Pill from './pill.js'
import Mario from './mario.js'
import Game from './game.js'
import {gameControls, menuControls} from './variables.js'

const menu = document.querySelector('#menu')
const virusCounter = document.querySelector('#virus-counter')
const levelDisplay = document.querySelector('#level')
const stageCompleted = document.querySelector('#stageCompleted').children[0]
const gameOver = document.querySelector('#gameOver').children[0]
const container = document.querySelector('#container')
const sadMario = document.querySelector('#sadMario').children[0]
const speedContainer = document.querySelector('#speed')

class Player {
  score = 0
  level = 1
  speed = 1
  additionalViruses = 0


  updateDetails() {
    const numberOfViruses = Virus.viruses.filter(el => el.kek === 'kek').length.toString().split('')
    numberOfViruses.unshift('0')
    virusCounter.innerHTML = ''
    numberOfViruses.forEach(item => {
      virusCounter.innerHTML += `<img src="./img/cyfry/${item}.png">`
    })
    speedContainer.style.backgroundImage = `url(./img/speed${this.speed}.png)`
    if (this.speed === 2) speedContainer.style.backgroundSize = '35px'
    else speedContainer.style.backgroundSize = '50px'
    const level = this.level.toString().split('')
    level.unshift(0)
    levelDisplay.innerHTML = ''
    level.forEach(item => {
      levelDisplay.innerHTML += `<img src="./img/cyfry/${item}.png">`
    })


  }

  endGame(flag) {
    if (flag) {
      this.level++
    } else {
      this.score = 0
      this.level = 0
    }
  }

  startGame() {
    if (this.level === 0) {
      menu.style.visibility = 'visible'
      container.style.visibility = 'hidden'
      sadMario.style.visibility = 'hidden'
      gameOver.style.visibility = 'hidden'
      menu.style.backgroundImage = 'url("./img/start.png")'
      Virus.viruses = []
      Virus.virusCounter = 0
      this.level = 1
      document.onkeydown = (e) => menuControls(e)
      return
    }
    menu.style.visibility = 'hidden'
    document.onkeydown = (e) => {
      gameControls(e)
    }

    if (!localStorage.getItem('topScore')) localStorage.setItem('topScore', '000')
    menu.style.visibility = 'hidden/'
    container.style.visibility = 'visible'
    stageCompleted.style.visibility = 'hidden'
    gameOver.style.visibility = 'hidden'
    Pill.pills = []
    Pill.pillCounter = 0
    Virus.viruses = []
    Board.matrix = Board.createMatrix()
    this.updateDetails()
    Board.draw(Board.matrix)
    Game.over = false
    sadMario.style.visibility = 'hidden'
    container.style.backgroundImage = `url(./img/pf${this.level}.png)`
    Pill.createPillInHand()
    Virus.createViruses((this.additionalViruses * 4) + (this.level * 4))
    Board.appendVirus(Virus.viruses)
    this.updateDetails()
    Mario.setup()
    Board.draw(Board.matrix)
    setTimeout(() => Mario.throw(Pill.pills[Pill.pills.length - 1]), 500)

  }
}

export const player = new Player()
