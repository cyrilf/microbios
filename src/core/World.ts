import Cell from "./Cell";

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
        "You forgot to register your `cellTypes`. Make sure to call `registerCellClass` before `init`"
      );
    }
    sortedCellDistribution.sort((a, b) =>
      a.distribution > b.distribution ? 1 : -1
    );

    let totalDistribution = 0;
    sortedCellDistribution = sortedCellDistribution.map((cd) => {
      totalDistribution += cd.distribution;
      return { ...cd, distribution: totalDistribution };
    });

    this.grid = [];
    let row = 0;
    let column = 0;
    for (; row < this.rows; row++) {
      this.grid.push([]);
      for (column = 0; column < this.columns; column++) {
        const random = Math.random() * totalDistribution;
        const type = sortedCellDistribution.find(
          ({ distribution }) => random <= distribution
        )?.type;
        if (type) {
          const CellClass = this.cellTypes.get(type);
          this.grid[row].push(
            CellClass
              ? new CellClass(row, column, this.rows, this.columns)
              : null
          );
        }
      }
    }

    // this.initGrid = simplifyGrid(this.grid);
  }

  registerCellClass<T extends CellClass>(CellClass: T) {
    this.cellTypes.set(CellClass.type, CellClass);
  }

  // Compute the next X generations where X is the param `steps`
  nextGeneration(steps = 1) {
    let i = 0;
    let row = 0;
    let column = 0;
    let cell;
    for (; i < steps; i++) {
      for (row = 0; row < this.rows; row++) {
        for (column = 0; column < this.columns; column++) {
          this.grid[row][column]?.prepare();
        }
      }
      // bottom/up processing (used by cave with water experiment)
      // better at renderering scenes that modify bottom neighbor
      for (row = this.rows - 1; row >= 0; row--) {
        for (column = 0; column < this.columns; column++) {
          cell = this.grid[row][column];
          if (cell) {
            const neighbors = this.getNeighbors(cell.row, cell.column);
            cell.process(neighbors);
          }
        }
      }

      this.generation += 1;
    }

    return [simplifyGrid(this.grid), this.generation];
  }

  // Get the 7 neighbors cells based on the coordinates
  getNeighbors(row: number, column: number) {
    const neighbors = [];
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
  initFrom(grid: number[][] = [], mappings: Mapping[] = []) {
    this.grid = [];
    let row = 0;
    let column = 0;
    for (; row < this.rows; row++) {
      this.grid.push([]);
      for (column = 0; column < this.columns; column++) {
        let result = null;
        for (let i = 0; i < mappings.length; i++) {
          const { type, value } = mappings[i];
          if (grid[row][column] === value) {
            const CellClass = this.cellTypes.get(type);
            result = CellClass
              ? new CellClass(row, column, this.rows, this.columns)
              : null;
            break;
          }
        }
        this.grid[row].push(result);
      }
    }

    // this.initGrid = simplifyGrid(this.grid);
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
          // @ts-ignore
          exportGrid[row][column] = grid[row][column][property]
            ? value
            : defaultValue;
        }
      }
    }

    return exportGrid;
  }
}

const simplifyGrid = (grid: (Cell | null)[][]) => {
  const simple: (string | null)[][] = [];
  const rows = grid.length;
  const columns = grid[0].length;
  let row = 0;
  let column = 0;
  for (; row < rows; row++) {
    simple.push([]);
    for (column = 0; column < columns; column++) {
      simple[row][column] = grid[row][column]?.getColor() || null;
    }
  }

  return simple;
};
