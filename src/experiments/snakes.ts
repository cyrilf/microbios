import Cell from '../core/Cell';
import createExperiment from '../core/utils/createExperiment';
import { TOP, RIGHT, BOTTOM, LEFT } from '../core/utils/neighborIndexes';

const LENGTH = 5;
const COLORS = [
  'rgba(237,201,81,',
  'rgba(235,104,65,',
  'rgba(204,42,54,',
  'rgba(79,55,45,',
  'rgba(0,160,176,'
];

class Snake extends Cell {
  static type = 'snake';

  life = Math.random() > 0.99 ? LENGTH : 0;
  nextLife = this.life;
  color = COLORS[Math.floor(Math.random() * COLORS.length)];

  getColor() {
    return this.life === 0 ? null : `${this.color} ${this.life / LENGTH})`;
  }

  prepare() {
    this.life = this.nextLife;
  }

  process(neighbors: Snake[]) {
    let stucked = false;
    if (this.life === LENGTH) {
      const emptyNeighbors = [
        neighbors[TOP],
        neighbors[RIGHT],
        neighbors[BOTTOM],
        neighbors[LEFT]
      ].filter((n) => n && n.nextLife === 0);
      const emptyNeighbor = emptyNeighbors[Math.floor(Math.random() * emptyNeighbors.length)];
      if (emptyNeighbor) {
        emptyNeighbor.nextLife = LENGTH;
        emptyNeighbor.color = this.color;
      } else {
        stucked = true;
      }
    }
    if (this.life !== 0) {
      this.nextLife = stucked ? LENGTH : Math.max(this.life - 1, 0);
    }
  }
}

export default createExperiment(Snake);
