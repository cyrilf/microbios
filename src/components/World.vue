<template>
  <div>
    <Loader v-show="loading"/>
    <component :is="worldComponent" v-show="!loading"/>
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
    worldComponent() {
      const { renderer } = this // to make `renderer` reactive
      return () => import(`./World${renderer}.vue`)
    },
  },
}
</script>
