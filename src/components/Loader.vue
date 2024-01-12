<script setup lang="ts">
import { ref } from "vue";

// Todo get this from pinia store
const config = ref({ columns: 100, rows: 50, cellSize: 7 });
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
