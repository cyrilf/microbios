import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let animationId = null
let frames = 0
let world

const experiments = [
  { name: 'Game of Life', getModule: () => import('./experiments/gameOfLife') },
  { name: 'Forest Fire', getModule: () => import('./experiments/forestFire') },
  { name: 'Maze', getModule: () => import('./experiments/maze') },
  { name: 'Cave', getModule: () => import('./experiments/cave') },
  { name: 'Cave with water', getModule: () => import('./experiments/caveWithWater') },
  { name: 'Splash', getModule: () => import('./experiments/splash') },
  { name: 'Lava', getModule: () => import('./experiments/lava') },
  { name: 'Cyclic', getModule: () => import('./experiments/cyclic') },
  { name: 'Explosion', getModule: () => import('./experiments/explosion') },
]

export default new Vuex.Store({
  state: {
    config: { columns: 100, rows: 50, cellSize: 7 },
    generation: 0,
    grid: [],
    isPlaying: true,
    loading: { experiment: true, renderer: true },
    fps: 60,
    experiments,
    currentExperiment: experiments[0].name,
    renderer: 'Canvas',
  },

  actions: {
    init({ state, commit }, config = state.config) {
      config !== state.config && commit('changeConfig', config)
      const currentExperiment = state.experiments.find(
        experiment => (experiment.name === state.currentExperiment),
      )
      return currentExperiment.getModule().then((module) => {
        const createWorld = module.default
        world = createWorld(config)
        commit('nextGeneration', [world.initGrid, world.generation])
        commit('setLoading', { experiment: false })
      })
    },

    update({ state, commit, dispatch }) {
      if (world.options.maxGeneration > state.generation) {
        if (!state.isPlaying
          || (state.isPlaying && state.fps !== 0 && frames >= (60 / state.fps))) {
          commit('nextGeneration', world.nextGeneration())
          frames = 0
        }

        if (state.isPlaying) {
          animationId = requestAnimationFrame(() => dispatch('update'))
          frames++
        }
      }
    },

    restart({ state, dispatch }) {
      const { isPlaying } = state
      dispatch('init').then(() => {
        dispatch('pause')
        dispatch('update')
        isPlaying && dispatch('play')
      })
    },

    changeExperiment({ state, dispatch, commit }, experiment) {
      if (state.currentExperiment !== experiment) {
        commit('setLoading', { experiment: true })
        commit('changeExperiment', experiment)
        dispatch('restart')
      }
    },

    changeRenderer({ commit }, renderer) {
      commit('setLoading', { renderer: true })
      commit('changeRenderer', renderer)
    },

    changeConfig({ commit, dispatch }, partialConfig) {
      commit('changeConfig', partialConfig)
      if (partialConfig.columns || partialConfig.rows) dispatch('restart')
    },

    setLoading({ commit }, loading) {
      commit('setLoading', loading)
    },

    play({ commit, dispatch }) {
      if (animationId) return
      animationId = requestAnimationFrame(() => dispatch('update'))
      commit('setIsPlaying', true)
    },

    pause({ commit }) {
      cancelAnimationFrame(animationId)
      animationId = null
      commit('setIsPlaying', false)
    },

    changeFPS({ commit }, fps) {
      commit('setFPS', { fps })
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
