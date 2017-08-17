export function getUrlQuery(key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
  const result = window.location.search.substr(1).match(reg)
  return result ? decodeURIComponent(result[2]) : null
}
