import World from '../World'

export default (Cell, worldOptions) => (
  (columns, rows) => {
    const world = new World({ columns, rows, ...worldOptions })

    world.registerCellClass(Cell)

    world.init([
      { type: Cell.type, distribution: 100 },
    ])

    return world
  }
)
