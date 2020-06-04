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
          v-if="tmp_file"
          :src="tmp_file"
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
      tmp_file: null
    };
  },
  methods: {
    toggle_button_mode(mode) {
      this.button_mode_default = mode;
    },
    click_next() {
      let { button_mode_default, tmp_file } = this;
      if (!button_mode_default && tmp_file)
        window.sessionStorage.setItem("file", tmp_file);
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
      this.tmp_file = data;
    }
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
    this.$message("The file must not be larger than 5M");
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

<style>
</style>