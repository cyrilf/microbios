<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWorldStore } from '@/stores/world';

defineProps<{
  generation: number;
}>();

const renderers = ref([
  { name: 'Canvas', value: 'canvas' },
  { name: 'HTML (table)', value: 'table' },
  { name: 'Checkboxes', value: 'checkbox' }
]);

const worldStore = useWorldStore();

const isPlaying = computed(() => worldStore.isPlaying);
const experiments = computed(() => worldStore.experiments);

const fps = computed({
  get: () => worldStore.fps,
  set: (fps) => worldStore.changeFPS(fps)
});

const currentExperiment = computed({
  get: () => worldStore.currentExperiment.id,
  set: (experiment) => worldStore.changeExperiment(experiment)
});

const renderer = computed({
  get: () => worldStore.renderer,
  set: (value) => worldStore.changeRenderer(value)
});

const columns = computed({
  get: () => worldStore.config.columns,
  set: (value) => worldStore.changeConfig({ columns: value })
});

const rows = computed({
  get: () => worldStore.config.rows,
  set: (value) => worldStore.changeConfig({ rows: value })
});

const cellSize = computed({
  get: () => worldStore.config.cellSize,
  set: (value) => worldStore.changeConfig({ cellSize: value })
});

const play = worldStore.play;
const pause = worldStore.pause;
const update = worldStore.update;
const restart = worldStore.restart;
</script>

<template>
  <section>
    <img src="../assets/arrow.svg" alt="arrow" class="arrow" />
    <DatGui :open="false">
      <DatFolder label="Experiment" :open="false">
        <DatButton :label="isPlaying ? 'Pause' : 'Play'" @click="isPlaying ? pause() : play()" />
        <DatButton v-show="!isPlaying" label="Next" @click="update" />
        <DatButton label="Restart" @click="restart" />
        <DatSelect v-model="currentExperiment" :items="experiments" label="Experiment" />
      </DatFolder>
      <DatFolder label="Performance">
        <DatSelect v-model="renderer" :items="renderers" label="Renderers" />
        <DatNumber v-model.number="fps" :min="0" :max="60" :step="1" label="FPS" />
      </DatFolder>
      <DatFolder label="World">
        <DatNumber v-model.number="columns" :min="1" label="Columns" />
        <DatNumber v-model.number="rows" :min="1" label="Rows" />
        <DatNumber v-model.number="cellSize" :min="1" label="Cell size" />
      </DatFolder>
    </DatGui>
    <span class="generation"
      ><span>Generation: </span><span>{{ generation }}</span></span
    >
    <div class="controls">
      <button :disabled="isPlaying" @click="update()">Next</button>
      <button @click="isPlaying ? pause() : play()">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
      <button @click="restart">Restart</button>
      <select v-model="currentExperiment">
        <option v-for="experiment in experiments" :key="experiment.id" :value="experiment.id">
          {{ experiment.name }}
        </option>
      </select>
    </div>
  </section>
</template>

<style scoped>
section {
  margin-top: 2rem;
}

.arrow {
  display: none;
  position: fixed;
  top: 50px;
  right: 100px;
  width: 150px;
  transform: scaleX(-1) scale(1.2);

  @media (min-width: 1260px) {
    & {
      display: block;
    }
  }
}

.controls {
  padding-top: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  button,
  input,
  select,
  span {
    color: #41403e;
    font-size: 1rem;
    @media (min-width: 788px) {
      & {
        font-size: 2rem;
      }
    }
  }

  button,
  input,
  select {
    background: white;
    padding: 1rem 1rem;
    margin: 0 1rem;
    transition: box-shadow 0.5s ease;
    outline: none;
    cursor: pointer;
    box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
    border: solid 3px #41403e;
    border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
      background: #f49733;
    }
    &:disabled {
      opacity: 0.5;
      color: black;
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
