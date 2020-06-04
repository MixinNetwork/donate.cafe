// const apis = require('./api')
// const fs = require('fs')

// const DB = require('./db')

// let db_client = new DB()



// let token = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI2YjVjNWE4YS0xYzFiLTQ2MjctOGIzNC1hNzJjYzI4OWExYjciLCJleHAiOjE2MjIwMTQ5NzEsImlhdCI6MTU5MDQ3ODk3MSwiaXNzIjoiMTFlZmJiNzUtZTdmZS00NGQ3LWExNGYtNjk4NTM1Mjg5MzEwIn0.DBKW_mKK8Q5bxbbWZptmU06T90rWCX7b79aSu3H7VEo-9hPtO9hYzS4JMX5IYDpCy4UtyL9QIM0PSwHRl_4RSS7HoEhHYweVYYMklGS5viawdQbrCufjCGFaZBuTEyDn_oDExZD24zxWw3Xu0B6QLHmsjLYfYxNMIUmq5BKlQaE';

// (async () => {
//   // let t = await apis.getAddress(token, 'fd11b6e3-0b87-41f1-a41f-f0e9b49e5bf0')
//   // fs.writeFileSync('./assets.json', JSON.stringify(t))
//   // let t = await tools.getAddress(token);
//   // let t = await apis.getAsset()
//   // fs.writeFileSync('./assets1.json', JSON.stringify(t))

//   let t = await db_client.add_donate({
//     donate_id: 'be962c74-4192-45d8-b3a7-431de7e6b0de',
//     user_id: 'e8e8cd79-cd40-4796-8c54-3a13cfe50115',
//     view_url: '',
//     amount_info: [
//       { amount: '$5.00', label: 'Donate by buying me a coffee ☕️' },
//       { amount: '$25.00', label: 'Donate by buying me a cake 🍰' },
//       { amount: '$50.00', label: 'Donate by buying me a pizza 🍕' }
//     ],
//     addresses: [
//       {
//         symbol: 'BTC',
//         destination: '1nzFn2k3wgojmXb3ySzPpeAZ9Ya1iucxN',
//         prefix: 'bitcoin'
//       },
//       {
//         symbol: 'BCH',
//         destination: '1Dwmy2NxQHkSZdAaDMRCrJyEuswvXmDfsA',
//         prefix: 'bitcoincash'
//       },
//       {
//         symbol: 'BSV',
//         destination: '1J18X7TEXSHmDBCXprJDF4JYvzFGX1cqp7',
//         prefix: 'bitcoinsv'
//       },
//       {
//         symbol: 'ETH',
//         destination: '0x68bDcAe4966E3c3372830ac13E562B63e51d87D7',
//         prefix: 'ethereum'
//       },
//       {
//         symbol: 'LTC',
//         destination: 'LZv4ruCW3ybWLdH9bXwd1yAE8apUL1hm5K',
//         prefix: 'litecoin'
//       },
//       {
//         symbol: 'DASH',
//         destination: 'XcZa1u5tv9XwirDADTRQnT3ac3TnTdKf5J',
//         prefix: 'dash'
//       },
//       {
//         symbol: 'XRP',
//         destination: 'r3s8UVvbZNAHKkEPkPrJx6BZ93CVzKfHgj',
//         prefix: 'ripple'
//       },
//       {
//         symbol: 'ZEC',
//         destination: 't1JWfaWm3ypex9EppNbQTb8k5XbvqCnUJVg',
//         prefix: 'zcash'
//       },
//       {
//         symbol: 'ZEN',
//         destination: 'znfgySuUVnFwt3VDWXnLRbRmvq7pMAPhCi4',
//         prefix: 'horizen'
//       },
//       {
//         symbol: 'XMR',
//         destination: '46JpSMkV9VMCWefU5k3NipCuVBkULwRTY8yVeJF5PbFtHTMaNjhUhPi4CS9FT5UspRcewdns7SPMrJ4HrYW1Due9MotKCFw',
//         prefix: 'monero'
//       },
//       {
//         symbol: 'BNB',
//         destination: 'bnb1jldwp7swk3aqgmk738lutecjnlvx98fh0w27qk',
//         prefix: 'binancecoin'
//       },
//       {
//         symbol: 'XLM',
//         destination: 'GD77JOIFC622O5HXU446VIKGR5A5HMSTAUKO2FSN5CIVWPHXDBGIAG7Y',
//         prefix: 'stellar'
//       },
//       {
//         symbol: 'DOGE',
//         destination: 'D8qJB5EVBn3w2cCM7ULgm927s9UKYxSjFF',
//         prefix: 'dogecoin'
//       }
//     ]
//   })

//   console.log(t)
// })()



let t = require('./test.json')

console.log(typeof t)

// t = JSON.parse(t)
let s = 0
for (let key in t) {
  s++
  console.log(key)
  console.log('------------------------')
  console.log(t[key])
}
console.log(s)
