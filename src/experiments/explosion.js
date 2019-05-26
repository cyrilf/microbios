import Cell from '../core/Cell'
import createExperiment from '../core/utils/createExperiment'
import getSurroundingCellsAverageValue from '../core/utils/getSurroundingCellsAverageValue'

class Boom extends Cell {
  static type = 'Boom'

  value = (this.column === (this.worldColumns / 2) && this.row === (this.worldRows / 2)) ? 10 : 0
  prev = this.value
  next = this.value

  getColor() {
    const v = (Math.max(2 * this.value + 0.02, 0) - 0.02) + 0.5
    const r = Math.floor(v * 300)
    const g = Math.floor(v * 100)
    const b = Math.floor(v * 100)

    return `rgba(${r}, ${g}, ${b}, ${this.value * 10})`
  }

  process(neighbors) {
    const avg = getSurroundingCellsAverageValue(neighbors, 'value')
    this.next = 0.99 * (2 * avg - this.prev)
  }

  reset() {
    this.prev = this.value
    this.value = this.next
  }
}

export default createExperiment(Boom)
