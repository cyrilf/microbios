import Cell from '../Cell'
import createExperiment from '../utils/createExperiment'

export class Living extends Cell {
  static type = 'living'

  constructor(...args) {
    super(...args)
    this.alive = Math.random() > 0.5
  }

  getColor() { return this.alive ? `rgba(68, 36, 52, ${this.wasAlive ? 1 : 0.7})` : null }

  process(neighbors) {
    const neighborsAlive = neighbors.filter(neighbor => neighbor && neighbor.wasAlive).length
    this.alive = neighborsAlive === 3 || (neighborsAlive === 2 && this.alive)
  }

  reset() {
    this.wasAlive = this.alive;
  }
}

export default createExperiment(Living)
