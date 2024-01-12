<script setup lang="ts">
import { useWorldStore } from "@/stores/world";
import { computed, ref, onMounted, watch, nextTick } from "vue";

const worldStore = useWorldStore();

const firstDraw = ref(true);

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
onMounted(() => {
  if (canvas.value) {
    ctx.value = canvas.value.getContext("2d");
    worldStore.setLoading({ renderer: false });
  }
});

const grid = computed(() => worldStore.grid);
const config = computed(() => worldStore.config);

const canvasWidth = computed(
  () => grid.value[0] && grid.value[0].length * config.value.cellSize
);
const canvasHeight = computed(() => grid.value.length * config.value.cellSize);

const draw = () => {
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
  firstDraw.value = false;
};

watch(
  grid,
  () => {
    // firstDraw.value ? nextTick(draw) : draw();
    draw();
  },
  { immediate: true }
);
</script>

<template>
  <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight">
    Your browser is not supported. Try another renderer.
  </canvas>
</template>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
}
</style>
