const responseBody = {
  msg: '',
  data: null,
  code: 0
}

export const builder = (data, message, code = 200, headers = {}) => {
  responseBody.data = data
  if (message !== undefined && message !== null) {
    responseBody.msg = message
  }
  if (code !== undefined && code !== 0) {
    responseBody.code = code
  }
  return responseBody
}

export const getQueryParameters = (options) => {
  const url = options.url
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') + '"}')
}

export const getBody = (options) => {
  return options.body && JSON.parse(options.body)
}

export function initXAxis (len, render = val => val) {
  const data = []
  let i = 0
  while (i < len) {
    i += 1
    data.push({ x: render(i), y: 0 })
  }
  return data
}
