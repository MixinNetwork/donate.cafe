<template>
  <div class="step2">
    <ul>
      <li
        v-for="(item,index) in amount_conf"
        :key="index"
        :class="active_amount_idx===index && 'active'"
        @click="toggle_amount(item.amount,index)"
      >
        <p>{{item.amount}}</p>
        <p>({{calculate_amount(item.amount)}})</p>
        <p>{{item.label}}</p>
      </li>
    </ul>
    <div class="form">
      <div class="currency">
        <label>{{$t('home.step.2currency')}}</label>
        <div @click="select_currency_mode=!select_currency_mode" class="select-container">
          {{active_currency_item.currency}} ({{active_currency_item.symbol}})
          <ul v-if="select_currency_mode">
            <li v-for="(item, index) in countrys" :key="index" @click="toggle_currency(item,index)">
              <img :src="country_info[item]&& country_info[item].view_url" alt />
              {{item}} ({{country_info[item] && country_info[item].symbol}})
            </li>
          </ul>
        </div>
      </div>
      <div class="amount">
        <label>{{$t('home.step.2amount')}}</label>
        <input @input="input_amount" @blur="fix_amount" v-model="tmp_amount" type="text" />
        <span>{{calculate_amount(tmp_amount)}}</span>
      </div>
      <div v-if="amount_conf[active_amount_idx]" class="label">
        <label>{{$t('home.step.2label')}}</label>
        <input v-model="amount_conf[active_amount_idx].label" maxlength="60" type="text" />
      </div>
    </div>
    <button @click="click_next()">{{$t('home.step.next')}}</button>
  </div>
</template>

<script>
import {
  default_config,
  countries,
  country_list,
  language_amount_config,
  rate
} from "@/assets/js/generate2config.js";

export default {
  name: "Step2",
  data() {
    return {
      btc_price: "9000",
      amount_conf: [],
      amount_conf_list: {},
      active_amount_idx: 0,
      active_currency_item: {},
      select_currency_mode: false,
      tmp_amount: "",
      countrys: country_list,
      country_info: countries,
      rate
    };
  },
  methods: {
    toggle_amount(amount, index) {
      this.tmp_amount = amount;
      this.active_amount_idx = index;
    },
    toggle_currency(item, index) {
      this.active_currency_item = {
        currency: item,
        symbol: countries[item].symbol
      };
      initCurrency.call(this, item);
      initAmountConfig.call(this, countries[item].amount_conf);
    },
    calculate_amount(amount) {
      if (!amount) return;
      let { active_currency_item, rate, btc_price } = this;
      let { symbol, currency } = active_currency_item;
      rate = rate[currency];
      if (amount.startsWith(symbol)) amount = amount.substr(symbol.length);
      return (Number(amount) / rate / btc_price).toFixed(8) + " BTC";
    },
    input_amount(e) {
      let { value } = e.target;
      let { symbol } = this.active_currency_item;
      this.tmp_amount = value.startsWith(symbol) ? value : symbol + value;
    },
    fix_amount() {
      let amount = this.tmp_amount;
      let { symbol } = this.active_currency_item;
      let tmp_amount = amount.substr(symbol.length);
      let number = Number(tmp_amount);
      let defaultNumber = [symbol + "5.00", symbol + "25.00", symbol + "50.00"];
      let { amount_conf, active_amount_idx } = this;
      if (isNaN(number)) {
        this.tmp_amount = defaultNumber[active_amount_idx];
        amount_conf[active_amount_idx].amount =
          defaultNumber[active_amount_idx];
      } else {
        let fix_amount = (symbol + number.toFixed(2)).substr(0, 9);
        let fix_list = fix_amount.split(".");
        if (fix_list.length === 2 && fix_list[1].length < 2)
          fix_amount = fix_list[0];
        this.tmp_amount = fix_amount;
        amount_conf[active_amount_idx].amount = fix_amount;
      }
    },
    click_next() {
      this.$ls.set("amount", this.amount_conf);
      this.$ls.set("currency", this.active_currency_item.currency);
      this.$emit("nextStep");
    }
  },
  mounted() {
    initPageFromLocalStore.call(this);
    initPageFromNetwork.call(this);
  }
};

function initPageFromLocalStore() {
  let fiats = this.$ls.get("fiats");
  initFiats.call(this, fiats);

  let btc_price = this.$ls.get("btc_price");
  initBtcPrice.call(this, btc_price || 9000);

  let currency = this.$ls.get("currency");
  initCurrency.call(this, currency);

  let config_amount = this.$ls.get("amount");
  initAmountConfig.call(this, config_amount);
}

async function initPageFromNetwork() {
  let fiats = await this.APIS.getFiats();
  initFiats.call(this, fiats);
  this.$ls.set("fiats", fiats);
  let btc_price = await this.APIS.getBtcPrice();
  initBtcPrice.call(this, btc_price);
  this.$ls.set("btc_price", btc_price);
}

async function initFiats(fiats) {
  this.rate = fiats || rate;
}

async function initBtcPrice(btc_price) {
  this.btc_price = btc_price;
}

async function initCurrency(currency) {
  currency =
    currency ||
    this.$ls.get("currency") ||
    (language_amount_config[navigator.language] &&
      language_amount_config[navigator.language].currency) ||
    "USD";
  this.active_currency_item = {
    currency,
    symbol: countries[currency].symbol,
    rate: this.country_info[currency].rate || rate[currency]
  };
}

async function initAmountConfig(amount_config) {
  this.amount_conf =
    amount_config ||
    (this.$ls.get("currency") &&
      countries[this.$ls.get("currency")].amount_conf) ||
    (language_amount_config[navigator.language] &&
      language_amount_config[navigator.language].amount_conf) ||
    default_config.amount_conf;
  this.tmp_amount = this.amount_conf[0].amount;
}
</script>

