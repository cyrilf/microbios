<template>
  <table class="world">
    <tbody>
      <tr v-for="(row, i) in grid" :key="i">
        <td
          v-for="(cellColor, j) in row"
          :key="`${i}-${j}`"
          :style="`
            background-color: ${cellColor || 'transparent'};
            width: ${config.cellSize}px;
            height: ${config.cellSize}px;`"
          />
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted() { this.setLoading({ renderer: false }) },
  computed: { ...mapState(['grid', 'config']) },
  methods: { ...mapActions(['setLoading']) },
}
</script>

<style>
.world {
  margin: 0 auto;
  border-collapse: collapse;
}
</style>
