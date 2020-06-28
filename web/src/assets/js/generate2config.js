
const default_amount = ['$5.00', '$25.00', '$50.00']
const default_label = ["Buy me a coffee", "Buy me a beef salad", "Buy me an afternoon tea"]

let _countries = {
  USD: {
    symbol: "$",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591149005-c7fe71c93aa6f542ca05f7773ea73978091e13d8bca59fa27ab21b37887f04d9",
    amount: default_amount,
    label: default_label
  },
  CNY: {
    symbol: "¥",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591149000-119aa2a73eaa85dd04f59807c7a0a4e0b12daf66632dfab244ebb7d976ad7710",
    amount: ['¥6.66', '¥26.66', '¥66.66'],
    label: ["给我来个蛋筒 🍦", "给我来杯咖啡 ☕️", "给我来份披萨 🍕"]
  },
  JPY: {
    symbol: "¥",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591149003-260db7418d518bd3c245e7f31d2cdbd534cb4dd17e24e97797fffbfb5d9d5c74",
    amount: ['¥500.00', '¥3000.00', '¥10000.00'],
    label: ["コーヒーを買って", "ビーフサラダを買って", "アフタヌーンティーを買って"]
  },
  EUR: {
    symbol: "€",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591149000-0d7a63295c1cb356cc85a95316f20a27a2c3e6dfa519d6d33e42b746add6cc34",
    amount: ['€5.00', '€25.00', '€50.00'],
  },
  KRW: {
    symbol: "₩",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591149004-cae6b03138cdd3a1524a37c455b5a1ea07ed806338399d392a6d65c44a671c1f",
    amount: ['₩6000.00', '₩30000.00', '₩100000'],
    label: ["나에게 커피를 사", "쇠고기 샐러드 사줘", "오후에 차 한잔 사줘"]
  },
  HKD: {
    symbol: "HK$",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591149002-fa6704459cdb0bc1ce77c0736835b1bcf00f04bac0fa8c19a90bdbf22586f70d",
    amount: ['HK$20.00', 'HK$100.00', 'HK$500.00']
  },
  GBP: {
    symbol: "£",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591149002-5e9c67680ec4e737fc6819d919bb24d37c01752c8e10cfaf1b21c9b8ba05d776",
    amount: ['£5.00', '£25.00', '£50.00'],
  },
  AUD: {
    symbol: "A$",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591148999-df6598f1f59d95f8c21bd65486c1f52b16d2eb67455ffc7e25fea339bc67eb19",
    amount: ['A$5.00', 'A$25.00', 'A$50.00'],
  },
  SGD: {
    symbol: "S$",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591149005-dd4fac0864b0ff00bca902df15a4e67737d1aab751220f5007d1ccd7c473eca0",
    amount: ['S$5.00', 'S$25.00', 'S$50.00'],
  },
  MYR: {
    symbol: "RM",
    view_url:
      "https://mixin-assets-cn.zeromesh.net/mixin/attachments/1591150494-93a2d313eb50c3e66735b4a52d954337faa6ad3409a341cfc4262aee6d411202",
    amount: ['RM20.00', 'RM100.00', 'RM500.00'],
    label: ["Beli saya kopi", "Belikan saya salad daging lembu", "Beli saya minum petang"]
  },
}
let _obj = {}
Object.keys(_countries).forEach(item => {
  let { amount, label, ...obj } = _countries[item]
  if (!label) label = default_label
  let _amount_conf = []
  for (let i = 0; i < 3; i++) {
    _amount_conf.push({
      amount: amount[i],
      label: label[i]
    })
  }
  obj.amount_conf = _amount_conf
  _obj[item] = obj
})
export const countries = _obj


export const country_list = [
  'USD', 'CNY', 'JPY', 'EUR', 'KRW', 'HKD', 'GBP', 'AUD', 'SGD', 'MYR'
]


