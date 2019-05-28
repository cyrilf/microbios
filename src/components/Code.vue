<template>
  <div class="code">
    <h2>Code</h2>
    <div v-show="isLoading" class="code-loading">LOADING...</div>
    <prism-editor
      v-show="!isLoading"
      :code="code"
      language="js"
      :lineNumbers="true"
      :readonly="true"></prism-editor>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import 'prismjs'
import 'prismjs/themes/prism.css'
import PrismEditor from 'vue-prism-editor'
import 'vue-prism-editor/dist/VuePrismEditor.css'

export default {
  components: {
    PrismEditor,
  },
  data() {
    return {
      code: null,
      isLoading: true,
    }
  },
  async created() {
    this.code = await this.fetchCode()
  },
  computed: {
    ...mapState(['currentExperiment']),
  },
  watch: {
    async currentExperiment() {
      this.code = await this.fetchCode()
    },
  },
  methods: {
    async fetchCode() {
      this.isLoading = true
      const response = await fetch(
        `https://api.github.com/repos/cyrilf/microbios/contents/src/experiments/${this.currentExperiment.id}.js`,
        { headers: { Accept: 'application/vnd.github.V3.raw' } },
      )
      const text = await response.text()
      this.isLoading = false

      return text
    },
  },
}
</script>
<style lang="scss">
  .code {
    max-width: 1042px; // fits code line of 100 chars
    margin: 0 auto;
    background: white;
    margin-top: 2rem;

    h2 {
      color: white;
      background: #f49733;
      margin: 0;
    }

    .code-loading {
      padding: 1rem;
    }
  }
</style>
