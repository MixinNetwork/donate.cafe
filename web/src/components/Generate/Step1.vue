<template>
  <div class="step1">
    <div class="choose">
      <span
        :class="button_mode_default ? 'active' : ''"
        @click="toggle_button_mode(true)"
      >{{$t('home.step.1default')}}</span>
      <span
        :class="button_mode_default ? '' : 'active'"
        @click="toggle_button_mode(false)"
      >{{$t('home.step.1user')}}</span>
    </div>

    <div ref="choose" :class="['img', !button_mode_default && 'choose-img']">
      <template v-if="button_mode_default">
        <img src="https://taskwall.zeromesh.net/donate.svg" />
      </template>
      <template v-else>
        <input type="file" accept="image/*" @change="croppie" />
        <img
          v-if="file"
          :src="file"
          :style="{width: button.width+'px', height: button.height+'px'}"
        />
        <span v-else>{{$t('home.step.1choose')}}</span>
      </template>
    </div>
    <button @click="click_next()">{{$t('home.step.next')}}</button>
  </div>
</template>

<script>
import lrz from "lrz";

export default {
  name: "STEP1",
  data() {
    return {
      button_mode_default: true,
      button: {
        width: "150",
        height: ""
      },
      file: null
    };
  },
  methods: {
    toggle_button_mode(mode) {
      this.button_mode_default = mode;
    },
    click_next() {
      let { button_mode_default, file } = this;
      if (!button_mode_default && file) {
        this.$ls.set("button", "user");
        let oldFile = this.$ls.get("file");
        this.$ls.set("file", file);
        oldFile !== file && this.$ls.set("file_change", "1");
      } else {
        this.$ls.set("button", "");
      }
      this.$emit("nextStep");
    },
    async croppie(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let data = await getFile.call(this, files[0]);
      if (!data) return;
      let { width, height } = await getImgSize(data);
      let { clientWidth, clientHeight } = this.$refs.choose;
      if (width < clientWidth && height < clientHeight) {
        this.button.width = width;
        this.button.height = height;
      } else if (width / height <= clientWidth / clientHeight) {
        this.button.height = clientHeight;
        this.button.width = (width / height) * clientHeight;
      } else {
        this.button.width = clientWidth;
        this.button.height = (height / width) * clientWidth;
      }
      this.file = data;
    }
  },
  mounted() {
    let file = this.$ls.get("file");
    let button = this.$ls.get("button");
    if (file) {
      this.file = file;
      this.button_mode_default = false;
    }
    this.button_mode_default = button !== "user";
  }
};

function getImgSize(imgSrc) {
  return new Promise(resolve => {
    let image = new Image();
    image.onload = () => {
      let { width, height } = image;
      resolve({ width, height });
    };
    image.src = imgSrc;
  });
}

function getFile(file) {
  let { size, type } = file;
  if (size > 1024 * 1024 * 3) {
    this.$message(this.$t("home.step.1notice"));
    return false;
  }

  return new Promise(async resolve => {
    if (type === "image/gif") {
      var a = new FileReader();
      a.onload = function(e) {
        var base64Str = e.target.result;
        resolve(base64Str);
      };
      a.readAsDataURL(file);
    } else {
      lrz(file).then(data => {
        resolve(data.base64);
      });
    }
  });
}
</script>

<style lang="scss" scoped>
.choose {
  margin-top: 100px;
  font-size: 20px;
  transform: translate(48px);

  span {
    position: relative;
    cursor: pointer;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -44px;
      width: 24px;
      height: 24px;

      border: 2px solid #4c3371;
      border-radius: 50%;
      transition: background-color 0.3s;
    }

    &.active {
      &:before {
        background-image: url("../../assets/img/select.svg");
        background-repeat: no-repeat;
        background-position: center;
        background-color: #4c4471;
      }
    }

    &:first-child {
      margin-right: 112px;
    }
  }
}

.img {
  background: #f8f9fb;
  margin-top: 32px;
  width: 588px;
  height: 194px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 999;
  }

  img {
    width: 150px;
  }

  span {
    color: #bbbec3;
  }
}

.choose-img {
  overflow: hidden;
}

button {
  display: block;
  margin: 76px auto 16px auto;
  width: 180px;
}

@media screen and (max-width: 67.5rem) {
  .step1 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .choose {
    transform: initial;
    display: flex;
    flex-direction: column;
    margin-top: 5rem;

    span {
      font-size: 1.125rem;
      margin-left: 1.5rem;

      &::before {
        width: 1.25rem;
        height: 1.25rem;
        left: -2rem;
      }

      &:first-child {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }

  .img {
    max-width: 270px;
    height: 230px;
  }

  button {
    display: block;
    margin: 3rem auto 1rem auto;
  }
}
</style>