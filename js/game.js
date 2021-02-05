'use strict'

import Pill from './pill.js'
import Board from './board.js'
import {player} from './player.js'
import Virus from './virus.js'

const stageCompleted = document.querySelector('#stageCompleted').children[0]
const gameOver = document.querySelector('#gameOver').children[0]
const sadMario = document.querySelector('#sadMario').children[0]

export default class Game {
  static over = false
  static active = false
  static flag = false
  static gameInterval
  static keyPressed = false

  static async enableGravity(matrix) {
    const waiter = async () => {
      for (let i = 21; i >= 5; i--) {
        for (let k = 0; k <= matrix[i].length; k++) {
          let helper = 0
          const drop = async () => {
            if ((matrix[i + helper][k]?.id || matrix[i + helper][k]?.id === 0) && matrix[i + helper + 1] && matrix[i + helper + 1][k] === 0
              && !((matrix[i + helper][k + 1]?.id === matrix[i + helper][k]?.id
                  && matrix[i + helper + 1][k + 1] !== 0)
                ||
                (matrix[i + helper][k - 1]?.id === matrix[i + helper][k]?.id
                  && matrix[i + helper + 1][k - 1] !== 0)
              )) {
              if (matrix[i + helper][k].coords.y < 21) {
                matrix[i + helper + 1][k] = matrix[i + helper][k]
                Pill.pills[matrix[i + helper + 1][k].id].y++
                Pill.pills[matrix[i + helper + 1][k].id].y2++
                matrix[i + helper + 1][k].coords.y++
                matrix[i + helper][k] = 0
                helper++
                Board.draw(matrix)
                setTimeout(drop, 20)
              }
            } else {
              return Promise.resolve()
            }
          }
          await drop()
        }
        if (i === 5) return new Promise((resolve => setTimeout(resolve, 325)))
      }
    }
    return await waiter()
  }

  static async boom(matrix, items) {
    items.forEach(item => {
      if (matrix[item[0]][item[1]].id || matrix[item[0]][item[1]].id === 0) {
        matrix[item[0]][item[1]].rotation = 'o'
        matrix[item[0]][item[1]].id += 100
        let flat = matrix.flat()
        let sibling = flat.find(el => el.id === matrix[item[0]][item[1]].id - 100)
        if (sibling) {
          matrix[sibling.coords.y][sibling.coords.x].rotation = 5
        }
        matrix[item[0]][item[1]].rotation = 'o'
      } else if (matrix[item[0]][item[1]].kek === 'kek') {
        matrix[item[0]][item[1]].rotation = 'x'
        matrix[item[0]][item[1]].kek = 'x'
        Virus.destroyVirus(matrix[item[0]][item[1]])
      }
    })
    Board.draw(matrix)
    try {
      await new Promise(resolve => {
        setTimeout(() => {
          items.forEach(item => {
            matrix[item[0]][item[1]] = 0
          })
          resolve()
        }, 200)
      })
      return await this.enableGravity(matrix)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static async destroy(matrix, pill) {
    const {x2, color, y2, id, color2, y, x: x1} = pill
    if (pill.y > 21) pill.y = 21
    if (pill.y2 > 21) pill.y2 = 21
    const firstHalf = matrix[y] && matrix[y][x1]?.id === id && matrix[y][x1].color === color
    const secondHalf = matrix[y2] && matrix[y2][x2]?.id === id && matrix[y2][x2].color === color2
    const possibilities = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    const firstColor = color
    const secondColor = color2
    let firstFlag = []
    let secondFlag = []
    possibilities.forEach(p => {
      if (matrix[y + p[0]]) {
        firstHalf ? (matrix[y + p[0]][x1 + p[1]]?.color === firstColor ? firstFlag.push(p) : null) : null
        secondHalf ? (matrix[y2 + p[0]][x2 + p[1]]?.color === secondColor ? secondFlag.push(p) : null) : null
      }
    })
    let counter1y = matrix[y] && matrix[y][x1] === 0 ? 0 : 1
    let counter1x = matrix[y] && matrix[y][x1] === 0 ? 0 : 1
    let tab1y = [[y, x1]]
    let tab1x = [[y, x1]]
    let counter2y = matrix[y2] && matrix[y2][x2] === 0 ? 0 : 1
    let counter2x = matrix[y2] && matrix[y2][x2] === 0 ? 0 : 1
    let tab2y = [[y2, x2]]
    let tab2x = [[y2, x2]]
    if (firstFlag.length) {
      firstFlag.forEach(direction => {
        let x = 1
        if (matrix[y + direction[0] * x]) {
          while (matrix[y + (direction[0] * x)][x1 + (direction[1] * x)]?.color === firstColor) {
            direction[0] !== 0 ? counter1y++ : counter1x++
            direction[0] !== 0 ? tab1y.push([y + (direction[0] * x), x1 + (direction[1] * x)]) : tab1x.push([y + (direction[0] * x), x1 + (direction[1] * x)])
            x++
            if (!matrix[y + direction[0] * x]) {
              break
            }
          }
        }
      })
    }
    if (secondFlag.length) {
      secondFlag.forEach(direction => {
        let x = 1
        if (matrix[y2 + direction[0] * x]) {
          while (matrix[y2 + (direction[0] * x)][x2 + (direction[1] * x)]?.color === secondColor) {
            direction[0] !== 0 ? counter2y++ : counter2x++
            direction[0] !== 0 ? tab2y.push([y2 + (direction[0] * x), x2 + (direction[1] * x)]) : tab2x.push([y2 + (direction[0] * x), x2 + (direction[1] * x)])
            x++
            if (!matrix[y + direction[0] * x]) {
              break
            }
          }
        }
      })
    }
    let finalTab = []
    counter1y >= 4 ? tab1y.forEach(item => finalTab.push(item)) : null
    counter1x >= 4 ? tab1x.forEach(item => finalTab.push(item)) : null
    counter2y >= 4 ? tab2y.forEach(item => finalTab.push(item)) : null
    counter2x >= 4 ? tab2x.forEach(item => finalTab.push(item)) : null
    if (finalTab.length > 0) {
      await this.boom(matrix, finalTab)
      for (const pill of Pill.pills) {
        await this.destroy(matrix, pill)
      }
    }
    return Promise.resolve()
  }

  static end(flag) {
    if (flag) {
      stageCompleted.style.visibility = 'visible'
    } else {
      this.over = true
      gameOver.style.visibility = 'visible'
      sadMario.style.visibility = 'visible'
    }
    setTimeout(() => {
      Board.draw(Board.matrix)
      document.addEventListener('keydown', function gameStarter(e) {
        if (e.key === 'Control') {
          player.startGame()
          document.removeEventListener('keydown', gameStarter)
        }
      })
    }, 2200)
    player.endGame(flag)
  }
}
