<template>
  <div id="donate-button">
    <div class="--donate-button-plug">
      <div class="donate-container">
        <i class="donate-close-btn"></i>
        <template v-if="show_state==1">
          <img
            class="donate-avatar-img"
            src="https://tva1.sinaimg.cn/large/9bd9b167ly1fzjxz375iwj20b40b4t9c.jpg"
            alt="avatar"
          />
          <h4>Donate to Jerry</h4>
          <ul class="donate-amount-select-list">
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
          <button>Continue</button>
        </template>

        <template v-else-if="show_state==2">
          <div class="donate-select">
            BTC
            <img src="./trangle.svg" />
            <ul class="donate-select-asset-list">
              <li v-for="_ in 13" :key="_">
                <img
                  src="https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128"
                  alt
                />BTC
              </li>
            </ul>
          </div>
          <img
            src="https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128"
            class="donate-asset-icon"
            alt="icon"
          />
          <p>Think you donating:</p>
          <p>$5.00 (0.00065152 BTC)</p>
          <canvas ref="qrcode"></canvas>
          <a class="donate-powered">
            Powered by
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJsSURBVHgB1VQxaFRBEJ3Z3dwZUPBMc4QTlCjYGBsLr4uVWgbUaCFoYaVJIyoYUFMEBTkURDshlYZrgpWFoIJoNBaS2BoIJgFBYiKSy93/f2eye/f/7f93lyuONHmwt3935t7M25ldgB2P7Cf9IvueB2CbkZ32B3o/6lfY+85nAARE/AGaJkCq4vJJXIIOcOA77/X+0wgGdIYRTwAzKBFYE9tx1PwUmINzZs5DB9Cr+q0I+HhtxSZtAIUBJ5wEQgY6BHq8G6jGh+GeEj6FS2NgdJYGHHxd6SfgJwjS06SvLQ7umm8RALAagOshlPCijZqsxgC5YvlQGvkWeXRFGH+AwMjGn31T3oQGPbYw2L0Q+QpbTiLHZfdsgORw5IcnyzfTAc2Bx1eNTdV9KoakFFyWJZ7ve7kxGvnLJi5bZI+SMkG4hcdDQlM3bA1hum/IzOPVhSFkowDBnYmSFY6YwzK4gFWbTtqbQ8Q+rT9xPNuoyHEJ7h/V+hBBO3DM35TftH7SX4kKN/BzQgETQzvE+GNdFAsgvUYF7lP6/Je1s3Ozi5GpSomEQgWRT62LfDcwFjC19u+i0DgiffhlbbZLpB92SACroOVdLPun67G80CfRRW1qMPMgt2Kmp/33lqZStOc2sX8eGdIkxfOuVKYwcwdXEmICStTMKlboN9SgRavMjeXs4zd8bHTxYaYrt/7hPq5BC9ga2AcuYrKpKuHHb6/ZlOIbbIHZ8f3L0AYygFnTFEdc/vai6Op5gjnrN4pTp7482ncJOsTXQs8Fc43OosZJwweWG/PDf4pI4vHnZz3TsI3IX/9tnn9xA3Y8NgF9RjiKSGtofAAAAABJRU5ErkJggg=="
            /> Mixin
          </a>
        </template>

        <template v-else-if="show_state==3">
          <div class="donate-select">Bitcoin</div>
          <img
            src="https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128"
            class="donate-asset-icon"
            alt="icon"
          />
          <p>Think you donating:</p>
          <p>$5.00 (0.00065152 BTC)</p>
          <i class="donate-success"></i>
          <span>Done</span>

          <a class="donate-powered">
            Powered by
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAWCAYAAADafVyIAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJsSURBVHgB1VQxaFRBEJ3Z3dwZUPBMc4QTlCjYGBsLr4uVWgbUaCFoYaVJIyoYUFMEBTkURDshlYZrgpWFoIJoNBaS2BoIJgFBYiKSy93/f2eye/f/7f93lyuONHmwt3935t7M25ldgB2P7Cf9IvueB2CbkZ32B3o/6lfY+85nAARE/AGaJkCq4vJJXIIOcOA77/X+0wgGdIYRTwAzKBFYE9tx1PwUmINzZs5DB9Cr+q0I+HhtxSZtAIUBJ5wEQgY6BHq8G6jGh+GeEj6FS2NgdJYGHHxd6SfgJwjS06SvLQ7umm8RALAagOshlPCijZqsxgC5YvlQGvkWeXRFGH+AwMjGn31T3oQGPbYw2L0Q+QpbTiLHZfdsgORw5IcnyzfTAc2Bx1eNTdV9KoakFFyWJZ7ve7kxGvnLJi5bZI+SMkG4hcdDQlM3bA1hum/IzOPVhSFkowDBnYmSFY6YwzK4gFWbTtqbQ8Q+rT9xPNuoyHEJ7h/V+hBBO3DM35TftH7SX4kKN/BzQgETQzvE+GNdFAsgvUYF7lP6/Je1s3Ozi5GpSomEQgWRT62LfDcwFjC19u+i0DgiffhlbbZLpB92SACroOVdLPun67G80CfRRW1qMPMgt2Kmp/33lqZStOc2sX8eGdIkxfOuVKYwcwdXEmICStTMKlboN9SgRavMjeXs4zd8bHTxYaYrt/7hPq5BC9ga2AcuYrKpKuHHb6/ZlOIbbIHZ8f3L0AYygFnTFEdc/vai6Op5gjnrN4pTp7482ncJOsTXQs8Fc43OosZJwweWG/PDf4pI4vHnZz3TsI3IX/9tnn9xA3Y8NgF9RjiKSGtofAAAAABJRU5ErkJggg=="
            /> Mixin
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show_state: 3,
      amount_conf: [
        { amount: "$5.00", label: "Donate by buying me a coffee" },
        { amount: "$25.00", label: "Donate by buying me a cake" },
        { amount: "$50.00", label: "Donate by buying me a pizza" }
      ],
      active_amount_idx: 0,
      btc_price: 9000
    };
  },
  methods: {
    toggle_amount(amount, index) {
      this.tmp_amount = amount;
      this.active_amount_idx = index;
    },
    calculate_amount(amount) {
      if (amount.startsWith("$")) amount = amount.substr(1);
      return (Number(amount) / this.btc_price).toFixed(8) + " BTC";
    }
  }
};
</script>

