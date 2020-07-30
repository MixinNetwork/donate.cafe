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
      _vm.$message(_vm.$t('error.' + error))
      if (error === 'auth') {
        _vm.$ls.set('token', '')
        _vm.$ls.set('avatar_url', '')
        window.localStorage.clear()
        window.sessionStorage.clear()
        setTimeout(() => {
          window.location.reload()
        }, 200)
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
    }, 500)
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
  async getDonate(name, is_mixin) {
    let { get, set } = _vm.$ls
    name = name.toLowerCase()
    let params = { name, code: get(name), is_mixin }
    let t = await request.post('/getDonate', params)
    if (!t || !t.date) return false
    set(t.name, t.date)
    return t
  },
  async login(code) {
    return await request.get('/login?code=' + code)
  },
  async saveDonate() {
    let { get, set } = _vm.$ls
    isSaved = false
    let file = ''
    if (get('file_change') === 1 && get('button') === 'user')
      file = get('file')
    let amount = get('amount')
    let currency = get('currency')
    let formData = getFormData({ file, amount, currency })
    let res = await request.post('/saveDonate', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    if (res && res.donate_id) {
      set('donate_id', res.donate_id)
      set('file_change', '0')
    }
    isSaved = true
  },
  async authAndUpload(code) {
    let { get } = _vm.$ls
    let file = get('button') === 'user' && get('file')
    let amount = get('amount')
    let currency = get('currency')
    let formData = getFormData({ file, amount, currency, code })
    return await request.post('/authenticate', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  async setUsername(name) {
    while (!isSaved) {
      await backOff()
    }
    isSaved = false
    let donate_id = get('donate_id')
    let params = { name, donate_id }
    let data = await request.post('/setUser', params)
    isSaved = true
    return data
  }
}

function getFormData(obj) {
  let formData = new FormData()
  for (const key in obj) {
    let value = obj[key]
    if (key === 'file') {
      value && formData.append('file', dataURLtoBlob(value))
    } else {
      if (typeof value === 'object') value = JSON.stringify(value)
      formData.append(key, value)
    }
  }
  return formData
}

function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bStr = atob(arr[1]),
    n = bStr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}