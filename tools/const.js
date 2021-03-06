
const { KEY_WORD } = require('../config')

exports.ASSETS = [
  'c6d0c728-2624-429b-8e0d-d9d19b6592fa', // BTC

  'c94ac88f-4671-3976-b60a-09064f1811e8', // XIN
  'f5ef6b5d-cc5a-3d90-b2c0-a2fd386e7a3c', // BOX

  '43d61dcd-e413-450d-80b8-101d5e903357', // ETH
  'eea900a8-b327-488c-8d8d-1428702fe240', // MOB
  '05c5ac01-31f9-4a69-aa8a-ab796de1d041', // XMR
  'fd11b6e3-0b87-41f1-a41f-f0e9b49e5bf0', // BCH
  '574388fd-b93f-4034-a682-01c2bc095d17', // BSV
  '76c802a2-7c88-447f-a93e-c29c9e5dd9c8', // LTC
  '6472e7e3-75fd-48b6-b1dc-28d294ee1476', // DASH
  '23dfb5a5-5d7b-48b6-905f-3970e3176e27', // XRP
  'c996abc9-d94e-4494-b1cf-2a3fd3ac5714', // ZEC
  'a2c5d22b-62a2-4c13-b3f0-013290dbac60', // ZEN
  '17f78d7c-ed96-40ff-980c-5dc62fecbc85', // BNB
  '56e63c06-b506-4ec5-885a-4a5ac17b83c1', // XLM
  '6770a1e5-6086-44d5-b60f-545f9d9e8ffd', // DOGE
]

exports.ASSET_EXTRA_DATA = [
  { symbol: 'BTC', prefix: 'bitcoin', icon_url: 'https://mixin-images.zeromesh.net/HvYGJsV5TGeZ-X9Ek3FEQohQZ3fE9LBEBGcOcn4c4BNHovP4fW4YB97Dg5LcXoQ1hUjMEgjbl1DPlKg1TW7kK6XP=s128' },

  { symbol: 'XIN', prefix: 'ethereum', icon_url: 'https://mixin-images.zeromesh.net/UasWtBZO0TZyLTLCFQjvE_UYekjC7eHCuT_9_52ZpzmCC-X-NPioVegng7Hfx0XmIUavZgz5UL-HIgPCBECc-Ws=s128' },
  { symbol: 'BOX', prefix: 'ethereum', icon_url: 'https://mixin-images.zeromesh.net/ml7tg1ZGrQt6IJSvEusWFfthosOB98GWN7r4EkmgSP8tbJHxK7OWki9zfZFFDCDOJE0nlLBR6dc4nbUguXE3Bg4=s128' },

  { symbol: 'ETH', prefix: 'ethereum', icon_url: 'https://mixin-images.zeromesh.net/zVDjOxNTQvVsA8h2B4ZVxuHoCF3DJszufYKWpd9duXUSbSapoZadC7_13cnWBqg0EmwmRcKGbJaUpA8wFfpgZA=s128' },
  { symbol: 'MOB', prefix: 'mobilecoin', icon_url: 'https://mixin-images.zeromesh.net/JtSsCbZUzBpdDEI6JbLZ1-ZdAWUakaLBSpAp25gu0uHKoHC3kAeDTXZhsgMEOk_i3nFSAKI4QqFTEEPqv31QFD-hDQHpGA2zoG_A=s128' },
  { symbol: 'XMR', prefix: 'monero', icon_url: 'https://mixin-images.zeromesh.net/vffCzX0PPO1f1D0sRFCkpJuSRYbxEM5u-hl4FMoUeWk8g899U5eyVKnFENiEJ4AXU0s-62mx1nBR3c_pHFROuw=s128' },
  { symbol: 'BCH', prefix: 'bitcoincash', icon_url: 'https://mixin-images.zeromesh.net/tqt14x8iwkiCR_vIKIw6gAAVO8XpZH7ku7ZJYB5ArMRA6grN9M1oCI7kKt2QqBODJwr17sZxDCDTjXHOgIixzv6X=s128' },
  { symbol: 'BSV', prefix: 'bitcoinsv', icon_url: 'https://mixin-images.zeromesh.net/1iUl5doLjMSv-ElcVCI4YgD1uIayDbZcQP0WjFEajoY1-qQZmVEl5GgUCtsp8CP0aj96a5Rwi-weQ5YA64lyQzU=s128' },
  { symbol: 'LTC', prefix: 'litecoin', icon_url: 'https://mixin-images.zeromesh.net/dLK5T9I4YFA094o6nn-qZ_TWLUtIrL0xtjxOyURaLoPcl94m0JKQhXQiOrC775LS9d8apDfLXVfbpDzGmWDf0CWJ=s128' },
  { symbol: 'DASH', prefix: 'dash', icon_url: 'https://mixin-images.zeromesh.net/ReOP8DBeVc4VO5myA0zuURtNBJJGJCL4KB3Gj5bvBOeP4LW_ZZrwl7CesWhE3aSTm931sOGz69DcGIUmdb6RkF4=s128' },
  { symbol: 'XRP', prefix: 'ripple', icon_url: 'https://mixin-images.zeromesh.net/SyX2tH2mBbSc45IfkOysbbd8WtPEjla5R3xT9ym0tbKv_vAyzl_Jd5qEYsOhKyuFRv09w3uB4Vzs2XJuJzZeO7e_=s128' },
  { symbol: 'ZEC', prefix: 'zcash', icon_url: 'https://mixin-images.zeromesh.net/9QWOYgcD0H7q1cH6PaSM08FQ549epnEzqIQ2EgEfK2s82jhsIu1wDKmsR7rkPFwjIYKOILteq7mW1hIaXcy4DhI=s128' },
  { symbol: 'ZEN', prefix: 'horizen', icon_url: 'https://mixin-images.zeromesh.net/CFQzgS3lZztswzt8mKVWAOWAJDhlQQw2gQZN4_-2bRAzRivObDq-KOdjGIv_vcY6FGJLFlFxN4vSrFb7t0uxsQ=s128' },
  { symbol: 'BNB', prefix: 'binancecoin', icon_url: 'https://mixin-images.zeromesh.net/HCjLu6VM0XA7ouRcZJGDTOzE7zoXaA8LgESw075VW5teZ27AGUgyGrc4jnzuK5LtgT5HJQDSNSOImnU3IcUsBLoF=s128' },
  { symbol: 'XLM', prefix: 'stellar', icon_url: 'https://mixin-images.zeromesh.net/PYek3gX0bUJyYhdewmrhh0IUAlbDf-gXpVEZrkW74v0Bsk24FO0jvP71IcjTOeDOlqUdjUVK-S0jdJ4BOkXi2XY=s128' },
  { symbol: 'DOGE', prefix: 'dogecoin', icon_url: 'https://mixin-images.zeromesh.net/D1quwKOIaKBNIx6EL1znNS09vRnh00FP7BWwOJUtI_9CFlohJLuyG6CjcU9x4YXu9LSzGs0QqRSG54wcfsOtTMU=s128' },
]


