<template>
  <div class="world-container">
    <Loader v-show="isLoading" class="world"/>
    <component :is="worldComponent" v-show="!isLoading" class="world"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from './Loader.vue'

export default {
  components: {
    Loader,
  },
  computed: {
    ...mapState(['loading', 'renderer']),
    isLoading() { return this.loading.experiment || this.loading.renderer },
    worldComponent() {
      const { renderer } = this // to make `renderer` reactive
      return () => import(`./renderers/World${renderer}.vue`)
    },
  },
}
</script>

<style>
  .world-container {
    min-height: 370px; /*hacky-way to avoid controler jump when switching renderer*/
    overflow: auto;
  }
  .world {
    background: white;
    border: solid 10px #41403E;
  }
</style>
