export default {
  header: {
    title: "Donate Cafe",
    login: "Log in with Mixin Messenger",
    logout: "Logout",
    modify: "Modify My Donate Button",
    make: "Make My Donate Button"
  },
  home: {
    desc: "Accept <b>Bitcoin</b> Donate Now",
    props: [
      "Fast - Go live in minutes, not days",
      "Free - Free to receive cryptocurrency donations",
      "Powerful - Accept multi-cryptocurrency",
    ],
    mainBtn: " Make Your Donate Button",
    modal: {
      faq: {
        title: 'FAQ',
        html: '<h3>How to donate cryptocurrencies?</h3><p><a href="https://mixin.one/messenger"> Mixin Messenger </a> , making donations received instantly at no transfering fees, is highly recommended as your top priority to donate cryptocurrencies with. For an alternative option of donating methods, you can also scan the QR code with any other wallets (including Blockin Wallet、imToken、Blockchain Wallet、Ownbit、Cobo Wallet、bitpie、DropBit、BRD、Pine、Secrypto,etc.).</p><h3>Why is Mixin messenger prioritized to receive donations?</h3><p>Mixin Messenger, simple and secure to utilize, is in favor of multiple cryptocurrencies, featuring the world\'s superlative digital-assets wallet. Due to Mixin\'s remarkable peer-to-peer transactional technology, all the donations, once sent by givers, are directly delivered to your private Mixin wallet and immediately received without transferring fees. In addition to that, your fans groups can be started up in Mixin Messenger at yout fingertips. </p><h3>How to convert donations to fiat currency?</h3><p>By clicking 7000000015 (7 zeros) in the top searching bar of Mixin Messenger\'s homepage, you can easily get access to the ExinLocal Bot, where your received cryptocurrency donations can be privately and safely cashed out into fiat money. More informations about ExinLocal Bot, click <a href="https://medium.com/@ExinLocal/exinlocal-otc-trading-tutorial-dac08b153589">here</a> . Besides, Your gifted donations in Mixin Messenger can be straightly transferred to other cryptocurrency exchange platforms or to your fiat wallet to be converted. </p><h3>Which cryptocurrencies are supported to accept in DonateCafe?</h3><p>Bitcoin（BTC）、Ether（ETH）、Monero（XMR）、Horizen（ZEN）、Dogocoin（DOGE）、Litecoin（LTC）、Bitcoin Cash（BCH）、Bitcoin SV（BSV）、Dash（DASH）、Binance Chain（BNB）、Stellar（XLM）、Ripple（XRP）、Zcash（ZEC）</p><h3>Need KYC?</h3><p>No.</p><h3>Need help?</h3><p>Please feel free to leave messages to us on Team Mixin Bot(NO.7000)through Mixin Messenger.',
      },
      about: {
        title: 'About',
        html: "<h3>About DonateCafe</h3><p>We hope more people can easily own and share bitcoin in this donating way.</p><p>Just similiar to Paypal's donate button, DonateCafe supports you to gift mutiple cryptocurrencies (like BTC、ETH、XMR and so on). With only few steps, you can create DonateCafe button on your personal website, or add the donate link to the profile of your Twitter and Twitch to accept the donations which are easily to make for your readers, fans, audiences or friends by clicking the button/link and scanning the generated QR code.</p><h3>How does DonateCafe work?</h3><p>Being authorized, DonateCafe gets access to Mixin Messenger wallets and manifests recipients' Mixin portraits, names, and charging addresses. We don't keep the donations, all of which are directly delivered to recipients' personal wallets in a peer-to-peer transaction way. To ensure that, you could compare the charging address with the recipient's donation address.</p>"
      }
    },
    step: {
      title: ["", "Choose Button Style", "Set Amount", "Bind Receive Wallet", "Set Username", "Your Donate Html"],
      number: "Step {number} of 5",
      '1default': "Default button style",
      "1notice": "The file must not be larger than 3M",
      "1user": "User your own button image",
      "1choose": "Tap to choose image file",
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
    id: "Donate Link is Invalid",
    auth: "Authentication Failed",
    asset: "Asset Authentication Failed",
    server: "Server Error",
    name_repeat: "Username Already Exists",
    name_empty: "Username Can Not Be Empty",
    name_length: "Name Length Is At Least 5",

  },
  message: {
    imgloading: 'Image Uploading...'
  }
}