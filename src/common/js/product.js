export function formatHotProduct(hotProduct) {
  return hotProduct.map(item => {
    const name = item.name
    const { id, coverUrl, minPrice, originalCost, tags, vipMinPrice } = item.products
    return {
      name,
      id,
      coverUrl,
      minPrice,
      originalCost,
      tags,
      vipMinPrice
    }
  })
}