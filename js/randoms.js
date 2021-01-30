'use strict'

export default class Randoms {
  static colors = [
    'br',
    'yl',
    'bl'
  ]

  static randomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)]
  }

  static randomize(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}

