const experiments = [
  { id: "cave", name: "Cave" },
  { id: "caveWithRain", name: "Cave with rain" },
  { id: "snakes", name: "Snakes", selected: true },
].map((e) => ({
  ...e,
  value: e.id /* to be compatible with dat-select */,
  getModule: () => import(`./experiment-${e.id}.ts`),
}));

export default experiments;
