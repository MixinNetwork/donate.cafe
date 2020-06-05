<template>
  <header>
    <a class="left" :href="home_url">
      <img alt="Vue logo" src="@/assets/img/logo.svg" />
      <span>{{$t('home.title')}}</span>
    </a>
    <div class="right">
      <img @click.stop="toggle_menus" src="@/assets/img/menus.svg" />
      <div :class="['nav-list-menus-list', show_menus && 'active']">
        <a href="https://mixin.one/messenger" class="nav-list-menus-item">Messenger</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      show_menus: false,
      home_url: process.env.VUE_APP_CLIENT
    };
  },
  methods: {
    toggle_menus() {
      if (!this.show_menus) {
        this.show_menus = true;
        document.onclick = () => (this.show_menus = false);
      } else {
        this.show_menus = false;
        document.onclick = null;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  max-width: 64rem;
  margin: 1.2rem auto;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Nunito;
  font-style: normal;
  font-weight: 600;
}

.left {
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    margin-right: 0.56rem;
    cursor: pointer;
  }

  span {
    white-space: nowrap;
    cursor: pointer;
  }
}

.right {
  img {
    display: none;
  }
}

@media screen and (max-width: 67.5rem) {
  header {
    box-sizing: border-box;
  }

  .right {
    position: relative;

    img {
      display: block;
      cursor: pointer;
    }

    .nav-list-menus-list {
      display: none;
      width: 120px;
      position: absolute;
      right: -13px;
      top: 24px;
      background: #fff;
      box-shadow: 0px 2px 12px 0px rgba(47, 48, 50, 0.3);
      border-radius: 6px 6px 4px 4px;
      z-index: 10;

      .nav-list-menus-item {
        text-align: left;
        padding-left: 24px;
        width: 100%;
        height: 50px;
        font-size: 14px;
        line-height: 46px;
        color: #333333;
        border-radius: 6px 6px 4px 4px;
      }

      a {
        margin: 0;
      }

      &::after {
        display: block;
        content: "";
        width: 0;
        height: 0;
        position: absolute;
        top: -10px;
        right: 18px;
        border-width: 5px;
        border-style: solid;
        border-color: transparent transparent #fff transparent;
      }

      &.active {
        display: block;
      }
    }
  }
}
</style>