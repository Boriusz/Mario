'use strict';

class Game {
  constructor() {
    this.active = false;
    this.flag = false
  }

  init() {
    create_pill_in_hand();
    ``
    Virus.create_viruses(4);
    player.viruses = 4;
    board.matrix = board.append_virus(Virus.viruses, board.matrix);
  }

  draw = (matrix) => {
    board.matrix = matrix;
    matrix.forEach((row, row_index) => {
      row.forEach((item, item_index) => {
        let actual;
        if (row_index > 8) actual = items[((row_index) * 8 + item_index) + 56];
        else actual = items[((row_index) * 15 + item_index)];
        if (actual) {
          if (item !== 0 && Object.keys(item).length !== 3) {
            actual.style.backgroundImage = `url(./img/${item.color}_${item.rotation}.png)`;
            actual.style.backgroundRepeat = `no-repeat`;
            actual.style.backgroundSize = `100% 100%`;
            actual.setAttribute('color', item.color);
            actual.setAttribute('state', item.state);
          } else if (Object.keys(item).length === 3) {
            actual.style.background = `url(./img/covid_${item.color}.png)`
            actual.style.backgroundSize = `100% 100%`;
            actual.setAttribute('color', item.color);
            actual.setAttribute('state', item.state);
          } else {
            actual.removeAttribute('style');
            actual.removeAttribute('state');
            actual.removeAttribute('color');
          }
        }
      })
    })
  };

  collide = (matrix, pill) => {
    if (pill.rotation === 1) return !matrix[pill.y + 1] || matrix[pill.y + 1][pill.x] !== 0 ||
      matrix[pill.y2 + 1][pill.x2] !== 0;
    else if (pill.rotation === 0) return !matrix[pill.y + 1] || matrix[pill.y + 1][pill.x] !== 0
  };


  fall = (matrix, pill, flag = false) => {
    if (this.collide(matrix, pill)) {
      matrix[pill.y][pill.x].state = 0;
      matrix[pill.y2][pill.x2].state = 0;
      game.flag = false
      document.onkeydown = null;
      clearInterval(game_interval)
      this.destroy(matrix, pill);
      if (pill.y === 6 && pill.y2 === 6) {
        this.end(false)
      } else {
        // if (player.viruses === 0) this.end(true) /// else
        setTimeout(() => {
          mario.throw(Pill.pills[Pill.pills.length - 1])
        }, 220)
      }
    } else {
      flag ? clearInterval(game_interval) : null;
      pill.y++;
      pill.y2++;
      matrix[pill.y][pill.x] = pill.return_piece()[0]
      matrix[pill.y2][pill.x2] = pill.return_piece()[1]
      pill.rotation === 1 ? matrix[pill.y - 1][pill.x] = 0 : null // Dla poziomego usuwa także tego u góry drugiego
      matrix[pill.y2 - 1][pill.x2] = 0
      this.draw(matrix);
      flag ? this.fall(matrix, pill, true) : null
    }
  };


  drop = (matrix, pill) => {
    if ((matrix[pill.coords.y + 1] && matrix[pill.coords.y + 1][pill.coords.x] === 0)) {
      matrix[pill.coords.y + 1][pill.coords.x] = matrix[pill.coords.y][pill.coords.x]
      matrix[pill.coords.y][pill.coords.x] = 0
      pill.coords.y++
      this.draw(matrix);
      game.drop(matrix, pill)
    } else {
      game.flag = false
      document.onkeydown = null;
      clearInterval(game_interval)
      this.destroy2(matrix, pill);
    }
  };

