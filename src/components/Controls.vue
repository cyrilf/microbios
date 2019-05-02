<template>
  <section>
    <div>Generation: {{generation}}</div>
    <div class="controls">
      <button :disabled="isPlaying" @click="update">Next</button>
      <button @click="isPlaying ? pause() : play()">{{ isPlaying ? 'Pause' : 'Play'}}</button>
      <button @click="restart">Restart</button>
      <select v-model="currentExperiment">
        <option
          v-for="experiment in experiments"
          :key="experiment.name"
          :value="experiment.name">
          {{ experiment.name }}
        </option>
      </select>
      <div><input v-model.number="fps" type="number" min="0" max="60"/><span>fps</span></div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState(['isPlaying', 'generation', 'experiments']),
    fps: {
      get() { return this.$store.state.fps },
      set(value) { this.changeFPS(value) },
    },
    currentExperiment: {
      get() { return this.$store.state.currentExperiment },
      set(value) { this.changeExperiment(value) },
    },
  },

  methods: {
    ...mapActions(['play', 'pause', 'update', 'changeFPS', 'restart', 'changeExperiment']),
  },
}
</script>

<style lang="scss">
section {
  padding-top: 10px;
}

.controls {
  padding-top: 50px;
  display: flex;
  justify-content: center;
}

button, input, select, span {
  color:#41403E;
  font-size:2rem;
}

button, input, select {
  background:transparent;
  padding:1rem 1rem;
  margin:0 1rem;
  transition: box-shadow .5s ease;
  outline:none;
  cursor: pointer;
  box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
  border:solid 3px #41403E;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  &:hover {
    box-shadow:2px 8px 4px -6px hsla(0,0%,0%,.3);
    background: rgba(37, 226, 177, .3);
  }
  &:disabled {
    background: rgba(0, 0, 0, .3);
    cursor: not-allowed;
  }
}

input {
  cursor: inherit;
  max-width: 120px;
}
</style>
