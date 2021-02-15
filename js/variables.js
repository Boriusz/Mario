'use strict'
import Board from './board.js'
import Pill from './pill.js'
import Game from './game.js'
import Mario from './mario.js'
import {player} from './player.js'

const additionalViruses = document.querySelector('#additional-viruses')
const pointer = document.querySelector('#pointer')
const pointer2 = document.querySelector('#pointer2')
export const menu = document.querySelector('#menu')
export const scoreHolder = document.querySelector('#score')
export const topScoreHolder = document.querySelector('#top')
export const magnifier = document.querySelector('#magnifier')
export const stageCompleted = document.querySelector('#stageCompleted').children[0]
export const gameOver = document.querySelector('#gameOver').children[0]
export const sadMario = document.querySelector('#sadMario').children[0]
export const virusCounter = document.querySelector('#virus-counter')
export const levelDisplay = document.querySelector('#level')
export const container = document.querySelector('#container')
export const speedContainer = document.querySelector('#speed')

export const getAnimations = (pill) => {
  return [
    () => pill.rotate(false, Board.matrix),
    () => {
      pill.moveUp(Board.matrix)
      pill.rotate(false, Board.matrix)
    },
    () => pill.rotate(false, Board.matrix),
    () => {
      pill.moveUp(Board.matrix)
      Board.matrix[4][14] = 0
      Board.matrix[5][14] = 0
      Board.matrix[6][14] = 0
      Board.matrix[5][13] = 'middle_11'
      Board.matrix[5][14] = 'middle_12'
      Board.matrix[6][13] = 'middle_21'
      Board.matrix[6][14] = 'middle_22'
      pill.rotate(false, Board.matrix)
    },
    () => pill.rotate(false, Board.matrix),
    () => pill.rotate(false, Board.matrix),
    () => {
      pill.rotate(false, Board.matrix)
      Board.matrix[5][13] = 0
      Board.matrix[5][14] = 0
      Board.matrix[6][13] = 0
      Board.matrix[6][14] = 0
      Board.matrix[6][14] = 'down_1'
      Board.matrix[7][14] = 'down_2'
    },
    () => pill.rotate(false, Board.matrix),
    () => pill.rotate(false, Board.matrix),
    () => pill.rotate(false, Board.matrix),
    () => pill.rotate(false, Board.matrix),
    () => pill.rotate(false, Board.matrix),
    () => pill.rotate(false, Board.matrix),
    () => pill.rotate(false, Board.matrix),
    () => pill.rotate(false, Board.matrix),
    () => {
      pill.moveLeft(Board.matrix)
      pill.rotate(false, Board.matrix)
    },
    () => pill.rotate(false, Board.matrix),
    () => {
      Mario.weirdDrop(pill)
      pill.moveLeft(Board.matrix)
      pill.fall(pill)
      pill.rotate(false, Board.matrix)
    },
    () => pill.rotate(false, Board.matrix),
    () => {
      pill.moveLeft(Board.matrix)
      pill.rotate(false, Board.matrix)
    },
    () => Mario.weirdDrop(pill),
    () => Mario.weirdDrop(pill),
    () => Mario.weirdDrop(pill),
    () => {
      Pill.createPillInHand()
      Game.flag = true
      Game.keyPressed = false
      Mario.setup()
      Mario.weirdDrop(pill)
      Mario.isThrowing = false
      Game.gameInterval = setInterval(() => {
        pill.fall(Board.matrix)
      }, 500 / player.speed)
    },
  ]
}

export const frames = [
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


export const colors = [
  'br',
  'yl',
  'bl'
]

export const randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)]
}

export const randomize = (max, min) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


export const menuControls = (e) => {
  if (e.key === 'Control') player.startGame()
  // Zamiana między wyborem wirusów a prędkości
  else if (e.key === 'ArrowUp') {
    menu.style.backgroundImage = 'url("./img/start.png")'
  } else if (e.key === 'ArrowDown') {
    menu.style.backgroundImage = 'url(./img/start2.png)'
  } else if (e.key === 'ArrowRight' && menu.style.backgroundImage === 'url("./img/start.png")') { // wybór wirusów
    if (parseFloat(pointer.style.left) < 688) {
      player.additionalViruses += 1
      pointer.style.left = parseFloat(pointer.style.left) + 20.3 + 'px'
      let tempNumber = '0' + player.additionalViruses
      additionalViruses.innerHTML = ''
      tempNumber.split('').forEach(number => {
        additionalViruses.innerHTML += `<img src="./img/cyfry/${number}.png">`
      })
    }
  } else if (e.key === 'ArrowLeft' && menu.style.backgroundImage === 'url("./img/start.png")') {
    if (parseFloat(pointer.style.left) > 282) {
      player.additionalViruses -= 1
      pointer.style.left = parseFloat(pointer.style.left) - 20.3 + 'px'
      let tempNumber = '0' + player.additionalViruses
      additionalViruses.innerHTML = ''
      tempNumber.split('').forEach(number => {
        additionalViruses.innerHTML += `<img src="./img/cyfry/${number}.png">`
      })
    }
  } else if (e.key === 'ArrowRight' && menu.style.backgroundImage === 'url("./img/start2.png")') { // wybór prędkości
    if (parseFloat(pointer2.style.left) < 606) {
      player.speed += 0.5
      pointer2.style.left = parseFloat(pointer2.style.left) + 121 + 'px'
    }
  } else if (e.key === 'ArrowLeft' && menu.style.backgroundImage === 'url("./img/start2.png")') {
    if (parseFloat(pointer2.style.left) > 364) {
      player.speed -= 0.5
      pointer2.style.left = parseFloat(pointer2.style.left) - 121 + 'px'
    }

  }
}

export const gameControls = (e) => {
  if (Game.keysPressed[e.key] || !Game.flag) return
  Game.keysPressed = (Game.keysPressed || [])
  Game.keysPressed[e.key] = true
  gameControls2()
  clearInterval(intervalek)
  intervalek = setInterval(() => gameControls2(), 200)
}

document.onkeyup = (e) => {
  Game.keysPressed[e.key] = false
}
let intervalek = setInterval(() => {
  gameControls2()
}, 200)

export const gameControls2 = () => {
  if (!Game.flag) return
  let item = Pill.pills[Pill.pills.length - 2]
  if (Game.keysPressed && Game.keysPressed['ArrowLeft']) item?.moveLeft(Board.matrix, false)
  else if (Game.keysPressed && Game.keysPressed['ArrowRight']) item?.moveRight(Board.matrix, false)
  else if (Game.keysPressed && Game.keysPressed['ArrowUp']) item?.rotate(false, Board.matrix)
  else if (Game.keysPressed && Game.keysPressed['Shift']) item?.rotate(true, Board.matrix)
  else if (Game.keysPressed && Game.keysPressed['ArrowDown']) item?.fall(Board.matrix, true)
  else if (Game.keysPressed && Game.keysPressed[' ']) {
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
