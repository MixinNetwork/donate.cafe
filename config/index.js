
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

module.exports = { ...require(getENVConfig()), ...require('./config_base') }
