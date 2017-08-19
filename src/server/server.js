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

function getBanner(type) {
  const url = baseUrl + 'product/ipbanner'
  const params = {
    type
  }

  return axios.get(url, {
    headers,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getHotCommonProduct(limit, offset) {
  const url = baseUrl + 'hotcommonProduct/gets'
  const params = {
    limit,
    offset
  }

  return axios.get(url, {
    headers,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getColumnProduct(limit, offset, specialTopicId, count) {
  const url = baseUrl + 'special/getdetail'
  const params = {
    limit,
    offset,
    specialTopicId,
    count
  }

  return axios.get(url, {
    headers,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

/* ********************************** */
const baseUrl_2 = 'http://music.163.com/api/'
const headers_2 = {
  referer: 'http://music.163.com/store/product/dgalbum',
  host: 'music.163.com'
}

function getNewAlbum(limit, offset) {
  const url = baseUrl_2 + 'vipmall/albumproduct/list'
  const params = {
    limit,
    offset
  }

  return axios.get(url, {
    headers_2,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


function getSaleAlbum(limit, offset) {
  const url = baseUrl_2 + 'vipmall/albumproduct/salelist'
  const params = {
    limit,
    offset
  }

  return axios.get(url, {
    headers_2,
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

apiRoutes.get('/product/ipbanner', function (req, res) {
  const type = req.query.type
  getBanner(type).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/hotcommonProduct/gets', function (req, res) {
  const { limit, offset } = req.query
  getHotCommonProduct(limit, offset).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/special/getdetail', function (req, res) {
  const { limit, offset, specialTopicId, count } = req.query
  getColumnProduct(limit, offset, specialTopicId, count).then(data => {
    res.json(data)
  })
})

/* ********************************** */

apiRoutes.get('/vipmall/albumproduct/list', function (req, res) {
  const { limit, offset } = req.query
  getNewAlbum(limit, offset).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/vipmall/albumproduct/salelist', function (req, res) {
  const { limit, offset } = req.query
  getSaleAlbum(limit, offset).then(data => {
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