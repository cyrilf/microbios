import Cell from '../core/Cell';
import createExperiment from '../core/utils/createExperiment';
import getNeighborCellsAverageValue from '../core/utils/getNeighborCellsAverageValue';

// thanks to @sanojian who thanks lithander on TIGSource

const COLORS: string[] = [];
const REVERSE_COLORS_INDEX: number[] = [];
for (let index = 0; index < 64; index++) {
  COLORS.push(`rgba(89, 125, 206, ${index / 64})`);
  REVERSE_COLORS_INDEX[index] = 63 - index;
}

export class Water extends Cell {
  static type = 'water';

  water = true;
  value = 0;
  prev = this.value;
  next = this.value;
  droplet = false;

  getColor() {
    const v = Math.max(2 * this.value + 0.02, 0) - 0.02 + 0.5;
    return COLORS[REVERSE_COLORS_INDEX[Math.floor(REVERSE_COLORS_INDEX.length * v)]];
  }

  prepare() {
    if (Math.random() > 0.9999) {
      this.value = -0.2 + 0.25 * Math.random();
      this.prev = this.value;
      this.droplet = true;
    } else {
      this.prev = this.value;
      this.value = this.next;
    }
  }

  process(neighbors: Water[]) {
    if (this.droplet === true) {
      const neighborsLength = neighbors.length;

      for (let i = 0; i < neighborsLength; i++) {
        const neighbor = neighbors[i];
        if (neighbor !== null && neighbor.value) {
          neighbor.value = 0.5 * this.value;
          neighbor.prev = 0.5 * this.prev;
        }
      }

      this.droplet = false;
    }
    const avg = getNeighborCellsAverageValue(neighbors.map((n) => n?.value));
    this.next = 0.99 * (2 * avg - this.prev);
  }
}

export default createExperiment(Water);
