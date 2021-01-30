'use strict'

import Game from './game.js'
import Pill from './pill.js'
import Board from './board.js'
import Mario from './mario.js'
import Virus from './virus.js'

const bottle = document.querySelector('#bottle')
const itemDom = document.createElement('div')
export let virusAnimation
itemDom.classList.add('item')

Board.matrix.forEach(column => {
  let element = document.createElement('div')
  element.classList.add('row')
  bottle.appendChild(element)
  column.forEach(() => {
    let element2 = document.createElement('div')
    element2.classList.add('item')
    element.appendChild(element2)
  })
})

virusAnimation = setInterval(Virus.animateViruses, 200)
document.onkeyup = () => {
  Game.flag ? Game.keyPressed = false : null
}
window.addEventListener('load', (e) => {
  clearInterval(Game.gameInterval)
  Game.active = true
  Mario.throw(Pill.pills[Pill.pills.length - 1])
})

document.onkeydown = (e) => {
  if (Game.keyPressed || !Game.flag) return
  Game.keyPressed = true
  setTimeout(() => Game.keyPressed = false, 200)
  if (e.key === 'a') console.log('a')
  let item = Pill.pills[Pill.pills.length - 2]
  if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') item?.moveLeft(Board.matrix, false)
  else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') item?.moveRight(Board.matrix, false)
  else if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') item?.rotate(false, Board.matrix)
  else if (e.key === 'Shift') item?.rotate(true, Board.matrix)
  else if (e.code === 'ArrowDown') item?.fall(Board.matrix, true)
  else if (e.code === 'Space') {
    if (!Game.active) {
      clearInterval(Game.gameInterval)
      Game.active = true
      Mario.throw(Pill.pills[Pill.pills.length - 1])
    } else {
      clearInterval(Game.gameInterval)
      Game.active = true
    }
  }
}

Mario.setup()
Game.init()
Board.draw(Board.matrix)
