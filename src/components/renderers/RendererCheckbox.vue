<script setup lang="ts">
import { onMounted } from 'vue';
import { useWorldStore } from '@/stores/world';

const worldStore = useWorldStore();

defineProps<{
  grid: string[][];
}>();
onMounted(() => {
  worldStore.setLoading({ renderer: false });
});
</script>

<template>
  <table class="world" cellspacing="0" cellpadding="0">
    <tbody>
      <tr v-for="(row, i) in grid" :key="i">
        <td
          v-for="(cellColor, j) in row"
          :key="`${i}-${j}`"
          :style="`
            width: ${worldStore.config.cellSize}px;
            height: ${worldStore.config.cellSize}px;`"
        >
          <input
            type="checkbox"
            :checked="!!cellColor && cellColor?.[cellColor?.length - 2] !== '0'"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.world {
  margin: 0 auto;
  border-collapse: collapse;
  border-spacing: 0;
}
tr,
th {
  line-height: 0;
}
input[type='checkbox'] {
  width: 10px;
  height: 10px;
}
</style>
