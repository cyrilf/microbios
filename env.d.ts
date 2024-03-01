/// <reference types="vite/client" />
declare module "simple-code-editor";

// TODO
type Experiment = {
  id: string;
  name: string;
  selected?: boolean;
  value: string;
  getModule: () => Promise<World>;
};
type World = any;

type WorldManagerConfig = {
  columns: number;
  rows: number;
  cellSize: number;
};

type WorldConfig = {
  rows: number;
  columns: number;
};
type WorldOptions = {
  wrap: boolean;
  maxGeneration: number;
};

type NewGeneration = [newGrid: Cell[][], newGeneration: number];

type CellClass = {
  new (row: number, column: number, rows: number, columns: number): Cell;
  type: string;
};
