export function renderPrice (text) {
  const price = parseFloat(text) || 0
  if (price >= 0) {
    return '￥' + price.toFixed(2)
  } else {
    return '-￥' + Math.abs(price).toFixed(2)
  }
}

export function setColProp (col, key, val) {
  col.map(item => {
    item[key] = val
  })
  return col
}
