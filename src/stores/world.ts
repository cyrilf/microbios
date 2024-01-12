import { ref } from "vue";
import { defineStore } from "pinia";

import experiments from "@/experiments";

type Loading = {
  experiment: boolean;
  renderer: boolean;
};

const useWorldStore = defineStore("world", () => {
  const config = ref<WorldManagerConfig>({
    columns: 100,
    rows: 50,
    cellSize: 7,
  });
  const worldManager = ref<WorldManager | null>(null);
  const generation = ref(0);
  const grid = ref<string[][]>([]);
  const isPlaying = ref(false);
  const loading = ref<Loading>({ experiment: true, renderer: true });
  const fps = ref(60);
  const currentExperiment = ref(
    experiments.find((e) => e.selected) || experiments[0]
  );
  const renderer = ref("WorldCanvas");

  const init = async (
    newWorldManager: WorldManager,
    initConfig?: Partial<WorldManagerConfig>
  ) => {
    worldManager.value = newWorldManager;
    if (initConfig !== config.value) {
      changeConfig(initConfig);
    }

    await worldManager.value.init(initConfig);
  };

  const update = worldManager.value?.update();
  const resart = worldManager.value?.restart();
  const setLoading = (partialLoading: Partial<Loading>) => {
    loading.value = { ...loading.value, ...partialLoading };
  };

  const play = () => {
    isPlaying.value = true;
    worldManager.value?.play();
  };

  const pause = () => {
    isPlaying.value = false;
    worldManager.value?.pause();
  };

  const changeExperiment = (experimentId: string) => {
    if (currentExperiment.value.id !== experimentId) {
      const experiment = experiments.find((e) => e.id === experimentId);
      if (!experiment) {
        throw new Error(`The experiment "${experimentId}" isn't registered`);
      }

      setLoading({ experiment: true });
      currentExperiment.value = experiment;
      worldManager.value?.setExperiment(experiment);
    }
  };

  const changeRenderer = (newRenderer: string) => {
    setLoading({ renderer: true });
    renderer.value = newRenderer;
  };

  const changeConfig = (partialConfig?: Partial<WorldManagerConfig>) => {
    config.value = { ...config.value, ...partialConfig };
  };

  const changeFPS = (newFPS: number) => {
    if (newFPS >= 0) {
      fps.value = newFPS;
      worldManager.value?.setFPS(newFPS);
    }
  };

  const nextGeneration = ([newGrid, newGeneration]: NewGeneration) => {
    grid.value = newGrid;
    generation.value = newGeneration;
  };

  return {
    worldManager,
    config,
    generation,
    grid,
    isPlaying,
    loading,
    fps,
    currentExperiment,
    renderer,

    init,
    update,
    resart,
    setLoading,
    play,
    pause,
    changeExperiment,
    changeRenderer,
    changeConfig,
    changeFPS,
    nextGeneration,
  };
});

export { useWorldStore };
