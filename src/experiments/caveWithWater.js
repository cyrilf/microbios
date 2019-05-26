import Cell from '../core/Cell'
import World from '../core/World'
import caveExperiment from './cave'

const COLORS = [
  'rgba(89, 125, 206, 0)',
  `rgba(89, 125, 206, ${1 / 9})`,
  `rgba(89, 125, 206, ${2 / 9})`,
  `rgba(89, 125, 206, ${3 / 9})`,
  `rgba(89, 125, 206, ${4 / 9})`,
  `rgba(89, 125, 206, ${5 / 9})`,
  `rgba(89, 125, 206, ${6 / 9})`,
  `rgba(89, 125, 206, ${7 / 9})`,
  `rgba(89, 125, 206, ${8 / 9})`,
  'rgba(89, 125, 206, 1)',
  'rgba(109, 170, 44, 1)',
  'rgba(68, 36, 52, 1)',
]

const WATER_FULL = 9

class Water extends Cell {
  static type = 'water'

  water = Math.floor(Math.random() * WATER_FULL)

  getColor() { return COLORS[this.water] }

  process(neighbors, { BOTTOM, BOTTOM_LEFT, BOTTOM_RIGHT, LEFT, RIGHT }) {
    if (!this.water) { return }
    // Give as much to the bottom neighbor
    this.manageWater(neighbors[BOTTOM], 1)
    // Give half to the bottom corners
    this.manageWater(neighbors[BOTTOM_LEFT], 1 / 2)
    this.manageWater(neighbors[BOTTOM_RIGHT], 1 / 2)
    // Give a third to the sides
    this.manageWater(neighbors[LEFT], 1 / 3, this.water)
    this.manageWater(neighbors[RIGHT], 1 / 3, this.water)
  }

  manageWater(neighbor, quantity, minimumWaterTransfer = WATER_FULL) {
    if (!this.water
      || neighbor === null
      || neighbor.constructor.type !== 'water'
      || neighbor.water >= minimumWaterTransfer) {
      return
    }
    const amount = Math.min(this.water, Math.ceil((WATER_FULL - neighbor.water) * quantity))
    this.water -= amount
    // eslint-disable-next-line no-param-reassign
    neighbor.water += amount
  }
}

class Rock extends Cell {
  static type = 'rock'

  getColor() { return COLORS[this.moss ? 10 : 11] }

  process(neighbors, { TOP, BOTTOM }) {
    const bottomNeighborIsRock = neighbors[BOTTOM] && neighbors[BOTTOM].constructor.type === 'rock'
    const topNeighborIsWaterNotFull = neighbors[TOP]
      && neighbors[TOP].constructor.type !== 'rock'
      && neighbors[TOP].water !== WATER_FULL
    this.moss = bottomNeighborIsRock && topNeighborIsWaterNotFull
  }
}

export default (config) => {
  const cave = caveExperiment(config)

  for (let i = 0; i < 10; i++) { cave.nextGeneration() }

  const grid = cave.convertGrid([{ type: 'wall', property: 'open', value: 0 }], 1)

  const world = new World(config)
  world.registerCellClass(Water)
  world.registerCellClass(Rock)

  world.initFrom(grid, [
    { value: 1, type: 'rock' },
    { value: 0, type: 'water' },
  ])

  return world
}
