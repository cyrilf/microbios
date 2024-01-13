/// <reference types="vite/client" />
declare module "simple-code-editor";

type WorldManager = {
  config: WorldManagerConfig;
  experiments: Array<Experiment>;
  currentExperiment: Experiment;
  isPlaying: boolean;
  fps: number;
  frames: number;
  animationId: number | null;
  listeners: { [name: string]: Function[] };
  world: World | null;

  init: (config?: Partial<WorldManagerConfig>) => void;
  update: () => void;
  restart: () => void;
  play: () => boolean;
  pause: () => boolean;
  setExperiments: (experiments: Experiment[]) => void;
  setExperiment: (experiment: Experiment) => void;
  setConfig: (config: Partial<WorldManagerConfig>, isInit: boolean) => void;
  setFPS: (fps: number) => number;
  on: (eventName: string, callback: Function) => void;
  emit: (eventName: string, ...args: any[]) => void;
};

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
