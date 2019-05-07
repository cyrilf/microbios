export default class Cell {
  static type = 'Cell'

  constructor(row, column, rows, columns) {
    this.row = row
    this.column = column
    this.worldRows = rows
    this.worldColumns = columns
  }


  // eslint-disable-next-line
  reset(surroundings) {}
  // eslint-disable-next-line
  process(surroundings) {}
  // eslint-disable-next-line
  click() {}
  // eslint-disable-next-line
  getColor() {}
}
