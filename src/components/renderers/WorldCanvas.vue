<template>
  <canvas
    ref="canvas"
    :width="canvasWidth"
    :height="canvasHeight">
    Your browser is not supported. Try another renderer.
  </canvas>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted() {
    this.canvas = this.$refs.canvas
    this.ctx = this.canvas.getContext('2d')
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
    this.ratio = window.devicePixelRatio || 1
    this.ctx.scale(this.ratio, this.ratio)
    this.setLoading({ renderer: false })
    this.draw()
  },

  computed: {
    ...mapState(['grid', 'config']),
    canvasWidth() {
      return this.grid[0] && this.grid[0].length * this.config.cellSize * (this.ratio || 1)
    },
    canvasHeight() { return this.grid.length * this.config.cellSize * (this.ratio || 1) },
  },

  watch: {
    grid() {
      const { // eslint-disable-next-line no-unused-vars
        canvasWidth, canvasHeight, grid, ctx, // make them reactive
      } = this
      // eslint-disable-next-line no-unused-vars
      const { cellSize } = this.config
      this.draw()
    },
  },

  methods: {
    ...mapActions(['setLoading']),
    draw() {
      const {
        canvasWidth, canvasHeight,
        grid, ctx,
      } = this
      const { cellSize } = this.config
      if (!grid[0]) { return }

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
