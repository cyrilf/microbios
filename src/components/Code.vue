<template>
  <div class="code">
    <h2>
      Code
      <span class="link">
        (<a :href="link">
          view "{{currentExperiment.name}}" code on github
        </a>)
      </span>
    </h2>
    <div v-show="isLoading" class="code-loading">LOADING...</div>
    <prism-editor
      v-show="!isLoading"
      :code="code"
      class="editor"
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
      link: null,
      isLoading: true,
    }
  },
  computed: {
    ...mapState(['currentExperiment']),
  },
  watch: {
    currentExperiment: {
      async handler() {
        this.link = `https://github.com/cyrilf/microbios/blob/master/src/experiments/${this.currentExperiment.id}.js`
        this.code = await this.fetchCode()
      },
      immediate: true,
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
    margin: 2rem auto;
    background: white;

    h2 {
      color: white;
      background: #f49733;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .link {
        font-size: 0.8rem;
        margin-left: 0.5rem;
        a {
          color: white;
        }
      }
    }

    .code-loading {
      padding: 1rem;
    }

    .editor {
      max-height: 500px;
      overflow-y: auto;
    }
  }
</style>
