import Vue from 'vue'
import { login, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
// import { welcome } from '@/utils/util'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(res => {
          if (res) {
            const { token, account } = res
            Vue.ls.set(ACCESS_TOKEN, token, 2 * 60 * 60 * 1000)
            localStorage.setItem('username', account)
            localStorage.setItem('avatar', '')
            localStorage.setItem('role', 'admin')
            commit('SET_TOKEN', token)
            commit('SET_AVATAR', '')
            commit('SET_ROLES', 'admin')
            resolve()
          } else {
            reject()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        const role = localStorage.getItem('role')
        resolve(role)
        // getInfo().then(response => {
        //   const result = response.result

        //   if (result.role && result.role.permissions.length > 0) {
        //     const role = result.role
        //     role.permissions = result.role.permissions
        //     role.permissions.map(per => {
        //       if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
        //         const action = per.actionEntitySet.map(action => { return action.action })
        //         per.actionList = action
        //       }
        //     })
        //     role.permissionList = role.permissions.map(permission => { return permission.permissionId })
        //     commit('SET_ROLES', result.role)
        //     commit('SET_INFO', result)
        //   } else {
        //     reject(new Error('getInfo: roles must be a non-null array !'))
        //   }

        //   commit('SET_NAME', { name: result.name, welcome: welcome() })
        //   commit('SET_AVATAR', result.avatar)

        //   resolve(response)
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // GetInfo ({ commit }) {
    //   return new Promise((resolve, reject) => {
    //     const response = {
    //       'message': '',
    //       'timestamp': 1564541380900,
    //       'result': {
    //         'id': '4291d7da9005377ec9aec4a71ea837f',
    //         'name': '邢皓哲',
    //         'username': 'admin',
    //         'password': '',
    //         'avatar': '/avatar2.jpg',
    //         'status': 1,
    //         'telephone': '',
    //         'lastLoginIp': '27.154.74.117',
    //         'lastLoginTime': 1534837621348,
    //         'creatorId': 'admin',
    //         'createTime': 1497160610259,
    //         'merchantCode': 'TLif2btpzg079h15bk',
    //         'deleted': 0,
    //         'roleId': 'admin',
    //         'role': {
    //           'id': 'admin',
    //           'name': '管理员',
    //           'describe': '拥有所有权限',
    //           'status': 1,
    //           'creatorId': 'system',
    //           'createTime': 1497160610259,
    //           'deleted': 0,
    //           'permissions': []
    //         }
    //       },
    //       'code': 0
    //     }
    //     const result = response.result

    //     if (result.role && result.role.permissions.length > 0) {
    //       const role = result.role
    //       role.permissions = result.role.permissions
    //       role.permissions.map(per => {
    //         if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
    //           const action = per.actionEntitySet.map(action => { return action.action })
    //           per.actionList = action
    //         }
    //       })
    //       role.permissionList = role.permissions.map(permission => { return permission.permissionId })
    //       commit('SET_ROLES', result.role)
    //       commit('SET_INFO', result)
    //     } else {
    //       reject(new Error('getInfo: roles must be a non-null array !'))
    //     }

    //     commit('SET_NAME', { name: result.name, welcome: welcome() })
    //     commit('SET_AVATAR', result.avatar)

    //     resolve(response)
    //   })
    // },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)

        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    },

    Relog ({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
      })
    }

  }
}

export default user
