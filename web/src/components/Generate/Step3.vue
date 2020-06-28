<template>
  <div class="step3">
    <p>{{$t('home.step.3info')}}</p>
    <button @click="click_to_auth">{{$t('home.step.3button')}}</button>
    <a target="_blank" href="https://mixin.one/messenger">{{$t('home.step.3noMessenger')}}</a>
  </div>
</template>

<script>
export default {
  name: "Step3",
  methods: {
    click_to_auth() {
      window.location.href = `https://mixin.one/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=SNAPSHOTS:READ+PROFILE:READ+ASSETS:READ&response_type=code`;
    }
  },
  mounted() {
    if (this.$ls.get("token")) {
      this.$emit("nextStep");
      this.APIS.saveDonate();
    }
  }
};
</script>

<style lang="scss" scoped>
.step3 {
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    margin-top: 120px;
    width: 520px;
    line-height: 28px;
    text-align: center;
  }

  button {
    margin-top: 80px;
    width: 220px;
  }

  a {
    margin-top: 128px;
    color: #0a58f1;
    cursor: pointer;
  }
}

@media screen and (max-width: 67.5rem) {
  .step3 {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin-top: 4.88rem;
      width: calc(100% - 50px);
      font-size: 18px;
      line-height: 32px;
      text-align: center;
    }

    button {
      margin: 2.8rem 0 1rem 0;
      width: 200px;
    }

    a {
      margin: 9rem 0 1rem;
    }
  }
}
</style>