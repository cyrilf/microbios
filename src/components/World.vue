<template>
  <div>
    <Loader v-show="loading"/>
    <WorldCanvas v-show="!loading"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import WorldCanvas from './WorldCanvas.vue'
import Loader from './Loader.vue'

export default {
  components: {
    Loader,
    WorldCanvas,
  },
  computed: {
    ...mapState(['loading']),
  },
}
</script>
