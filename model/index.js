// const DB = require('../db')
const APIS = require('../api')
const tools = require('../tools')
const Store = require('../tools/store')
const { ASSET_EXTRA_DATE, ASSETS, CURRENCY, DEFAULT_VIEW_URL, RESERVED_WORD } = require('../tools/const')
const { uploadQueue } = require('../tools/queue')
const ADD = 0
const EDIT = 1

class Model extends Store {
  constructor() {
    super()
  }

  async login(code) {
    let authenRes = await APIS.authenticate(code)
    if (!authenRes || [401, 403].includes(authenRes.code)) return { error: 'auth' }
    let { access_token } = authenRes
    let user = await APIS.getMe(access_token)
    if (!user) return { error: 'auth' }
    let addresses = await tools.getAddress(access_token)
    if (!addresses) return { error: 'asset' }
    let { user_id, full_name, avatar_url } = user
    await this.add_user({ user_id, full_name, avatar_url, access_token })
    return { user_id, access_token, avatar_url, addresses }
  }

  async save_donate(access_token, file, amount_info, currency, addresses) {
    let user = await this.get_user_by_token(access_token)
    if (!user) return { error: 'auth' }
    if (!addresses) {
      addresses = await tools.getAddress(access_token)
      if (!addresses) return { error: 'asset' }
    }
    let { user_id } = user
    let { donate_id } = await this.get_donate_id_by_user(user_id)
    let action = EDIT
    if (!donate_id) {
      while (true) {
        donate_id = tools._getUUID()
        if (!(await this.get_donate(donate_id))) break
      }
      action = ADD
    }
    const self = this
    uploadQueue.push(donate_id, t)
    async function t() {
      let view_url
      if (file && file.startsWith('data:image/')) {
        view_url = await APIS.uploadFileToUrl(file)
      } else if (file === 'default') {
        view_url = DEFAULT_VIEW_URL
      } else {
        view_url = ''
      }
      if (!currency || currency.length !== 3) currency = 'USD'
      await self.add_or_update_donate(action, { user_id, donate_id, view_url, currency, amount_info, addresses })
    }
    return { donate_id }
  }


  async init_user_by_code(code, file, amount_info, currency) {
    let { access_token, avatar_url, error: user_error, addresses } = await this.login(code)
    if (user_error) return { error: user_error }
    let { donate_id, error: donate_error } = await this.save_donate(access_token, file, amount_info, currency, addresses)
    if (donate_error) return { error: donate_error }
    return { access_token, donate_id, avatar_url }
  }


  async set_user(access_token, donate_id, name, res) {
    if (RESERVED_WORD.includes(name)) return res.json({ error: 'name_repeat' })
    if (name.length <= 5) return res.json({ error: 'name_length' })
    const self = this
    uploadQueue.push(donate_id, t)
    async function t() {
      let user = await self.get_user_by_token(access_token)
      if (!user) return { error: 'auth' }
      let { view_url } = await self.get_donate(donate_id)
      view_url = view_url || DEFAULT_VIEW_URL
      try {
        await self.update_donate_name(donate_id, name)
        return res.json({ data: { view_url } })
      } catch (e) {
        return res.json({ error: e.message.startsWith('duplicate key value violates unique constraint') ? 'name_repeat' : 'server' })
      }
    }
  }

  async get_donate_info({ name, id, url, code }) {
    let donate_info = name ? await this.getDonateByName(name) : await this.getDonate(id)
    if (!donate_info) return false
    let tmpObj = {}
    Object.assign(tmpObj, donate_info)
    tmpObj.addresses = tmpObj.addresses.map((item, i) => (
      { destination: item, price: this.price_list[i], asset_id: ASSETS[i], ...ASSET_EXTRA_DATE[i] }
    ))
    let currency = { fiats: this.fiat_list[tmpObj.currency], ...CURRENCY[tmpObj.currency] }
    let date = new Date().toISOString().slice(0, 10)
    console.log(url, tools.getEnv().client_host)
    console.log(url.startsWith(tools.getEnv().client_host))
    if (code !== date) {
      url.startsWith(tools.getEnv().client_host) ?
        this.updateClick(donate_info.donate_id, date) :
        this.updateUV(donate_info.donate_id, date)
    }
    return { date, ...tmpObj, currency }
  }

  get_fiats() {
    return this.fiat_list
  }

  async add_or_update_donate(action, { user_id, donate_id, view_url, currency, amount_info, addresses }) {
    amount_info = amount_info || {}
    switch (action) {
      case ADD:
        return await this.add_donate({ donate_id, user_id, view_url, currency, amount_info, addresses });
      case EDIT:
        await this.update_donate({ donate_id, view_url, currency, amount_info, addresses })
        this.cache_donate_list[donate_id] && (this.cache_donate_list[donate_id].updated = true)
        break
    }
  }


  async test({ user_id, full_name, phone }) {
    return await this.add_user({ user_id, full_name, phone })
  }
}


module.exports = new Model()

