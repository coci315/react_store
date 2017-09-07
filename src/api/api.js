import axios from 'axios'
const baseUrl = '/api/'

// 获取热门搜索词
export function getSearchSuggest() {
  const url = baseUrl + 'searchsuggest/get'

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取搜索建议
export function getSearchWord(key) {
  const url = baseUrl + 'searchsuggest/search'
  const params = {
    key
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取轮播图
export function getBanner(type = 0) {
  const url = baseUrl + 'product/ipbanner'
  const params = {
    type
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取商品
export function getHotCommonProduct(limit = 60, offset = 0) {
  const url = baseUrl + 'hotcommonProduct/gets'
  const params = {
    limit,
    offset
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取新专辑
export function getNewAlbum(limit = 60, offset = 0) {
  const url = baseUrl + 'vipmall/albumproduct/list'
  const params = {
    limit,
    offset
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取畅销专辑
export function getSaleAlbum(limit = 60, offset = 0) {
  const url = baseUrl + 'vipmall/albumproduct/salelist'
  const params = {
    limit,
    offset
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取专题商品
export function getColumnProduct(specialTopicId, limit = 60, offset = 0, count = true) {
  const url = baseUrl + 'special/getdetail'
  const params = {
    limit,
    offset,
    specialTopicId,
    count
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取商品详情
export function getProductDetail(id) {
  const url = baseUrl + 'product/detail'
  const params = {
    id
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取热门商品
export function getHotProduct() {
  const url = baseUrl + 'hotproduct/gets'

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取推广信息
export function getPromotion(productId, clientType = 1) {
  const url = baseUrl + 'promotion/product/get'
  const params = {
    productId,
    clientType
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取搜索结果
export function getSearchResult({ key, sort, category_1, category_2, brand, price_from, price_to, limit = 60, offset = 0 }) {
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

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}

function urlencoded(obj) {
  let str = ''
  for (let key in obj) {
    str += ('&' + key + '=' + encodeURIComponent(obj[key]))
  }
  return str.slice(1)
}

// 通过category1Id获取分类列表
export function getListByCategory1Id(category1Id) {
  const url = baseUrl + 'sortedAndFilter/list'
  const params = {
    category1Id
  }

  return axios.get(url, {
    params
  }).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取购物车
export function getCart() {
  const url = baseUrl + 'cart/product/getall'

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

// 获取总价
export function getTotalMoney(cartIds) {
  const url = baseUrl + 'cart/product/calmoney'
  let data = {
    cartIds
  }
  data = urlencoded(data)

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}

// 更新购物车
export function updateCart(cartId, num) {
  const url = baseUrl + 'cart/product/update'
  let data = {
    cartId,
    num
  }
  data = urlencoded(data)

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}

// 删除购物车商品
export function delSelect(cartIds) {
  const url = baseUrl + 'cart/product/delselect'
  let data = {
    cartIds
  }
  data = urlencoded(data)

  return axios.post(url, data).then(res => {
    return Promise.resolve(res.data)
  })
}