<style>
@font-face {
  font-family: "Nunito";
  src: url("https://taskwall.zeromesh.net/font/Nunito-Regular.ttf")
      format("truetype"),
    url("https://taskwall.zeromesh.net/font/Nunito-Regular.woff") format("woff"),
    url("https://taskwall.zeromesh.net/font/Nunito-Regular.woff2")
      format("woff2");
  font-weight: 400;
}

@font-face {
  font-family: "Nunito";
  src: url("https://taskwall.zeromesh.net/font/Nunito-SemiBold.ttf")
      format("truetype"),
    url("https://taskwall.zeromesh.net/font/Nunito-SemiBold.woff")
      format("woff"),
    url("https://taskwall.zeromesh.net/font/Nunito-SemiBold.woff2")
      format("woff2");
  font-weight: 600;
}

.--donate-button-plug {
  position: relative;
  font-family: Nunito;
}

.--donate-button-plug .donate-btn {
  border-radius: 40px;
  width: 150px;
  cursor: pointer;
}

.--donate-button-plug .donate-container {
  position: absolute;
  top: 50px;
  left: 0;
  width: 346px;
  height: 496px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.12);
  margin: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

.--donate-button-plug .donate-container::before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  top: -20px;
  left: 50px;
  border-width: 10px;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}

.donate-container .donate-select {
  display: flex;
  align-items: center;
  font-weight: bold;
  line-height: 24px;
  font-size: 18px;
  color: #4c4471;
  position: relative;
  cursor: pointer;

  margin-top: 20px;
}

.donate-container .donate-select-asset-list {
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
}

.--donate-button-plug .donate-amount-select-list::-webkit-scrollbar {
  display: none;
}

.donate-container .donate-select-triangle {
  width: 0;
  height: 0;
  position: absolute;
  top: 20px;
  left: 10px;
  border-width: 10px;
  z-index: 9999;
  border-style: solid;
  border-color: transparent transparent #fff transparent;
}

.donate-select-asset-list::-webkit-scrollbar {
  width: 10px;
}

.donate-select-asset-list::-webkit-scrollbar-thumb {
  border: 2px solid rgba(126, 111, 111, 0);
  box-shadow: 6px 0 0 #e0e0e0 inset;
  border-radius: 50px;
}

.donate-select-asset-list::-webkit-scrollbar-track {
  background: transparent;
}

.donate-select-asset-list li {
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 12px 0 12px 25px;
}

.donate-select-asset-list li img {
  width: 28px;
  height: 28px;
  margin-right: 16px;
}

.donate-container .donate-select img {
  margin-left: 8px;
}

.--donate-button-plug .donate-close-btn {
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: #eaeaea;
  cursor: pointer;
}

.--donate-button-plug .donate-close-btn::after,
.--donate-button-plug .donate-close-btn::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  height: 2px;
  width: 0.75rem;
  background-color: #fff;
  border-radius: 20px;
}

