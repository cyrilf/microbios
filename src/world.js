export const createWorld = (width = 50, height = 30) => Array.from({ length: height },
  () => Array.from({ length: width }, () => Math.random() > 0.5))

export const updateWorld = (world) => {
  const nextWorld = cloneWorld(world)

  for (let row = 0; row < world.length; row++) {
    for (let column = 0; column < world[0].length; column++) {
      const living = countAliveCellsAround(world, row, column)
      const isAlive = living === 3 || (world[row][column] && living === 2)

      nextWorld[row][column] = isAlive
    }
  }

  return nextWorld
}

const cloneWorld = world => world.map(row => row.slice(0))

const countAliveCellsAround = (world, row, column) => {
  // TODO: transform into a world option
  const WRAP = false

  const neighbors = []
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const currentCell = x === 0 && y === 0
      if (!currentCell) {
        let neighborRow = row + x
        let neighborColumn = column + y
        if (WRAP) {
          neighborRow = (neighborRow + world.length) % world.length
          neighborColumn = (neighborColumn + world[0].length) % world[0].length
        }

        if (WRAP || (
          !WRAP && !(
            neighborRow < 0
            || neighborRow >= world.length
            || neighborColumn < 0
            || neighborColumn >= world[0].length))) {
          neighbors.push(world[neighborRow][neighborColumn])
        }
      }
    }
  }

  return neighbors.filter(cell => cell).length
}
