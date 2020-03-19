const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const app = express()
const port = process.env.EA_PORT || 3000
let myResult = 17995000001

const sleep = (ms) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  console.log('/', myResult)
  res.status(200).json({
    result: myResult
  })
})

app.post('/update', async (req, res) => {
  console.log('/update', req.body.result)
  myResult = req.body.result
  res.status(200).send()
})

app.post('/', async (req, res) => {
  console.log('Request Headers: ', req.headers)
  console.log('POST Data: ', JSON.stringify(req.body, null, 1))
  const result = {
    jobRunID: req.body.id,
    data: {
      result: myResult
    }
  }
  console.log('Result: ', result)
  res.status(200).json(result)
})

app.get('/timeout', async (req, res) => {
  const time = req.query.time || 1000
  console.log('/timeout called:', time)
  sleep(time).then(() => {
    res.status(200).json({
      data: `Slept for ${time}`
    })
    console.log('/timeout finished:', time)
  })
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
