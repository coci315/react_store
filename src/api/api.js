import axios from 'axios'
const baseUrl = '/api/'

export function getSearchSuggest() {
  const url = baseUrl + 'searchsuggest/get'

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

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