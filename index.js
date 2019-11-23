const express = require('express')
const bodyParser = require('body-parser')
const url = require('url')
const app = express()
const port = process.env.EA_PORT || 3000

app.use(bodyParser.json())

app.get('/', async (req, res) => {
  console.log('URL: ', url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  }))
  const result = {
    data: url.format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl
    })
  }
  console.log('Result: ', result)
  res.status(200).json(result)
})

app.post('/', async (req, res) => {
  console.log('Request Headers: ', req.headers)
  console.log('POST Data: ', JSON.stringify(req.body, null, 1))
  const result = {
    jobRunID: req.body.id,
    data: {
      'result': 17995000001,
      '_num': 123,
      '_data': 'someData',
      '_valid': true
    },
    result: 17995000001
  }
  console.log('Result: ', result)
  res.status(200).json(result)
})

app.listen(port, () => console.log(`Listening on port ${port}!`))
