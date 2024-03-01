export default abstract class Cell {
  static type = 'Cell';
  [key: string]: any;

  public row: number;
  public column: number;
  public worldRows: number;
  public worldColumns: number;

  constructor(row: number, column: number, rows: number, columns: number) {
    this.row = row;
    this.column = column;
    this.worldRows = rows;
    this.worldColumns = columns;
  }

  // Return the cell color
  abstract getColor(): string | null;

  // Prepare the cell state for the next generation
  abstract prepare(): void;

  // Change the cell state based on its neighbors
  abstract process(neighbors: (Cell | null)[]): void;
}
