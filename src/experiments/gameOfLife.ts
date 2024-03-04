import Cell from '../core/Cell';
import createExperiment from '../core/utils/createExperiment';

export class Living extends Cell {
  static type = 'living';

  alive = Math.random() > 0.5;
  wasAlive = false;

  getColor() {
    return this.alive ? `rgba(68, 36, 52, ${this.wasAlive ? 1 : 0.8})` : null;
  }

  prepare() {
    this.wasAlive = this.alive;
  }

  process(neighbors: Living[]) {
    const neighborsAlive = neighbors.filter((neighbor) => neighbor && neighbor.wasAlive).length;
    this.alive = neighborsAlive === 3 || (neighborsAlive === 2 && this.alive);
  }
}

export default createExperiment(Living);
