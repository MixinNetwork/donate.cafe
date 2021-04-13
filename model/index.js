// const DB = require('../db')
const APIS = require('../api')
const tools = require('../tools')
const Store = require('../tools/store')
const { ASSET_EXTRA_DATA, ASSETS, CURRENCY, DEFAULT_VIEW_URL, RESERVED_WORD } = require('../tools/const')
const ADD = 0
const EDIT = 1

const fs = require('fs').promises

class Model extends Store {
  constructor() {
    super()
  }

  async login(code) {
    let authenRes = await APIS.mixinClient.authenticate({ code })
    if (!authenRes || [401, 403].includes(authenRes.code)) return { error: 'auth' }
    let { access_token } = authenRes
    let user = await APIS.getMe(access_token)
    if (!user) return { error: 'auth' }
    let addresses = await tools.getAddress(access_token)
    if (!addresses) return { error: 'asset' }
    let { user_id, full_name, avatar_url } = user
    await this.add_user({ user_id, full_name, avatar_url, access_token })
    if (!avatar_url) avatar_url = tools.getAvatarColor(user_id) + ';' + full_name[0].toUpperCase()
    let donate_info = await this.get_donate_info_by_user_id(user_id)
    return { data: { user_id, access_token, avatar_url, addresses, donate_info } }
  }

  async save_donate(access_token, path, amount_info, currency, addresses) {
    if (typeof amount_info === 'string') amount_info = JSON.parse(amount_info)
    let user = await this.get_user_by_token(access_token)
    if (!user) return { error: `auth` }
    if (!addresses) {
      addresses = await tools.getAddress(access_token)
      if (!addresses) return { error: 'asset' }
    }
    let { user_id } = user
    let { donate_id } = await this.get_donate_id_by_user(user_id) || {}
    let action = EDIT
    if (!donate_id) {
      while (true) {
        donate_id = APIS.mixinClient.getUUID()
        if (!(await this.get_donate(donate_id))) break
      }
      action = ADD
    }
    const file = path ? await fs.readFile(path) : 'default'
    let view_url
    if (file === 'default') {
      view_url = DEFAULT_VIEW_URL
    } else {
      fs.unlink(path)
      let t = await APIS.mixinClient.upload_file({ file })
      view_url = t.view_url
    }
    if (!currency || currency.length !== 3) currency = 'USD'
    await this.add_or_update_donate(action, { user_id, donate_id, view_url, currency, amount_info, addresses })
    return { data: { donate_id } }
  }


  async init_user_by_code(code, path, amount_info, currency) {
    let { data: user_data, error: user_error } = await this.login(code)
    if (user_error) return { error: user_error }
    let { access_token, avatar_url, addresses } = user_data
    let { data: donate_data, error: donate_error } = await this.save_donate(access_token, path, amount_info, currency, addresses)
    if (donate_error) return { error: donate_error }
    let { donate_id } = donate_data
    return { data: { access_token, donate_id, avatar_url } }
  }


  async set_user(access_token, donate_id, name, res) {
    name = name.toLowerCase()
    if (RESERVED_WORD[name]) return res.json({ error: 'name_repeat' })
    if (name.length < 5) return res.json({ error: 'name_length' })
    let user = await this.get_user_by_token(access_token)
    if (!user) return res.json({ error: 'auth' })
    let { view_url } = await this.get_donate(donate_id)
    view_url = view_url || DEFAULT_VIEW_URL
    try {
      await this.update_donate_name(donate_id, name)
      return res.json({ data: { view_url } })
    } catch (e) {
      return res.json({ error: e.message.startsWith('duplicate key value violates unique constraint') ? 'name_repeat' : 'server' })
    }
  }

  async reload_donate_address(donate_id, user_id) {
    const { access_token } = await this.get_user_by_id(user_id)
    const addresses = await tools.getAddress(access_token)
    this.update_donate_address_list(donate_id, addresses)
    return addresses
  }

  async get_donate_info({ name, id, url, code, is_mixin }) {
    let donate_info = name ? await this.getDonateByName(name.toLowerCase()) : await this.getDonate(id)
    if (!donate_info) return false
    let tmpObj = {}
    Object.assign(tmpObj, donate_info)
    if (tmpObj.addresses.length !== ASSETS.length) {
      tmpObj.addresses = await this.reload_donate_address(donate_info.donate_id, donate_info.user_id)
    }
    tmpObj.addresses = tmpObj.addresses.map((item, i) => (
      { destination: item, price: this.price_list[i], asset_id: ASSETS[i], ...ASSET_EXTRA_DATA[i] }
    ))
    if (!is_mixin) tmpObj.addresses.splice(1, 2)
    let currency = { fiats: this.fiat_list[tmpObj.currency], ...CURRENCY[tmpObj.currency] }
    let date = new Date().toISOString().slice(0, 10)
    if (code !== date) {
      url.startsWith(tools.getEnv().client_host) ?
        this.updateSiteUV(donate_info.donate_id, date) :
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
        return await this.add_donate({ donate_id, user_id, view_url, currency, amount_info, addresses })
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

