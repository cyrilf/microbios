<script setup lang="ts">
import { onMounted } from "vue";
import { useWorldStore } from "@/stores/world";

const worldStore = useWorldStore();

defineProps<{
  grid: string[][];
}>();
onMounted(() => {
  worldStore.setLoading({ renderer: false });
});
</script>

<template>
  <table class="world">
    <tbody>
      <tr v-for="(row, i) in grid" :key="i">
        <td
          v-for="(cellColor, j) in row"
          :key="`${i}-${j}`"
          :style="`
            background-color: ${cellColor || 'transparent'};
            width: ${worldStore.config.cellSize}px;
            height: ${worldStore.config.cellSize}px;`"
        />
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.world {
  margin: 0 auto;
  border-collapse: collapse;
}
</style>