.--donate-button-plug .donate-close-btn::after {
  transform: translate(-50%, -50%) rotate(45deg);
}

.--donate-button-plug .donate-close-btn::before {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.--donate-button-plug .donate-avatar-img {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 40px;
}

.--donate-button-plug h4 {
  font-size: 20px;
  margin: 12px 0 0 0;
  line-height: 27px;
  padding: 0;
  color: #4c4471;
}

.--donate-button-plug .donate-amount-select-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 22px 0 0 0;
  padding: 0;
  overflow: auto;
}

.--donate-button-plug .donate-amount-select-list li {
  min-width: 135px;
  height: 158px;
  padding: 21px 14px;
  margin: 10px;
  box-sizing: border-box;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.06);
  border-radius: 16px;
  list-style: none;
  cursor: pointer;
  position: relative;
}

.--donate-button-plug .donate-amount-select-list li p {
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.--donate-button-plug .donate-amount-select-list li p:nth-child(1) {
  font-size: 20px;
  font-weight: 600;
  color: #3a3c3e;
}

.--donate-button-plug .donate-amount-select-list li p:nth-child(2) {
  font-size: 11px;
  line-height: 15px;
  color: rgba(76, 68, 113, 0.5);
  word-break: break-all;
  margin: 4px 0 14px 0;
}

.--donate-button-plug .donate-amount-select-list li p:nth-child(3) {
  font-size: 12px;
  line-height: 16px;
  max-height: 60px;
  overflow: hidden;
  color: #4c4471;
  word-break: break-all;
  opacity: 0.9;
}

.--donate-button-plug .donate-amount-select-list li:last-child::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 160px;
  height: 1px;
}

.--donate-button-plug .donate-amount-select-list li.active {
  border: 3px solid #4c4471;
  position: relative;
}

.--donate-button-plug .donate-amount-select-list li.active p:nth-child(1) {
  color: #4c4471;
}

.--donate-button-plug .donate-amount-select-list li.active p::before {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 31px;
  height: 31px;
  background-image: url("https://taskwall.zeromesh.net/donate-select.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-color: #4c4471;
  border-radius: 8px 0px 10px;
}

.--donate-button-plug button {
  margin-top: 36px;
  width: 160px;
  height: 40px;
  outline: none;
  border: 0;
  background: #4c4471;
  box-shadow: 0px 6px 10px rgba(75, 124, 221, 0.15);
  border-radius: 40px;
  font-family: Nunito;
  font-weight: 600;
  font-size: 1rem;
  line-height: 22px;
  color: #fff;
  cursor: pointer;
}

.--donate-button-plug .donate-asset-icon {
  width: 80px;
  height: 80px;
  margin-top: 30px;
}

.--donate-button-plug .donate-container > p {
  color: #4c4471;
  font-weight: 700;
  line-height: 26px;
}

.--donate-button-plug .donate-container > p:nth-child(4) {
  font-size: 18px;
  margin: 12px 0 0 0;
}

.--donate-button-plug .donate-container > p:nth-child(5) {
  font-size: 18px;
  margin: 0;
  text-align: center;
}

.--donate-button-plug .donate-container > a {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #4c4471;
  text-decoration: none;
}

.--donate-button-plug .donate-container > a img {
  margin: 0 4px;
  width: 12px;
  height: 11px;
}

.--donate-button-plug .donate-container canvas {
  margin: 25px 0;
  width: 160px;
  height: 160px;
}
.--donate-button-plug .donate-container .donate-success {
  width: 40px;
  height: 40px;
  margin-top: 76px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTM4LjUgMjBDMzguNSAzMC4yMTczIDMwLjIxNzMgMzguNSAyMCAzOC41QzkuNzgyNzMgMzguNSAxLjUgMzAuMjE3MyAxLjUgMjBDMS41IDkuNzgyNzMgOS43ODI3MyAxLjUgMjAgMS41QzMwLjIxNzMgMS41IDM4LjUgOS43ODI3MyAzOC41IDIwWiIgc3Ryb2tlPSIjNEM0NDcxIiBzdHJva2Utd2lkdGg9IjMiLz4KPHBhdGggZD0iTTI4LjUgMTUuNUwxOC43MDcxIDI1LjI5MjlDMTguMzE2NiAyNS42ODM0IDE3LjY4MzQgMjUuNjgzNCAxNy4yOTI5IDI1LjI5MjlMMTIuNSAyMC41IiBzdHJva2U9IiM0QzQ0NzEiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo=");
}

.--donate-button-plug .donate-container span {
  font-size: 14px;
  line-height: 32px;
  margin-bottom: 60px;

  color: #bcbec3;
}
</style>