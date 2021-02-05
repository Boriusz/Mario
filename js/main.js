'use strict'

import Game from './game.js'
import Board from './board.js'
import Virus from './virus.js'
import {player} from './player.js'
import {menuControls} from './variables.js'

const bottle = document.querySelector('#bottle')
const itemDom = document.createElement('div')
const additionalViruses = document.querySelector('#additional-viruses')
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
let tempNumber = '0' + player.additionalViruses
additionalViruses.innerHTML = ''
tempNumber.split('').forEach(number => {
  additionalViruses.innerHTML += `<img src="./img/cyfry/${number}.png">`
})
setInterval(Virus.animateViruses, 200)
document.onkeyup = () => {
  Game.flag ? Game.keyPressed = false : null
}
document.onkeydown = (e) => {
  menuControls(e)
}
// player.menu()
// player.startGame()
