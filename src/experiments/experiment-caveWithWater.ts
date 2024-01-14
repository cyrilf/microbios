import Cell from "../core/Cell";
import World from "../core/World";
import {
  TOP,
  BOTTOM,
  BOTTOM_LEFT,
  BOTTOM_RIGHT,
  LEFT,
  RIGHT,
} from "../core/utils/neighborIndexes";
import caveExperiment from "./experiment-cave";

const COLORS = [
  "rgba(89, 125, 206, 0)",
  `rgba(89, 125, 206, ${1 / 9})`,
  `rgba(89, 125, 206, ${2 / 9})`,
  `rgba(89, 125, 206, ${3 / 9})`,
  `rgba(89, 125, 206, ${4 / 9})`,
  `rgba(89, 125, 206, ${5 / 9})`,
  `rgba(89, 125, 206, ${6 / 9})`,
  `rgba(89, 125, 206, ${7 / 9})`,
  `rgba(89, 125, 206, ${8 / 9})`,
  "rgba(89, 125, 206, 1)",
  "rgba(109, 170, 44, 1)",
  "rgba(68, 36, 52, 1)",
];

const WATER_FULL = 9;

class Water extends Cell {
  static type = "water";

  water = Math.floor(Math.random() * WATER_FULL);

  getColor() {
    return COLORS[this.water];
  }

  process(neighbors: Water[]) {
    if (!this.water) {
      return;
    }
    // Give as much to the bottom neighbor
    this.manageWater(neighbors[BOTTOM], 1);
    // Give half to the bottom corners
    this.manageWater(neighbors[BOTTOM_LEFT], 1 / 2);
    this.manageWater(neighbors[BOTTOM_RIGHT], 1 / 2);
    // Give a third to the sides
    this.manageWater(neighbors[LEFT], 1 / 3, this.water);
    this.manageWater(neighbors[RIGHT], 1 / 3, this.water);
  }

  prepare() {}

  manageWater(
    neighbor: Water,
    quantity: number,
    minimumWaterTransfer = WATER_FULL
  ) {
    if (
      !this.water ||
      neighbor === null ||
      !("water" in neighbor) ||
      neighbor.water >= minimumWaterTransfer
    ) {
      return;
    }
    const amount = Math.min(
      this.water,
      Math.ceil((WATER_FULL - neighbor.water) * quantity)
    );
    this.water -= amount;
    // eslint-disable-next-line no-param-reassign
    neighbor.water += amount;
  }
}

class Rock extends Cell {
  static type = "rock";

  moss = false;

  getColor() {
    return COLORS[this.moss ? 10 : 11];
  }

  process(neighbors: Rock[] | Water[]) {
    const bottomNeighborIsRock =
      neighbors[BOTTOM] && "moss" in neighbors[BOTTOM];
    const topNeighborIsWaterNotFull =
      neighbors[TOP] &&
      "water" in neighbors[TOP] &&
      neighbors[TOP].water !== WATER_FULL;
    this.moss = bottomNeighborIsRock && topNeighborIsWaterNotFull;
  }

  prepare() {}
}

export default (config: WorldConfig) => {
  const cave = caveExperiment(config);

  for (let i = 0; i < 10; i++) {
    cave.nextGeneration();
  }

  const grid = cave.convertGrid(
    [{ type: "wall", property: "open", value: 0 }],
    1
  );

  const world = new World(config);
  world.registerCellClass(Water);
  world.registerCellClass(Rock);

  world.initFrom(grid, [
    { value: 1, type: "rock" },
    { value: 0, type: "water" },
  ]);

  return world;
};
