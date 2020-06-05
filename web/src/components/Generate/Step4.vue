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
  let href = process.env.VUE_APP_CLIENT + "/d?id=" + donate_id;
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
    overflow-y: hidden;
    overflow-x: auto;

    code {
      font-family: Nunito;
      color: #4f4f4f;
    }
  }

  p {
    margin-top: 35px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
    line-height: 24px;

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