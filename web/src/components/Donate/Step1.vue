<template>
  <div class="step1">
    <img
      class="avatar"
      v-if="donate_info.avatar_url.startsWith('http')"
      :src="donate_info.avatar_url"
      alt="avatar"
    />
    <span
      v-else-if="donate_info.user_id"
      :style="`background-color:${donate_info.avatar_url}`"
      class="avatar"
    >{{donate_info.full_name.substring(0,1).toUpperCase()}}</span>
    <h4>{{donate_info.full_name}}</h4>
    <ul class="amount-select-list" ref="list">
      <li
        v-for="(item,index) in donate_info.amount_info"
        :key="index"
        :class="active_amount_idx===index && 'active'"
        @click="toggle_amount(index)"
      >
        <p>{{item.amount}}</p>
        <p>{{calculate_amount(index)}}</p>
        <p>{{item.label}}</p>
      </li>
    </ul>
    <button
      @click="$emit('next',active_amount_idx)"
      class="next"
    >{{donate_info.currency.message[0]}}</button>
  </div>
</template>

<script>
let offsetLeft = [0, 50, 162];
export default {
  props: {
    donate_info: {
      type: Object,
      default() {
        return {};
      }
    },
    active_asset_idx: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active_amount_idx: 0,
      btc_price: 9000
    };
  },
  methods: {
    toggle_amount(index) {
      this.active_amount_idx = index;
      if (document.documentElement.clientWidth < 480) {
        this.$refs.list.scrollLeft = offsetLeft[index];
      }
    },
    calculate_amount(index) {
      let { donate_info, active_asset_idx } = this;
      let { amount_info, currency, addresses } = donate_info;
      let { price, symbol } = addresses[active_asset_idx];
      let amount = amount_info[index].amount;
      let { symbol: c_symbol, fiats } = currency;
      if (amount.startsWith(c_symbol))
        amount = Number(amount.substr(c_symbol.length));
      return (amount / fiats / price).toFixed(8) + " " + symbol.toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.step1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border: 3px solid rgba($color: #fff, $alpha: 0.3);

  font-size: 2rem;
}

h4 {
  font-size: 20px;
  margin-top: 8px;
  line-height: 26px;
  padding: 0;
  color: #4c4471;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 360px;
  text-align: center;
}

.amount-select-list {
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 28px;
  padding: 0;
  overflow: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
}

li {
  width: 100px;
  height: 113px;
  padding: 21px 14px;
  margin: 10px 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  list-style: none;
  cursor: pointer;
  position: relative;
  border: 3px solid transparent;

  &:last-child::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 160px;
    height: 1px;
  }

  &.active {
    border: 3px solid #4c4471;
    position: relative;

    p:nth-child(1) {
      color: #4c4471;
    }

    p::before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      width: 31px;
      height: 31px;
      background-image: url("../../assets/img/select.svg");
      background-repeat: no-repeat;
      background-position: center;
      background-color: #4c4471;
      border-radius: 8px 0px 10px;
    }
  }
}

p {
  cursor: pointer;

  &:nth-child(1) {
    font-size: 20px;
    font-weight: 600;
    color: #3a3c3e;
  }

  &:nth-child(2) {
    font-size: 11px;
    line-height: 15px;
    color: rgba(76, 68, 113, 0.5);
    margin: 4px 0 14px 0;
  }

  &:nth-child(3) {
    font-size: 12px;
    line-height: 16px;
    max-height: 60px;
    overflow: hidden;
    color: #4c4471;
    opacity: 0.9;
  }
}

.next {
  margin-top: 40px;
  width: 160px;
  height: 40px;
}

@media screen and (max-width: 480px) {
  .amount-select-list {
    justify-content: flex-start;
    overflow: auto;
  }
  li {
    min-width: 100px;
  }
  h4 {
    box-sizing: border-box;
    width: 100%;
    padding: 0 30px;
  }
}
</style>