exports.CURRENCY = {
  USD: { symbol: '$', message: ['Donate', 'Thank you for donating', 'Pay in Mixin Messenger'] },
  CNY: { symbol: '¥', message: ['打赏', '谢谢你的打赏', '在 Mixin Messenger 中付款'] },
  JPY: { symbol: '¥', message: ['寄付', '寄付してくれてありがとう', 'Mixin Messengerで支払う'] },
  HKD: { symbol: 'HK$', message: ['打賞', '謝謝你的打賞', '在 Mixin Messenger 中付款'] },
  KRW: { symbol: '₩', message: ['기부', '기부 해 주셔서 감사합니다'] },
  AUD: { symbol: 'A$', message: ['Donate', 'Thank you for donating', 'Pay in Mixin Messenger'] },
  EUR: { symbol: '€', message: ['Donate', 'Thank you for donating', 'Pay in Mixin Messenger'] },
  GBP: { symbol: '£', message: ['Donate', 'Thank you for donating', 'Pay in Mixin Messenger'] },
  SGD: { symbol: 'S$', message: ['Donate', 'Thank you for donating', 'Pay in Mixin Messenger'] },
  MYR: { symbol: 'RM', message: ['Donate', 'Thank you for donating', 'Pay in Mixin Messenger'] },
}

exports.DEFAULT_VIEW_URL = 'https://newbie.zeromesh.net/donate.7.6.svg'

exports.RESERVED_WORD = KEY_WORD

exports.CACHE_TIME = {
  donate_info: 1000 * 60 * 10,
  currency: 1000 * 60 * 5,
  asset: 1000 * 60 * 5,
  fiats: 1000 * 60 * 5,
  update_uv_and_click: 1000 * 60 * 15
}

exports.AvatarColors = ['#FFD659', '#FFC168', '#F58268', '#F4979C', '#EC7F87', '#FF78CB', '#C377E0', '#8BAAFF', '#78DCFA', '#88E5B9', '#BFF199', '#C5E1A5', '#CD907D', '#BE938E', '#B68F91', '#BC987B', '#A69E8E', '#D4C99E', '#93C2E6', '#92C3D9', '#8FBFC5', '#80CBC4', '#A4DBDB', '#B2C8BD', '#F7C8C9', '#DCC6E4', '#BABAE8', '#BABCD5', '#AD98DA', '#C097D9']
