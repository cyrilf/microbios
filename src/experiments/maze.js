import World from '../World'
import { Living } from './gameOfLife'

class Wall extends Living {
  static name = 'wall'

  constructor(...args) {
    super(...args)
    this.simulated = 0
  }

  process(neighbors) {
    const surrounding = neighbors.filter(neighbor => neighbor.wasAlive).length

    if (this.simulated < 20) {
      this.alive = surrounding === 1 || (surrounding === 2 && this.alive)
    }
    if (this.simulated > 20 && surrounding === 2) {
      this.alive = true
    }

    this.simulated += 1
  }
}

export default (columns, rows) => {
  const world = new World({ columns, rows })

  world.registerCellClass(Wall)

  world.init([
    { name: 'wall', distribution: 100 },
  ])

  return world
}
