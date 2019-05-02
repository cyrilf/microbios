<template>
  <table class="world">
    <tbody>
      <tr v-for="(row, i) in world.world" :key="i">
        <Cell
          v-for="(cell, j) in row"
          :key="`${i}-${j}`"
          :value="cell"
          />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from 'vuex'
import Cell from './Cell.vue'

export default {
  components: {
    Cell,
  },
  computed: {
    ...mapState(['world']),
  },
}
</script>

<style lang="scss">
.world {
  margin: 0 auto;
  border-collapse: collapse;
}
</style>
