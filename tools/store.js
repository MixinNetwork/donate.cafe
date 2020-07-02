const DB = require('../db')
const APIS = require('../api')
const { ASSETS, DEFAULT_VIEW_URL, CACHE_TIME } = require('../tools/const')
const { getAvatarColor } = require('../tools')

class Store extends DB {
  constructor() {
    super()
    this.price_list = []
    this.cache_donate_list = {}
    this.cache_statistics_daily = {}
    this.fiat_list = {}
    this.nameMap = {}
    this.save_timer = null
    this.updateStatisticsToDatabase()
    this.updateAssetsPrice()
    this.updateFiats()
  }

  async getDonateByName(name) {
    if (!this.nameMap[name] || this.nameMap[name].updated) {
      let donate = await this.get_donate_id_by_name(name)
      if (!donate) return false
      this.nameMap[name] = { data: donate.donate_id, timer: null }
    }
    clearCache(this.nameMap, name)
    return this.getDonate(this.nameMap[name].data)
  }

  async getDonate(donate_id) {
    if (!this.cache_donate_list[donate_id] || this.cache_donate_list[donate_id].updated) {
      let dataInfo = await this.get_donate(donate_id)
      if (!dataInfo) return false
      if (!dataInfo.avatar_url) dataInfo.avatar_url = getAvatarColor(dataInfo.user_id)
      if (!dataInfo.view_url || dataInfo.view_url === 'https://donate.cafe/donate.svg')
        dataInfo.view_url = DEFAULT_VIEW_URL
      this.cache_donate_list[donate_id] = {
        data: dataInfo,
        timer: null
      }
    }
    clearCache(this.cache_donate_list, donate_id)
    return this.cache_donate_list[donate_id].data
  }

  async updateClick(donate_id, date) {
    this.initStatistics(donate_id, date)
    this.cache_statistics_daily[donate_id][date].click++
  }

  async updateUV(donate_id, date) {
    this.initStatistics(donate_id, date)
    this.cache_statistics_daily[donate_id][date].uv++
  }

  initStatistics(donate_id, date) {
    if (!this.cache_statistics_daily[donate_id]) {
      this.cache_statistics_daily[donate_id] = { [date]: { uv: 0, click: 0 } }
    } else if (!this.cache_statistics_daily[donate_id][date]) {
      this.cache_statistics_daily[donate_id][date] = { uv: 0, click: 0 }
    }
  }

  updateStatisticsToDatabase() {
    this.save_timer = setInterval(async () => {
      let _cache_statistics = this.cache_statistics_daily
      this.cache_statistics_daily = {}
      for (let donate_id in _cache_statistics) {
        for (let date in _cache_statistics[donate_id]) {
          await this.add_statistics_daily(donate_id, date, _cache_statistics[donate_id][date])
        }
      }
    }, CACHE_TIME.update_uv_and_click)
  }

  async updateAssetsPrice() {
    this._updateAssetsPrice()
    setInterval(async () => {
      this._updateAssetsPrice()
    }, CACHE_TIME.asset)
  }

  async _updateAssetsPrice() {
    let asset_list = await APIS.getAsset()
    if (!asset_list) return
    for (let i = 0; i < ASSETS.length; i++) {
      let asset_id = ASSETS[i]
      let asset_item = asset_list.find(item => item.asset_id === asset_id)
      if (!asset_item) asset_item = await APIS.getAsset(asset_id)
      let { price_usd } = asset_item
      this.price_list[i] = price_usd
    }
  }

  async updateFiats() {
    this._updateFiats()
    setInterval(() => {
      this._updateFiats()
    }, CACHE_TIME.fiats)
  }

  async _updateFiats() {
    let fiat_list = await APIS.getFiats()
    if (!fiat_list) return
    let tmpObj = {}
    for (let i = 0; i < fiat_list.length; i++) {
      let { code, rate } = fiat_list[i]
      tmpObj[code] = rate
    }
    this.fiat_list = tmpObj
  }
}

function clearCache(list, key) {
  if (list[key].timmer) clearTimeout(list[key].timer)
  list[key].timmer = setTimeout(() => {
    delete list[key]
  }, CACHE_TIME.donate_info);
}

module.exports = Store