<template>
  <div :class="['donate']">
    <Header />
    <Donate />
    <Footer @show_content="change_modal" />
    <transition name="fade">
      <Modal :show_modal="show_modal" :show_content="show_content" @close="change_modal(false)" />
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
  background-image: url("../assets/img/donate_bg.png");
  background-color: #edeeee;
}
</style>