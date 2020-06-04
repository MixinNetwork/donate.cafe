const axios = require('axios').default
const mixin = require('../tools')
const { CLIENT_CONFIG } = require('../config')
const _mixinAxios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.mixin.one' : 'https://mixin-api.zeromesh.net',
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  retry: 2
})

const backOff = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}

async function retry(config) {
  await backOff()
  return await _mixinAxios(config)
}

_mixinAxios.interceptors.response.use(res => {
  let { data } = res
  return data.data || data.error
}, async err => {
  return await retry(err.config)
})


const IGNORE_API_LOG = [202, 401, 403]

const ajax = axios.create({
  baseURL: 'https://mixin-api.zeromesh.net',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  retry: 2
})

ajax.interceptors.request.use(config => {
  !config.headers.Authorization && (config.headers = {
    Authorization: 'Bearer ' + mixin.getJwtToken(config.method, config.url, config.data || ''),
  })
  return config
})

ajax.interceptors.response.use(res => {
  let { data } = res
  if (!data.data) {
    if (data.error || IGNORE_API_LOG.includes(Number(data.error.status))) return console.error(res)
  }
  return data.data
}, async e => {
  if (Number(e && e.response && e.response.status) >= 500) {
    await backOff()
    return ajax(e.config)
  }
})
let MixinRequest = function () {
}
MixinRequest.prototype = {
  async request(config) {
    return ajax(config)
  },
  async getMe(token) {
    let { user_id, avatar_url, full_name, identity_number } = await _mixinAxios.get('/me', {
      headers: { Authorization: 'Bearer ' + token }
    })
    return { user_id, avatar_url, full_name, identity_number }
  },
  async authenticate(code) {
    let { client_id, client_secret } = CLIENT_CONFIG
    return await _mixinAxios({
      method: 'post',
      url: '/oauth/token',
      data: { code, client_id, client_secret }
    })
  },
  async requestWithToken(config, token) {
    return await _mixinAxios(config, { headers: { Authorization: 'Bearer ' + token } })
  },
  async uploadFileToUrl(dataurl) {
    const { upload_url, view_url } = await ajax.post('/attachments')
    const instant = axios.create()
    let data = mixin.dataURLtoFile(dataurl)
    await instant({
      url: upload_url,
      method: 'PUT',
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Type': 'application/octet-stream'
      },
      maxContentLength: 2147483648,
      data
    })
    return view_url
  },
  async getAddress(token, id) {
    let url = id ? '/assets/' + id : '/assets'
    return await _mixinAxios.get(url, { headers: { Authorization: 'Bearer ' + token } })
  },
  async getAsset(id) {
    let url = id ? '/assets/' + id : '/assets'
    return await ajax.get(url)
  },
  async getFiats() {
    return ajax.get('/fiats')
  }
}
module.exports = new MixinRequest()