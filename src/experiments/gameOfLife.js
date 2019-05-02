import World from '../World'
import Cell from '../Cell'

class Living extends Cell {
  static name = 'living'

  constructor(...args) {
    super(...args)
    this.alive = Math.random() > 0.5
  }

  getColor() { return this.alive ? 'rgba(68, 36, 52, 1)' : 'rgba(255, 255, 255, 1)' }

  process(neighbors) {
    const neighborsAlive = neighbors.filter(neighbor => neighbor.wasAlive).length
    this.alive = neighborsAlive === 3 || (neighborsAlive === 2 && this.alive)
  }

  reset() {
    this.wasAlive = this.alive;
  }

  click() { this.alive = !this.alive }
}

export default (columns, rows) => {
  const world = new World({ columns, rows })

  world.registerCellClass(Living)

  world.init([
    { name: 'living', distribution: 100 },
  ])

  return world
}