  rotate = (direction, matrix, pill) => { //false UP/lewo true Shift/prawo
    if (game.active) {
      if (pill.rotation === 1 && matrix[pill.y - 1][pill.x] === 0 && (game.flag ? (pill.x === 3 || pill.x === 4 ? pill.y > 5 : pill.y > 6) : true)) {
        pill.rotation_update(0, 2)
        pill.y2--
        pill.x2--
        direction ? pill.switch() : null
        matrix[pill.y][pill.x] = pill.return_piece()[0]
        matrix[pill.y2][pill.x2] = pill.return_piece()[1]
        matrix[pill.y][pill.x + 1] = 0;
        game.draw(matrix);
      } else if (pill.rotation === 0 && matrix[pill.y][pill.x + 1] === 0 && pill.x < 7) {
        pill.rotation_update(1, 3);
        pill.y2 = pill.y
        pill.x2 = pill.x + 1
        !direction ? pill.switch() : null
        matrix[pill.y][pill.x] = pill.return_piece()[0]
        matrix[pill.y2][pill.x2] = pill.return_piece()[1]
        matrix[pill.y - 1][pill.x] = 0;
        game.draw(matrix);
      } else if (pill.rotation === 0 && matrix[pill.y][pill.x - 1] === 0 &&
        (!matrix[pill.y][pill.x + 1] || pill.x === 7)) {
        pill.rotation_update(1, 3)
        matrix[pill.y2][pill.x2] = 0;
        pill.y2++
        pill.x--
        !direction ? pill.switch() : null
        matrix[pill.y][pill.x] = pill.return_piece()[0]
        matrix[pill.y2][pill.x2] = pill.return_piece()[1]
        game.draw(matrix);
      }
    }
  };

  move = (matrix, where, rotation, pill) => {
    pill.x += where
    pill.x2 += where
    matrix[pill.y][pill.x] = pill.return_piece()[0]
    matrix[pill.y2][pill.x2] = pill.return_piece()[1]
    if (where > 0) {
      matrix[pill.y][pill.x - 1] = 0;
      rotation ? matrix[pill.y2][pill.x2 - 1] = 0 : null
    } else {
      matrix[pill.y2][pill.x2 + 1] = 0;
      rotation ? matrix[pill.y][pill.x + 1] = 0 : null
    }
    game.draw(matrix);
  }
  move_left = (matrix, pill) => {
    if (game.active) {
      if (pill.rotation === 1 && matrix[pill.y][pill.x - 1] === 0) this.move(matrix, -1, false, pill)
      else if (pill.rotation === 0 && matrix[pill.y][pill.x - 1] === 0 && matrix[pill.y2][pill.x2 - 1] === 0 && (pill.y === 6 ? pill.x === 4 : true)) this.move(matrix, -1, true, pill)
    }
  };
  move_right = (matrix, pill) => {
    if (game.active) {
      if (pill.rotation === 1 && matrix[pill.y2][pill.x2 + 1] === 0 && matrix[pill.y2][pill.x2 + 1] === 0 && pill.x2 < 7) this.move(matrix, 1, false, pill)
      else if (matrix[pill.y][pill.x + 1] === 0 && matrix[pill.y - 1][pill.x + 1] === 0 && pill.x2 < 7 && (pill.y === 6 ? pill.x === 3 : true)) this.move(matrix, 1, true, pill)
    }
  };

  move_up = (matrix, pill) => {
    pill.y--
    pill.y2--
    matrix[pill.y][pill.x] = pill.return_piece()[0]
    matrix[pill.y + 1][pill.x] = 0
    matrix[pill.y2][pill.x2] = pill.return_piece()[1]
    matrix[pill.y2 + 1][pill.x2] = 0
  }

