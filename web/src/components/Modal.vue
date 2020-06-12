<template>
  <div @click.stop class="modal" v-if="show_modal">
    <div class="mask"></div>
    <div class="content">
      <span @click="click_close_btn" class="close-btn"></span>
      <div v-if="show_faq" class="faq" v-html="$t('home.faqDesc')"></div>
      <div v-else class="step">
        <h2>{{$t(`home.step.title[${active_step}]`)}}</h2>
        <p>{{$t('home.step.number', {number: active_step})}}</p>
        <Step1 v-if="active_step === 1" @nextStep="nextStep" />
        <Step2 v-if="active_step === 2" @nextStep="nextStep" />
        <Step3 v-if="active_step === 3" @nextStep="nextStep" />
        <Step4 v-if="active_step === 4" @nextStep="nextStep" />
        <Step5 v-if="active_step === 5" />
      </div>
    </div>
  </div>
</template>

<script>
import Step1 from "@/components/Generate/Step1";
import Step2 from "@/components/Generate/Step2";
import Step3 from "@/components/Generate/Step3";
import Step4 from "@/components/Generate/Step4";
import Step5 from "@/components/Generate/Step5";
export default {
  name: "Modal",
  components: { Step1, Step2, Step3, Step4, Step5 },
  props: {
    show_modal: {
      type: Boolean,
      default: false
    },
    show_faq: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active_step: 1,
      resp: {}
    };
  },
  methods: {
    nextStep() {
      this.active_step++;
    },
    click_close_btn() {
      this.active_step = 1;
      window.sessionStorage.clear();
      this.$emit("close");
    }
  },
  mounted() {
    let step4 = window.sessionStorage.getItem("step4");
    if (step4) this.active_step = 4;
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  .mask {
    width: 100%;
    height: calc(100% + 50px);
    background-color: rgba($color: #000, $alpha: 0.2);
  }
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;

  transform: translate(-50%, -50%);
  width: 920px;
  height: 690px;
  background-color: #fff;
  border-radius: 20px;
  font-family: Nunito;
}

.faq {
  margin: 20px 0;
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% - 40px);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border: 2px solid rgba(126, 111, 111, 0);
    box-shadow: 6px 0 0 #e0e0e0 inset;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
  /deep/ {
    h3 {
      margin-top: 20px;
      font-size: 18px;
      color: #000;
    }

    p {
      margin: 10px 0px;
      color: #000;
    }

    a {
      color: rgb(0, 0, 204);
    }
  }
}

.close-btn {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #eaeaea;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 2px;
    width: 16px;

    background-color: #fff;
    border-radius: 20px;
  }

  &:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}

.step {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h2 {
    margin-top: 60px;
    font-weight: 600;
    font-size: 37px;
    white-space: nowrap;
  }

  & > p {
    margin-top: 4px;
    color: #828282;
    font-family: Nunito;
    font-weight: 400;
    white-space: nowrap;
  }
}

@media screen and (max-width: 67.5rem) {
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 10;

    .mask {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: rgba($color: #000, $alpha: 0.2);
    }
  }

  .content {
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    min-height: 460px;
    max-height: 675px;
    overflow: auto;
  }

  .close-btn {
    width: 16px;
    height: 16px;

    &:before,
    &:after {
      width: 8px;
    }
  }

  .step {
    width: 100%;

    h2 {
      margin-top: 3rem;
      font-size: 1.5rem;
    }
  }
}
</style>