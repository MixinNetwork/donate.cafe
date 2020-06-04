const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const model = require('./model')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true)
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200)
  } else next()
});


app.use(bodyParser.json({
  limit: '10000kb',
}))

app.post('/api/authenticate', async (req, res) => {
  let { code, file, amount, currency } = req.body
  try {
    await model.init_user_by_code(code, file, amount, currency, res)
  } catch (e) {
    console.error('/authenticate', e)
    return res.json({ error: { error_code: 401 } })
  }
})

app.post('/api/clickDonateBtn', async (req, res) => {
  try {
    let { id } = req.body
    let url = req.headers.referer || ''
    let date = new Date().toISOString().slice(0, 10)
    await model.update_click(id, url, date)
    res.json({ data: 'ok' })
  } catch (e) {
    console.error('/clickDonateBtn', e)
    return res.json({ error: { error_code: 401 } })
  }
})

app.post('/api/getDonate', async (req, res) => {
  let { id, code } = req.body
  try {
    let url = req.headers.referer || ''
    let data = await model.get_donate_info(id, url, code)
    return res.json(data ? { data } : { error: { error_code: 401 } })
  } catch (e) {
    console.error('/getDonate', e)
    return res.json({ error: { error_code: 401 } })
  }
})

app.get('/api/getFiats', async (req, res) => {
  try {
    return res.json({ data: model.get_fiats() })
  } catch (e) {
    console.error('/getFiats', e)
    return res.json({ error: { error_code: 401 } })
  }
})

app.get('/api/test', async (req, res) => {
  return res.json({ data: 'ok' })
})

app.post('/api/test', async (req, res) => {
  return res.json({ data: 'ok' })
})

app.listen(9095, () => {
  console.log('Server started on 9095')
})