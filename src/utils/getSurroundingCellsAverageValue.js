export default (neighbors, value) => {
  const summed = neighbors.reduce((result, neighbor) => {
    if (neighbor !== null && (neighbor[value] || neighbor[value] === 0)) {
      result += neighbor[value] // eslint-disable-line no-param-reassign
    }
    return result
  }, 0)

  return summed / neighbors.length
}
