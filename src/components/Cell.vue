<template>
  <td class="cell" @click="$emit('click', $event)" :class="{ 'cell-alive': isAlive }"/>
</template>

<script>
export default {
  props: {
    isAlive: { type: Boolean, required: true },
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
    background: rgba(0, 0, 0, .3);
  }
}

.cell-alive {
  background: rgb(63, 107, 95);
}
</style>
