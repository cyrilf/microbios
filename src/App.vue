<script setup lang="ts">
import World from "@/components/World.vue";
import { useWorldStore } from "./stores/world";
import { onMounted } from "vue";

import experiments from "@/experiments";
import worldManager from "@/core/worldManager";

const worldStore = useWorldStore();

worldManager.setExperiments(experiments);
worldManager.on("init", () => worldStore.setLoading({ experiment: false }));
worldManager.on("update", (nextGeneration: NewGeneration) =>
  worldStore.nextGeneration(nextGeneration)
);
onMounted(async () => {
  await worldStore.init(worldManager);
  worldStore.play();
});
</script>

<template>
  <div class="title">
    <h1>Microbios</h1>
    <small>Run cellular automata experiments</small>
  </div>
  <World />
  <!-- <Controls />
    <Code /> -->
</template>

<style scoped>
.title {
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 2rem;

  h1 {
    margin: 0px;
    font-size: 2rem;
    color: rgb(223, 128, 12);
    text-shadow:
      0px 5px 0px white,
      0px 9px 0px #7a4815;
    font-family: "Fascinate", sans-serif;

    @media (min-width: 425px) {
      & {
        font-size: 4.5rem;
      }
    }
  }
  small {
    float: right;
    color: black;
    font-size: 1rem;
    font-style: italic;
    background: rgba(255, 255, 255, 0.6);
    padding: 3px;
  }
}
</style>
