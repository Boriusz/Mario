'use strict'

import Virus from './virus.js'
import Pill from './pill.js'
import Board from './board.js'
import Player from './player.js'

export default class Game {

  static active = false
  static flag = false
  static game_interval

  static init() {
    Pill.create_pill_in_hand()
    Virus.create_viruses(4)
    Board.append_virus(Virus.viruses)
  }


  static async enable_gravity(matrix) {
    const waiter = async () => {
      for (let i = 21; i >= 6; i--) {
        for (let k = 0; k <= matrix[i].length; k++) {
          let helper = 0
          const drop = () => {
            if ((matrix[i + helper][k]?.id || matrix[i + helper][k]?.id === 0) && matrix[i + helper + 1] && matrix[i + helper + 1][k] === 0
              && !((matrix[i + helper][k + 1]?.id === matrix[i + helper][k]?.id
                  && matrix[i + helper + 1][k + 1] !== 0)
                ||
                (matrix[i + helper][k - 1]?.id === matrix[i + helper][k]?.id
                  && matrix[i + helper + 1][k - 1] !== 0)
              )) {
              if (matrix[i + helper][k].coords.y < 21 && (Pill.pills[matrix[i + helper][k].id].y < 21 || Pill.pills[matrix[i + helper][k].id].y2 < 21)) {
                matrix[i + helper + 1][k] = matrix[i + helper][k]
                Pill.pills[matrix[i + helper + 1][k].id].y++
                Pill.pills[matrix[i + helper + 1][k].id].y2++
                matrix[i + helper + 1][k].coords.y++
                matrix[i + helper][k] = 0
                helper++
                Board.draw(matrix)
                setTimeout(drop, 20)
              }

            }
          }
          await drop()
        }
        // const clone = JSON.parse(JSON.stringify(matrix))
        if (i === 6) return Promise.resolve()
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
        Player.score += 100
        Player.destroy_virus()
        matrix[item[0]][item[1]].rotation = 'x'
        matrix[item[0]][item[1]].kek = 'x'
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
      return await this.enable_gravity(matrix)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static async destroy(matrix, pill) {
    const possibilities = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    const first_color = pill.color
    const second_color = pill.color2
    let first_flag = []
    let second_flag = []
    possibilities.forEach(p => {
      if (matrix[pill.y + p[0]]) {
        if (matrix[pill.y + p[0]][pill.x + p[1]]?.color === first_color) first_flag.push(p)
        if (matrix[pill.y2 + p[0]][pill.x2 + p[1]]?.color === second_color) second_flag.push(p)
      }
    })
    let counter1y = 1
    let counter1x = 1
    let tab1y = [[pill.y, pill.x]]
    let tab1x = [[pill.y, pill.x]]
    let counter2y = 1
    let counter2x = 1
    let tab2y = [[pill.y2, pill.x2]]
    let tab2x = [[pill.y2, pill.x2]]
    if (first_flag.length) {
      first_flag.forEach(direction => {
        let x = 1
        if (matrix[pill.y + direction[0] * x]) {
          while (matrix[pill.y + (direction[0] * x)][pill.x + (direction[1] * x)]?.color === first_color) {
            direction[0] !== 0 ? counter1y++ : counter1x++
            direction[0] !== 0 ? tab1y.push([pill.y + (direction[0] * x), pill.x + (direction[1] * x)]) : tab1x.push([pill.y + (direction[0] * x), pill.x + (direction[1] * x)])
            x++
            if (!matrix[pill.y + direction[0] * x]) {
              break
            }
          }
        }
      })
    }
    if (second_flag.length) {
      second_flag.forEach(direction => {
        let x = 1
        if (matrix[pill.y2 + direction[0] * x]) {
          while (matrix[pill.y2 + (direction[0] * x)][pill.x2 + (direction[1] * x)]?.color === second_color) {
            direction[0] !== 0 ? counter2y++ : counter2x++
            direction[0] !== 0 ? tab2y.push([pill.y2 + (direction[0] * x), pill.x2 + (direction[1] * x)]) : tab2x.push([pill.y2 + (direction[0] * x), pill.x2 + (direction[1] * x)])
            x++
            if (!matrix[pill.y + direction[0] * x]) {
              break
            }
          }
        }
      })
    }
    // console.table(pill)
    let final_tab = []
    counter1y >= 4 ? tab1y.forEach(item => final_tab.push(item)) : null
    counter1x >= 4 ? tab1x.forEach(item => final_tab.push(item)) : null
    counter2y >= 4 ? tab2y.forEach(item => final_tab.push(item)) : null
    counter2x >= 4 ? tab2x.forEach(item => final_tab.push(item)) : null
    if (final_tab.length > 0) {
      return await this.boom(matrix, final_tab)
    } else return Promise.resolve()
  }

  static end(flag) {
    if (flag) {
      console.log('won')
    } else {
      console.log('lost')
    }
  }

}
