import World from '../World'
import Cell from '../Cell'

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

export default (columns, rows) => {
  const world = new World({ columns, rows })

  world.registerCellClass(Wall)

  world.init([
    { type: Wall.type, distribution: 100 },
  ])

  return world
}
