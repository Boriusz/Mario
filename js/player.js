'use strict'

import Virus from './virus.js'
import Board from './board.js'
import Pill from './pill.js'
import Mario from './mario.js'

const virusCounter = document.querySelector('#virus-counter')
const levelDisplay = document.querySelector('#level')
const stageCompleted = document.querySelector('#stageCompleted').children[0]
const gameOver = document.querySelector('#gameOver').children[0]
const container = document.querySelector('#container')

class Player {
  score = 0
  level = 1

  destroyVirus(virus) {
    Virus.virusCounter--
    this.updateDetails()
    Virus.stopMove = true
    Virus.viruses[Virus.viruses.findIndex(el => el === virus)].kek = 'dying'
    setTimeout(() => {
      Virus.stopMove = false
      Virus.viruses.splice(Virus.viruses.findIndex(el => el === virus), 1)
      Board.draw(Board.matrix)
    }, 2000)

    this.score += 100
    if (this.score > parseInt(localStorage.getItem('topScore'))) {
      localStorage.setItem('topScore', this.score.toString())
    }
  }

  updateDetails() {
    const numberOfViruses = Virus.viruses.filter(el => el.kek === 'kek').length.toString().split('')
    numberOfViruses.unshift('0')
    virusCounter.innerHTML = ''
    numberOfViruses.forEach(item => {
      virusCounter.innerHTML += `<img src="./img/cyfry/${item}.png">`
    })

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
    if (!localStorage.getItem('topScore')) localStorage.setItem('topScore', '000')
    stageCompleted.style.visibility = 'hidden'
    gameOver.style.visibility = 'hidden'
    Pill.pills = []
    Pill.pillCounter = 0
    Virus.viruses = []
    Board.matrix = Board.createMatrix()
    player.updateDetails()
    Board.draw(Board.matrix)
    container.style.backgroundImage = `url(./img/pf${player.level}.png)`
    Pill.createPillInHand()
    Virus.createViruses(player.level * 4)
    Board.appendVirus(Virus.viruses)
    player.updateDetails()
    Mario.setup()
    Mario.throw(Pill.pills[Pill.pills.length - 1])
    Board.draw(Board.matrix)

  }
}

export const player = new Player()
