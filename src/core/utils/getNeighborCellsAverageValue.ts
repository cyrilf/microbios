export default (neighborsValue: number[]): number => {
  const finalSum = neighborsValue.reduce(
    (sum, value) => (value ? sum + value : sum),
    0
  );

  return finalSum / neighborsValue.length;
};
