<template>
  <section>
    <img src="../assets/arrow.svg" alt="arrow" class="arrow"/>
    <dat-gui :closed="true">
      <dat-folder label="Experiment" :closed="true">
        <dat-button
          @click="isPlaying ? pause() : play()"
          :label="isPlaying ? 'Pause' : 'Play'"/>
        <dat-button v-show="!isPlaying" @click="update" label="Next"/>
        <dat-button @click="restart" label="Restart"/>
        <dat-select v-model="currentExperiment" :items="experiments" label="Experiment"/>
      </dat-folder>
      <dat-folder label="Performance">
        <dat-select v-model="renderer" :items="renderers" label="Renderers"/>
        <dat-number :min="0" :max="60" :step="1" v-model.number="fps" label="FPS"/>
      </dat-folder>
      <dat-folder label="World">
        <dat-number :min="1" v-model.number="columns" label="Columns"/>
        <dat-number :min="1" v-model.number="rows" label="Rows"/>
        <dat-number :min="1" v-model.number="cellSize" label="Cell size"/>
      </dat-folder>
    </dat-gui>
    <span class="generation"><span>Generation: </span><span>{{generation}}</span></span>
    <div class="controls">
      <button :disabled="isPlaying" @click="update">Next</button>
      <button @click="isPlaying ? pause() : play()">{{ isPlaying ? 'Pause' : 'Play'}}</button>
      <button @click="restart">Restart</button>
      <select v-model="currentExperiment">
        <option
          v-for="experiment in experiments"
          :key="experiment.id"
          :value="experiment.id">
          {{ experiment.name }}
        </option>
      </select>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import DatGui from '@cyrilf/vue-dat-gui'
import { mapState, mapActions } from 'vuex'

Vue.use(DatGui)

export default {
  data() {
    return {
      renderers: [
        { name: 'Canvas', value: 'Canvas' },
        { name: 'HTML (table)', value: 'Table' },
      ],
    }
  },

  computed: {
    ...mapState(['isPlaying', 'generation', 'config', 'experiments']),
    fps: {
      get() { return this.$store.state.fps },
      set(value) { this.changeFPS(value) },
    },
    currentExperiment: {
      get() { return this.$store.state.currentExperiment.id },
      set(value) { this.changeExperiment(value) },
    },
    renderer: {
      get() { return this.$store.state.renderer },
      set(value) { this.changeRenderer(value) },
    },
    columns: {
      get() { return this.$store.state.config.columns },
      set(value) { this.changeConfig({ columns: value }) },
    },
    rows: {
      get() { return this.$store.state.config.rows },
      set(value) { this.changeConfig({ rows: value }) },
    },
    cellSize: {
      get() { return this.$store.state.config.cellSize },
      set(value) { this.changeConfig({ cellSize: value }) },
    },
  },

  methods: {
    ...mapActions(['play', 'pause', 'update', 'changeFPS', 'restart',
      'changeExperiment', 'changeRenderer', 'changeConfig']),
  },
}
</script>

<style lang="scss">
section {
  margin-top: 2rem;
}

.arrow {
  display: none;
  position: fixed;
  top: 25px;
  right: 100px;
  width: 130px;
  transform: scaleX(-1);

  @media (min-width: 1260px) {
    & { display: block; }
  }
}

.controls {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  button, input, select, span {
    color:#41403E;
    font-size:1rem;
    @media (min-width: 788px) {
      & { font-size: 2rem; }
    }
  }

  button, input, select {
    background: white;
    padding: 1rem 1rem;
    margin: 0 1rem;
    transition: box-shadow .5s ease;
    outline:none;
    cursor: pointer;
    box-shadow: 20px 38px 34px -26px hsla(0,0%,0%,.2);
    border:solid 3px #41403E;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    &:hover:not(:disabled) {
      box-shadow:2px 8px 4px -6px hsla(0,0%,0%,.3);
      background: #f49733;
    }
    &:disabled {
      opacity: .5;
      cursor: not-allowed;
    }
  }

  input {
    cursor: inherit;
    max-width: 120px;
  }
}

.generation {
  padding: 10px;
  background: #f49733;
  border: 5px solid rgba(0, 0, 0, 0.5);
  display: inline-flex;
  min-width: 160px;
  justify-content: space-between;
}
</style>
