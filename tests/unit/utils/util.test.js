import { welcome, timeFix, compareKey, formatNumber, formatWeek, copy, CharMode, passwordLevel, removeLoadingAnimate } from '../../../src/utils/util.js'
import { advanceTo, clear } from 'jest-date-mock'

describe('welcome', () => {
  test('random welcome', () => {
    expect(['休息一会儿吧', '准备吃什么呢?', '我猜你可能累了']).toContain(welcome())
  })
})

describe('timeFix', () => {
  test('timeFix when 00:00 ~ 08:00', () => {
    const now = new Date()
    for (let i = 0; i <= 8; i++) {
      now.setHours(i, 0, 0, 0)
      advanceTo(now)
      expect(timeFix()).toBe('早上好')
      clear()
    }
  })

  test('timeFix when 09:00 ~ 11:00', () => {
    const now = new Date()
    for (let i = 9; i <= 11; i++) {
      now.setHours(i, 0, 0, 0)
      advanceTo(now)
      expect(timeFix()).toBe('上午好')
      clear()
    }
  })

  test('timeFix when 12:00 ~ 13:00', () => {
    const now = new Date()
    for (let i = 12; i <= 13; i++) {
      now.setHours(i)
      advanceTo(now)
      expect(timeFix()).toBe('中午好')
      clear()
    }
  })

  test('timeFix when 14:00 ~ 19:00', () => {
    const now = new Date()
    for (let i = 14; i <= 19; i++) {
      now.setHours(i)
      advanceTo(now)
      expect(timeFix()).toBe('下午好')
      clear()
    }
  })

  test('timeFix when 20:00 ~ 23:00', () => {
    const now = new Date()
    for (let i = 20; i <= 23; i++) {
      now.setHours(i)
      advanceTo(now)
      expect(timeFix()).toBe('晚上好')
      clear()
    }
  })
})

describe('compareKey', () => {
  const mockData = [
    { name: 'a', total: 3 },
    { name: 'b', total: 6 },
    { name: 'c', total: 2 },
    { name: 'd', total: 1 },
    { name: 'e', total: 9 },
    { name: 'f', total: 8 }
  ]
  const asc = [
    { name: 'd', total: 1 },
    { name: 'c', total: 2 },
    { name: 'a', total: 3 },
    { name: 'b', total: 6 },
    { name: 'f', total: 8 },
    { name: 'e', total: 9 }
  ]
  const desc = [
    { name: 'e', total: 9 },
    { name: 'f', total: 8 },
    { name: 'b', total: 6 },
    { name: 'a', total: 3 },
    { name: 'c', total: 2 },
    { name: 'd', total: 1 }
  ]

  test('compareKey with key = "total"', () => {
    expect([...mockData].sort(compareKey('total'))).toEqual(desc)
  })

  test('compareKey without key', () => {
    expect([...mockData].sort(compareKey())).toEqual(mockData)
  })

  test('compareKey with key = "total" and type = true', () => {
    expect([...mockData].sort(compareKey('total', true))).toEqual(desc)
  })

  test('compareKey with key = "total" and type = false', () => {
    expect([...mockData].sort(compareKey('total', false))).toEqual(asc)
  })

  test('compareKey with key is non-existent', () => {
    expect([...mockData].sort(compareKey('nonexistentprops'))).toEqual(mockData)
  })

  test('compareKey with blank array', () => {
    expect([].sort(compareKey('total'))).toEqual([])
  })
})

describe('formatNumber', () => {
  test('formatNumber with number lt 10', () => {
    expect(formatNumber(0)).toBe('00')
  })

  test('formatNumber with number egt 10', () => {
    expect(formatNumber(10)).toBe('10')
  })

  test('formatNumber with number is negative', () => {
    expect(formatNumber(-2)).toBe('-02')
  })

  test('formatNumber without number', () => {
    expect(formatNumber()).toBe('00')
  })

  test('formatNumber with non-number', () => {
    expect(formatNumber('a')).toBe('00')
  })
})

