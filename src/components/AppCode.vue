<script setup lang="ts">
import CodeEditor from 'simple-code-editor';

import { useWorldStore } from '@/stores/world';
import { computed, ref, watchEffect } from 'vue';
import { useDark } from '@vueuse/core';

const code = ref<string>('');
const link = ref<string>('');
const isLoading = ref<boolean>(true);
const isDark = useDark();

const codeTheme = computed(() => (isDark.value ? 'androidstudio' : 'rainbow'));

const worldStore = useWorldStore();
const currentExperiment = computed(() => worldStore.currentExperiment);

const fetchCode = async () => {
  if (!currentExperiment.value) return '';

  let text = '';
  try {
    isLoading.value = true;
    const response = await fetch(
      `https://api.github.com/repos/cyrilf/microbios/contents/src/experiments/${currentExperiment.value.id}.js`,
      { headers: { Accept: 'application/vnd.github.V3.raw' } }
    );
    text = await response.text();
  } finally {
    isLoading.value = false;
  }

  return text;
};

watchEffect(async () => {
  if (currentExperiment.value) {
    link.value = `https://github.com/cyrilf/microbios/blob/main/src/experiments/${currentExperiment.value.id}.js`;
    code.value = await fetchCode();
  }
});
</script>

<template>
  <div v-if="currentExperiment" class="code">
    <h2>
      Code
      <span class="link">
        (<a :href="link"> view "{{ currentExperiment.name }}" code on github </a>)
      </span>
    </h2>
    <div v-show="isLoading" class="code-loading">LOADING...</div>
    <CodeEditor
      v-show="!isLoading"
      v-model="code"
      :languages="[['typescript', 'TS']]"
      line-nums
      read-only
      :theme="codeTheme"
      :header="false"
      width="100%"
      border-radius="0"
      max-height="500px"
      style="overflow-y: auto"
    />
  </div>
</template>

<style scoped>
.code {
  margin: 2rem auto;
  max-width: 100ch;

  h2 {
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 0.5rem;
    margin: 0;
    background: var(--code-background-color);
    color: var(--code-color);
    font-size: 2rem;

    .link {
      font-size: 1rem;
      a {
        color: var(--code-color);
        &:hover,
        &:focus {
          color: var(--code-color-hover);
        }
      }
    }
  }

  .code-loading {
    background: #474949;
    padding: 1rem;
    color: white;
  }
}
</style>
