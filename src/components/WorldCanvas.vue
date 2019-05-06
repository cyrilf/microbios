<template>
  <canvas
    ref="canvas"
    :width="canvasWidth"
    :height="canvasHeight">
    Your browser is not supported. Try another renderer.
  </canvas>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    // TODO: move it to the store
    cellSize: {
      type: Number,
      default: 6,
    },
  },

  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
  },

  computed: {
    ...mapState(['grid']),
    canvasWidth() { return this.grid[0] && this.grid[0].length * this.cellSize },
    canvasHeight() { return this.grid.length * this.cellSize },
  },

  watch: {
    grid() {
      const {
        canvasWidth, canvasHeight,
        grid, ctx, cellSize,
      } = this
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)

      const rows = grid.length
      const columns = grid[0].length
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < columns; col++) {
          if (grid[row][col]) {
            ctx.fillStyle = grid[row][col]
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
          }
        }
      }
    },
  },
}
</script>
