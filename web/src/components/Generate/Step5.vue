<template>
  <div class="step5">
    <div class="item">
      <label>PayPal</label>
      <input type="text" />
    </div>
    <div class="item">
      <label>{{ $t("home.step.5wechat") }}</label>
      <input type="file" />
      <span class="place">{{ $t("home.step.5wechatDesc") }}</span>
      <span class="place-right">Browse...</span>
    </div>
    <div class="item">
      <label>{{ $t("home.step.5alipay") }}</label>
      <input type="file" />
      <span class="place">{{ $t("home.step.5alipayDesc") }}</span>
      <span class="place-right">Browse...</span>
    </div>
    <button @click="click_next()">{{ $t("home.step.next") }}</button>
    <p>Skip</p>
  </div>
</template>

<script>
export default {
  name: "Step5",
};
</script>

<style lang="scss" scoped>
.step5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 46px;
  width: 100%;
}

.item {
  width: 100%;
  box-sizing: border-box;
  padding: 0 166px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  position: relative;

  label {
    margin-bottom: 2px;
    line-height: 28px;
  }

  input {
    background-color: #f8f9fb;
    height: 54px;
    border-radius: 8px;
    padding: 0 20px;
  }

  input[type="file"] {
    opacity: 0;
  }

  span {
    position: absolute;
    bottom: 0;
    line-height: 54px;
    z-index: -1;
  }
  .place {
    padding: 0 20px;
    left: 166px;
    right: 166px;
    background-color: #f8f9fb;
    color: #bbbec3;
    overflow: hidden;
    border-radius: 8px;
  }
  .place-right {
    right: 166px;
    width: 140px;
    text-align: center;
    background: #f2f2f8;
    border-radius: 0 8px 8px 0;
    color: #4c4471;
  }
}
button {
  margin-top: 68px;
  padding: 0 72px;
}
p {
  margin-top: 16px;
}

@media screen and (max-width: 67.5rem) {
  .step5 {
    display: block;
    box-sizing: border-box;
    padding: 0 20px;
    text-align: center;
  }
}
</style>