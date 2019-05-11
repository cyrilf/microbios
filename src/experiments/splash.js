import Cell from '../Cell'
import createExperiment from '../utils/createExperiment'
import getSurroundingCellsAverageValue from '../utils/getSurroundingCellsAverageValue'

// thanks to @sanojian who thanks lithander on TIGSource

const COLORS = []
const REVERSE_COLORS_INDEX = []
for (let index = 0; index < 64; index++) {
  COLORS.push(`rgba(89, 125, 206, ${index / 64})`)
  REVERSE_COLORS_INDEX[index] = 63 - index
}

export class Water extends Cell {
  static type = 'water'

  water = true
  value = 0
  prev = this.value
  next = this.value

  getColor() {
    const v = (Math.max(2 * this.value + 0.02, 0) - 0.02) + 0.5
    return COLORS[REVERSE_COLORS_INDEX[Math.floor(REVERSE_COLORS_INDEX.length * v)]]
  }

  process(neighbors) {
    if (this.droplet === true) {
      const neighborsLength = neighbors.length

      for (let i = 0; i < neighborsLength; i++) {
        const neighbor = neighbors[i]
        if (neighbor !== null && neighbor.value) {
          neighbor.value = 0.5 * this.value
          neighbor.prev = 0.5 * this.prev
        }
      }

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
