const pgsql = require('pg')
const SQL = require('./sql')
const { DATABASE_CONFIG } = require('../config')

async function query(sql, params) {
  const client = new pgsql.Client(DATABASE_CONFIG)
  await client.connect()
  const { rows } = await client.query(sql, params)
  await client.end()
  return rows
}


async function queryList(data) {
  const client = new pgsql.Client(DATABASE_CONFIG)
  await client.connect()
  let res = []
  for (let i = 0, len = data.length; i < len; i++) {
    let { sql, params } = data[i]
    const { rows } = await client.query(sql, params)
    res.push(rows)
  }
  await client.end()
  return res
}


class DB {
  constructor() {
    this.SQL = SQL
  }

  async _query(sql, params) {
    return await query(sql, params)
  }

  // users
  async add_user({ user_id, full_name, avatar_url, access_token }) {
    return await query(this.SQL.ADD_OR_UPDATE_USER, [user_id, full_name, avatar_url, access_token])
  }

  async add_donate({ donate_id, user_id, view_url, currency, amount_info, addresses }) {
    return await query(this.SQL.ADD_DONATE, [donate_id, user_id, view_url, currency, JSON.stringify(amount_info), JSON.stringify(addresses)])
  }

  async update_donate({ donate_id, user_id, view_url, currency, amount_info, addresses }) {
    return await query(this.SQL.UPDATE_DONATE, [donate_id, user_id, view_url, currency, JSON.stringify(amount_info), JSON.stringify(addresses)])
  }

  async get_donate(donate_id) {
    let t = await query(this.SQL.GET_DONATE, [donate_id])
    return t[0]
  }

  async get_donate_id_by_user(user_id) {
    let t = await query(this.SQL.GET_DONATE_ID_BY_USER, [user_id])
    return t[0] && t[0].donate_id
  }

  //  statistics_daily
  async add_statistics_daily(donate_id, url, date, { uv, click }) {
    let t = await query(this.SQL.GET_STATISTICS_DAILY, [donate_id, url, date])
    if (!t[0]) await query(this.SQL.ADD_STATISTICS_DAILY, [donate_id, url, date, uv, click])
    else {
      let { uv: _uv, click: _click } = t[0]
      uv += _uv
      click += _click
      await query(this.SQL.UPDATE_STATISTICS_DAILY_UV, [donate_id, url, date, uv, click])
    }
  }
}

module.exports = DB
