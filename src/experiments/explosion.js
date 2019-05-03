import Cell from '../Cell'
import createExperiment from './createExperiment'

const getSurroundingCellsAverageValue = (neighbors, value) => {
  const summed = neighbors.reduce((result, neighbor) => {
    if (neighbor !== null && (neighbor[value] || neighbor[value] === 0)) {
      result += neighbor[value] // eslint-disable-line no-param-reassign
    }
    return result
  }, 0)

  return summed / neighbors.length
}

// TODO REMOVE THIS
const world = { width: 100, height: 50 }

class Boom extends Cell {
  static type = 'Boom'

  constructor(...args) {
    super(...args)
    this.value = (this.column === (world.width / 2) && this.row === (world.height / 2)) ? 10 : 0
    this.prev = this.value
    this.next = this.value
  }

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