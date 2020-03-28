export function orderStatusLabel (orderStatus, payStatus, shippingStatus) {
  if (orderStatus === 0) return '待铺货'
  if (orderStatus === 1) {
    if (shippingStatus === 1) return '待收货'
    if (shippingStatus === 2) return '已铺货'
  }
  if (orderStatus === 2) return '已取消'
  if (orderStatus === 3) {
    switch (shippingStatus) {
      case 0: return '退货中'
      case 1: return '退货中'
      case 2: return '已退货'
      case 3: return '已取消'
    }
  }
}

export function orderStatusColor (orderStatus, payStatus, shippingStatus) {
  if (orderStatus === 0) return 'blue'
  if (orderStatus === 1) {
    if (shippingStatus === 1) return 'blue'
    if (shippingStatus === 2) return 'green'
  }
  if (orderStatus === 2) return ''
  if (orderStatus === 3) {
    switch (shippingStatus) {
      case 0: return 'blue'
      case 1: return 'blue'
      case 2: return 'green'
      case 3: return 'green'
    }
  }
}
