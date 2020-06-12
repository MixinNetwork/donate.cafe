<template>
  <div class="step2" ref="container">
    <div class="select" @click.stop="click_select">
      <template v-if="!paid">
        {{active_asset.symbol}}
        <img src="@/assets/img/trangle.svg" />
      </template>
      <template v-else>{{active_asset.prefix | upper}}</template>
      <ul class="select-asset-list" v-if="select_mode">
        <li
          v-for="(item, index) in donate_info.addresses"
          :key="index"
          @click="click_asset(item, index)"
        >
          <img :src="item.icon_url" alt />
          {{item.symbol}}
        </li>
      </ul>
    </div>
    <img :src="donate_info.addresses[active_index].icon_url" class="asset-icon" alt="icon" />
    <p class="thanks">{{donate_info.currency.message[1]}}:</p>
    <p class="amount">{{active_amount.amount}} ({{active_amount_token}})</p>
    <template v-if="!paid">
      <canvas ref="qrcode"></canvas>
      <button
        class="mixin-button"
        @click="click_to_pay"
        v-if="mixin_context"
      >{{donate_info.currency.message[2]}}</button>
      <p v-else class="address">{{active_asset.destination}}</p>
    </template>
    <template v-else>
      <i class="success"></i>
      <span class="done">Done</span>
    </template>
    <a :href="client_url" target="_blank" class="powered">
      Powered by
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJsSURBVHgB1VQxaFRBEJ3Z3dwZUPBMc4QTlCjYGBsLr4uVWgbUaCFoYaVJIyoYUFMEBTkURDshlYZrgpWFoIJoNBaS2BoIJgFBYiKSy93/f2eye/f/7f93lyuONHmwt3935t7M25ldgB2P7Cf9IvueB2CbkZ32B3o/6lfY+85nAARE/AGaJkCq4vJJXIIOcOA77/X+0wgGdIYRTwAzKBFYE9tx1PwUmINzZs5DB9Cr+q0I+HhtxSZtAIUBJ5wEQgY6BHq8G6jGh+GeEj6FS2NgdJYGHHxd6SfgJwjS06SvLQ7umm8RALAagOshlPCijZqsxgC5YvlQGvkWeXRFGH+AwMjGn31T3oQGPbYw2L0Q+QpbTiLHZfdsgORw5IcnyzfTAc2Bx1eNTdV9KoakFFyWJZ7ve7kxGvnLJi5bZI+SMkG4hcdDQlM3bA1hum/IzOPVhSFkowDBnYmSFY6YwzK4gFWbTtqbQ8Q+rT9xPNuoyHEJ7h/V+hBBO3DM35TftH7SX4kKN/BzQgETQzvE+GNdFAsgvUYF7lP6/Je1s3Ozi5GpSomEQgWRT62LfDcwFjC19u+i0DgiffhlbbZLpB92SACroOVdLPun67G80CfRRW1qMPMgt2Kmp/33lqZStOc2sX8eGdIkxfOuVKYwcwdXEmICStTMKlboN9SgRavMjeXs4zd8bHTxYaYrt/7hPq5BC9ga2AcuYrKpKuHHb6/ZlOIbbIHZ8f3L0AYygFnTFEdc/vai6Op5gjnrN4pTp7482ncJOsTXQs8Fc43OosZJwweWG/PDf4pI4vHnZz3TsI3IX/9tnn9xA3Y8NgF9RjiKSGtofAAAAABJRU5ErkJggg=="
      /> Mixin
    </a>
    <audio ref="audio" src="@/assets/audio/payment_success.mp3"></audio>
  </div>
</template>

<script>
import qrious from "qrious";
import tools from "@/assets/js/tools.js";
export default {
  props: {
    donate_info: {
      type: Object,
      default() {
        return {};
      }
    },
    active_amount_idx: {
      type: Number,
      default: 0
    },
    active_asset_idx: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      select_mode: false,
      active_index: 0,
      active_amount_token: "",
      timer: null,
      ex_timer: null,
      paid: false,
      client_url: process.env.VUE_APP_CLIENT,
      mixin_context: false,
      address: ""
    };
  },
  filters: {
    upper(data) {
      return data[0].toUpperCase() + data.substr(1);
    }
  },
  computed: {
    active_amount() {
      let { donate_info, active_amount_idx } = this;
      return donate_info.amount_info[active_amount_idx];
    },
    active_asset() {
      let { donate_info, active_index } = this;
      return donate_info.addresses[active_index];
    }
  },
  methods: {
    click_select() {
      if (this.paid) return;
      this.select_mode = !this.select_mode;
      if (this.select_mode) {
        this.$refs.container.onclick = () => {
          this.select_mode = false;
        };
      } else {
        this.$refs.container.onclick = null;
      }
    },
    click_asset(item, index) {
      this.address = resetAsset.call(this, item, index);
      resetQRCode.call(this);
    },
    click_to_pay() {
      let params = this.address.split("?")[1];
      window.location.href = "https://mixin.one/pay?" + params;
    }
  },
  mounted() {
    this.click_asset(null, this.active_asset_idx);
    if (tools.environment()) this.mixin_context = true;
  }
};

