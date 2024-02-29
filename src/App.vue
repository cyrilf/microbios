<script setup lang="ts">
import { onMounted, ref, shallowRef } from "vue";
import { useWorldStore } from "@/stores/world";
import World from "@/components/World.vue";
import Controls from "@/components/Controls.vue";
import Code from "@/components/Code.vue";

const worldStore = useWorldStore();

const generation = ref(0);
const grid = shallowRef<string[][]>([]);

const onUpdate = (nextGeneration: NewGeneration) => {
  grid.value = nextGeneration[0];
  generation.value = nextGeneration[1];
};

onMounted(async () => {
  await worldStore.init({ onUpdate });
  worldStore.play();
});
</script>

<template>
  <div class="title">
    <h1>Microbios</h1>
    <small>Run cellular automata experiments</small>
  </div>
  <World :generation="generation" :grid="grid" />
  <Controls :generation="generation" />
  <Code />
</template>

<style scoped>
.title {
  display: inline-flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 2rem;

  h1 {
    margin: 0px;
    font-size: 2rem;
    color: rgb(223, 128, 12);
    text-shadow:
      0px 5px 0px white,
      0px 9px 0px #7a4815;
    font-family: "Fascinate", system-ui, sans-serif;

    @media (min-width: 425px) {
      & {
        font-size: 4.5rem;
      }
    }
  }
  small {
    margin-left: auto;
    font-size: 1rem;
    font-style: italic;
    background: rgba(255, 255, 255, 0.6);
    padding: 3px;
  }
}
</style>
