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
  { name: 'Explosion', getModule: () => import('./explosion') },
]

const experimentManager = {
  experiments,
  defaultExperimentName: experiments[0].name,
}

export default experimentManager
