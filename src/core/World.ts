import Cell from './Cell';

type Grid = (Cell | null)[][];
type Distribution = {
  distribution: number;
  type: string;
};
type Mapping = {
  type: string;
  value: number;
  property?: string;
};

export type WorldType = typeof World;
export default class World {
  public columns: number;
  public rows: number;
  public options: WorldOptions;
  public grid: Grid;
  public generation: number;
  public cellTypes: Map<string, CellClass>;

  constructor({ columns = 0, rows = 0, ...rest }) {
    this.columns = columns;
    this.rows = rows;
    this.options = { wrap: false, maxGeneration: Infinity, ...rest };
    this.grid = [];
    this.generation = 0;
    this.cellTypes = new Map();
  }

  init(cellDistributions: Distribution[]) {
    let sortedCellDistribution = cellDistributions.slice(0);
    if (this.cellTypes.size === 0) {
      throw new Error(
        'You forgot to register your `cellTypes`. Make sure to call `registerCellClass` before `init`'
      );
    }
    sortedCellDistribution.sort((a, b) => (a.distribution > b.distribution ? 1 : -1));

    let totalDistribution = 0;
    sortedCellDistribution = sortedCellDistribution.map((cd) => {
      totalDistribution += cd.distribution;
      return { ...cd, distribution: totalDistribution };
    });

    this.grid = Array.from({ length: this.rows }, (_, row) =>
      Array.from({ length: this.columns }, (_, column) => {
        const random = Math.random() * totalDistribution;
        const type = sortedCellDistribution.find(({ distribution }) => random <= distribution)
          ?.type;
        const CellClass = type ? this.cellTypes.get(type) : null;
        return CellClass ? new CellClass(row, column, this.rows, this.columns) : null;
      })
    );
  }

  registerCellClass<T extends CellClass>(CellClass: T) {
    this.cellTypes.set(CellClass.type, CellClass);
  }

  // Compute the next X generations where X is the param `steps`
  nextGeneration(steps = 1) {
    Array.from({ length: steps }, () => {
      this.grid.forEach((row) => {
        row.forEach((cell) => cell?.prepare());
      });

      // bottom/up processing (used by cave with water experiment)
      // better at renderering scenes that modify bottom neighbor
      let row = 0;
      for (row = this.rows - 1; row >= 0; row--) {
        this.grid[row].forEach((cell) => cell?.process(this.getNeighbors(cell.row, cell.column)));
      }

      this.generation += 1;
    });

    return [simplifyGrid(this.grid), this.generation];
  }

  // Get the 7 neighbors cells based on the coordinates
  getNeighbors(row: number, column: number) {
    const neighbors: (Cell | null)[] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const currentCell = x === 0 && y === 0;
        if (!currentCell) {
          let neighborRow = row + x;
          let neighborColumn = column + y;
          if (this.options.wrap) {
            neighborRow = (neighborRow + this.rows) % this.rows;
            neighborColumn = (neighborColumn + this.columns) % this.columns;
          }

          if (
            this.options.wrap ||
            (!this.options.wrap &&
              !(
                neighborRow < 0 ||
                neighborRow >= this.rows ||
                neighborColumn < 0 ||
                neighborColumn >= this.columns
              ))
          ) {
            neighbors.push(this.grid[neighborRow][neighborColumn]);
          } else {
            neighbors.push(null);
          }
        }
      }
    }

    return neighbors;
  }

  // Initialize the grid from a mapping
  initFrom(initGrid: number[][] = [], mappings: Mapping[] = []) {
    const grid: Grid = [];
    let row = 0;
    let column = 0;
    for (; row < this.rows; row++) {
      grid.push([]);
      for (column = 0; column < this.columns; column++) {
        let result = null;
        for (let i = 0; i < mappings.length; i++) {
          const { type, value } = mappings[i];
          if (initGrid[row][column] === value) {
            const CellClass = this.cellTypes.get(type);
            result = CellClass ? new CellClass(row, column, this.rows, this.columns) : null;
            break;
          }
        }
        grid[row].push(result);
      }
    }

    this.grid = grid;
  }

  convertGrid(mappings: Mapping[] = [], defaultValue = 0) {
    const { grid, rows, columns } = this;
    const exportGrid: number[][] = [];
    let row = 0;
    let column = 0;
    for (; row < rows; row++) {
      exportGrid.push([]);
      for (column = 0; column < columns; column++) {
        const type = (grid[row][column]?.constructor as typeof Cell)?.type;
        const mapping = mappings.find((m) => m.type === type);
        if (mapping) {
          const { property, value } = mapping;
          exportGrid[row][column] =
            property && grid[row][column]?.[property] ? value : defaultValue;
        }
      }
    }

    return exportGrid;
  }
}

const simplifyGrid = (grid: (Cell | null)[][]): (string | null)[][] =>
  grid.map((row) => row.map((cell) => cell?.getColor() ?? null));
