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

const headersWithCookie = {
  host: 'music.163.com',
  origin: 'http://music.163.com',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
  referer: 'http://music.163.com/store/cart',
  cookie: '_ntes_nnid=fa8fd66c9cea037e407c5fb80778fd9c,1504598515827; _ntes_nuid=fa8fd66c9cea037e407c5fb80778fd9c; __s_=1; NTES_SESS=ryQlkBTAd5lqm61_Q_yfWRwmLzvs2UF1bzs.99XbsF8BWh3VWELSHaFNiS37N.MoZlZ1JgsFWa37MqMAIS9SNFIo_76yphxOBOG9Z8CgBDaGcBWu17BP.MefWEqUufZ4J16XDLryDzXDxWaz6PbmfYvOChTxRKzmG2Cefe85Pp9qf5z5kSkGIkOwS; S_INFO=1504849382|0|3&80##|test20161231; P_INFO="test20161231@163.com|1504849382|0|unireg|00&99|null&null&null#zhj&330100#10#0#0|&0||test20161231@163.com"; mail_psc_fingerprint=bc390cf22bcc72a037e1958569850ace; _ngd_tid=4dLXBtzbIXCUKs0B3zFDKbsFvNF1Hr40; jsessionid-cpta=kkU0YHWrUA9v1tVaaC3cGWtfSq50ZFlyLfZ88C35Z0zzaTGvl442uFZxMOSNmktF4zPh7YI5te2jFZ22GZ%2FV5DPnLA427gezUJRtalYl%5Cuc6yD5nxWXmnJY83OQlWfhGaNfaPTa%5C7DIe3VK85DRpJCuSo%2F5S%2B8Q5voIRr0zc1YZ%2Bcvga%3A1504850333729; c98xpt_=30; NETEASE_WDA_UID=586616988#|#1504849468033; MUSIC_U=504718d75a86eadd47fa299cc0c2e3525053be85f4706fa620ea8634448869546bff0ecb7db10068c1c9a1faccecbd5b7de300f4f4f0bc10af9e62a8590fd08a; __remember_me=true; __csrf=3d63a8717523d022e10cc7b1b321659b; __utma=94650624.1841906027.1504598570.1504849196.1505265020.3; __utmc=94650624; __utmz=94650624.1504598570.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); JSESSIONID-WYYY=ktRuzOJw%2FAJ0KCwYHHT2s0QhW9Owej0TEoos%2BjO1uwNlD%2BDZUdU4VljVb9MZBtdz52OhMlvSvSkwZY21zAObwiHsFZ%5C5o3rHW2aUVc026ITqkBewxHaFYzXCRQcNScKTPS5uY3jBOsG8l9RKhY%2B7cj6K7w9wwSHe%5CGQOZCzcg2g3%2FC9E%3A1505281605816; _iuqxldmzr_=31'
}

function getCart() {
  const url = baseUrl + 'cart/product/getall'
  const headers = headersWithCookie

  return axios.get(url, {
    headers
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getTotalMoney(cartIds) {
  const url = baseUrl + 'cart/product/calmoney'
  let data = {
    cartIds
  }
  data = urlencoded(data)
  const headers = headersWithCookie

  return axios.post(url, data, {
    headers
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function updateCart(cartId, num) {
  const url = baseUrl + 'cart/product/update'
  let data = {
    cartId,
    num
  }
  data = urlencoded(data)
  const headers = headersWithCookie

  return axios.post(url, data, {
    headers
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function delSelect(cartIds) {
  const url = baseUrl + 'cart/product/delselect'
  let data = {
    cartIds
  }
  data = urlencoded(data)
  const headers = headersWithCookie

  return axios.post(url, data, {
    headers
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


function getOrderKey(cartIds, snapshotIds, goodMoneys) {
  const url = baseUrl + 'cart/order/create_before'
  let data = {
    cartIds,
    snapshotIds,
    goodMoneys
  }
  data = urlencoded(data)
  const headers = headersWithCookie

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}

function getAddressLevel(level) {
  const url = baseUrl + 'address/getAddressLevel'
  const params = {
    level
  }

  return axios.get(url, {
    headers,
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

function getNextAddress(id) {
  const url = baseUrl + 'address/nextaddress'
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

function saveAddress(name, cellphone, detailAddress, addressId) {
  const url = baseUrl + 'point/saveAddress'
  let data = {
    name,
    cellphone,
    detailAddress,
    addressId
  }

  data = urlencoded(data)
  const headers = headersWithCookie

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}

function cacheAddress(id) {
  const url = baseUrl + 'point/address/cacheaddress'
  let data = {
    id
  }
  data = urlencoded(data)

  const headers = headersWithCookie

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}

function lookupAddress(addressId) {
  const url = baseUrl + 'address/mlookupAddress'
  const params = {
    addressId
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

apiRoutes.post('/cart/product/calmoney', function (req, res) {
  let { cartIds } = req.body
  getTotalMoney(cartIds).then(data => {
    res.json(data)
  })
})

apiRoutes.post('/cart/product/update', function (req, res) {
  let { cartId, num } = req.body
  updateCart(cartId, num).then(data => {
    res.json(data)
  })
})

apiRoutes.post('/cart/product/delselect', function (req, res) {
  let { cartIds } = req.body
  delSelect(cartIds).then(data => {
    res.json(data)
  })
})

apiRoutes.post('/cart/order/create_before', function (req, res) {
  let { cartIds, snapshotIds, goodMoneys } = req.body
  getOrderKey(cartIds, snapshotIds, goodMoneys).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/address/getAddressLevel', function (req, res) {
  const { level } = req.query
  getAddressLevel(level).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/address/nextaddress', function (req, res) {
  const { id } = req.query
  getNextAddress(id).then(data => {
    res.json(data)
  })
})

apiRoutes.post('/point/saveAddress', function (req, res) {
  const { name, cellphone, detailAddress, addressId } = req.body
  saveAddress(name, cellphone, detailAddress, addressId).then(data => {
    res.json(data)
  })
})

apiRoutes.post('/point/address/cacheaddress', function (req, res) {
  const { id } = req.body
  cacheAddress(id).then(data => {
    res.json(data)
  })
})

apiRoutes.get('/address/mlookupAddress', function (req, res) {
  const { addressId } = req.query
  lookupAddress(addressId).then(data => {
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