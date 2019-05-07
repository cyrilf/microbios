import { Living } from './gameOfLife'
import createExperiment from '../utils/createExperiment'

class Wall extends Living {
  static type = 'wall'

  constructor(...args) {
    super(...args)
    this.simulated = 0
  }

  process(neighbors) {
    const surrounding = neighbors.filter(neighbor => neighbor && neighbor.wasAlive).length

    if (this.simulated < 20) {
      this.alive = surrounding === 1 || (surrounding === 2 && this.alive)
    }
    if (this.simulated > 20 && surrounding === 2) {
      this.alive = true
    }

    this.simulated += 1
  }
}

export default createExperiment(Wall, { maxGeneration: 30 })
