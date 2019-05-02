import Vue from 'vue'
import Vuex from 'vuex'

import gameOfLife from './experiments/gameOfLife'

Vue.use(Vuex)

let animationId = null
let frames = 0

export default new Vuex.Store({
  state: {
    world: [],
    isPlaying: false,
    fps: 60,
  },

  actions: {
    init({ commit }, { columns, rows }) {
      commit('setWorld', gameOfLife(columns, rows))
    },

    update({ state, commit, dispatch }) {
      if (!state.isPlaying || (state.isPlaying && state.fps !== 0 && frames >= (60 / state.fps))) {
        commit('setWorld', state.world.nextGeneration())
        frames = -1
      }

      if (state.isPlaying) {
        animationId = requestAnimationFrame(() => dispatch('update'))
        frames++
      }
    },

    restart({ state, dispatch }) {
      const { isPlaying } = state
      dispatch('init', { columns: state.world.columns, rows: state.world.rows })
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
    setWorld(state, world) {
      state.world = world
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
