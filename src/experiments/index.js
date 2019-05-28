const experiments = [
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
  { id: 'snake', name: 'Snake' },
].map(e => ({ ...e, getModule: () => import(`./${e.id}`) }))

export default experiments
