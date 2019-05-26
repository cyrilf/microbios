import Cell from '../core/Cell'
import createExperiment from '../core/utils/createExperiment'

export class Wall extends Cell {
  static type = 'wall'

  open = Math.random() > 0.4

  getColor() { return this.open ? null : 'rgba(68, 36, 52, 1)' }

  process(neighbors) {
    const openNeighbors = neighbors.filter(neighbor => neighbor && neighbor.wasOpen).length
    this.open = (this.wasOpen && openNeighbors >= 4) || openNeighbors >= 6
  }

  reset() {
    this.wasOpen = this.open
  }
}

export default createExperiment(Wall, { maxGeneration: 25 })
