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
            <li v-for="(item, index) in countrys" :key="index" @click="active_currency_idx=index">
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
      <div class="label">
        <label>{{$t('home.step.2label')}}</label>
        <input v-model="amount_conf[active_amount_idx].label" maxlength="60" type="text" />
      </div>
    </div>
    <button @click="click_next()">{{$t('home.step.next')}}</button>
  </div>
</template>

<script>
import countrys from "@/assets/js/country.js";

export default {
  name: "Step2",
  data() {
    return {
      btc_price: "9000",
      amount_conf: [
        { amount: "$5.00", label: this.$t("home.step.2info")[0] },
        { amount: "$25.00", label: this.$t("home.step.2info")[1] },
        { amount: "$50.00", label: this.$t("home.step.2info")[2] }
      ],
      active_amount_idx: 0,
      active_currency_idx: -1,
      active_currency_item: { currency: "USD", symbol: "$", rate: 1 },

      select_currency_mode: false,

      tmp_amount: "",

      countrys: countrys.country_list,
      country_info: countrys.countries
    };
  },
  watch: {
    active_currency_idx(val, oldVal) {
      let { countrys, country_info } = this;
      let currency = countrys[val];
      this.active_currency_item = { currency, ...country_info[currency] };
      if (oldVal === -1) return;
      let { symbol, rate } = country_info[currency];
      let { amount_conf, tmp_amount } = this;
      let oldCurrency = countrys[oldVal];
      let { symbol: oldSymbol, rate: oldRate } = country_info[oldCurrency];
      let oldSymbolLength = oldSymbol.length;
      let params = { oldSymbolLength, oldRate, rate, symbol };
      for (let i = 0; i < amount_conf.length; i++) {
        if (amount_conf[i].amount.startsWith(oldSymbol)) {
          amount_conf[i].amount = toggle_currency(
            amount_conf[i].amount,
            params
          );
        }
      }
      if (tmp_amount.startsWith(oldSymbol)) {
        this.tmp_amount = toggle_currency(tmp_amount, params);
      }
    }
  },
  methods: {
    toggle_amount(amount, index) {
      this.tmp_amount = amount;
      this.active_amount_idx = index;
    },
    calculate_amount(amount) {
      let {
        active_currency_item: { symbol = "$", rate = 1 }
      } = this;
      if (amount.startsWith(symbol)) amount = amount.substr(symbol.length);
      return (Number(amount) / rate / this.btc_price).toFixed(8) + " BTC";
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
      setSessionStorage("amount", JSON.stringify(this.amount_conf));
      setSessionStorage("currency", this.active_currency_item.currency);
      this.$emit("nextStep");
    }
  },
  async mounted() {
    initFiats.call(this);
    await initBtcPrice.call(this);
    this.active_currency_idx = 0;
    let { amount_conf, active_amount_idx } = this;
    this.toggle_amount(amount_conf[0].amount, 0);
  }
};

async function initBtcPrice() {
  let btc_price = window.localStorage.getItem("btc_price");
  if (btc_price) this.btc_price = btc_price;
  this.btc_price = await this.APIS.getBtcPrice();
  window.localStorage.setItem("btc_price", this.btc_price);
}

async function initFiats() {
  let fiats = await this.APIS.getFiats();
  for (let key in this.country_info) {
    this.$set(this.country_info[key], "rate", fiats[key]);
  }
}

function toggle_currency(
  tmp_amount,
  { oldSymbolLength, oldRate, rate, symbol }
) {
  let amount = tmp_amount.substr(oldSymbolLength);
  amount = (Number(amount) / oldRate) * rate;
  let fix_amount = (symbol + amount.toFixed(2)).substr(0, 9);
  let fix_list = fix_amount.split(".");
  if (fix_list.length === 2 && fix_list[1].length < 2) {
    return fix_list[0];
  }
  if (fix_amount[fix_amount.length - 1] === ".")
    fix_amount = fix_amount.slice(0, -1);
  return fix_amount;
}

function setSessionStorage(key, value) {
  window.sessionStorage.setItem(key, value);
}
</script>

<style>
</style>