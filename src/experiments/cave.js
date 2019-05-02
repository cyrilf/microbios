import Cell from '../Cell'
import createExperiment from './createExperiment'

export class Wall extends Cell {
  static type = 'wall'

  constructor(...args) {
    super(...args)
    this.open = Math.random() > 0.4
  }

  getColor() { return this.open ? 'rgba(255, 255, 255, 1)' : 'rgba(68, 36, 52, 1)' }

  process(neighbors) {
    const surrounding = neighbors.filter(neighbor => neighbor.wasOpen).length
    this.open = (this.wasOpen && surrounding >= 4) || surrounding >= 6
  }

  reset() {
    this.wasOpen = this.open;
  }
}

export default createExperiment(Wall, { maxGeneration: 25 })
