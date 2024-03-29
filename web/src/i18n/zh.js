export default {
  header: {
    title: "Donate Cafe",
    login: "用 Mixin Messenger 登陆",
    logout: "登出",
    modify: "修改我的打赏按钮",
    make: "制作我的打赏按钮"
  },
  home: {
    desc: "接受 <b>Bitcoin</b> 打赏从这里开始",
    props: [
      "快速 - 几分钟即可上线，而不是几天",
      "免费 - 免费接受加密货币打赏",
      "强大 - 接受多种加密货币",
    ],
    mainBtn: "创建你的打赏按钮",
    modal: {
      faq: {
        title: '常见问题',
        html: '<h3>如何打赏？</h3><p>推荐使用 <a href="https://mixin.one/messenger">Mixin Messenger</a> 来打赏，没有手续费并且实时到账，也可以打开 币印钱包、imToken、Blockchain Wallet、Ownbit、Cobo Wallet、比特派、DropBit、BRD、Pine、Secrypto 等任意钱包扫码转账。</p><h3>为什么使用 Mixin Messenger 接受打赏？</h3><p>Mixin Messenger 是最好的钱包，支持多种加密货币，安全且使用简单方便。所有打赏都直接进入你的个人钱包，并且通过 Mixin Messenger 打赏没有手续费且实时到账。你还可以在 Mixin Messenger 里直接建立你的粉丝群，下载 <a href="https://mixin.one/messenger"> https://mixin.one/messenger </a>。</p><h3>如何将收到的打赏兑换成法币？</h3><p>打开 Mixin Messenger 首页顶部搜索框输入 7000000015 （7 个 0）找到并打开 ExinLocal 机器人，在这里可以安全、隐私的兑换成法币，关于 ExinLocal 更多介绍参考<a href="https://w3c.group/c/1588079774302618"> 这里 </a>；你也可以从钱包直接提现至其他交易所或支付法币的钱包进行兑换。</p><h3>支持哪些加密货币？</h3><p>Bitcoin（BTC）、Ether（ETH）、MobileCoin（MOB）、Monero（XMR）、Horizen（ZEN）、Dogocoin（DOGE）、Litecoin（LTC）、Bitcoin Cash（BCH）、Bitcoin SV（BSV）、Dash（DASH）、Binance Chain（BNB）、Stellar（XLM）、Ripple（XRP）、Zcash（ZEC）</p><h3>需要 KYC 吗？</h3><p>不需要</p><h3>需要帮助？</h3><p>请通过 Mixin Messenger 给 7000103066 DonateCafe 机器人留言</p>'
      },
      about: {
        title: '关于',
        html: "<h3>关于 DonateCafe</h3><p>我们希望以打赏的形式与更多人分享比特币，并让他们能够轻松获得属于自己的比特币。</p><p>DonateCafe 和 PayPal 打赏按钮类似，支持多种加密货币打赏，例如 BTC、ETH、XMR 等。通过简单的几步，你可以很轻松的将打赏按钮集成到个人网站，或将打赏链接添加到 Twitter、Twitch 的简介来接受加密货币打赏，你的读者、粉丝、观众、朋友能够很容易的通过点击和扫码来完成打赏。 </p><h3>DonateCafe 是如何工作的？</h3><p>DonateCafe 通过授权访问 Mixin Messenger 钱包并将用户头像、名称和充值地址显示出来，所有的打赏都直接进入用户的私人钱包，我们不托管用户的资产，用户可以对比钱包充值地址和捐款地址来进行检验。</p>"
      }
    },
    step: {
      title: ["", "选择按钮样式", "设置金额", "绑定收款钱包", "设置用户名", "你的打赏 HTML"],
      number: "第 {number} / 5 步",
      '1default': "默认按钮样式",
      "1notice": "上传图片不得大于 3M",
      "1user": "用户自己的按钮图片",
      "1choose": "点击选择图像文件",
      "2currency": "货币",
      "2amount": "数量",
      "2label": "标签",
      "3info": " 打赏按钮需要绑定您的 Mixin Messenger，以接受打赏并向粉丝显示您的头像和姓名。",
      "3button": "连接到 Mixin Messenger",
      "3noMessenger": "还没有 Mixin Messenger ?",
      '4prefix': '你的打赏链接: ',
      "5copy": "复制代码",
      "5select": ["JS 样式", "图片链接", "文本链接"],
      "5success": "复制成功",
      next: "下一步"
    }
  },
  error: {
    id: "打赏链接失效",
    auth: "认证失败",
    asset: "资产认证失败",
    server: "服务器错误",
    name_repeat: "用户名已存在",
    name_empty: "用户名不能为空",
    name_length: "名称长度至少为 5",
  },
  message: {
    imgloading: '图片上传中...'
  }
}