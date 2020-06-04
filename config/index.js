
function getENVConfig() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return './config_pro'
    case 'test':
      return './config_test'
    default:
      return './config_dev'
  }
}

const { DATABASE_CONFIG, CLIENT_CONFIG } = require(getENVConfig())

module.exports = { DATABASE_CONFIG, CLIENT_CONFIG }
