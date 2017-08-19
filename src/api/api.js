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