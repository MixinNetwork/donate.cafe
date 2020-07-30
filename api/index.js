const { mixinClient, mixinAjax } = require('./config')

class APIS {
  constructor() {
    this.mixinClient = mixinClient
  }

  async getMe(token) {
    let { user_id, avatar_url, full_name, identity_number } = await mixinAjax.get(token, '/me')
    return { user_id, avatar_url, full_name, identity_number }
  }

  getAddress(token, id) {
    let url = id ? '/assets/' + id : '/assets'
    return mixinAjax.get(token, url)
  }

}


module.exports = new APIS()