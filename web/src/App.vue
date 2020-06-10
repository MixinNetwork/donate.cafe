<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    window._vm = this;
  }
};
</script>

<style lang="scss">
@import "./assets/scss/theme.scss";
</style>
