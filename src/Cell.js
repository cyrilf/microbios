export default class Cell {
  static type = 'Cell'

  constructor(row, column) {
    this.row = row
    this.column = column
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
