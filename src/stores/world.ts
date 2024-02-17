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
  let worldManager: WorldManager | null = null;
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
    worldManager = newWorldManager;
    if (initConfig && initConfig !== config.value) {
      changeConfig(initConfig);
    }

    await worldManager.init(initConfig || config.value);
  };

  const setLoading = (partialLoading: Partial<Loading>) => {
    loading.value = { ...loading.value, ...partialLoading };
  };
  const update = () => {
    worldManager?.update();
  };
  const restart = () => {
    worldManager?.restart();
  };

  const play = () => {
    isPlaying.value = true;
    worldManager?.play();
  };

  const pause = () => {
    isPlaying.value = false;
    worldManager?.pause();
  };

  const changeExperiment = (experimentId: string) => {
    if (currentExperiment.value.id !== experimentId) {
      const experiment = experiments.find((e) => e.id === experimentId);
      if (!experiment) {
        throw new Error(`The experiment "${experimentId}" isn't registered`);
      }

      setLoading({ experiment: true });
      currentExperiment.value = experiment;
      worldManager?.setExperiment(experiment);
    }
  };

  const changeRenderer = (newRenderer: string) => {
    setLoading({ renderer: true });
    renderer.value = newRenderer;
  };

  const changeConfig = (partialConfig?: Partial<WorldManagerConfig>) => {
    const newConfig = { ...config.value, ...partialConfig };
    config.value = newConfig;
    worldManager?.setConfig(newConfig);
  };

  const changeFPS = (newFPS: number) => {
    if (newFPS >= 0) {
      fps.value = newFPS;
      worldManager?.setFPS(newFPS);
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
    changeFPS,
  };
});

export { useWorldStore };
