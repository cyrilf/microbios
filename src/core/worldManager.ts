import { ref, shallowRef } from 'vue';

export const useWorldManager = () => {
  const config = shallowRef({ columns: 100, rows: 50, cellSize: 7 });
  let world: World = null;
  const isPlaying = ref(false);
  const loading = ref<Loading>({ experiment: true, renderer: true });
  const fps = ref(60);
  let frames = 0;
  let animationId: number = 0;
  let experiments: Experiment[] = [];
  const currentExperiment = shallowRef<Experiment | null>(null);
  const renderer = ref('canvas');
  let onUpdateCallback: (nextGeneration: NewGeneration) => void;

  const init = async ({
    userConfig,
    updateCallback,
    experiments
  }: {
    userConfig?: Partial<WorldManagerConfig>;
    updateCallback?: typeof onUpdateCallback;
    experiments?: Experiment[];
  } = {}) => {
    if (updateCallback) {
      onUpdateCallback = updateCallback;
    }
    if (experiments) {
      setExperiments(experiments);
    }

    config.value = { ...config.value, ...userConfig };

    const module = await currentExperiment.value?.getModule();
    if (!module) {
      throw new Error('No current experiment selected');
    }
    const createWorld = module.default;
    world = createWorld(config.value);
    setLoading({ experiment: false });
    update(); // first generation
  };

  const update = () => {
    if (!world) return;
    if (world.options.maxGeneration > world.generation) {
      if (!isPlaying.value || (isPlaying.value && fps.value !== 0 && frames > 60 / fps.value)) {
        onUpdateCallback?.(world.nextGeneration());
        frames = 0;
      }

      if (isPlaying.value) {
        animationId = requestAnimationFrame(update);
        frames++;
      }
    }
  };

  const play = () => {
    if (animationId) return;
    animationId = requestAnimationFrame(update);
    isPlaying.value = true;
  };

  const pause = () => {
    animationId && cancelAnimationFrame(animationId);
    animationId = 0;
    isPlaying.value = false;
  };

  const restart = async () => {
    const wasPlaying = isPlaying.value;
    pause();
    await init();
    wasPlaying && play();
  };

  const setLoading = (partialLoading: Partial<Loading>) => {
    loading.value = { ...loading.value, ...partialLoading };
  };

  const setExperiments = (newExperiments: Experiment[]) => {
    experiments = newExperiments;
    currentExperiment.value = newExperiments.find((e) => e.selected) || newExperiments[0];
  };

  const setExperiment = (experimentId: string) => {
    if (currentExperiment.value?.id !== experimentId) {
      const experiment = experiments.find((e) => e.id === experimentId);
      if (!experiment) {
        throw new Error(`The experiment "${experimentId}" isn't registered`);
      }

      setLoading({ experiment: true });
      currentExperiment.value = experiment;
      restart();
    }
  };

  const setRenderer = (newRenderer: string) => {
    setLoading({ renderer: true });
    renderer.value = newRenderer;
  };

  const setConfig = (partialConfig?: Partial<WorldManagerConfig>) => {
    config.value = { ...config.value, ...partialConfig };
    if (partialConfig?.columns || partialConfig?.rows) {
      restart();
    }
  };

  const setFPS = (newFPS: number) => {
    if (newFPS >= 0) {
      fps.value = newFPS;
    }
  };

  return {
    config,
    isPlaying,
    loading,
    fps,
    experiments,
    currentExperiment,
    renderer,

    init,
    setExperiments,
    setExperiment,
    update,
    play,
    pause,
    restart,
    setLoading,
    setRenderer,
    setConfig,
    setFPS
  };
};
