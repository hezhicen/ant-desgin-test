export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome() {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader(callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () { }
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return false
  }
  const dom = document.getElementById(id)
  if (dom instanceof HTMLElement) {
    setTimeout(() => {
      document.body.removeChild(document.getElementById(id))
    }, timeout)
  } else {
    return false
  }
}

export function compareKey(key, type = true) {
  return function (obj1, obj2) {
    var val1 = obj1[key]
    var val2 = obj2[key]
    if (val1 < val2) { // 正序
      return type
    } else if (val1 > val2) {
      return !type
    } else {
      return 0
    }
  }
}

export function formatNumber(number) {
  number = parseInt(number) || 0
  if (number >= 0) {
    return number < 10 ? '0' + number : number.toString()
  } else {
    return number > -10 ? '-0' + Math.abs(number) : number.toString()
  }
}

export function formatWeek(day) {
  const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  return week[day] || ''
}

export function copy(array) {
  return JSON.parse(JSON.stringify(array))
}

export function CharMode(iN) {
  if (iN >= 48 && iN <= 57) {
    return 1
  }
  if (iN >= 65 && iN <= 90) {
    return 2
  }
  if (iN >= 97 && iN <= 122) {
    return 4
  } else {
    return 8
  }
}
/*
统计字符类型
*/
function bitTotal(num) {
  let modes = 0
  for (let i = 0; i < 4; i++) {
    if (num & 1) modes++
    num >>>= 1
  }
  return modes
}

export function passwordLevel(password) {
  if (password.length < 6 || password.length > 20) {
    return 0
  }
  let Modes = 0
  for (let i = 0; i < password.length; i++) {
    // 测试每一个字符的类别并统计一共有多少种模式.
    Modes |= CharMode(password.charCodeAt(i))
  }
  return bitTotal(Modes)
}

export function setFileListItem (url, uid = -1) {
  return { uid, url, name: url, status: 'done' }
}
