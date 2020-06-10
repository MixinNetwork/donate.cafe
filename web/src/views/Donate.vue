<template>
  <div :class="['donate']">
    <Header />
    <Donate />
    <Footer @show_faq="change_modal(true)" />
    <transition name="fade">
      <Modal :show_modal="show_modal" :show_faq="show_faq" @close="change_modal(false)" />
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Donate from "@/components/Donate";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";

export default {
  components: { Header, Donate, Footer, Modal },
  data() {
    return {
      show_modal: false,
      show_faq: false,
      is_donate: true
    };
  },
  methods: {
    change_modal(status, faq_status) {
      this.show_modal = status;
      this.show_faq = faq_status ? false : status;
    }
  }
};
</script>

<style lang="scss" scoped>
.donate {
  width: 100%;
  height: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;
  background-image: url("../assets/img/bg.png");
  background-color: #edeeee;
}
</style>