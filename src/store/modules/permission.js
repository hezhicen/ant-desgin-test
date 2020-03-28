import { asyncRouterMap, constantRouterMap } from '@/config/router.config'

/**
 * 过滤账户是否拥有某一个权限，并将菜单从加载列表移除
 *
 * @param permission
 * @param route
 * @returns {boolean}
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 单账户多角色时，使用该方法可过滤角色不存在的菜单
 *
 * @param roles
 * @param route
 * @returns {*}
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

function filterAsyncRouter (routerMap, roles) {
  // const accessedRouters = routerMap.filter(route => {
  // if (hasPermission(roles, route)) {
  //   if (route.children && route.children.length) {
  //     route.children = filterAsyncRouter(route.children, roles)
  //   }
  //   return true
  // }
  // return false
  // })
  const list = routerMap.map(route => {
    if (hasPermission(roles, route)) {
      if (route.hasOwnProperty('children') && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return route
    }
  })

  for (let i = 0; i < list.length; i++) {
    if (list[i] && list[i].hasOwnProperty('children') && list[i].children.length > 0) {
      for (let j = 0; j < list[i].children.length; j++) {
        if (!list[i].children[j]) {
          list[i].children.splice(j, 1)
        }
      }
    }
    if (!list[i]) {
      list.splice(i, 1)
    }
  }
  return list
}

// function filter (list) {
//   const res = []
//   for (let i = 0; i < list.length; i++) {
//     if (list[i] && list[i].hasOwnProperty('children') && list[i].children.length > 0) {
//       list[i].children = filter(list[i].children)
//     }
//     if (list[i]) {
//       res.push(list[i])
//     }
//   }
//   return res
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
