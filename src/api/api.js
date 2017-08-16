import axios from 'axios'
const baseUrl = 'api/'

export function getSearchSuggest () {
  const url = baseUrl + 'searchsuggest/get'

  return axios.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}