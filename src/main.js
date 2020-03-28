// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios } from './utils/request'
import * as filters from '@/common/filters'
import {get, post} from '@/utils/request'
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter
Vue.config.productionTip = false
Object.keys(filters).map(key => {
  Vue.filter(key, filters[key])
})
// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

Vue.prototype.$post = post
Vue.prototype.$get = get

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
