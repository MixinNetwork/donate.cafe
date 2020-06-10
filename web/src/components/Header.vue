<template>
  <header>
    <a class="left" :href="home_url">
      <img alt="Vue logo" src="@/assets/img/logo.svg" />
      <span>{{$t('home.title')}}</span>
    </a>
    <div :class="['right', avatar_url && 'avatar']">
      <template v-if="!avatar_url">
        <img class="menus" @click.stop="toggle_menus" src="@/assets/img/menus.svg" />
        <div :class="['nav-list-menus-list', show_menus && 'active']">
          <a :href="url" class="nav-list-menus-item">Log in with Mixin</a>
        </div>
      </template>
      <template v-else>
        <img class="avatar" @click.stop="toggle_menus" :src="avatar_url" />
        <div :class="['avatar-list', show_menus && 'active']">
          <span @click="click_donate_button" class="nav-list-menus-item">Modify My Donate Button</span>
          <span @click="click_logout" class="nav-list-menus-item">Logout</span>
        </div>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      show_menus: false,
      home_url: process.env.VUE_APP_CLIENT,
      avatar_url: null,
      url: ""
    };
  },
  methods: {
    toggle_menus() {
      if (!this.show_menus) {
        this.show_menus = true;
        console.log(123);
        document.onclick = () => (this.show_menus = false);
      } else {
        this.show_menus = false;
        document.onclick = null;
      }
    },
    click_donate_button() {
      this.$emit("open");
    },
    click_logout() {
      window.localStorage.clear();
      window.sessionStorage.clear();
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  },
  mounted() {
    this.avatar_url = this.$ls.get("avatar_url");
    this.url = `https://mixin.one/oauth/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&scope=PROFILE:READ+ASSETS:READ&response_type=code&state=login`;
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
  position: relative;
}

.right.avatar {
  height: 40px;
}

.nav-list-menus-list {
  display: block;
}

.menus,
.avatar-list {
  display: none;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
}
.menus-modal {
  display: none;
}
.avatar-list {
  display: none;
  white-space: nowrap;
  position: absolute;
  right: -13px;
  top: 24px;
  background: #fff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  z-index: 10;
  flex-direction: column;

  .nav-list-menus-item {
    display: block;
    text-align: left;
    padding-right: 20px;
    margin-left: 20px;
    font-size: 12px;
    line-height: 40px;
    color: #333333;
    border-radius: 6px 6px 4px 4px;
    border-bottom: 1px solid #f2f2f2;
    cursor: pointer;
    &:last-child {
      border: 0;
    }
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
    display: flex;
  }
}

.avatar-list {
  right: -2px;
  top: 50px;
  padding: 10px 0;
}

@media screen and (max-width: 67.5rem) {
  header {
    box-sizing: border-box;
  }

  .nav-list-menus-list {
    display: none;
    white-space: nowrap;
    position: absolute;
    right: -13px;
    top: 24px;
    background: #fff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
    z-index: 10;
    flex-direction: column;

    .nav-list-menus-item {
      display: block;
      text-align: left;
      padding-right: 20px;
      margin-left: 20px;
      font-size: 12px;
      line-height: 40px;
      color: #333333;
      border-radius: 6px 6px 4px 4px;
      border-bottom: 1px solid #f2f2f2;
      cursor: pointer;
      &:last-child {
        border: 0;
      }
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
      display: flex;
    }
  }
  .right {
    position: relative;

    .menus {
      display: block;
      cursor: pointer;
    }
  }
}
</style>