<template>
  <td class="cell" :class="{ 'cell-alive': isAlive }"/>
</template>

<script>
export default {
  props: {
    isAlive: { type: Boolean, required: true },
  },
}
</script>

<style>
.cell {
  height: 6px;
  width: 6px;
}

.cell-alive {
  background: rgb(63, 107, 95);
}
</style>
