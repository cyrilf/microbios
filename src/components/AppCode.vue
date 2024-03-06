<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import { useWorldStore } from '@/stores/world';

import 'highlight.js/styles/a11y-dark.min.css';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('typescript', typescript);

const code = ref<string>('');
const link = ref<string>('');
const isLoading = ref<boolean>(true);

const worldStore = useWorldStore();
const currentExperiment = computed(() => worldStore.currentExperiment);

const fetchCode = async () => {
  if (!currentExperiment.value) return '';

  let text = '';
  try {
    isLoading.value = true;
    const response = await fetch(
      `https://api.github.com/repos/cyrilf/microbios/contents/src/experiments/${currentExperiment.value.id}.ts`,
      { headers: { Accept: 'application/vnd.github.V3.raw' } }
    );
    text = await response.text();
  } finally {
    isLoading.value = false;
  }

  return text;
};

const highlight = (el: HTMLElement, binding: any) => {
  el.textContent = binding.value;
  el.removeAttribute('data-highlighted');
  hljs.highlightElement(el);
};

// Directive used on this component
const vHighlight = { mounted: highlight, updated: highlight };

watchEffect(async () => {
  if (currentExperiment.value) {
    link.value = `https://github.com/cyrilf/microbios/blob/main/src/experiments/${currentExperiment.value.id}.ts`;
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
    <pre class="code-wrapper"><code v-highlight="code" class="hljs language-typescript"/></pre>
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

  .code-wrapper {
    max-height: 500px;
    overflow-y: auto;
    text-align: left;
    & > code {
      font-size: 1rem;
      line-height: 1.5;
      font-family: monospace;
    }
  }
}
</style>