describe('formatWeek', () => {
  test('formatWeek with value between 0 ~ 6', () => {
    expect(formatWeek(0)).toBe('周一')
    expect(formatWeek(1)).toBe('周二')
    expect(formatWeek(2)).toBe('周三')
    expect(formatWeek(3)).toBe('周四')
    expect(formatWeek(4)).toBe('周五')
    expect(formatWeek(5)).toBe('周六')
    expect(formatWeek(6)).toBe('周日')
  })

  test('formatWeek with value not between 0 ~ 6', () => {
    expect(formatWeek(-1)).toBe('')
  })

  test('formatWeek without value', () => {
    expect(formatWeek()).toBe('')
  })
})

describe('copy', () => {
  test('copy str', () => {
    expect(copy('abc')).toBe('abc')
  })

  test('copy number', () => {
    expect(copy(123)).toBe(123)
  })

  test('copy array', () => {
    expect(copy([1, 2, 3])).toEqual([1, 2, 3])
  })

  test('copy object', () => {
    expect(copy({
      'a': 1,
      'b': 2,
      'c': 3
    })).toEqual({
      'a': 1,
      'b': 2,
      'c': 3
    })
  })
})

describe('CharMode', () => {
  test('CharMode with number', () => {
    for (let i = 0; i <= 9; i++) {
      expect(CharMode(i.toString().charCodeAt())).toBe(1)
    }
  })

  test('CharMode with upper letter', () => {
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    alpha.forEach(item => {
      expect(CharMode(item.charCodeAt())).toBe(2)
    })
  })

  test('CharMode with lower letter', () => {
    const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    alpha.forEach(item => {
      expect(CharMode(item.charCodeAt())).toBe(4)
    })
  })
})

// passwordLevel
describe('passwordLevel', () => {
  test('passwordLevel with password which too short', () => {
    expect(passwordLevel('123')).toBe(0)
  })

  test('passwordLevel with password which too long', () => {
    expect(passwordLevel('012345678901234567890')).toBe(0)
  })

  test('passwordLevel with password with number', () => {
    expect(passwordLevel('123456')).toBe(1)
  })

  test('passwordLevel with password with lower alpha', () => {
    expect(passwordLevel('abcdef')).toBe(1)
  })

  test('passwordLevel with password with upper alpha', () => {
    expect(passwordLevel('ABCDEF')).toBe(1)
  })

  test('passwordLevel with password with 2 modes', () => {
    expect(passwordLevel('Abcdef')).toBe(2)
    expect(passwordLevel('123abc')).toBe(2)
    expect(passwordLevel('123ABC')).toBe(2)
    expect(passwordLevel('123&&&')).toBe(2)
    expect(passwordLevel('abc&&&')).toBe(2)
    expect(passwordLevel('ABC&&&')).toBe(2)
  })

  test('passwordLevel with password with 3 modes', () => {
    expect(passwordLevel('aBcd$dd')).toBe(3)
    expect(passwordLevel('AB11CD$DD')).toBe(3)
    expect(passwordLevel('aBBcd%dads')).toBe(3)
    expect(passwordLevel('123abcDD')).toBe(3)
  })

  test('passwordLevel with password with 4 modes', () => {
    expect(passwordLevel('123Abs^d')).toBe(4)
  })
})

// removeLoadingAnimate
describe('removeLoadingAnimate', () => {
  test('cant find dom', (done) => {
    const dom = '<div id="container"><span id="hello">hello</span></div>'
    const id = 'xxx'
    document.body.innerHTML = dom
    removeLoadingAnimate(id, 100)
    setTimeout(() => {
      expect(document.getElementById('container')).not.toBeNull()
      done()
    }, 500)
  })

  test('find dom', (done) => {
    const dom = '<div id="container"><span id="hello">hello</span></div>'
    const id = 'container'
    document.body.innerHTML = dom
    removeLoadingAnimate(id, 100)
    setTimeout(() => {
      expect(document.getElementById(id)).toBeNull()
      done()
    }, 500)
  })

  test('no param', (done) => {
    const dom = '<div id="container"><span id="hello">hello</span></div>'
    const id = 'container'
    document.body.innerHTML = dom
    removeLoadingAnimate()
    setTimeout(() => {
      expect(document.getElementById(id)).not.toBeNull()
      done()
    }, 100)
  })
})
