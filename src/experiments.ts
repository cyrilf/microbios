const experiments: Experiment[] = [
  { id: 'gameOfLife', name: 'Game of Life' },
  { id: 'forestFire', name: 'Forest Fire' },
  { id: 'maze', name: 'Maze' },
  { id: 'cave', name: 'Cave' },
  { id: 'caveWithWater', name: 'Cave with water' },
  { id: 'caveWithRain', name: 'Cave with rain' },
  { id: 'splash', name: 'Splash' },
  { id: 'lava', name: 'Lava' },
  { id: 'cyclic', name: 'Cyclic' },
  { id: 'glitch', name: 'Glitch' },
  { id: 'explosion', name: 'Explosion' },
  { id: 'snakes', name: 'Snakes', selected: true }
].map((e) => ({
  ...e,
  value: e.id /* to be compatible with dat-select */,
  getModule: () => import(`./experiments/${e.id}.ts`)
}));

export default experiments;
