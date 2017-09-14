export function getUrlQuery(key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  const result = window.location.search.substr(1).match(reg)
  return result ? decodeURIComponent(result[2]) : null
}

export function getAddressId() {
  return Math.floor(Math.random()*100000000)
}
