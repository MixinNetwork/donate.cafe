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
import Donate from "@/components/Donate";
import Modal from "@/mixin/Modal";
export default {
  components: { Donate },
  mixins: [Modal]
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