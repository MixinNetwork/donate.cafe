<template>
  <transition name="alert-fade">
    <div id="toast" v-show="visible" :class="['dialog-tips dialog-center', type]">{{message}}</div>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      message: "",
      type: "success"
    };
  }
};
</script>
<style scoped>
.alert-fade-enter-active {
  animation: show 0.5s ease-in-out;
}

.alert-fade-leave-active {
  animation: hide 1.2s;
}

@keyframes show {
  0% {
    opacity: 0;
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(-50%, -70px, 0);
  }
  100% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(-50%, 10px, 0);
    opacity: 1;
  }

  20% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(-50%, 10px, 0);
  }
  43% {
    transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
    transform: translate3d(-50%, 0px, 0);
    opacity: 1;
  }
  70% {
    transition-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(-50%, -8px, 0);
  }
  90% {
    transform: translate3d(-50%, -6px, 0);
  }
}

@keyframes hide {
  0% {
    opacity: 1;
    top: 10px;
  }
  100% {
    opacity: 0;
    top: -50px;
  }
}

.alert-fade-enter .dialog-center {
  top: 0;
}

.dialog-tips {
  position: fixed;
  z-index: 100;
  min-width: 240px;
  line-height: 50px;
  border-radius: 5px;
  padding: 0 10px;
  white-space: nowrap;
  background-color: green;
  text-align: center;
  color: #fff;
  font-size: 18px;
}

.dialog-tips.success {
  background-color: #4c4471;
}

.dialog-tips.warning {
  background-color: #4c4471;
}

.dialog-center {
  top: 10px;
  left: 50%;
  transform: translate(-50%);
}
</style>
