export default class World {
  constructor({ columns, rows, ...rest }) {
    this.columns = columns
    this.rows = rows
    this.options = { wrap: false, maxGeneration: Infinity, ...rest }
    this.grid = []
    this.generation = 0
    this.cellTypes = new Map()
  }

  init(cellDistributions) {
    if (this.cellTypes.size === 0) {
      throw new Error('You forgot to register your `cellTypes`. Make sure to call `registerCellClass` before `init`')
    }
    cellDistributions.sort((a, b) => (a.distribution > b.distribution ? 1 : -1))

    let totalDistribution = 0
    cellDistributions.forEach((cd) => {
      totalDistribution += cd.distribution
      return { ...cd, distribution: totalDistribution }
    })

    this.grid = []
    let row = 0
    let column = 0
    for (; row < this.rows; row++) {
      this.grid.push([])
      for (column = 0; column < this.columns; column++) {
        const random = Math.random() * totalDistribution
        const { type } = cellDistributions.find(({ distribution }) => random <= distribution) || {}
        const Cell = this.cellTypes.get(type)
        this.grid[row].push(new Cell(row, column, this.rows, this.columns))
      }
    }

    this.initGrid = simplifyGrid(this.grid)
  }

  registerCellClass(CellClass) { this.cellTypes.set(CellClass.type, CellClass) }

  // Compute the next X generations where X is the param `steps`
  nextGeneration(steps = 1) {
    let i = 0
    let row = 0
    let column = 0
    let cell
    for (; i < steps; i++) {
      for (row = 0; row < this.rows; row++) {
        for (column = 0; column < this.columns; column++) {
          cell = this.grid[row][column]
          const surroundings = this.getSurroundings(cell.row, cell.column)
          cell.reset(surroundings)
        }
      }
      // bottom/up processing (used by cave with water experiment)
      // better at renderering scenes that modify bottom neighbor
      for (row = this.rows - 1; row >= 0; row--) {
        for (column = 0; column < this.columns; column++) {
          cell = this.grid[row][column]
          const surroundings = this.getSurroundings(cell.row, cell.column)
          cell.process(surroundings)
        }
      }

      this.generation += 1
    }

    return [simplifyGrid(this.grid), this.generation]
  }

  // Get the 7 surroundings cells based on the coordinates
  getSurroundings(row, column) {
    const surroundings = []
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const currentCell = x === 0 && y === 0
        if (!currentCell) {
          let neighborRow = row + x
          let neighborColumn = column + y
          if (this.options.wrap) {
            neighborRow = (neighborRow + this.rows) % this.rows
            neighborColumn = (neighborColumn + this.columns) % this.columns
          }

          if (this.options.wrap || (
            !this.options.wrap && !(
              neighborRow < 0
              || neighborRow >= this.rows
              || neighborColumn < 0
              || neighborColumn >= this.columns))) {
            surroundings.push(this.grid[neighborRow][neighborColumn])
          } else {
            surroundings.push(null)
          }
        }
      }
    }

    return surroundings
  }

  // Initialize the grid from a mapping
  initFrom(grid = [], mappings = []) {
    this.grid = []
    let row = 0
    let column = 0
    for (; row < this.rows; row++) {
      this.grid.push([])
      for (column = 0; column < this.columns; column++) {
        let result = null
        for (let i = 0; i < mappings.length; i++) {
          const { type, value } = mappings[i]
          if (grid[row][column] === value) {
            const Cell = this.cellTypes.get(type)
            result = new Cell(row, column, this.rows, this.columns)
            break
          }
        }
        this.grid[row].push(result)
      }
    }

    this.initGrid = simplifyGrid(this.grid)
  }

  convertGrid(mappings = [], defaultValue = 0) {
    const { grid, rows, columns } = this
    const exportGrid = []
    let row = 0
    let column = 0
    for (; row < rows; row++) {
      exportGrid.push([])
      for (column = 0; column < columns; column++) {
        const { type } = grid[row][column].constructor
        const { property, value } = mappings.find(m => m.type === type)

        exportGrid[row][column] = grid[row][column][property]
          ? value : defaultValue
      }
    }

    return exportGrid
  }
}

const simplifyGrid = (grid) => {
  const simple = []
  const rows = grid.length
  const columns = grid[0].length
  let row = 0
  let column = 0
  for (; row < rows; row++) {
    simple.push([])
    for (column = 0; column < columns; column++) {
      simple[row][column] = (grid[row][column] && grid[row][column].getColor()) || null
    }
  }

  return simple
}
