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
    isPlaying: false,
    fps: 60,
  },

  actions: {
    init({ commit }, { width, height }) {
      commit('setSize', { width, height })
      commit('setWorld', createWorld(width, height))
    },

    update({ state, commit, dispatch }) {
      if (state.isPlaying) {
        if (state.fps !== 0 && frames >= (60 / state.fps)) {
          commit('setWorld', updateWorld(state.world))
          frames = -1 // because we ++ aterwards
        }
        animationId = requestAnimationFrame(() => dispatch('update'))
        frames++
      } else {
        commit('setWorld', updateWorld(state.world))
      }
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

    setCell(state, { i, j, isAlive }) {
      Vue.set(state.world[i], j, isAlive)
    },

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
