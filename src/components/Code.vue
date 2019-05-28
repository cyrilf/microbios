<template>
  <div class="code">
    <div v-show="isLoading">LOADING...</div>
    <pre v-show="!isLoading">{{code}}</pre>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
