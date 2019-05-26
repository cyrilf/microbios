import World from '../core/World'
import { Living } from './gameOfLife'
import { Cyclic } from './cyclic'

class CyclicAlive extends Cyclic {
  wasAlive = Math.random() > 0.5
}

export default (config) => {
  const world = new World(config)

  world.registerCellClass(Living)
  world.registerCellClass(CyclicAlive)

  world.init([
    { type: Living.type, distribution: 80 },
    { type: Cyclic.type, distribution: 20 },
  ])

  return world
}
