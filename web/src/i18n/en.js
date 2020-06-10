export default {
  home: {
    title: "Mixin Donate",
    desc: "Accept <b>Bitcoin</b> Donate Now",
    props: [
      "Fast - Go live in minutes, not days",
      "Free - No fees to accept crypto donate",
      "Powerful - Accept multi cryptocurrency",
    ],
    mainBtn: "Make Your Donate Button",
    faq: "FAQ",
    faqDesc: '<h3>How to donate?</h3><p>It is recommended to use<a href="https://mixin.one/messenger"> Mixin Messenger </a> to donate cryptocurrencies. There are no transaction fees and the transfer in real-time. You can also transfer assets from the wallets such as imToken, Blockchain Wallet, Ownbit, Cobo Wallet, bitpie, DropBit, BRD, Secrypto, and so on by scanning the provided QR code.</p><h3>Why use Mixin Messenger to accept donations?</h3><p>Mixin Messenger is the best wallet. It supports a variety of cryptocurrencies that are secure and easy to use. All donations go directly to your personal wallet, and assets through Mixin Messenger have no charges and instantly. You can also build your community directly in Mixin Messenger with one-step, download the app: <a href="https://mixin.one/messenger">https://mixin.one/messenger</a> .</p><h3>How to exchange the received assets into fiat money?</h3><p>You could search ID 7000000015 on the search box at the top of the Mixin Messenger home page to find and open the ExinLocal bot, where you can safely and privately exchange fiat money. For more information about ExinLocal, please check <a href="https://medium.com/@ExinLocal/exinlocal-otc-trading-tutorial-dac08b153589">here</a>; you can also directly withdraw the assets from Mixin to other exchanges or wallets that provide fiat money exchange services.</p><h3>Which cryptocurrencies are supported?</h3><p>Bitcoin（BTC）、Ether（ETH）、Monero（XMR）、Horizen（ZEN）、Dogocoin（DOGE）、Litecoin（LTC）、Bitcoin Cash（BCH）、Bitcoin SV（BSV）、Dash（DASH）、Binance Chain（BNB）、Stellar（XLM）、Ripple（XRP）、Zcash（ZEC）</p><h3>Is KYC required?</h3><p>It is not required.</p><h3>Need help?</h3><p>Please leave a message to Team Mixin (Mixin ID 7000) via Mixin Messenger</p>',
    step: {
      title: ["", "Choose Button Style", "Set Amount", "Bind Receive Wallet", "Set Username", "Your Donate Html"],
      number: "Step {number} of 5",
      '1default': "Default button style",
      "1notice": "The file must not be larger than 3M",
      "1user": "User your own button image",
      "1choose": "Tap to choose image file",
      "2info": ["Donate by buying me a coffee☕️", "Donate by buying me a cake🍪", "Donate by buying me a pizza🍕"],
      "2currency": "Currency",
      "2amount": "Amount",
      "2label": "Label",
      "3info": " Donate Button needs to bind your Mixin Messenger to accept donations and display your avatar and name to your fans. ",
      "3button": "Connect to Mixin Messnger",
      "3noMessenger": "No Mixin Messenger yet?",
      "5copy": "Copy Code",
      "5select": ["JS Style", "Image & Link", "Text & Link"],
      "5success": "Copy Success",
      next: "Next"
    }
  },
  error: {
    id: "Donate_id is Ivalid",
    auth: "Authentication Failed",
    asset: "Asset Authentication Failed",
    server: "Server Error",
    repeat: "Username Already Exists",
    user: "Username Can Not Be Empty",
  },
  message: {
    imgloading: 'Image Uploading...'
  }
}