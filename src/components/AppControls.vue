<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWorldStore } from '@/stores/world';
import AppArrow from '@/components/AppArrow.vue';
import { useDark, useToggle } from '@vueuse/core';

defineProps<{
  generation: number;
}>();

const renderers = ref([
  { name: 'Canvas', value: 'canvas' },
  { name: 'HTML (table)', value: 'table' },
  { name: 'Checkboxes', value: 'checkbox' }
]);

const isDark = useDark();
const toggleDark = useToggle(isDark);

const worldStore = useWorldStore();

const isPlaying = computed(() => worldStore.isPlaying);
const experiments = computed(() => worldStore.experiments);

const { setFPS, setExperiment, setRenderer, setConfig, play, pause, update, restart } = worldStore;

const fps = computed({
  get: () => worldStore.fps,
  set: setFPS
});

const currentExperiment = computed({
  get: () => worldStore.currentExperiment?.id,
  set: (experiment) => setExperiment(experiment as string)
});

const renderer = computed({
  get: () => worldStore.renderer,
  set: setRenderer
});

const columns = computed({
  get: () => worldStore.config.columns,
  set: (value) => setConfig({ columns: value })
});

const rows = computed({
  get: () => worldStore.config.rows,
  set: (value) => setConfig({ rows: value })
});

const cellSize = computed({
  get: () => worldStore.config.cellSize,
  set: (value) => setConfig({ cellSize: value })
});
</script>

<template>
  <section>
    <AppArrow />
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
    <div class="flex">
      <span class="generation"
        ><span>Generation: </span><span>{{ generation }}</span></span
      >
      <button class="m-button small" title="Change the theme" @click="toggleDark()">
        {{ isDark ? '☀️' : '🌙' }}
      </button>
    </div>
    <div class="controls">
      <button :disabled="isPlaying" class="m-button" @click="update()">Next</button>
      <button class="m-button" @click="isPlaying ? pause() : play()">
        {{ isPlaying ? 'Pause' : 'Play' }}
      </button>
      <button class="m-button" @click="restart">Restart</button>
      <label class="select-experiment">
        Choose the active experiment
        <select v-model="currentExperiment" class="m-select">
          <option v-for="experiment in experiments" :key="experiment.id" :value="experiment.id">
            {{ experiment.name }}
          </option>
        </select>
      </label>
    </div>
  </section>
</template>

<style scoped>
section {
  margin-top: 2rem;
}

.flex {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding-top: 50px;
}

.m-button,
.m-input,
.m-select {
  color: var(--controls-color);
  font-size: 1rem;
  @media (min-width: 788px) {
    & {
      font-size: 2rem;
    }
  }

  &.small {
    padding: 0.2rem;
  }
}

.m-button,
.m-input,
.m-select {
  transition: box-shadow 0.5s ease;
  cursor: pointer;
  outline: none;
  box-shadow: 20px 38px 34px -26px hsla(0, 0%, 0%, 0.2);
  border: solid 3px var(--controls-border-color);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  background: var(--controls-background-color);
  padding: 1rem;
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    box-shadow: 2px 8px 4px -6px hsla(0, 0%, 0%, 0.3);
    background: #f49733;
    color: var(--controls-color-hover);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    color: var(--controls-color);
  }
}

input {
  cursor: inherit;
  max-width: 120px;
}

.select-experiment {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: -1.8rem;
  color: var(--controls-color);
}

.generation {
  display: inline-flex;
  justify-content: space-between;
  border: 5px solid var(--generation-border-color);
  background: var(--generation-background-color);
  padding: 10px;
  min-width: 160px;
  color: var(--generation-color);
}
</style>
