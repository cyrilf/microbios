import Cell from "../core/Cell";
import createExperiment from "../core/utils/createExperiment";

const CHANCE_TO_IGNITE = 0.0001;
const CHANCE_TO_GROW = 0.01;

const COLORS = [
  "rgba(208, 70, 72, 0)",
  "rgba(208, 70, 72, 0.111)",
  "rgba(208, 70, 72, 0.222)",
  "rgba(208, 70, 72, 0.333)",
  "rgba(208, 70, 72, 0.444)",
  "rgba(208, 70, 72, 0.555)",
  "rgba(208, 70, 72, 0.666)",
  "rgba(208, 70, 72, 0.777)",
  "rgba(208, 70, 72, 0.888)",
  "rgba(208, 70, 72, 1)",
  "rgba(52, 101, 36, 1)",
  null,
];

class Tree extends Cell {
  static type = "tree";

  burning = 0;
  wasBurning = false;
  alive = false;

  getColor() {
    return COLORS[this.burning || (this.alive ? 10 : 11)];
  }

  prepare() {
    this.wasBurning = this.burning !== 0;
  }

  process(neighbors: Tree[]) {
    if (this.wasBurning) {
      this.burning -= 3;
    } else if (this.alive) {
      const hasBurningNeighbor = neighbors.some(
        (neighbor) => neighbor && neighbor.wasBurning
      );
      if (hasBurningNeighbor || Math.random() < CHANCE_TO_IGNITE) {
        this.burning = 9;
        this.alive = false;
      }
    } else if (Math.random() < CHANCE_TO_GROW) {
      this.alive = true;
    }
  }
}

export default createExperiment(Tree);
