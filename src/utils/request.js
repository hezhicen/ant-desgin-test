import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// 创建 axios 实例

axios.defaults.headers.post['Content-Type'] = 'application/json'

const service = axios.create({
    // baseURL: 'https://discount.rongxinh.com',
    // baseURL: 'https://tpyjs.rongxinh.com/',
    // baseURL: 'https://tpyjj.rongxinh.com/',
    // baseURL: 'https://tpyjb.rongxinh.com/',
    // baseURL: 'https://tpyjb.rongxinh.com',
    baseURL: 'https://testtpy.rongxinh.com',
    timeout: 6000,
    responseType: 'json',
    contentType: 'form'
})

const err = (error) => {
    if (error.response) {
        const data = error.response.data
        const token = Vue.ls.get(ACCESS_TOKEN)
        if (error.response.status === 403) {
            notification.error({
                message: 'Forbidden',
                description: data.message
            })
        }
        if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
            notification.error({
                message: 'Unauthorized',
                description: 'Authorization verification failed'
            })
            if (token) {
                store.dispatch('Logout').then(() => {
                    setTimeout(() => {
                        window.location.reload()
                    }, 1500)
                })
            }
        }
    }
    return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (!token) {
        // this.$router.push('login')
    }
    config.headers['Authorization'] = token || ''
    config.headers['content-type'] = 'json'
    config.responseType = ''
    return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
    const { code, msg, data } = response.data
    if (parseInt(code) === 401) { // 登录过期
        // router.push({ path: '/user/login' })
        message.error('登录已过期')
        store.dispatch('Relog').then(() => {
            setTimeout(() => {
                window.location.reload()
            }, 500)
        })
    }
    if (parseInt(code) !== 1 && response.config.url !== 'https://upload-z2.qiniup.com/') {
        message.error(msg || '请求错误')
        return false
    }

    if (response.config.url === `/api/common/getQrToken`) {
        return response.data.token
    } else {
        return data || true
    }

}, err)

const installer = {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, service)
    }
}

export function get(url, data) {
    return service({ url, method: 'get', data })
}

export function post(url, data) {
    return service({ url, method: 'post', data })
}


export {
    installer as VueAxios,
    service as axios
}