let language_currency = {
  CNY: [
    "zh",
    "zh-CN",
    'bo',
    'bo-CN',
    'mn-Mong-CN',
    'ug',
    'ug-CN',
    'ii',
    'ii-CN',
  ],
  JPY: [
    "ja",
    "ja-JP"
  ],
  EUR: [
    // 德国、奥地利、卢森堡、比利时、芬兰、法国、希腊、爱尔兰、意大利、荷兰、葡萄牙、斯洛文尼亚、西班牙、马耳他、斯洛伐克、爱沙尼亚、拉脱维亚、立陶宛
    'de-DE', // 德国
    'de', // 德语
    'hsb-DE', // 上索布语-德国
    'dsb-DE', // 下索布语-德国
    'de-AT', // 奥地利

    'lb-LU', // 卢森堡语
    'lb', // 卢森堡
    'de-LU', // 德语-卢森堡
    'fr-LU', // 法语-卢森堡


    'fi-FI', // 芬兰
    'fi', // 芬兰语
    'se-FI', // 北萨米语
    'sv-FI', // 瑞典
    'sms-FI', // 斯科特萨米语
    'smn-FI', // 伊纳里萨米语

    'fr-FR', // 法国
    'fr', // 法语
    'gsw-FR', // 阿尔萨斯语
    'oc-FR',
    'fr-BE', // 比利时 法语
    'br-FR',// 布里多尼语
    'co-FR', // 科西嘉语

    'el-GR', // 希腊
    'el',

    'ga-IE', // 爱尔兰
    'ga', // 爱尔兰语
    'en-IE', // 英语

    'it-IT', // 意大利
    'it', // 意大利语

    'nl-NL', // 荷兰
    'nl', // 荷兰语
    'fy-NL', // 弗里西亚语
    'nl-BE', // 比利时 荷兰语

    'pt-PT', // 葡萄牙
    'pt', // 葡萄牙语

    'sl', // 斯洛文尼亚
    'sl-SI',

    'es-ES', // 西班牙
    'es',

    'mt-MT', // 马耳他
    'mt',

    'sk-SK', // 斯洛伐克
    'sk',

    'et-EE', // 爱沙尼亚
    'et',

    'lv-LV', // 拉脱维亚
    'lv',

    'lt-LT', // 立陶宛
    'lt',
    // 摩纳哥、黑山

    'fr-MC',
    'sr-Latn-ME',
    'sr-Cyrl-ME'
  ],
  KRW: [
    "ko",
    "ko-KR"
  ],
  HKD: [
    "zh-HK"
  ],
  GBP: [
    'en-GB',
    'gd',
    'gd-GB',
    'cy',
    'cy-GB',
  ],
  AUD: [
    'en-AU',
  ],
  SGD: [
    "zh-SG",
    "en-SG",
  ],
  MYR: [
    'en-MY',
    'ms-MY',
    'ms'
  ]
}

let language_amount = {}
Object.keys(language_currency).forEach(currency => [
  language_currency[currency].forEach(language => {
    let { symbol, amount, label } = _countries[currency]
    if (!label) label = _countries.USD.label
    language_amount[language] = {
      amount_conf: amount.map((item, index) => ({
        amount: item,
        label: label[index]
      })),
      symbol,
      currency
    }
  })
])
export const language_amount_config = language_amount

export const default_config = {
  amount_conf: [
    { amount: default_amount[0], label: default_label[0] },
    { amount: default_amount[1], label: default_label[1] },
    { amount: default_amount[2], label: default_label[2] }
  ],
  symbol: '$',
  currency: 'USD'
}

export const rate = {
  "XAG": 0.056503,
  "CNY": 7.08,
  "SEK": 9.19,
  "PHP": 49.93,
  "SAR": 3.75,
  "BHD": 0.377734,
  "MYR": 4.27,
  "XAU": 0.0005829,
  "HUF": 303.57,
  "TWD": 29.67,
  "MXN": 21.79,
  "BDT": 85.01,
  "ZAR": 16.61,
  "VND": 23093,
  "CAD": 1.34,
  "AUD": 1.44,
  "JPY": 107.6,
  "RUB": 68.61,
  "NZD": 1.53,
  "AED": 3.67,
  "HKD": 7.75,
  "DKK": 6.57,
  "THB": 31.19,
  "NOK": 9.25,
  "ARS": 69.13,
  "CZK": 23.41,
  "BMD": 1,
  "XDR": 0.724864,
  "BRL": 4.9,
  "USD": 1,
  "MMK": 1400.57,
  "SGD": 1.39,
  "CHF": 0.950804,
  "GBP": 0.785139,
  "VEF": 248576,
  "EUR": 0.881947,
  "IDR": 14130.61,
  "LKR": 185.19,
  "PKR": 164.06,
  "UAH": 26.51,
  "CLP": 769.97,
  "ILS": 3.45,
  "INR": 75.51,
  "KWD": 0.307559,
  "KRW": 1193.25,
  "PLN": 3.92,
  "TRY": 6.79
}

export default {
  countries, country_list, language_amount
}