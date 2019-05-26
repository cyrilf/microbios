export default class Cell {
  static type = 'Cell'

  constructor(row, column, rows, columns) {
    this.row = row
    this.column = column
    this.worldRows = rows
    this.worldColumns = columns
  }

  /**
   * Should return a valid CSS color string
   */
  getColor() { } // eslint-disable-line

  /**
   * Prepare the cell state for the next generation
   */
  prepare() { } // eslint-disable-line

  /**
   * Change the cell state based on its neighbors
   * @param {Array} neighbors
   */
  process(neighbors) {} // eslint-disable-line
}
