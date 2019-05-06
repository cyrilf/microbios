<template>
  <table class="world">
    <tbody>
      <tr v-for="(row, i) in grid" :key="i">
        <td
          v-for="(cellColor, j) in row"
          :key="`${i}-${j}`"
          class="cell"
          :style="`background-color: ${cellColor || 'white'}`"
          />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
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

.cell {
  height: 6px;
  width: 6px;
}
</style>
