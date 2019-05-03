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
  { name: 'Splash', getModule: () => import('./experiments/splash') },
  { name: 'Lava', getModule: () => import('./experiments/lava') },
  { name: 'Trippy', getModule: () => import('./experiments/trippy') },
  { name: 'Explosion', getModule: () => import('./experiments/explosion') },
]

export default new Vuex.Store({
  state: {
    generation: 0,
    grid: [],
    isPlaying: false,
    loading: true,
    fps: 60,
    experiments,
    currentExperiment: experiments[0].name,
  },

  actions: {
    init({ state, commit }, { columns, rows }) {
      const currentExperiment = state.experiments.find(
        experiment => (experiment.name === state.currentExperiment),
      )
      return currentExperiment.getModule().then((module) => {
        world = module.default(columns, rows)
        commit('nextGeneration', [world.initGrid, world.generation])
        commit('setLoading', false)
      })
    },

    update({ state, commit, dispatch }) {
      if (world.options.maxGeneration > state.generation) {
        if (!state.isPlaying
          || (state.isPlaying && state.fps !== 0 && frames >= (60 / state.fps))) {
          commit('nextGeneration', world.nextGeneration())
          frames = -1
        }

        if (state.isPlaying) {
          animationId = requestAnimationFrame(() => dispatch('update'))
          frames++
        }
      }
    },

    restart({ state, dispatch }) {
      const { isPlaying } = state
      dispatch('init', { columns: world.columns, rows: world.rows }).then(() => {
        dispatch('pause')
        dispatch('update')
        if (isPlaying) dispatch('play')
      })
    },

    changeExperiment({ state, dispatch, commit }, experiment) {
      if (state.currentExperiment !== experiment) {
        commit('setLoading', true)
        commit('changeExperiment', experiment)
        dispatch('restart')
      }
    },

    // cellClick({ state, commit }, { row, column }) {
    //   commit('setCell', { row, column, isAlive: !state.world[row][column] })
    // },

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

    // setCell(state, { row, column, isAlive }) {
    //   Vue.set(state.world[row], column, isAlive)
    // },

    setIsPlaying(state, isPlaying) {
      state.isPlaying = isPlaying
    },

    setLoading(state, loading) {
      state.loading = loading
    },

    setFPS(state, { fps }) {
      if (fps >= 0) {
        state.fps = fps
      }
    },

    changeExperiment(state, experiment) {
      state.currentExperiment = experiment
    },
  },
})
