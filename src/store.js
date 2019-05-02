import Vue from 'vue'
import Vuex from 'vuex'

import gameOfLife from './experiments/gameOfLife'

Vue.use(Vuex)

let animationId = null
let frames = 0
let world

export default new Vuex.Store({
  state: {
    generation: 0,
    grid: [],
    isPlaying: false,
    fps: 60,
  },

  actions: {
    init({ commit }, { columns, rows }) {
      world = gameOfLife(columns, rows)
      commit('setGrid', world.grid)
      commit('setGeneration', world.generation)
    },

    update({ state, commit, dispatch }) {
      if (!state.isPlaying || (state.isPlaying && state.fps !== 0 && frames >= (60 / state.fps))) {
        const [grid, generation] = world.nextGeneration()
        commit('setGrid', grid)
        commit('setGeneration', generation)
        frames = -1
      }

      if (state.isPlaying) {
        animationId = requestAnimationFrame(() => dispatch('update'))
        frames++
      }
    },

    restart({ state, dispatch }) {
      const { isPlaying } = state
      dispatch('init', { columns: world.columns, rows: world.rows })
      dispatch('pause')
      dispatch('update')
      if (isPlaying) dispatch('play')
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
    setGrid(state, grid) {
      state.grid = grid
    },

    setGeneration(state, generation) {
      state.generation = generation
    },

    // setCell(state, { row, column, isAlive }) {
    //   Vue.set(state.world[row], column, isAlive)
    // },

    setIsPlaying(state, isPlaying) {
      state.isPlaying = isPlaying
    },

    setFPS(state, { fps }) {
      if (fps >= 0) {
        state.fps = fps
      }
    },
  },
})
