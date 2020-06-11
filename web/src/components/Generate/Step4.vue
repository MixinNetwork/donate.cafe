<template>
  <div class="step4">
    <input type="text" placeholder="username" @input="prefix_input" v-model="name" />
    <p v-html="url"></p>
    <button :class="name.length<5 && 'not-allow'" @click="click_next">Next</button>
  </div>
</template>

<script>
export default {
  name: "Step4",
  data() {
    return {
      name: "",
      host: process.env.VUE_APP_CLIENT + "/",
      once_click: false
    };
  },
  computed: {
    url() {
      let { name } = this;
      name = name
        ? `<i>${this.name}</i>`
        : `<i class="placeholder">username</i>`;
      return `${process.env.VUE_APP_CLIENT}/${name}`;
    }
  },
  methods: {
    prefix_input(e) {
      let value = e.target.value.replace(/[^(a-zA-Z0-9\_\-)]/g, "");
      this.name = value;
    },
    async click_next() {
      if (this.once_click) return this.$message(this.$t("message.imgloading"));
      this.once_click = true;
      if (!this.name) {
        this.once_click = false;
        return this.$message(this.$t("error.name_empty"));
      }
      if (this.name.length < 5) {
        this.once_click = false;
        return this.$message(this.$t("error.name_length"));
      }
      this.$nextTick(async () => {
        let { view_url } = await this.APIS.setUsername(this.name);
        if (!view_url) return (this.once_click = false);
        this.$ls.set("view_url", view_url);
        this.$ls.set("name", this.name);
        this.$emit("nextStep");
      });
    }
  },
  mounted() {
    let name = this.$ls.get("name");
    if (name) this.name = name;
  }
};
</script>

<style lang="scss" scoped>
.step4 {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: calc(100% - 260px);
  margin-top: 108px;

  text-align: center;
  line-height: 54px;

  font-family: Nunito;
  font-weight: normal;
  font-size: 18px;
  color: #4c4471;

  background: #f8f9fb;
  border-radius: 8px;

  &::placeholder {
    color: #bbbec3;
  }
}

/deep/ {
  i {
    font-style: normal;
  }
  i.placeholder {
    color: #bbbec3;
  }
}

p {
  margin-top: 38px;
}

button.not-allow {
  background: #bbbec3;
}

button {
  transition: all 0.3s;
  margin-top: 200px;
  width: 180px;
}

@media screen and (max-width: 67.5rem) {
  .step4 {
    display: block;
    box-sizing: border-box;
    padding: 0 20px;
    text-align: center;
  }

  input {
    width: calc(100% - 20px);
  }

  p {
    padding: 0 20px;
    word-break: break-all;
  }

  button {
    position: absolute;
    bottom: 64px;
    left: 50%;
    transform: translate(-50%);
    width: 180px;
  }
}
</style>