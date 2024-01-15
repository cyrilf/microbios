<script setup lang="ts">
import { useWorldStore } from "@/stores/world";
import { computed, ref, onMounted, watch, watchEffect } from "vue";

const worldStore = useWorldStore();

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const generation = computed(() => worldStore.generation);
const grid = computed(() => worldStore.grid);
const config = computed(() => worldStore.config);

const canvasWidth = computed(
  () => config.value.columns * config.value.cellSize
);
const canvasHeight = computed(() => config.value.rows * config.value.cellSize);
onMounted(() => {
  if (canvas.value) {
    canvas.value.width = canvasWidth.value;
    canvas.value.height = canvasHeight.value;
    ctx.value = canvas.value.getContext("2d");
    worldStore.setLoading({ renderer: false });
  }
});

watchEffect(() => {
  const cellSize = config.value.cellSize;
  if (!grid.value[0]) {
    return;
  }

  ctx.value?.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

  const rows = grid.value.length;
  const columns = grid.value[0].length;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (grid.value[row][col] && ctx.value) {
        ctx.value.fillStyle = grid.value[row][col];

        ctx.value.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
});

// watch(
//   generation,
//   () => {
//     // firstDraw.value ? nextTick(draw) : draw();
//     draw();
//   },
//   { immediate: true, flush: "post" }
// );
</script>

<template>
  <canvas ref="canvas">
    Your browser is not supported. Try another renderer.
  </canvas>
</template>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
}
</style>
