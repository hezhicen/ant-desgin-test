// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'

export const asyncRouterMap = [{
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: { title: '首页' },
        redirect: '/active',
        children: [{
                path: '/active',
                name: 'activeSetting',
                component: () =>
                    import ('@/views/active'),
                meta: { title: '活动设置', icon: 'gift', permission: ['user', 'admin'],keepAlive:false }
            },
            {
                path: '/user',
                name: 'userList',
                component: () =>
                    import ('@/views/user/List'),
                meta: { title: '用户管理', icon: 'team', permission: ['user', 'admin'] }
            },
            {
                path: '/user/:id',
                name: 'userDetail',
                component: () =>
                    import ('@/views/user/Detail'),
                meta: { title: '用户管理', icon: 'team', permission: ['user', 'admin'], keepAlive: false },
                hidden: true
            },
            {
                path: '/goods',
                name: 'goods',
                component: BlankLayout,
                meta: { title: '商品管理', icon: 'shopping-cart', permission: ['user', 'admin'] },
                hideChildrenInMenu: true,
                redirect: '/goods/list',
                children: [{
                        path: '/goods/list',
                        name: 'goodsList',
                        component: () =>
                            import ('@/views/goods/List'),
                        meta: { title: '商品列表', icon: 'dashboard', permission: ['user', 'admin'] },
                        hidden: true
                    },
                    {
                        path: '/goods/edit',
                        name: 'goodsAdd',
                        component: () =>
                            import ('@/views/goods/Edit'),
                        meta: { title: '商品添加', icon: 'dashboard', permission: ['user', 'admin'] },
                        hidden: true
                    },
                    {
                        path: '/goods/edit/:id',
                        name: 'goodsEdit',
                        component: () =>
                            import ('@/views/goods/Edit'),
                        meta: { title: '商品编辑', icon: 'dashboard', permission: ['user', 'admin'] },
                        hidden: true
                    }
                ]
            },
            {
                path: '/needs',
                name: 'needs',
                component: () =>
                    import ('@/views/needs'),
                meta: { title: '调查统计', icon: 'solution', permission: ['user', 'admin'] }
            },
            {
                path: '/analysis',
                name: 'analysis',
                component: BlankLayout,
                meta: { title: '数据统计', icon: 'dashboard', permission: ['user', 'admin'] },
                redirect: '/analysis/order',
                children: [{
                        path: '/analysis/order',
                        name: 'analysisOrder',
                        component: () =>
                            import ('@/views/order/List'),
                        meta: { title: '订单数据', icon: 'dashboard', permission: ['user', 'admin'] },
                    },
                    {
                        path: '/analysis/active',
                        name: 'analysisActive',
                        component: () =>
                            import ('@/views/active/Analysis'),
                        meta: { title: '活动数据', icon: 'dashboard', permission: ['user', 'admin'] },
                    }
                ]
            },
            {
                path: '/tmpl',
                name: 'tmpl',
                component: () =>
                    import ('@/views/tmpl/List'),
                meta: { title: '营销管理', icon: 'solution', permission: ['user', 'admin'] }
            },
            {
                path: '/tmpl/add',
                name: 'tmplAdd',
                component: () =>
                    import ('@/views/tmpl/Edit'),
                meta: { title: '营销管理', icon: 'solution', permission: ['user', 'admin'] },
                hidden: true
            },
            {
                path: '/withdraw',
                name: 'withdraw',
                component: () =>
                    import ('@/views/withdraw/List'),
                meta: { title: '提现管理', icon: 'money-collect', permission: ['user', 'admin'] }
            },
            {
                path: '/setting',
                name: 'setting',
                component: () =>
                    import ('@/views/setting'),
                meta: { title: '后台编辑', icon: 'form', permission: ['user', 'admin'] }
            },
            {
                path: '/signup',
                name: 'signup',
                component: () =>
                    import ('@/views/signup/signup'),
                meta: { title: '报名管理', icon: 'dashboard', permission: ['user', 'admin'] }
            },
            {
                path: '/activeData',
                name: 'activeData',
                component: () =>
                    import ('@/views/activeData/activeData'),
                meta: { title: '活动数据', icon: 'solution', permission: ['user', 'admin'] }
            },
            // Extension
            {
                path: '/extension',
                name: 'extension',
                component: () =>
                    import ('@/views/extension/extension'),
                meta: { title: '推广圈管理', icon: 'dashboard', permission: ['user', 'admin'] }
            },
        ]
    }, 
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
        path: '/login',
        component: UserLayout,
        redirect: '/login/login',
        hidden: true,
        children: [{
                path: 'login',
                name: 'login',
                component: () =>
                    import ('@/views/login/Login')
            },
            {
                path: 'register',
                name: 'register',
                component: () =>
                    import ('@/views/login/Register')
            },
            {
                path: 'register-result',
                name: 'registerResult',
                component: () =>
                    import ('@/views/login/RegisterResult')
            }
        ]
    },

    {
        path: '/test',
        component: BlankLayout,
        redirect: '/test/home',
        children: [{
            path: 'home',
            name: 'TestHome',
            component: () =>
                import ('@/views/Home')
        }]
    },

    {
        path: '/404',
        component: () =>
            import ( /* webpackChunkName: "fail" */ '@/views/exception/404')
    }

]