<style lang="scss" scoped>
.step2 {
  width: 100%;
  padding: 0 130px;
  box-sizing: border-box;

  & > ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 60px;

    &::-webkit-scrollbar {
      display: none;
    }

    li {
      width: 132px;
      height: 127px;
      padding: 28px 34px;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.06);
      border-radius: 16px;
      cursor: pointer;
      border: 3px solid transparent;

      p {
        cursor: pointer;
      }

      p:nth-child(1) {
        font-size: 28px;
        font-weight: 600;

        color: #3a3c3e;
      }

      p:nth-child(2) {
        font-size: 12px;

        color: rgba(76, 68, 113, 0.72);
      }

      p:nth-child(3) {
        font-size: 14px;
        line-height: 19px;
        max-height: 60px;
        overflow: hidden;

        color: #4c4471;

        opacity: 0.9;
      }

      &.active {
        border: 3px solid #4c4471;
        position: relative;

        p:nth-child(1) {
          color: #4c4471;
        }

        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 34px;
          height: 34px;

          background-image: url("../../assets/img/select.svg");
          background-repeat: no-repeat;
          background-position: center;
          background-color: #4c4471;
          border-radius: 8px 0px 10px;
        }
      }
    }
  }
}

.form {
  display: flex;
  margin-top: 32px;

  .amount,
  .label,
  .currency {
    display: flex;
    flex: 1;
    flex-direction: column;

    label {
      padding-left: 0.2rem;
      margin-bottom: 13px;

      color: #4c4471;
    }
  }

  .currency {
    max-width: 150px;
    margin-right: 32px;

    .select-container {
      line-height: 56px;
      background: #f5f7fa;
      border-radius: 8px;
      padding-left: 20px;
      cursor: pointer;
      position: relative;

      &::before {
        content: "";
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOCA2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMS4wMjIgMEw2Ljk3OCAwQzcuODMzMzUgMCA4LjMwODg4IDEuMDMwMTYgNy43NzQ1NSAxLjcyNTU4TDQuNzk2NTUgNS42MDEzOUM0LjM4ODE5IDYuMTMyODcgMy42MTE4MSA2LjEzMjg3IDMuMjAzNDUgNS42MDEzOUwwLjIyNTQ0NyAxLjcyNTU4Qy0wLjMwODg4MyAxLjAzMDE2IDAuMTY2NjUzIDAgMS4wMjIgMFoiIGZpbGw9IiM0QzQ0NzEiLz4KPC9zdmc+Cg==");
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
        width: 8px;
        height: 6px;
      }
    }

    ul {
      position: absolute;
      top: 56px;
      width: 170px;
      box-sizing: border-box;
      left: 0;
      background-color: #fff;
      box-shadow: 0px 8px 40px rgba(0, 0, 0, 0.08);
      border-radius: 8px;
      padding-left: 20px;

      height: 200px;
      overflow: auto;
    }

    ul::-webkit-scrollbar {
      width: 3px;
    }

    ul::-webkit-scrollbar-thumb {
      width: 3px;
      border-radius: 10px;
      background: #4c4471;
    }

    ul::-webkit-scrollbar-track {
      background: transparent;
    }

    li {
      display: flex;
      align-items: center;
      cursor: pointer;
      height: 52px;

      img {
        width: 28px;
        height: 28px;
        margin-right: 12px;
      }
    }
  }

  .amount {
    margin-right: 32px;
    max-width: 150px;
    position: relative;

    img {
      position: absolute;
      right: 16px;
      bottom: 1.2rem;
      cursor: pointer;
    }

    input {
      height: 32px;
      border-radius: 8px 8px 0 0;
    }

    span {
      height: 24px;
      font-size: 10px;
      background: #f5f7fa;
      border-radius: 0 0 8px 8px;
      padding-left: 20px;
      color: rgba(76, 68, 113, 0.72);
    }
  }

  .label {
    input {
      color: #4c4471;
      font-size: 16px;
    }
  }

  input {
    background: #f5f7fa;
    border-radius: 8px;
    height: 56px;
    font-size: 16px;
    padding: 0 20px;
    cursor: text;
  }
}

button {
  display: block;
  margin: 57px auto 16px auto;
  width: 180px;
}

@media screen and (max-width: 67.5rem) {
  .step2 {
    width: 100%;
    box-sizing: border-box;
    padding: 0 2rem;

    & > ul {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-top: 30px;
      overflow-x: scroll;

      scrollbar-color: transparent transparent;
      scrollbar-track-color: transparent;
      -ms-scrollbar-track-color: transparent;

      &::-webkit-scrollbar {
        display: none;
      }

      li {
        min-width: 120px;
        height: 117px;
        padding: 20px 18px 10px 18px;
        margin: 1rem 0;
        margin-right: 1.2rem;

        &:last-child {
          margin-right: 2rem;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 160px;
            height: 1px;
          }
        }

        p:nth-child(1) {
          font-size: 1.5rem;
        }

        p:nth-child(2) {
          font-size: 0.625rem;
        }

        p:nth-child(3) {
          font-size: 0.875rem;
        }

        &.active {
          &::before {
            bottom: -1px;
            right: -1px;
            width: 30px;
            height: 30px;
          }
        }
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;

    .currency {
      ul {
        left: initial;
        right: 0;
        z-index: 1;
      }
    }

    .currency,
    .amount {
      margin-right: 0;
      max-width: initial;
    }

    .amount {
      margin-top: 1rem;
    }

    .label {
      margin-top: 1rem;

      input {
        font-size: 0.88rem;
      }
    }

    input {
      margin-top: 4px;
    }
  }

  button {
    display: block;
    margin: 3rem auto 1rem auto;
    transform: translateX(-1rem);
  }
}
</style>