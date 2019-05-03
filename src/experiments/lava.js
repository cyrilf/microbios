import Cell from '../Cell'
import createExperiment from './createExperiment'
import getSurroundingCellsAverageValue from '../utils/getSurroundingCellsAverageValue'

// thanks to @sanojian who thanks TheLastBanana on TIGSource

const COLORS = [
  'rgba(34,10,21,1)',
  'rgba(68,17,26,1)',
  'rgba(123,16,16,1)',
  'rgba(190,45,16,1)',
  'rgba(244,102,20,1)',
  'rgba(254,212,97,1)',
]

const colorsIndexes = []
let index = 0
for (; index < 18; ++index) { colorsIndexes[index] = 1 }
for (; index < 22; ++index) { colorsIndexes[index] = 0 }
for (; index < 25; ++index) { colorsIndexes[index] = 1 }
for (; index < 27; ++index) { colorsIndexes[index] = 2 }
for (; index < 29; ++index) { colorsIndexes[index] = 3 }
for (; index < 32; ++index) { colorsIndexes[index] = 2 }
for (; index < 35; ++index) { colorsIndexes[index] = 0 }
for (; index < 36; ++index) { colorsIndexes[index] = 2 }
for (; index < 38; ++index) { colorsIndexes[index] = 4 }
for (; index < 42; ++index) { colorsIndexes[index] = 5 }
for (; index < 44; ++index) { colorsIndexes[index] = 4 }
for (; index < 46; ++index) { colorsIndexes[index] = 2 }
for (; index < 56; ++index) { colorsIndexes[index] = 1 }
for (; index < 64; ++index) { colorsIndexes[index] = 0 }

// TODO REMOVE THIS
const world = { width: 100, height: 50 }

export class Lava extends Cell {
  static type = 'lava'

  constructor(...args) {
    super(...args)
    this.value = 0
    this.prev = this.value
    this.next = this.value
  }

  getColor() {
    let v = this.value + 0.5
      + Math.sin(this.column / world.width * Math.PI) * 0.04
      + Math.sin(this.row / world.height * Math.PI) * 0.04
      - 0.05
    v = Math.min(1.0, Math.max(0, v))

    return COLORS[colorsIndexes[Math.floor(colorsIndexes.length * v)]]
  }

  process(neighbors) {
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
    if (Math.random() > 0.99993) {
      this.value = -0.25 + 0.3 * Math.random()
      this.prev = this.value
      this.droplet = true
    } else {
      this.prev = this.value
      this.value = this.next
    }
    this.value = Math.min(0.5, Math.max(-0.5, this.value))
  }
}

export default createExperiment(Lava)
