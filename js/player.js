'use strict'

import Virus from './virus.js'

export default class Player {
  static score = 0

  static destroy_virus(virus) {
    Virus.viruses.splice(virus, 1)
  }
}
