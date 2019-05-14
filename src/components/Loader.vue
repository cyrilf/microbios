<template>
  <div
    class="loading"
    :style="`
      width: ${config.columns * config.cellSize}px;
      height: ${config.rows * config.cellSize}px;
    `">
    <h2>Loading...</h2>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['config']),
  },
}
</script>

<style>
.loading {
  box-sizing: content-box;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border:solid 3px #41403E;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
}
</style>
