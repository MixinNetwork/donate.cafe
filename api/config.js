const { CLIENT_CONFIG } = require('../config')
const { Mixin } = require('mixin-node-sdk')
const axios = require('axios')


let mixinClient = new Mixin(CLIENT_CONFIG, true)

const backOff = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
}
const _mixinAxios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.mixin.one' : 'https://mixin-api.zeromesh.net',
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  retry: 2
})

async function retry(config) {
  await backOff()
  return _mixinAxios(config)
}

_mixinAxios.interceptors.response.use(res => {
  let { data } = res
  return data.data || data.error
}, async err => {
  return retry(err.config)
})

const mixinAjax = {
  async get(token, url) {
    return _mixinAxios.get(url, { headers: { Authorization: 'Bearer ' + token } })
  },
  async post(token, url, data) {
    return _mixinAxios.post(url, data, { headers: { Authorization: 'Bearer ' + token } })
  }
}
module.exports = { mixinClient, mixinAjax }