  boom = function (items, items2) {
    let siblings = []
    Array.prototype.slice.call(arguments).forEach(arg => {
      if (arg) {
        arg.forEach(item => {
          let pill = Pill.pills.find(el => el.id === board.matrix[item[0]][item[1]].id)
          if (pill) {
            board.matrix[item[0]][item[1]].rotation = 'o'
            board.matrix[item[0]][item[1]].id += 100
            let flat = board.matrix.flat();
            let sibling = flat.find(el => el.id === pill.id)
            if (sibling) {
              console.log(sibling)
              let flag = true
              Array.prototype.slice.call(arguments).forEach(arg => {
                if (arg) {
                  if (arg.find(el => el[0] === sibling.coords.y && el[1] === sibling.coords.x)) {
                    flag = false
                  }
                }
              })
              if (flag) {
                siblings.push(sibling)
                board.matrix[sibling.coords.y][sibling.coords.x].rotation = 5
              }
            }
          } else {
            player.update_score(100)
            player.destroy_virus()
            board.matrix[item[0]][item[1]].rotation = 'x'
            board.matrix[item[0]][item[1]].kek = 'x'
          }
        })
      }
    })
    game.draw(board.matrix)
    setTimeout(() => {
      Array.prototype.slice.call(arguments).forEach(arg => {
        if (arg) {
          arg.forEach(item => {
            board.matrix[item[0]][item[1]] = 0
          })
        }
      })
    }, 200)
    siblings.reverse().forEach(item => {
      game.drop(board.matrix, item)
    })
    if (player.viruses === 0) game.end(true)
  };


  destroy = (matrix, pill) => {
    const possibilities = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    const first_color = pill.color
    const second_color = pill.color2
    let first_flag = []
    let second_flag = [];
    possibilities.forEach(p => {
      if (matrix[pill.y + p[0]]) {
        if ((matrix[pill.y + p[0]][pill.x + p[1]]) && (matrix[pill.y + p[0]][pill.x + p[1]].color === first_color)) first_flag.push(p)
        if ((matrix[pill.y2 + p[0]][pill.x2 + p[1]]) && (matrix[pill.y2 + p[0]][pill.x2 + p[1]].color === second_color)) second_flag.push(p)
      }
    })
    let counter1y = 1;
    let counter1x = 1;
    let tab1y = [[pill.y, pill.x]]
    let tab1x = [[pill.y, pill.x]]
    let counter2y = 1;
    let counter2x = 1;
    let tab2y = [[pill.y2, pill.x2]];
    let tab2x = [[pill.y2, pill.x2]];
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
      if (counter1y >= 4 && counter1x >= 4) this.boom(tab1y, tab1x)
      else if (counter1y >= 4) this.boom(tab1y, null)
      else if (counter1x >= 4) this.boom(tab1x, null)
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
      if (counter2y >= 4 && counter2x >= 4) this.boom(tab2y, tab2x)
      else if (counter2y >= 4) this.boom(tab2y, null)
      else if (counter2x >= 4) this.boom(tab2x, null)
    }
  };
  destroy2 = (matrix, pill) => {
    const possibilities = [[0, -1], [0, 1], [-1, 0], [1, 0]]
    const color = pill.color
    let first_flag = []
    possibilities.forEach(p => {
      if (matrix[pill.coords.y + p[0]]) {
        if ((matrix[pill.coords.y + p[0]][pill.coords.x + p[1]]) && (matrix[pill.coords.y + p[0]][pill.coords.x + p[1]].color === color)) first_flag.push(p)
      }
    })
    let counter1y = 1;
    let counter1x = 1;
    let tab1y = [[pill.y, pill.x]]
    let tab1x = [[pill.y, pill.x]]
    if (first_flag.length) {
      first_flag.forEach(direction => {
        let x = 1
        if (matrix[pill.coords.y + direction[0] * x]) {
          while (matrix[pill.coords.y + (direction[0] * x)][pill.x + (direction[1] * x)]?.color === color) {
            direction[0] !== 0 ? counter1y++ : counter1x++
            direction[0] !== 0 ? tab1y.push([pill.coords.y + (direction[0] * x), pill.x + (direction[1] * x)]) : tab1x.push([pill.coords.y + (direction[0] * x), pill.coords.x + (direction[1] * x)])
            x++
            if (!matrix[pill.coords.y + direction[0] * x]) {
              break
            }
          }
        }
      })
      if (counter1y >= 4 && counter1x >= 4) this.boom(tab1y, tab1x)
      else if (counter1y >= 4) this.boom(tab1y, null)
      else if (counter1x >= 4) this.boom(tab1x, null)
    }
  };

  end = (flag) => {
    if (flag) {
      console.log('won')
    } else {
      console.log('lost')
    }
  }
}
