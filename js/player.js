'use strict'

import Virus from './virus.js'
import Board from './board.js'

const virusCounter = document.querySelector('#virus-counter')
const levelDisplay = document.querySelector('#level')

class Player {
  score = 0
  level = 1

  destroyVirus(virus) {
    Virus.virusCounter--
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

  endGame() {
    console.log('game end')
  }
}

export const player = new Player()
