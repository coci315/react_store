var express = require('express')
var axios = require('axios')

const baseUrl = 'http://music.163.com/store/api/'
const headers = {
  referer: 'http://music.163.com/store/product',
  host: 'music.163.com'
}


function getSearchSuggest() {
  const url = baseUrl + 'searchsuggest/get'

  return axios.get(url, {
    headers
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getSearchWord(key) {
  const url = baseUrl + 'searchsuggest/search'
  const params = {
    key
  }

  return axios.get(url, {
    headers,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

var port = process.env.PORT || 3000

var app = express()
var apiRoutes = express.Router()

apiRoutes.get('/searchsuggest/get', function (req, res) {
  getSearchSuggest().then(data => {
    res.json(data)
  })
})

apiRoutes.get('/searchsuggest/search', function (req, res) {
  const key = req.query.key
  getSearchWord(key).then(data => {
    res.json(data)
  })
})

app.use('/api', apiRoutes)

// app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})