const fs = require('fs')
const forge = require('node-forge');
const jwt = require('jsonwebtoken');
const { CLIENT_CONFIG: { client_id: uid, session_id: sid, private_key: privateKey } } = require('../config')
const { ASSETS } = require('./const')
let APIS;
class Tools {
  constructor() {
    this.btc_price = 9000
  }

  getCurrentGitHEAD() {
    const data = fs.readFileSync(path.join(__dirname, '..', '.git', 'logs', 'HEAD'), 'utf8')
    let tmp = data.substr(0, data.lastIndexOf('Neo') - 1)
    let build = tmp.substring(tmp.lastIndexOf(' ') + 1)
    return build + '-node-' + process.version
  }

  _getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  getJwtToken(method, uri, body) {
    uri = uri.replace('https://api.mixin.one', '')
    method = method.toLocaleUpperCase();
    if (typeof (body) === "object") {
      body = JSON.stringify(body);
    }
    let issuedAt = Math.floor(Date.now() / 1000)
    let md = forge.md.sha256.create();
    md.update(method + uri + body);
    let payload = {
      uid: uid,
      sid: sid,
      iat: issuedAt,
      exp: issuedAt + 3600,
      jti: this._getUUID(),
      sig: md.digest().toHex(),
      scp: 'FULL'
    };
    return jwt.sign(payload, privateKey, { algorithm: 'RS512' });
  }

  dataURLtoFile(dataurl) {
    return Buffer.from(dataurl.split(',')[1], 'base64');
  }

  async getAddress(token) {
    if (!APIS || JSON.stringify(APIS) === '{}') APIS = require('../api')
    let addressListOrigin = await APIS.getAddress(token)
    if (!Array.isArray(addressListOrigin)) return false
    let addressListTarget = []
    for (let i = 0; i < ASSETS.length; i++) {
      let asset_id = ASSETS[i]
      let asset_item = addressListOrigin.find(asset_item => asset_item.asset_id === asset_id)
      if (!asset_item) asset_item = await this.getAddressUtilExist(token, asset_id)
      if (!asset_item.destination) asset_item = await this.getAddressUtilExist(token, asset_id)
      let { destination } = asset_item
      addressListTarget.push(destination)
    }
    return addressListTarget
  }

  async getAddressUtilExist(token, asset_id) {
    let data = await APIS.getAddress(token, asset_id)
    if (data.destination) return data
    await this.waitTwoSecond()
    await this.getAddressUtilExist(token, asset_id)
  }

  waitTwoSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 2000);
    })
  }

}


module.exports = new Tools()