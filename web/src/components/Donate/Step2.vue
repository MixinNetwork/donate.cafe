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
        src="data:image/png;base64,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"
      /> DonateCafe
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
    },
    mixin_context: {
      type: Boolean,
      default: false
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
  }
};

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
  let trace_id = tools.getUUID();
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
  z-index: 1;

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
  bottom: 35px;
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
    height: 12px;
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
    margin: 0 20px 32px 20px;
    box-sizing: border-box;
  }
}
</style>