<template>
  <div class="home">
    <Header />

    <Section @open="change_modal(true, true)" />
    <Footer @show_faq="change_modal(true)" />
    <transition name="fade">
      <Modal :show_modal="show_modal" :show_faq="show_faq" @close="change_modal(false)" />
    </transition>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
export default {
  components: { Header, Section, Footer, Modal },
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
  },
  async mounted() {
    window._vm = this;
    let data = window.sessionStorage.getItem("donate_id");
    if (data) this.show_modal = true;
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 67.5rem) {
  .home {
    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: center;
  }
}
</style>
