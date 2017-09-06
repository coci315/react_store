var express = require('express')
var bodyParser = require('body-parser')
// var multer = require('multer')

function urlencoded(obj) {
  let str = ''
  for (let key in obj) {
    str += ('&' + key + '=' + encodeURIComponent(obj[key]))
  }
  return str.slice(1)
}

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

function getProductDetail(id) {
  const url = baseUrl + 'product/detail'
  const params = {
    id
  }

  return axios.get(url, {
    headers,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getHotProduct() {
  const url = baseUrl + 'hotproduct/gets'

  return axios.get(url, {
    headers
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getPromotion(productId, clientType) {
  const url = baseUrl + 'promotion/product/get'
  const params = {
    productId,
    clientType
  }

  return axios.get(url, {
    headers,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getSearchResult({ key, sort, category_1, category_2, brand, price_from, price_to, limit, offset }) {
  const url = baseUrl + 'product/search'
  let data = {
    limit,
    offset
  }
  if (key) {
    data.key = key
  }
  if (sort) {
    data.sort = sort
  }
  if (category_1) {
    data.category_1 = category_1
  }
  if (category_2) {
    data.category_2 = category_2
  }
  if (brand) {
    data.brand = brand
  }
  if (price_from) {
    data.price_from = price_from
  }
  if (price_to) {
    data.price_to = price_to
  }
  data = urlencoded(data)

  return axios.post(url, data, {
    headers
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getListByCategory1Id(category1Id) {
  const url = baseUrl + 'sortedAndFilter/list'
  const params = {
    category1Id
  }

  return axios.get(url, {
    headers,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getCart() {
  const url = baseUrl + 'cart/product/getall'
  const headers = {
    host: 'music.163.com',
    referer: 'http://music.163.com/store/cart',
    cookie: '_ntes_nnid=fa8fd66c9cea037e407c5fb80778fd9c,1504598515827; _ntes_nuid=fa8fd66c9cea037e407c5fb80778fd9c; JSESSIONID-WYYY=hwQHCcboHjEA72eGanYK%2BdxQ%5CXWPwp40w97M1mZElddcgbZ4nE3bCGApZj0NCozmJnnW1e3r5Dz%2FlwQAnYwVtbuFr3r%5CIz4Hst26JBh6aZ%2B68ss%2BmI3RZlfI%2FO6KMYr7%2F6NlzUpvV5hR0B4QUiwxN7y%2Fvjnvjn70Nxn5bJV9jPryNV%5Co%3A1504600369673; _iuqxldmzr_=32; __utma=94650624.1841906027.1504598570.1504598570.1504598570.1; __utmb=94650624.4.10.1504598570; __utmc=94650624; __utmz=94650624.1504598570.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _ngd_tid=4dLXBtzbIXCUKs0B3zFDKbsFvNF1Hr40; __remember_me=true; MUSIC_U=63eb38220a925f23f9c299b19fac2e29fdf3f64649a9eb7b81983022b2970e6f9fcb428d6c6010d0c01e8f630ea522c3df4fb186d6411817c3061cd18d77b7a0; __csrf=d599b905a34ffb1ac603d35774e104b1'
  }

  return axios.get(url, {
    headers
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

apiRoutes.get('/product/detail', function (req, res) {
  const { id } = req.query
  getProductDetail(id).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/hotproduct/gets', function (req, res) {
  getHotProduct().then(data => {
    res.json(data)
  })
})

apiRoutes.get('/promotion/product/get', function (req, res) {
  const { productId, clientType } = req.query
  getPromotion(productId, clientType).then(data => {
    res.json(data)
  })
})

apiRoutes.post('/product/search', function (req, res) {
  console.log(req.body)
  let { key, sort, category_1, category_2, brand, price_from, price_to, limit, offset } = req.body
  getSearchResult({ key, sort, category_1, category_2, brand, price_from, price_to, limit, offset }).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/sortedAndFilter/list', function (req, res) {
  const { category1Id } = req.query
  getListByCategory1Id(category1Id).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/cart/product/getall', function (req, res) {
  getCart().then(data => {
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

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
// app.use(multer()) // for parsing multipart/form-data
app.use('/api', apiRoutes)

// app.use(express.static('./dist'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})