<script setup lang="ts">
import CodeEditor from 'simple-code-editor';

import { useWorldStore } from '@/stores/world';
import { computed, ref, watchEffect } from 'vue';

const code = ref<string>('');
const link = ref<string>('');
const isLoading = ref<boolean>(true);

const worldStore = useWorldStore();
const currentExperiment = computed(() => worldStore.currentExperiment);

const fetchCode = async () => {
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
  link.value = `https://github.com/cyrilf/microbios/blob/main/src/experiments/${currentExperiment.value.id}.js`;
  code.value = await fetchCode();
});
</script>

<template>
  <div class="code">
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
      theme="rainbow"
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
  max-width: 100ch;
  margin: 2rem auto;
  --main-color: #f49733;

  h2 {
    color: white;
    background: var(--main-color);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: baseline;
    gap: 0.5rem;
    font-size: 2rem;

    .link {
      font-size: 1rem;
      a {
        color: white;
        &:hover,
        &:focus {
          color: var(--main-color);
          background-color: white;
        }
      }
    }
  }

  .code-loading {
    padding: 1rem;
    color: white;
    background: #474949;
  }
}
</style>
