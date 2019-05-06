<template>
  <table class="world">
    <tbody>
      <tr v-for="(row, i) in grid" :key="i">
        <Cell
          v-for="(cell, j) in row"
          :key="`${i}-${j}`"
          :color="cell"
          />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Cell from './Cell.vue'

export default {
  components: {
    Cell,
  },
  mounted() {
    this.setLoading({ renderer: false })
  },
  computed: {
    ...mapState(['grid']),
  },
  methods: {
    ...mapActions(['setLoading']),
  },
}
</script>

<style lang="scss">
.world {
  margin: 0 auto;
  border-collapse: collapse;
}
</style>
