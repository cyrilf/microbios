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

    // eslint-disable-next-line max-len
    this.grid = Array.from({ length: this.rows }, (_, row) => Array.from({ length: this.columns }, (__, column) => {
      const random = Math.random() * totalDistribution
      const { type } = cellDistributions.find(({ distribution }) => random <= distribution) || {}
      const Cell = this.cellTypes.get(type)
      return new Cell(row, column)
    }, this), this)
    this.initGrid = simplifyGrid(this.grid)
  }

  registerCellClass(CellClass) { this.cellTypes.set(CellClass.type, CellClass) }

  nextGeneration() {
    let cell
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        cell = this.grid[row][column]
        const surroundings = this.getSurroundings(cell.column, cell.row)
        cell.reset(surroundings)
      }
    }
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        cell = this.grid[row][column]
        const surroundings = this.getSurroundings(cell.column, cell.row)
        cell.process(surroundings)
      }
    }

    this.generation += 1

    return [simplifyGrid(this.grid), this.generation]
  }

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
          }
        }
      }
    }

    return surroundings
  }
}

const simplifyGrid = grid => grid.map(row => row.map(cell => cell.getColor()))
