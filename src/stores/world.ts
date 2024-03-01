import { ref, shallowRef } from 'vue';
import { defineStore } from 'pinia';

import experiments from '@/experiments';

type Loading = {
  experiment: boolean;
  renderer: boolean;
};

const useWorldStore = defineStore('world', () => {
  const config = shallowRef<WorldManagerConfig>({
    columns: 100,
    rows: 50,
    cellSize: 7
  });
  let world: World = null;
  const isPlaying = ref(false);
  const loading = ref<Loading>({ experiment: true, renderer: true });
  const fps = ref(60);
  let frames = 0;
  let animationId: number = 0;
  const currentExperiment = shallowRef(experiments.find((e) => e.selected) || experiments[0]);
  const renderer = ref('canvas');
  let onUpdateListener: (nextGeneration: NewGeneration) => void;

  const init = async ({
    initConfig,
    onUpdate
  }: {
    initConfig?: Partial<WorldManagerConfig>;
    onUpdate?: (nextGeneration: NewGeneration) => void;
  } = {}) => {
    if (onUpdate) {
      onUpdateListener = onUpdate;
    }
    config.value = { ...config.value, ...initConfig };

    const module = await currentExperiment.value?.getModule();
    if (!module) {
      throw new Error('No current experiment selected');
    }
    const createWorld = module.default;
    world = createWorld(config.value);
    setLoading({ experiment: false });
    update(); // first generation
  };

  const changeConfig = (partialConfig?: Partial<WorldManagerConfig>) => {
    config.value = { ...config.value, ...partialConfig };
    if (partialConfig?.columns || partialConfig?.rows) {
      restart();
    }
  };

  const update = () => {
    if (!world) return;

    if (world?.options?.maxGeneration > world.generation) {
      if (!isPlaying.value || (isPlaying.value && fps.value !== 0 && frames > 60 / fps.value)) {
        onUpdateListener?.(world.nextGeneration());
        frames = 0;
      }

      if (isPlaying.value) {
        animationId = requestAnimationFrame(update);
        frames++;
      }
    }
  };
  const restart = async () => {
    const wasPlaying = isPlaying.value;
    pause();
    await init();
    wasPlaying && play();
  };

  const play = () => {
    if (animationId) return;
    // TODO replace with update()
    animationId = requestAnimationFrame(update);
    isPlaying.value = true;
  };

  const pause = () => {
    animationId && cancelAnimationFrame(animationId);
    animationId = 0;
    isPlaying.value = false;
  };

  const setLoading = (partialLoading: Partial<Loading>) => {
    loading.value = { ...loading.value, ...partialLoading };
  };

  const changeExperiment = (experimentId: string) => {
    if (currentExperiment.value.id !== experimentId) {
      const experiment = experiments.find((e) => e.id === experimentId);
      if (!experiment) {
        throw new Error(`The experiment "${experimentId}" isn't registered`);
      }

      setLoading({ experiment: true });
      currentExperiment.value = experiment;
      restart();
    }
  };

  const changeRenderer = (newRenderer: string) => {
    setLoading({ renderer: true });
    renderer.value = newRenderer;
  };

  const changeFPS = (newFPS: number) => {
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
    update,
    restart,
    setLoading,
    play,
    pause,
    changeExperiment,
    changeRenderer,
    changeConfig,
    changeFPS
  };
});

export { useWorldStore };
