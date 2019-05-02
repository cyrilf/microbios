import World from '../World'

export default Cell => (
  (columns, rows) => {
    const world = new World({ columns, rows })

    world.registerCellClass(Cell)

    world.init([
      { type: Cell.type, distribution: 100 },
    ])

    return world
  }
)
