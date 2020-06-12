<template>
  <header>
    <a class="left" :href="home_url">
      <img alt="logo" src="@/assets/img/logo.png" />
      <span>{{$t('header.title')}}</span>
    </a>
    <div :class="['right', isHome && token && 'avatar']">
      <template v-if="isHome">
        <template v-if="!token">
          <img class="menus" @click.stop="toggle_menus" src="@/assets/img/menus.svg" />
          <div :class="['nav-list-menus-list', show_menus && 'active']">
            <a :href="url" @click="click_to_auth" class="nav-list-menus-item">{{$t('header.login')}}</a>
          </div>
        </template>
        <template v-else>
          <img
            class="avatar"
            @click.stop="toggle_menus"
            v-if="avatar_url.startsWith('http')"
            :src="avatar_url"
          />
          <span
            v-else
            :style="`background-color:${avatar_url.split(';')[0]}`"
            @click.stop="toggle_menus"
            class="avatar"
          >{{avatar_url.split(';')[1]}}</span>
          <div :class="['avatar-list', show_menus && 'active']">
            <span @click="click_donate_button" class="nav-list-menus-item">{{$t('header.modify')}}</span>
            <span @click="click_logout" class="nav-list-menus-item">{{$t('header.logout')}}</span>
          </div>
        </template>
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
      token: null,
      url: "",
      isHome: true
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
    },
    click_to_auth() {
      window.location.href = this.url;
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
    this.isHome = this.$route.name === "home";
    this.avatar_url = this.$ls.get("avatar_url");
    this.token = this.$ls.get("token");
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
    width: 24px;
    height: 24px;
  }

  span {
    white-space: nowrap;
    cursor: pointer;
  }
}

.right {
  position: relative;
}

.nav-list-menus-list {
  display: block;
}

.menus,
.avatar-list {
  display: none;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  min-width: 40px;
  max-width: 40px;
  box-sizing: border-box;

  font-size: 1rem;

  color: #fff;

  border: 3px solid rgba($color: #fff, $alpha: 0.3);
  border-radius: 50%;
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
    cursor: pointer;
    margin-left: 20px;
    font-size: 12px;
    line-height: 40px;
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