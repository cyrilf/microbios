import { defineStore } from 'pinia';

import { useWorldManager } from '@/core/worldManager';
import experiments from '@/experiments';

const useWorldStore = defineStore('world', () => {
  const worldManager = useWorldManager();
  const { config, isPlaying, fps, currentExperiment, renderer, loading } = worldManager;
  const {
    init: initWorldManager,
    setConfig,
    update,
    play,
    pause,
    restart,
    setLoading,
    setExperiment,
    setRenderer,
    setFPS
  } = worldManager;
  const init = async ({
    userConfig,
    updateCallback
  }: {
    userConfig?: Partial<WorldManagerConfig>;
    updateCallback?: (nextGeneration: NewGeneration) => void;
  } = {}) => {
    initWorldManager({ userConfig, updateCallback, experiments });
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
});

export { useWorldStore };
