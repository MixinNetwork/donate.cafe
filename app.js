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

app.get('/api/login', async (req, res) => {
  let { code } = req.query
  try {
    let data = await model.login(code)
    if (data.error) return res.json(data)
    return res.json({ data })
  } catch (e) {
    console.error('/login', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/saveDonate', async (req, res) => {
  let { file, amount, currency } = req.body
  try {
    let access_token = req.headers.authorization.split(' ')[1]
    let data = await model.save_donate(access_token, file, amount, currency)
    if (data.error) return res.json(data)
    return res.json({ data })
  } catch (e) {
    console.error('/authenticate', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/authenticate', async (req, res) => {
  let { code, file, amount, currency } = req.body
  try {
    let data = await model.init_user_by_code(code, file, amount, currency, res)
    if (data.error) return res.json(data)
    return res.json({ data })
  } catch (e) {
    console.error('/authenticate', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/clickDonateBtn', async (req, res) => {
  try {
    let { id } = req.body
    let date = new Date().toISOString().slice(0, 10)
    await model.updateClick(id, date)
    res.json({ data: 'ok' })
  } catch (e) {
    console.error('/clickDonateBtn', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/getDonate', async (req, res) => {
  let { name, code, id } = req.body
  try {
    let url = req.headers.referer || ''
    let data = await model.get_donate_info({ name, id, url, code })
    return res.json(data ? { data } : { error: 'server' })
  } catch (e) {
    console.error('/getDonate', e)
    return res.json({ error: 'server' })
  }
})

app.get('/api/getFiats', async (req, res) => {
  try {
    return res.json({ data: model.get_fiats() })
  } catch (e) {
    console.error('/getFiats', e)
    return res.json({ error: 'server' })
  }
})

app.post('/api/setUser', async (req, res) => {
  try {
    let { name, donate_id } = req.body
    let access_token = req.headers.authorization.split(' ')[1]
    await model.set_user(access_token, donate_id, name, res)
  } catch (e) {
    console.error('/getFiats', e)
    return res.json({ error: 'server' })
  }
})


app.listen(9095, () => {
  console.log('Server started on 9095')
})