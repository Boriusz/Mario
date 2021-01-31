import Board from './board.js'
import Pill from './pill.js'
import Game from './game.js'
import Mario from './mario.js'

export const getAnimations = (pill) => {
  return [

    function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.moveUp(Board.matrix)
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
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
    function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
      Board.matrix[5][13] = 0
      Board.matrix[5][14] = 0
      Board.matrix[6][13] = 0
      Board.matrix[6][14] = 0

      Board.matrix[6][14] = 'down_1'
      Board.matrix[7][14] = 'down_2'
    },
    function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
    }, function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
    }, function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
    }, function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
    }, function () {
      pill.moveLeft(Board.matrix)
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.moveLeft(Board.matrix)
      pill.fall(Board.matrix)
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.rotate(false, Board.matrix)
    },
    function () {
      pill.moveLeft(Board.matrix)
      pill.rotate(false, Board.matrix)
    },
    function () {
      Mario.weirdDrop(pill)
    }, function () {
      Mario.weirdDrop(pill)
    }, function () {
      Pill.createPillInHand()
      Mario.setup()
      Mario.weirdDrop(pill)
      Mario.weirdDrop(pill)
      Game.flag = true
      Game.keyPressed = false
    }, function () {
      Mario.weirdDrop(pill)
      Mario.isThrowing = false
      Game.gameInterval = setInterval(() => {
        pill.fall(Board.matrix)
      }, 500)
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

