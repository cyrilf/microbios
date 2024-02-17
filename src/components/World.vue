<script setup lang="ts">
import { computed, defineAsyncComponent, watch } from "vue";
import Loader from "@/components/Loader.vue";
import { useWorldStore } from "@/stores/world";

const worldStore = useWorldStore();
const props = defineProps<{
  generation: number;
  grid: string[][];
}>();

const isLoading = computed(() => worldStore.loading.renderer);

const WorldComponent = defineAsyncComponent({
  loader: () => import(`@/components/renderers/${worldStore.renderer}.vue`),
  loadingComponent: Loader,
  delay: 200,
});
</script>

<template>
  <div class="world-container">
    <Loader v-show="isLoading" class="world" />
    <WorldComponent
      v-show="!isLoading"
      class="world"
      :generation="props.generation"
      :grid="props.grid"
    />
  </div>
</template>

<style scoped>
.world-container {
  min-height: 370px; /*hacky-way to avoid controler jump when switching renderer*/
  overflow: auto;
}
.world {
  background: white;
  border: solid 10px #41403e;
}
</style>
