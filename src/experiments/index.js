const experiments = [
  { name: 'Game of Life', getModule: () => import('./gameOfLife') },
  { name: 'Forest Fire', getModule: () => import('./forestFire') },
  { name: 'Maze', getModule: () => import('./maze') },
  { name: 'Cave', getModule: () => import('./cave') },
  { name: 'Cave with water', getModule: () => import('./caveWithWater') },
  { name: 'Cave with rain', getModule: () => import('./caveWithRain') },
  { name: 'Splash', getModule: () => import('./splash') },
  { name: 'Lava', getModule: () => import('./lava') },
  { name: 'Cyclic', getModule: () => import('./cyclic') },
  { name: 'Glitch', getModule: () => import('./glitch') },
  { name: 'Explosion', getModule: () => import('./explosion') },
]

export default experiments
