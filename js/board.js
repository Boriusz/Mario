'use strict'

import {player} from './player.js'
import Virus from './virus.js'

const scoreHolder = document.querySelector('#score')
const topScoreHolder = document.querySelector('#top')
const magnifier = document.querySelector('#magnifier')

export default class Board {
  static width = 15
  static height = 22
  static matrix = this.createMatrix()

  static createMatrix() {
    const matrix = []
    let tempHeight = this.height
    while (tempHeight--) {
      if (tempHeight <= 13) matrix.push(new Array(8).fill(0))
      else matrix.push(new Array(this.width).fill(0))
    }
    return matrix
  }


  static draw(matrix) {
    this.drawMagnifier()
    scoreHolder.innerHTML = ''
    topScoreHolder.innerHTML = ''
    let topScore = localStorage.getItem('topScore')
    let score = player.score.toString()
    let scoreArray = []
    let topScoreArray = []
    for (let i = 0; i < score.length; i++) {
      scoreArray.push(score[i])
    }
    for (let i = 0; i < topScore.length; i++) {
      topScoreArray.push(topScore[i])
    }
    let topTempLength = topScoreArray.length
    let tempLength = scoreArray.length
    for (let i = 0; i < 7 - tempLength; i++) {
      scoreArray.unshift(0)
    }
    for (let i = 0; i < 7 - topTempLength; i++) {
      topScoreArray.unshift(0)
    }
    scoreArray.forEach(item => {
      scoreHolder.innerHTML += `<img src="./img/cyfry/${item}.png"/>`
    })
    topScoreArray.forEach(item => {
      topScoreHolder.innerHTML += `<img src="./img/cyfry/${item}.png"/>`
    })
    const items = document.querySelectorAll('.item')
    matrix.forEach((row, rowIndex) => {
      row.forEach((item, itemIndex) => {
        let actual
        if (rowIndex > 8) actual = items[((rowIndex) * 8 + itemIndex) + 56]
        else actual = items[((rowIndex) * 15 + itemIndex)]
        if (actual) {
          if (item !== 0 && Object.keys(item).length === 5) {
            actual.style.backgroundImage = `url(./img/${item.color}_${item.rotation}.png)`
            actual.style.backgroundRepeat = 'no-repeat'
            item.rotation === 2 ? actual.style.backgroundSize = '100% 115%' : actual.style.backgroundSize = '100% 100%'
            actual.setAttribute('color', item.color)
            actual.setAttribute('state', item.state)
          } else if (typeof item === 'object' && Object.keys(item).length === 4) {
            actual.style.background = `url(./img/covid_${item.color}.png)`
            actual.style.backgroundSize = '100% 100%'
            actual.setAttribute('color', item.color)
            actual.setAttribute('state', item.state)
          } else if (typeof item === 'string') {
            actual.style.backgroundImage = `url(./img/hands/${item}.png`
            actual.style.backgroundRepeat = 'no-repeat'
            actual.style.backgroundSize = '100% 100%'
          } else {
            actual.removeAttribute('style')
            actual.removeAttribute('state')
            actual.removeAttribute('color')
          }
        }
      })
    })
  }

  static drawMagnifier = () => {
    for (const item of magnifier.children) {
      item.style.visibility = 'hidden'
    }
    Virus.viruses.forEach(virus => {
      document.querySelector(`#virus_${virus.color}`).style.visibility = 'visible'
    })
  }

  static appendPieceToHand = (piece) => {
    this.matrix[3][13] = piece[0]
    this.matrix[3][14] = piece[1]
  }

  static appendVirus(viruses) {
    viruses.forEach(virus => Board.matrix[virus.y][virus.x] = virus)
  }
}


