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

// 搜索历史
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

// 收获地址
const ADDR_MAX_LENGTH = 10

export function loadAddress() {
  return loadFromLocal('address-list', [])
}

export function addAddress(item) {
  let addressList = loadAddress()
  if (addressList.length < ADDR_MAX_LENGTH) {
    addressList.push(item)
    saveToLocal('address-list', addressList)
  }
}

export function delAddress(item) {
  let addressList = loadAddress()
  const index = addressList.findIndex(addr => {
    return addr.id === item.id
  })
  if (index > -1) {
    addressList.splice(index, 1)
    saveToLocal('address-list', addressList)
  }
}

export function editAddress(newAddress) {
  let addressList = loadAddress()
  const index = addressList.findIndex(addr => {
    return addr.id === newAddress.id
  })
  if (index > -1) {
    if (newAddress.prop) {
      addressList.forEach(item => {
        item.prop = 0
      })
    }
    addressList[index] = newAddress
    saveToLocal('address-list', addressList)
  }
}