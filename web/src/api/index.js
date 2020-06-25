import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_SERVER
})

request.interceptors.request.use(config => {
  let token = _vm.$ls.get('token')
  token && (config.headers.Authorization = 'Bearer ' + token)
  return config
})

request.interceptors.response.use(res => {
  if (res.data) {
    let { data, error } = res.data
    if (error) {
      _vm.$message(_vm.$t('error.' + error));
      if (error === 'auth') {
        _vm.$ls.set('token', '')
        _vm.$ls.set('avatar_url', '')
        window.localStorage.clear()
        window.sessionStorage.clear()
        setTimeout(() => {
          window.location.reload()
        }, 200);
      }
      return error
    }
    return data
  }
})

const _mixinAxios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.mixin.one' : 'https://mixin-api.zeromesh.net',
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  retry: 2
})

let isSaved = true

function backOff() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 500);
  })
}

export default {
  request,
  async getBtcPrice() {
    let { data } = await _mixinAxios.get('/network/assets/search/btc')
    return data.data[0].price_usd
  },
  async checkPaid(params) {
    let { data } = await _mixinAxios.post('/payments', params)
    return data.data
  },
  async checkExternalPaid(params) {
    let { data } = await _mixinAxios.get('/external/transactions', { params })
    return data.data
  },
  async getFiats() {
    return await request.get('/getFiats')
  },
  async getDonate(name) {
    name = name.toLowerCase()
    let params = { name, code: _vm.$ls.get(name) }
    let t = await request.post('/getDonate', params)
    if (!t || !t.date) return false
    _vm.$ls.set(t.name, t.date)
    return t
  },
  async login(code) {
    return await request.get('/login?code=' + code)
  },
  async saveDonate() {
    isSaved = false
    let file
    if (_vm.$ls.get('file_change') === 1) {
      let button = _vm.$ls.get('button')
      if (button === 'default') {
        file = 'default'
      } else if (button === 'user') {
        file = _vm.$ls.get('file')
      }
    } else {
      file = ''
    }
    let amount = _vm.$ls.get('amount')
    let currency = _vm.$ls.get('currency')
    let params = file ? { file, amount, currency } : { amount, currency }
    let res = await request.post('/saveDonate', params)
    if (res && res.donate_id) {
      _vm.$ls.set('donate_id', res.donate_id)
      _vm.$ls.set('file_change', '0')
    }
    isSaved = true
  },
  async authAndUpload(code) {
    let file = _vm.$ls.get('button') === 'user' && _vm.$ls.get('file')
    let amount = _vm.$ls.get('amount')
    let currency = _vm.$ls.get('currency')
    return await request.post('/authenticate', { code, file, amount, currency })
  },
  async setUsername(name) {
    while (!isSaved) {
      await backOff()
    }
    isSaved = false
    let donate_id = _vm.$ls.get('donate_id')
    let params = { name, donate_id }
    let data = await request.post('/setUser', params)
    isSaved = true
    return data
  }
}
