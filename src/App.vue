<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue';
import { useDark } from '@vueuse/core';

import { useWorldStore } from '@/stores/world';
import AppScene from '@/components/AppScene.vue';
import AppControls from '@/components/AppControls.vue';
import AppCode from '@/components/AppCode.vue';

const worldStore = useWorldStore();

useDark();

const generation = ref(0);
const grid = shallowRef<string[][]>([]);

const updateCallback = (nextGeneration: NewGeneration) => {
  grid.value = nextGeneration[0];
  generation.value = nextGeneration[1];
};

onMounted(async () => {
  await worldStore.init({ updateCallback });
  worldStore.play();
});
</script>

<template>
  <div class="title">
    <h1>Microbios</h1>
    <small>Run cellular automata experiments</small>
  </div>
  <AppScene :generation="generation" :grid="grid" />
  <AppControls :generation="generation" />
  <AppCode />
</template>

<style scoped>
.title {
  display: inline-flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;

  h1 {
    margin: 0px;
    color: var(--title-color);
    font-size: 2rem;
    font-family: 'Fascinate', system-ui, sans-serif;
    text-shadow:
      0px 5px 0px white,
      0px 9px 0px #7a4815;

    @media (min-width: 425px) {
      & {
        font-size: 4.5rem;
      }
    }
  }
  small {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.6);
    padding: 3px;
    font-style: italic;
    font-size: 1rem;
  }
}
</style>
