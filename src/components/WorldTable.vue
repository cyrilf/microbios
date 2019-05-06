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
import { mapState } from 'vuex'
import Cell from './Cell.vue'

export default {
  components: {
    Cell,
  },
  computed: {
    ...mapState(['grid']),
  },
}
</script>

<style lang="scss">
.world {
  margin: 0 auto;
  border-collapse: collapse;
}
.loading {
  width: 601px;
  min-height: 301px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border:solid 3px #41403E;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}
</style>
