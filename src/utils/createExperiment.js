import World from '../World'

export default (Cell, wolrdOptions) => (
  (columns, rows) => {
    const world = new World({ columns, rows, ...wolrdOptions })

    world.registerCellClass(Cell)

    world.init([
      { type: Cell.type, distribution: 100 },
    ])

    return world
  }
)
