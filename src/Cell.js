export default class Cell {
  static type = 'Cell'

  constructor(column, row, color) {
    this.column = column
    this.row = row
    this.color = color || 'rgba(0, 0, 0, 1)'
  }


  // eslint-disable-next-line
  reset(surroundings) {}
  // eslint-disable-next-line
  process(surroundings) {}
  // eslint-disable-next-line
  click() {}

  getColor() { return this.color }
}
