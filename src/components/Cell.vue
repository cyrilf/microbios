<template>
  <td
    class="cell"
    @click="() => value.click()"
    :style="`background-color: ${value.getColor()}`"/>
</template>

<script>
export default {
  props: {
    value: { type: Object, required: true },
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
