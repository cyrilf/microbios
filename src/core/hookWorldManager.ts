import { ref } from 'vue';

// TODO
export const useWorldManager = () => {
  const baseConfig = ref({ columns: 40, rows: 40, cellSize: 7 });
  const experiments = ref<Experiment[]>([]);
  const currentExperiment = ref<Experiment | null>(null);
  const isPlaying = ref(false);
  const fps = ref(60);
  // const frames = 0;
  const animationId = ref<number | null>(null);
  // const listeners = ref({});
  const world = ref<World>(null);

  const init = async (userConfig?: WorldManagerConfig | null) => {
    const config = userConfig ?? baseConfig;

    const module = await currentExperiment.value?.getModule();
    if (!module) {
      throw new Error('No current experiment selected');
    }
    const createWorld = module.default;
    world.value = createWorld(config);
    //emit init
    update();
  };

  const update = () => {
    if (!world.value) return;
    if (world.value.options.maxGeneration > world.value.generation) {
      // emit update
      world.value.nextGeneration();

      if (isPlaying.value) {
        animationId.value = requestAnimationFrame(update);
      }
    }
  };

  const play = () => {
    if (animationId.value) return true;
    animationId.value = requestAnimationFrame(update);
    isPlaying.value = true;
    return true;
  };

  const pause = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value);
      animationId.value = null;
    }
    isPlaying.value = false;
    return false;
  };

  const restart = async () => {
    const wasPlaying = isPlaying.value;
    pause();
    await init();
    wasPlaying && play();
  };

  const setExperiments = (newExperiments: Experiment[]) => {
    experiments.value = newExperiments;
    currentExperiment.value = newExperiments.find((e) => e.selected) || newExperiments[0];
  };

  const setExperiment = (experiment: Experiment) => {
    currentExperiment.value = experiment;
    restart();
  };

  const setConfig = (partialConfig: Partial<WorldManagerConfig>) => {
    baseConfig.value = { ...baseConfig.value, ...partialConfig };
    restart();
  };

  const setFPS = (newFps: number) => {
    fps.value = newFps;
    return newFps;
  };

  return {
    baseConfig,
    experiments,
    currentExperiment,
    isPlaying,
    fps,
    animationId,
    world,
    init,
    update,
    play,
    pause,
    restart,
    setExperiments,
    setExperiment,
    setConfig,
    setFPS
  };
};
