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

document.onkeydown = (e) => {
  let item = Pill.pills
  if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') item[item.length - 2]?.move_left(Board.matrix)
  else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') item[item.length - 2]?.move_right(Board.matrix)
  else if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') item[item.length - 2]?.rotate(false, Board.matrix)
  else if (e.key === 'Shift') item[item.length - 2]?.rotate(true, Board.matrix)
  else if (e.code === 'ArrowDown') item[item.length - 2]?.fall(Board.matrix, true)
  else if (e.code === 'Space') {
    if (!Game.active) {
      clearInterval(Game.game_interval)
      Game.active = true
      Mario.throw(item[item.length - 1])
    } else {
      clearInterval(Game.game_interval)
      Game.active = true
    }
  }
}

Mario.setup()
Game.init()
Board.draw(Board.matrix)






