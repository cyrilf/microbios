<template>
  <div id="app">
    <World/>
    <Controls/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import World from './components/World.vue'
import Controls from './components/Controls.vue'

export default {
  name: 'app',
  components: {
    World,
    Controls,
  },

  mounted() {
    this.init({ width: 100, height: 50 })
    this.play()
  },

  methods: {
    ...mapActions(['init', 'play']),
  },
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
</style>
