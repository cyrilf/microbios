import Vue from 'vue'
import Vuex from 'vuex'

import experimentManager from './experiments'
import worldManager from './worldManager'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    config: { columns: 100, rows: 50, cellSize: 7 },
    generation: 0,
    grid: [],
    isPlaying: false,
    loading: { experiment: true, renderer: true },
    fps: 60,
    experiments: experimentManager.experiments,
    currentExperiment: experimentManager.defaultExperiment,
    renderer: 'Canvas',
  },

  actions: {
    async init({ state, commit }, config = state.config) {
      config !== state.config && commit('changeConfig', config)

      worldManager.setExperiments(experimentManager.experiments)
      worldManager.on('init', () => commit('setLoading', { experiment: false }))
      worldManager.on('update', nextGeneration => commit('nextGeneration', nextGeneration))

      await worldManager.init(config)
    },

    update() { worldManager.update() },

    restart() { worldManager.restart() },

    changeExperiment({ state, commit }, experiment) {
      if (state.currentExperiment !== experiment) {
        commit('setLoading', { experiment: true })
        commit('changeExperiment', experiment)
        worldManager.setExperiment(experiment)
      }
    },

    changeRenderer({ commit }, renderer) {
      commit('setLoading', { renderer: true })
      commit('changeRenderer', renderer)
    },

    changeConfig({ commit }, partialConfig) {
      commit('changeConfig', partialConfig)
      worldManager.setConfig(partialConfig)
    },

    setLoading({ commit }, loading) {
      commit('setLoading', loading)
    },

    play({ commit }) {
      commit('setIsPlaying', true)
      worldManager.play()
    },

    pause({ commit }) {
      commit('setIsPlaying', false)
      worldManager.pause()
    },

    changeFPS({ commit }, fps) {
      commit('setFPS', { fps: worldManager.setFPS(fps) })
    },
  },

  mutations: {
    nextGeneration(state, [grid, generation]) {
      state.grid = grid
      state.generation = generation
    },

    setIsPlaying(state, isPlaying) {
      state.isPlaying = isPlaying
    },

    setLoading(state, loading) {
      state.loading = { ...state.loading, ...loading }
    },

    setFPS(state, { fps }) {
      if (fps >= 0) {
        state.fps = fps
      }
    },

    changeExperiment(state, experiment) {
      state.currentExperiment = experiment
    },

    changeRenderer(state, renderer) {
      state.renderer = renderer
    },

    changeConfig(state, partialConfig) {
      state.config = { ...state.config, ...partialConfig }
    },
  },
})
