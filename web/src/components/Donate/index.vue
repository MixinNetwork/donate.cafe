<template>
  <div class="page">
    <Step1 v-if="show_state==1" :donate_info="donate_info" @next="next_step" />
    <Step2
      v-else-if="show_state==2"
      :donate_info="donate_info"
      :active_amount_idx="active_amount_idx"
    ></Step2>
  </div>
</template>

<script>
import Step1 from "@/components/Donate/Step1";
import Step2 from "@/components/Donate/Step2";
export default {
  components: { Step1, Step2 },
  data() {
    return {
      show_state: -1,
      active_amount_idx: 0,
      donate_info: {}
    };
  },
  methods: {
    next_step(idx) {
      this.active_amount_idx = idx;
      this.show_state++;
    }
  },
  async mounted() {
    let { params = {} } = this.$route;
    let { id } = params;
    if (!id) return toHome.call(this);
    let data = await this.APIS.getDonate(id);
    if (!data) return toHome.call(this);
    this.donate_info = data;
    this.show_state = 1;
  }
};
function toHome() {
  this.$message("donate_id 无效");
  this.$router.push("/");
}
</script>

<style lang="scss" scoped>
.page {
  font-family: Nunito;

  background: #ffffff;
  box-shadow: 0px 8px 30px rgba(74, 58, 150, 0.08);
  border-radius: 20px;
  width: 480px;
  height: 520px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
@media screen and (max-width: 480px) {
  .page {
    width: calc(100% - 20px);
    margin-bottom: 16px;
  }
}
</style>