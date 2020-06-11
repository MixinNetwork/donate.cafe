<template>
  <div class="spinner-container">
    <div class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spinner-container {
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 9999;
}

.spinner {
  position: relative;
  text-align: center;
  width: 60px;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10px;
  white-space: nowrap;
}

.spinner > div {
  background-color: #007aff;
  height: 100%;
  width: 6px;
  margin: 0 2px;
  display: inline-block;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
  &.rect2 {
    animation-delay: -1.1s;
  }

  &.rect3 {
    animation-delay: -1s;
  }

  &.rect4 {
    animation-delay: -0.9s;
  }

  &.rect5 {
    animation-delay: -0.8s;
  }
}

@keyframes sk-stretchdelay {
  0%,
  40%,
  100% {
    transform: scaleY(0.4);
  }
  20% {
    transform: scaleY(1);
  }
}
</style>