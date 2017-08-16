export function saveToLocal(key, value) {
  let rstore = window.localStorage.__rstore__
  if (!rstore) {
    rstore = {}
  } else {
    rstore = JSON.parse(rstore)
  }
  rstore[key] = value
  window.localStorage.__rstore__ = JSON.stringify(rstore)
}

export function loadFromLocal(key, def) {
  let rstore = window.localStorage.__rstore__
  if (!rstore) {
    return def
  }
  rstore = JSON.parse(rstore)
  let ret = rstore[key]
  return ret === undefined ? def : ret
}

const SH_MAX_LENGTH = 5
export function loadSearchHistory() {
  return loadFromLocal('search-history', [])
}

export function addSearchHistory(item) {
  let history = loadFromLocal('search-history', [])
  const index = history.findIndex(his => {
    return his === item
  })
  if (index > -1) {
    history.splice(index, 1)
  }
  history.unshift(item)
  if (history.length > SH_MAX_LENGTH) {
    history.pop()
  }
  saveToLocal('search-history', history)
}

export function delSearchHistory(item) {
  let history = loadFromLocal('search-history', [])
  const index = history.findIndex(his => {
    return his === item
  })
  if (index > -1) {
    history.splice(index, 1)
    saveToLocal('search-history', history)
  }
}