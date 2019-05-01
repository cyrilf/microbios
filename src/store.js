import Vue from 'vue'
import Vuex from 'vuex'

import { createWorld, updateWorld } from './world'

Vue.use(Vuex)

let animationId = null
let frames = 0

export default new Vuex.Store({
  state: {
    width: 0,
    height: 0,
    world: [],
    generation: 0,
    isPlaying: false,
    fps: 60,
  },

  actions: {
    init({ commit }, { width, height }) {
      commit('setSize', { width, height })
      commit('setWorld', createWorld(width, height))
      commit('setGeneration', 0)
    },

    update({ state, commit, dispatch }) {
      if (state.isPlaying) {
        if (state.fps !== 0 && frames >= (60 / state.fps)) {
          commit('setWorld', updateWorld(state.world))
          commit('setGeneration', state.generation + 1)
          frames = -1 // because we ++ aterwards
        }
        animationId = requestAnimationFrame(() => dispatch('update'))
        frames++
      } else {
        commit('setWorld', updateWorld(state.world))
        commit('setGeneration', state.generation + 1)
      }
    },

    restart({ state, dispatch }) {
      const { isPlaying } = state
      dispatch('init', { width: state.width, height: state.height })
      dispatch('pause')
      dispatch('update')
      if (isPlaying) dispatch('play')
    },

    toggle({ state, commit }, { row, column }) {
      commit('setCell', { row, column, isAlive: !state.world[row][column] })
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
    setSize(state, { width, height }) {
      state.width = width
      state.height = height
    },

    setWorld(state, world) {
      state.world = world
    },

    setCell(state, { row, column, isAlive }) {
      Vue.set(state.world[row], column, isAlive)
    },

    setIsPlaying(state, isPlaying) {
      state.isPlaying = isPlaying
    },

    setGeneration(state, generation) {
      state.generation = generation
    },

    setFPS(state, { fps }) {
      if (fps >= 0) {
        state.fps = fps
      }
    },
  },
})