function _getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function resetAsset(item, index) {
  this.active_index = index;
  let { donate_info, active_amount } = this;
  let { currency, amount_info, user_id, addresses } = donate_info;
  let { symbol: csymbol, fiats } = currency;
  if (!item) item = addresses[index];
  let { price, symbol, prefix, asset_id, destination } = item;
  let amount = active_amount.amount;
  if (amount.startsWith(csymbol)) amount = amount.substr(csymbol.length);
  price = Number(price);
  let _amount = (Number(amount) / (price * fiats)).toFixed(6);
  let random_amount = (Math.random() * 100) | 0;
  _amount += random_amount;
  this.active_amount_token = _amount + " " + symbol;
  let trace_id = _getUUID();
  let label = encodeURIComponent(active_amount.label);
  if (label.length > 140)
    label = encodeURIComponent(active_amount.label.substr(0, 40));
  let memo = "donate:" + label;
  let params = {
    amount: _amount,
    asset_id,
    counter_user_id: user_id,
    trace_id
  };
  resetWatcher.call(this, params, destination);
  return `${prefix}:${destination}?amount=${_amount}&asset=${asset_id}&recipient=${user_id}&trace=${trace_id}&memo=${memo}`;
}

function resetQRCode() {
  let value = this.address;
  new qrious({
    element: this.$refs.qrcode,
    value: value,
    level: "L",
    size: 1000
  });
}

function resetWatcher(params, destination) {
  resetTimer.call(this, params);
  resetExTimer.call(this, params, destination);
}

function resetTimer(params) {
  if (this.timer) {
    clearInterval(this.timer);
  }
  this.timer = setInterval(async () => {
    let { status } = await this.APIS.checkPaid(params);
    if (status === "paid") success.call(this);
  }, 2000);
}

function resetExTimer({ asset_id, amount }, destination) {
  if (this.ex_timer) {
    clearInterval(this.ex_timer);
  }
  let params = { asset_id, destination };
  this.ex_timer = setInterval(async () => {
    let t = await this.APIS.checkExternalPaid(params);
    if (Array.isArray(t)) {
      for (let i = 0; i < t.length; i++) {
        let { amount: _amount } = t[i];
        if (amount == _amount) {
          success.call(this);
          break;
        }
      }
    }
  }, 2000);
}

function success() {
  clearInterval(this.timer);
  clearInterval(this.ex_timer);
  this.timer = null;
  this.ex_timer = null;
  this.paid = true;
  this.$refs.audio.play();
}
</script>

<style lang="scss" scoped>
.step2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;

  position: relative;
}

.select {
  display: flex;
  align-items: center;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  color: #4c4471;
  position: relative;
  cursor: pointer;

  margin-top: 28px;

  img {
    margin-left: 8px;
  }
}

.select-asset-list {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 0 0 0;
  margin: 0;
  width: 160px;
  max-height: 320px;
  z-index: 9999;

  background: #ffffff;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border: 2px solid rgba(126, 111, 111, 0);
    box-shadow: 6px 0 0 #e0e0e0 inset;
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  li {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 12px 0 12px 25px;
    cursor: pointer;
    img {
      width: 28px;
      height: 28px;
      margin-right: 16px;
    }
  }
}

.asset-icon {
  width: 80px;
  height: 80px;
  margin-top: 32px;
}

.thanks,
.amount {
  font-size: 16px;
  color: #4c4471;
  font-weight: 700;
  line-height: 24px;
}
.thanks {
  margin: 8px 0 0 0;
}
.amount {
  margin: 0;
  text-align: center;
}

canvas {
  margin: 24px 0 16px 0;
  width: 148px;
  height: 148px;
}

.address {
  font-size: 10px;
  font-weight: normal;
  text-align: center;
  max-width: 380px;
  word-break: break-all;
  margin-bottom: 32px;
  color: #bbbec3;
}

.mixin-button {
  padding: 0 30px;
  margin-bottom: 20px;
  white-space: nowrap;
}

.powered {
  position: absolute;
  bottom: 50px;
  display: flex;
  align-items: center;
  font-size: 12px;
  height: 17px;
  color: #4c4471;
  text-decoration: none;
  white-space: nowrap;
  img {
    margin: 0 4px;
    width: 12px;
    height: 11px;
  }
}

.success {
  width: 40px;
  height: 40px;
  margin-top: 76px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM4LjUgMjBDMzguNSAzMC4yMTczIDMwLjIxNzMgMzguNSAyMCAzOC41QzkuNzgyNzMgMzguNSAxLjUgMzAuMjE3MyAxLjUgMjBDMS41IDkuNzgyNzMgOS43ODI3MyAxLjUgMjAgMS41QzMwLjIxNzMgMS41IDM4LjUgOS43ODI3MyAzOC41IDIwWiIgc3Ryb2tlPSIjNEM0NDcxIiBzdHJva2Utd2lkdGg9IjMiLz4KPHBhdGggZD0iTTI4LjUgMTUuNUwxOC43MDcxIDI1LjI5MjlDMTguMzE2NiAyNS42ODM0IDE3LjY4MzQgMjUuNjgzNCAxNy4yOTI5IDI1LjI5MjlMMTIuNSAyMC41IiBzdHJva2U9IiM0QzQ0NzEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=");
}

.done {
  font-size: 14px;
  line-height: 32px;
  margin-bottom: 60px;

  color: #bcbec3;
}

@media screen and (max-width: 480px) {
  .address {
    max-width: calc(100% - 40px);
  }
  .powered {
    bottom: 35px;
  }
}
</style>