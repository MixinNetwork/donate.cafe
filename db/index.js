const { Pool } = require('pg')
const SQL = require('./sql')
const { DATABASE_CONFIG } = require('../config')

const tools = require('../tools')

class DB {
  constructor() {
    this.SQL = SQL
    this.query = null
    const pool = new Pool({ min: 1, ...DATABASE_CONFIG })
    this.query = async (sql, params) => {
      let client = await pool.connect()
      try {
        let { rows } = await client.query(sql, params)
        return rows
      } finally {
        await client.release()
      }
    }
  }

  async _query(sql, params) {
    return await this.query(sql, params)
  }

  // users
  async add_user({ user_id, full_name, avatar_url, access_token }) {
    return await this.query(this.SQL.ADD_OR_UPDATE_USER, [user_id, full_name, avatar_url, access_token])
  }

  async get_user_by_token(access_token) {
    return (await this.query(this.SQL.GET_USER_BY_TOKEN, [access_token]))[0]
  }

  // donate
  async add_donate({ donate_id, user_id, view_url, currency, amount_info, addresses }) {
    return await this.query(this.SQL.ADD_DONATE, [donate_id, user_id, view_url, currency, JSON.stringify(amount_info), JSON.stringify(addresses)])
  }

  async update_donate({ donate_id, view_url, currency, amount_info, addresses }) {
    return view_url ?
      await this.query(this.SQL.UPDATE_DONATE, [donate_id, view_url, currency, JSON.stringify(amount_info), JSON.stringify(addresses)]) :
      await this.query(this.SQL.UPDATE_DONATE_WITHOUT_VIEW_URL, [donate_id, currency, JSON.stringify(amount_info), JSON.stringify(addresses)])
  }

  async update_donate_name(donate_id, name) {
    return await this.query(this.SQL.UPDATE_DONATE_NAME, [donate_id, name])
  }

  async get_donate(donate_id) {
    return (await this.query(this.SQL.GET_DONATE, [donate_id]))[0]
  }

  async get_donate_id_by_name(name) {
    return (await this.query(this.SQL.GET_DONATE_ID_BY_NAME, [name]))[0]
  }

  async get_donate_id_by_user(user_id) {
    return (await this.query(this.SQL.GET_DONATE_ID_BY_USER, [user_id]))[0] || {}
  }

  //  statistics_daily
  async add_statistics_daily(donate_id, date, { uv, click }) {
    let t = await this.query(this.SQL.GET_STATISTICS_DAILY, [donate_id, date])
    if (!t[0]) await this.query(this.SQL.ADD_STATISTICS_DAILY, [donate_id, date, uv, click])
    else {
      let { uv: _uv, click: _click } = t[0]
      uv += _uv
      click += _click
      await this.query(this.SQL.UPDATE_STATISTICS_DAILY_UV, [donate_id, date, uv, click])
    }
  }
}

module.exports = DB
