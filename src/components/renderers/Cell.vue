<template>
  <td
    class="cell"
    @click="$emit('click', $event)"
    :style="`background-color: ${color || 'white'}`"/>
</template>

<script>
export default {
  props: {
    color: { type: String },
  },
}
</script>

<style lang="scss">
.cell {
  height: 6px;
  width: 6px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:hover {
    background: rgba(0, 0, 0, .3) !important;
  }
}
</style>
