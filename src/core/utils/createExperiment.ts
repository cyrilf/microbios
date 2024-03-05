import World from '../World';

export default (CellClass: CellClass, worldConfig = {}) =>
  (config = {}) => {
    const world = new World({ ...config, ...worldConfig });

    world.registerCellClass(CellClass);

    world.init([{ type: CellClass.type, distribution: 100 }]);

    return world;
  };
