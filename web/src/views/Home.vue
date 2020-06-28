<template>
  <div class="home">
    <Header @open="change_modal(true)" />
    <Section @open="change_modal(true)" />
    <Footer @show_content="change_modal" />
    <transition name="fade">
      <Modal :show_modal="show_modal" :show_content="show_content" @close="change_modal(false)" />
    </transition>
  </div>
</template>

<script>
import Section from "@/components/Section";
import Modal from "@/mixin/Modal";
export default {
  components: { Section },
  mixins: [Modal],
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
