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
export default {
  async mounted() {
    const error = getUrlParameter("error");
    if (error === "access_denied") return handle_access_denied.call(this);
    const code = getUrlParameter("code");
    const resp = await this.APIS.authenticate(code);
    if (typeof resp === "string") window.sessionStorage.setItem("data", resp);
    this.$router.push("/");
  }
};

function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}
</script>

<style>
.spinner-container {
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 9999;
}

.spinner-container .spinner {
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

.spinner-container .spinner > div {
  background-color: #007aff;
  height: 100%;
  width: 6px;
  margin: 0 2px;
  display: inline-block;
  animation: sk-stretchdelay 1.2s infinite ease-in-out;
}

.spinner-container .spinner .rect2 {
  animation-delay: -1.1s;
}

.spinner-container .spinner .rect3 {
  animation-delay: -1s;
}

.spinner-container .spinner .rect4 {
  animation-delay: -0.9s;
}

.spinner-container .spinner .rect5 {
  animation-delay: -0.8s;
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
