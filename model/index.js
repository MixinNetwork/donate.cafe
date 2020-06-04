const DB = require('../db')
const APIS = require('../api')
const tools = require('../tools')
const store = require('../tools/store')
const { ASSET_EXTRA_DATE, ASSETS, CURRENCY } = require('../tools/const')

const ADD = 0
const EDIT = 1

class Model extends DB {
  constructor() {
    super()
  }

  async init_user_by_code(code, file, amount_info, currency, res) {
    let authenRes = await APIS.authenticate(code)
    if (authenRes.error && authenRes.error.code === 403) return res.json({ data: false })
    let view_url = (file && file.startsWith('data:image/')) ? await APIS.uploadFileToUrl(file) : ''
    let { access_token } = authenRes
    let user = await APIS.getMe(access_token)
    if (!user) return res.json({ data: false })
    let addresses = await tools.getAddress(access_token)
    if (!addresses) return res.json({ data: false })
    let { user_id, full_name, avatar_url } = user
    let donate_id = await this.get_donate_id_by_user(user_id)
    let action = EDIT
    if (!donate_id) {
      donate_id = tools._getUUID()
      action = ADD
    }
    res.json({ data: donate_id })
    if (!currency || currency.length !== 3) currency = 'USD'
    await this.add_or_update_donate(action, { user_id, full_name, avatar_url, access_token, donate_id, view_url, currency, amount_info, addresses })
  }

  async get_donate_info(id, url, code) {
    let donate_info = await store.getDonate(id)
    if (!donate_info) return false
    let tmpObj = {}
    Object.assign(tmpObj, donate_info)
    tmpObj.addresses = tmpObj.addresses.map((item, i) => (
      { destination: item, price: store.price_list[i], asset_id: ASSETS[i], ...ASSET_EXTRA_DATE[i] }
    ))
    let currency = { fiats: store.fiat_list[tmpObj.currency], ...CURRENCY[tmpObj.currency] }
    delete tmpObj.currency
    let date = new Date().toISOString().slice(0, 10)
    if (code !== date) store.updateUV(id, url, date)
    return { date, currency, ...tmpObj }
  }

  async update_click(donate_id, url, date) {
    store.updateClick(donate_id, url, date)
  }

  get_fiats() {
    return store.fiat_list
  }

  async add_or_update_donate(action, { user_id, full_name, avatar_url, access_token, donate_id, view_url, currency, amount_info, addresses }) {
    await this.add_user({ user_id, full_name, avatar_url, access_token })
    amount_info = amount_info || {}
    switch (action) {
      case ADD:
        await this.add_donate({ donate_id, user_id, view_url, currency, amount_info, addresses });
        break
      case EDIT:
        await this.update_donate({ donate_id, user_id, view_url, currency, amount_info, addresses });
        store.cache_donate_list[donate_id] && (store.cache_donate_list[donate_id].updated = true)
        break
    }
  }

  async test({ user_id, full_name, phone }) {
    return await this.add_user({ user_id, full_name, phone })
  }
}


module.exports = new Model()

