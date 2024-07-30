<script setup lang="ts">

</script>

<template>
  <div class="main-layout">
    <slot name="sidebar"></slot>
    <slot name="content"></slot>
    <slot name="header"></slot>
  </div>
</template>

<style scoped lang="scss">
.main-layout {
  height: 100vh;
}
</style>