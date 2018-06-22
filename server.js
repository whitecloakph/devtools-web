const express = require('express')
const axios = require('axios')

const PORT = 7890

const app = express()

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'X-Api-Key',
  })
  if (req.method.toLowerCase() === 'options') {
    res.send('OK')
    next()
    return
  }

  let url = `https://api.getpostman.com${req.url}`

  console.log(`${req.method} ${url}\n`)
  Object
    .keys(req.headers)
    .forEach((header) => {
      console.log(`${header}: ${req.headers[header]}`)
    })
  console.log('')

  axios({
    method: req.method,
    url,
    headers: {
      'X-Api-Key': req.headers['x-api-key'],
    },
  })
    .then(
      (axiosRes) => {
        res.json(axiosRes.data)
      },
      (e) => {
        console.log(e)
        next()
      }
    )
})

app
  .listen(
    PORT,
    () => {
      console.log(`Listening to port ${PORT}`)
    },
  )

