<script setup lang="ts">
import { useWorldStore } from '@/stores/world';
import { computed, ref, onMounted, watchEffect } from 'vue';

const worldStore = useWorldStore();

const props = defineProps<{
  generation: number;
  grid: string[][];
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const config = computed(() => worldStore.config);

const canvasWidth = computed(() => config.value.columns * config.value.cellSize);
const canvasHeight = computed(() => config.value.rows * config.value.cellSize);
onMounted(() => {
  if (canvas.value) {
    canvas.value.width = canvasWidth.value;
    canvas.value.height = canvasHeight.value;
    ctx.value = canvas.value.getContext('2d');
    worldStore.setLoading({ renderer: false });
  }
});

watchEffect(() => {
  const { grid } = props;
  const { cellSize } = config.value;

  if (!grid?.[0] || !ctx.value) {
    return;
  }
  const rows = grid.length;
  const columns = grid[0].length;

  ctx.value.clearRect(0, 0, canvasWidth.value, canvasHeight.value);

  for (let row = 0; row < rows; row++) {
    const rowData = grid[row];
    for (let col = 0; col < columns; col++) {
      const currentCell = rowData[col];
      if (currentCell) {
        ctx.value.fillStyle = currentCell ?? '';
        ctx.value.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
});
</script>

<template>
  <canvas ref="canvas"> Your browser is not supported. Try another renderer. </canvas>
</template>

<style scoped>
canvas {
  display: block;
  margin: 0 auto;
}
</style>
