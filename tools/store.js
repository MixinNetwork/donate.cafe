const DB = require('../db')
const model = new DB()
const APIS = require('../api')
const { ASSETS } = require('../tools/const')

class Store {
  constructor() {
    this.price_list = []
    this.cache_donate_list = {}
    this.cache_statistics_daily = {}
    this.fiat_list = {}
    this.save_timer = null
    this.updateStatisticsToDatabase()
    this.updateAssetsPrice()
    this.updateFiats()
  }

  async getDonate(donate_id) {
    if (this.cache_donate_list[donate_id] && !this.cache_donate_list[donate_id].updated) {
      clearTimeout(this.cache_donate_list[donate_id].timer)
      this.cache_donate_list[donate_id].timer = setTimeout(() => {
        delete this.cache_donate_list[donate_id]
      }, 1000 * 60 * 10)
      return this.cache_donate_list[donate_id].data
    } else {
      let dataInfo = await model.get_donate(donate_id)
      if (!dataInfo) return false
      if (!dataInfo.view_url) dataInfo.view_url = 'https://taskwall.zeromesh.net/donate.svg'
      this.cache_donate_list[donate_id] = {
        data: dataInfo,
        timer: null
      }
      this.cache_donate_list[donate_id].timer = setTimeout(() => {
        delete this.cache_donate_list[donate_id]
      }, 1000 * 60 * 10)
      return dataInfo
    }
  }

  async updateClick(donate_id, url, date) {
    this.initStatistics(donate_id, url, date)
    this.cache_statistics_daily[donate_id][url][date].click++
  }

  async updateUV(donate_id, url, date) {
    this.initStatistics(donate_id, url, date)
    this.cache_statistics_daily[donate_id][url][date].uv++
  }

  initStatistics(donate_id, url, date) {
    if (!this.cache_statistics_daily[donate_id]) {
      this.cache_statistics_daily[donate_id] = { [url]: { [date]: { uv: 0, click: 0 } } }
    } else if (!this.cache_statistics_daily[donate_id][url]) {
      this.cache_statistics_daily[donate_id][url] = { [date]: { uv: 0, click: 0 } }
    } else if (!this.cache_statistics_daily[donate_id][url][date]) {
      this.cache_statistics_daily[donate_id][url][date] = { uv: 0, click: 0 }
    }
  }

  updateStatisticsToDatabase() {
    this.save_timer = setInterval(async () => {
      let _cache_statistics = this.cache_statistics_daily
      this.cache_statistics_daily = {}
      for (let donate_id in _cache_statistics) {
        for (let url in _cache_statistics[donate_id]) {
          for (let date in _cache_statistics[donate_id][url]) {
            await model.add_statistics_daily(donate_id, url, date, _cache_statistics[donate_id][url][date])
          }
        }
      }
    }, 1000 * 60 * 15)
  }

  async updateAssetsPrice() {
    this._updateAssetsPrice()
    setInterval(async () => {
      this._updateAssetsPrice()
    }, 1000 * 60 * 5)
  }

  async _updateAssetsPrice() {
    let asset_list = await APIS.getAsset()
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
    }, 1000 * 60 * 5)
  }

  async _updateFiats() {
    let fiat_list = await APIS.getFiats()
    let tmpObj = {}
    for (let i = 0; i < fiat_list.length; i++) {
      let { code, rate } = fiat_list[i]
      tmpObj[code] = rate
    }
    this.fiat_list = tmpObj
  }
}

module.exports = new Store()