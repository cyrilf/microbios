<script setup lang="ts">
import { computed, defineAsyncComponent, watch } from 'vue';
import SceneLoader from '@/components/AppSceneLoader.vue';
import { useWorldStore } from '@/stores/world';

const worldStore = useWorldStore();
const props = defineProps<{
  generation: number;
  grid: string[][];
}>();

const isLoading = computed(() => worldStore.loading.renderer);
const renderer = computed(() => worldStore.renderer);

const getRenderer = (renderer: string) =>
  defineAsyncComponent({
    loader: () =>
      import(
        `@/components/renderers/Renderer${renderer.charAt(0).toUpperCase() + renderer.slice(1)}.vue`
      ),
    loadingComponent: SceneLoader,
    delay: 200
  });

let SceneRenderer = getRenderer(renderer.value);
watch(renderer, () => {
  SceneRenderer = getRenderer(renderer.value);
});
</script>

<template>
  <div class="scene-container">
    <SceneLoader v-show="isLoading" class="scene" />
    <SceneRenderer
      v-show="!isLoading"
      class="scene"
      :generation="props.generation"
      :grid="props.grid"
    />
  </div>
</template>

<style scoped>
.scene-container {
  min-height: 370px; /*hacky-way to avoid controler jump when switching renderer*/
  overflow: auto;
}
.scene {
  background: white;
  border: solid 10px #41403e;
}
</style>
