<template>
  <div class="home">
    <Header @open="change_modal(true)" :is_home="true" />

    <Section @open="change_modal(true)" />
    <Footer @show_content="change_modal" />
    <transition name="fade">
      <Modal :show_modal="show_modal" :show_content="show_content" @close="change_modal(false)" />
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
      show_content: "",
      is_donate: true
    };
  },
  methods: {
    change_modal(status) {
      if (typeof status === "string") {
        this.show_content = status;
        this.show_modal = true;
      } else {
        this.show_content = "";
        this.show_modal = status;
      }
    }
  },
  async mounted() {
    window._vm = this;
    let step4 = window.sessionStorage.getItem("step4");
    if (step4) this.show_modal = true;
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
