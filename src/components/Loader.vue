<script setup lang="ts">
import { useWorldStore } from "@/stores/world";
import { computed } from "vue";

const worldStore = useWorldStore();

const config = computed(() => worldStore.config);
</script>

<template>
  <div
    class="loading"
    :style="`
      width: ${config.columns * config.cellSize}px;
      height: ${config.rows * config.cellSize}px;
    `"
  >
    <h2>Loading...</h2>
  </div>
</template>

<style scoped>
.loading {
  box-sizing: content-box;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 3px #41403e;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}
</style>
