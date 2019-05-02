import Cell from '../Cell'
import createExperiment from './createExperiment'

// thanks to @sanojian who thanks lithander on TIGSource

const getSurroundingCellsAverageValue = (neighbors, value) => {
  const summed = neighbors.reduce((result, neighbor) => {
    if (neighbor !== null && (neighbor[value] || neighbor[value] === 0)) {
      result += neighbor[value] // eslint-disable-line no-param-reassign
    }
    return result
  }, 0)

  return summed / neighbors.length
}

const COLORS = []
const REVERSE_COLORS_INDEX = []
for (let index = 0; index < 64; index++) {
  COLORS.push(`rgba(89, 125, 206, ${index / 64})`)
  REVERSE_COLORS_INDEX[index] = 63 - index
}

export class Water extends Cell {
  static type = 'water'

  constructor(...args) {
    super(...args)
    this.water = true
    this.value = 0
    this.prev = this.value
    this.next = this.value
  }

  getColor() {
    const v = (Math.max(2 * this.value + 0.02, 0) - 0.02) + 0.5
    return COLORS[REVERSE_COLORS_INDEX[Math.floor(REVERSE_COLORS_INDEX.length * v)]]
  }

  process(neighbors) {
    const surrounding = neighbors.filter(neighbor => neighbor.wasOpen).length
    this.open = (this.wasOpen && surrounding >= 4) || surrounding >= 6

    if (this.droplet === true) {
      neighbors.forEach((neighbor) => {
        if (neighbor === null || !neighbor.value) {
          return neighbor
        }
        const newNeighbor = { ...neighbor }
        newNeighbor.value = 0.5 * this.value
        newNeighbor.prev = 0.5 * this.prev
        return newNeighbor
      }, this)

      this.droplet = false
    }
    const avg = getSurroundingCellsAverageValue(neighbors, 'value')
    this.next = 0.99 * (2 * avg - this.prev)
  }

  reset() {
    if (Math.random() > 0.9999) {
      this.value = -0.2 + 0.25 * Math.random()
      this.prev = this.value
      this.droplet = true
    } else {
      this.prev = this.value
      this.value = this.next
    }
  }
}

export default createExperiment(Water)
