<template>
  <div class="home">
    <header>
      <div class="left">
        <img alt="Vue logo" src="@/assets/img/logo.svg" />
        <span>{{$t('home.title')}}</span>
      </div>
      <div class="right">
        <img @click.stop="toggle_menus" src="@/assets/img/menus.svg" />
        <div :class="['nav-list-menus-list', show_menus && 'active']">
          <a href="https://mixin.one/messenger" class="nav-list-menus-item">Messenger</a>
        </div>
      </div>
    </header>

    <section>
      <h1 v-html="$t('home.desc')"></h1>
      <img src="@/assets/img/home.png" alt />
      <ul>
        <li v-for="(item, index) in $t('home.props')" :key="index">{{item}}</li>
      </ul>
      <button @click="show_modal=true">{{$t('home.mainBtn')}}</button>
    </section>

    <footer>
      <ul>
        <li>
          <a href="https://twitter.com/mixindonate">Twitter</a>
        </li>
        <li>
          <a href="https://github.com/MixinNetwork/donation-button">Github</a>
        </li>
        <li>
          <a @click="show_faq=show_modal=true" href="javascript:void(0)">{{$t('home.faq')}}</a>
        </li>
      </ul>
    </footer>

    <transition name="fade">
      <div @click.stop class="modal" v-if="show_modal">
        <div class="mask" @click="show_modal=false"></div>
        <div class="content">
          <span @click="click_close_btn" class="close-btn"></span>
          <div v-if="show_faq" class="faq" v-html="$t('home.faqDesc')"></div>
          <div v-else class="step">
            <h2>{{$t(`home.step.title[${active_step}]`)}}</h2>
            <p>{{$t('home.step.number', {number: active_step})}}</p>
            <Step1 v-if="active_step === 1" @nextStep="nextStep" />
            <Step2 v-if="active_step === 2" @nextStep="nextStep" />
            <div v-if="active_step === 3" class="step3">
              <p>{{$t('home.step.3info')}}</p>
              <button @click="click_to_auth">{{$t('home.step.3button')}}</button>
              <a href="https://mixin.one/messenger">{{$t('home.step.3noMessenger')}}</a>
            </div>
            <div v-if="active_step === 4" class="step4">
              <pre>
              <code>{{content}}</code>
            </pre>
              <button
                v-clipboard:copy="content"
                　　v-clipboard:success="click_copy_succuess"
                　　v-clipboard:error="click_copy_error"
              >{{$t('home.step.4copy')}}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";

export default {
  components: { Step1, Step2 },
  data() {
    return {
      show_modal: false,
      show_faq: false,
      show_menus: false,
      active_step: 1,
      step_conf: {
        1: { title: "Choose Button Style" },
        2: { title: "Set Amount" },
        3: { title: "Bind Receive Wallet" },
        4: { title: "Your Donate Html" }
      },
      content: ""
    };
  },
  methods: {
    toggle_menus() {
      let { show_menus } = this;
      if (!show_menus) {
        this.show_menus = true;
        document.onclick = () => (this.show_menus = false);
      } else {
        this.show_menus = false;
        document.onclick = null;
      }
    },
    click_close_btn() {
      this.show_faq = this.show_modal = false;
      this.active_step = 1;
      window.sessionStorage.clear();
    },
    nextStep() {
      this.active_step++;
    },
    click_to_auth() {
      window.location.href = `https://mixin.one/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+ASSETS:READ&response_type=code`;
    },
    click_copy_succuess() {
      this.$message(this.$t("home.step.4success"));
    },
    click_copy_error() {}
  },
  async mounted() {
    window._vm = this;
    let data = window.sessionStorage.getItem("data");
    if (data) {
      this.content = `
<!-- This line should go where you want to put your button -->
<div class="--donate-button"
     data-button-id="${data}"
></div>
<!-- This line can go anywhere -->
<script src="https://taskwall.zeromesh.net/donate.js?t=32"><\/script>`;
      this.show_modal = true;
      this.active_step = 4;
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/theme.scss";
@import "../assets/scss/base.scss";
@import "../assets/scss/pc.scss";
@import "../assets/scss/mobile.scss";
</style>
