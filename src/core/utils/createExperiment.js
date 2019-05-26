import World from '../World'

export default (Cell, worldConfig) => (
  (config) => {
    const world = new World({ ...config, ...worldConfig })

    world.registerCellClass(Cell)

    world.init([
      { type: Cell.type, distribution: 100 },
    ])

    return world
  }
)
