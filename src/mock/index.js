import Mock from 'mockjs2'

if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  Mock.setup({
    timeout: 800
  })
}
