'use strict'

import Game from './game.js'
import Pill from './pill.js'
import Board from './board.js'
import Mario from './mario.js'

const bottle = document.querySelector('#bottle')
const item_dom = document.createElement('div')
item_dom.classList.add('item')

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

document.onkeyup = () => {
  Game.flag ? Game.key_pressed = false : null
}
document.onkeydown = (e) => {
  if (Game.key_pressed) return
  Game.key_pressed = true
  if (e.key === 'a') console.log('a')
  let item = Pill.pills[Pill.pills.length - 2]
  if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') item?.move_left(Board.matrix)
  else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') item?.move_right(Board.matrix)
  else if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') item?.rotate(false, Board.matrix)
  else if (e.key === 'Shift') item?.rotate(true, Board.matrix)
  else if (e.code === 'ArrowDown') item?.fall(Board.matrix, true)
  else if (e.code === 'Space') {
    if (!Game.active) {
      clearInterval(Game.game_interval)
      Game.active = true
      Mario.throw(Pill.pills[Pill.pills.length - 1])
    } else {
      clearInterval(Game.game_interval)
      Game.active = true
    }
  }
}

Mario.setup()
Game.init()
Board.draw(Board.matrix)






