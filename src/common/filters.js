export function orderStatus (status) {
  switch (parseInt(status)) {
    case 1: return '待付款'
    case 2: return '已付款'
    case 3: return '已放弃'
    case 4: return '退款中'
    case 5: return '已退款'
    case 6: return '已核销'
  }
}

export function payStyle (style) {
  switch (parseInt(style)) {
    case 1: return '微信支付'
    default: return ''
  }
}

export function role (role) {
  switch (parseInt(role)) {
    case 1: return '推广员'
    case 2: return '渠道经理'
    case 3: return '网点老板'
    default: return ''
  }
}

export function fansStatus (status) {
  switch (parseInt(status)) {
    case 0: return '审核中'
    case 1: return '审核通过'
    case 2: return '审核失败'
    case 3: return '冻结'
    default: return ''
  }
}

export function roles (role) {
  switch (role) {
    case 'admin': return '管理员'
    case 'user': return '业务员'
  }
}

export function pwLevelLabel (level) {
  switch (parseInt(level)) {
    case 0: return '密码长度应在6-20位之间'
    case 1: return '密码强度：极低'
    case 2: return '密码强度：简单'
    case 3: return '密码强度：一般'
    case 4: return '密码强度：高'
  }
}

export function pwLevelLabelStatus (level) {
  switch (parseInt(level)) {
    case 0: return null
    case 1: return 'exception'
    case 2: return 'normal'
    case 3: return 'normal'
    case 4: return 'success'
  }
}
