<template>
  <div class="step4">
    <pre>
      <code>{{content}}</code>
    </pre>

    <p @click="toggleCode" :class="!isJsCode && 'active'">
      <i></i>
      {{$t('home.step.4noJs')}}
    </p>

    <button
      v-clipboard:copy="content"
      　　v-clipboard:success="click_copy_succuess"
      　　v-clipboard:error="click_copy_error"
    >{{$t('home.step.4copy')}}</button>
  </div>
</template>

<script>
export default {
  name: "Step4",
  data() {
    return {
      content: "",
      isJsCode: true
    };
  },
  methods: {
    toggleCode() {
      this.isJsCode = !this.isJsCode;
      this.content = this.isJsCode ? getJsCode() : getNotJsCode();
    },
    click_copy_succuess() {
      this.$message(this.$t("home.step.4success"));
    },
    click_copy_error() {}
  },
  mounted() {
    this.content = getJsCode();
  }
};

function getJsCode() {
  let donate_id = window.sessionStorage.getItem("donate_id");
  return `
<!-- This line should go where you want to put your button -->
<div class="--donate-button"
     data-button-id="${donate_id}"
></div>
<!-- This line can go anywhere -->
<script src="https://taskwall.zeromesh.net/donate.js?t=${Number(
    new Date()
  )}"><\/script>`;
}

function getNotJsCode() {
  let donate_id = window.sessionStorage.getItem("donate_id");
  let view_url = window.sessionStorage.getItem("view_url");
  let img = view_url;
  let href = process.env.VUE_APP_CLIENT + "/" + donate_id;
  return `
<a href=${href}>
  <img src=${img} />
</a>`;
}
</script>

<style lang="scss" scoped>
.step4 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 46px;
  width: 100%;

  pre {
    padding: 10px 60px 44px 60px;
    width: calc(100% - 260px);
    height: 273px;
    box-sizing: border-box;
    background-color: #f8f9fb;
    line-height: 28px;
    overflow: hidden;

    code {
      font-family: Nunito;
      color: #4f4f4f;
    }
  }

  p {
    margin-top: 35px;
    font-weight: 400;
    cursor: pointer;

    i {
      display: inline-block;
      transition: all 0.3s;
      width: 12px;
      height: 12px;
      border: 2px solid #4c4471;
      box-sizing: border-box;
      border-radius: 2px;
    }

    &.active {
      i {
        background-color: #4c4471;
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI5IiB2aWV3Qm94PSIwIDAgOSA5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuODUzNTUgMy4xNDY0OUM4LjA0ODgyIDMuMzQxNzUgOC4wNDg4MiAzLjY1ODM0IDcuODUzNTUgMy44NTM2TDMuODUzNTUgNy44NTM2QzMuNjU4MjkgOC4wNDg4NiAzLjM0MTcxIDguMDQ4ODYgMy4xNDY0NSA3Ljg1MzZMMS4xNDY0NSA1Ljg1MzZDMC45NTExODQgNS42NTgzNCAwLjk1MTE4NCA1LjM0MTc1IDEuMTQ2NDUgNS4xNDY0OUMxLjM0MTcxIDQuOTUxMjMgMS42NTgyOSA0Ljk1MTIzIDEuODUzNTUgNS4xNDY0OUwzLjUgNi43OTI5NEw3LjE0NjQ1IDMuMTQ2NDlDNy4zNDE3MSAyLjk1MTIzIDcuNjU4MjkgMi45NTEyMyA3Ljg1MzU1IDMuMTQ2NDlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K);
        background-position: 50% 100%;
        background-repeat: no-repeat;
      }
    }
  }

  button {
    margin-top: 36px;
    width: 180px;
  }
}
@media screen and (max-width: 67.5rem) {
  .step4 {
    display: block;
    box-sizing: border-box;
    padding: 0 20px;
    text-align: center;

    pre {
      padding: 12px 20px 30px 20px;
      box-sizing: border-box;
      text-align: left;
      width: 100%;
    }

    p {
      box-sizing: border-box;
      padding: 25px 20px;
      height: initial;
      margin: initial;
    }

    button {
      margin-top: 38px;
      width: 180px;
    }
  }
}
</style>