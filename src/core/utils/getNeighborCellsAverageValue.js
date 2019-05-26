export default (neighbors, value) => {
  const summed = neighbors.reduce((sum, neighbor) => {
    let result = sum
    if (neighbor !== null && (neighbor[value] || neighbor[value] === 0)) {
      result += neighbor[value]
    }
    return result
  }, 0)

  return summed / neighbors.length
}
