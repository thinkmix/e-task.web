/**
 *@info 路由模块
 *@author: thinkmix
 *@date 2019-03-11
 * */
import Vue from 'vue'
import Router from 'vue-router'

import { getStore } from '@/utils/utils'

Vue.use(Router)

const router = new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      name:'登录'
    },
    {
      path: '/',
      component: () => import('@/views/index'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/views/home/index'),
          name: '首页'
        },
        {
          path: 'mo',
          component: () => import('@/views/mo/index'),
          redirect: '/mo/list',
          name: '社团',
          children: [
            {
              path: 'list',
              component: () => import('@/views/mo/list'),
              name: '社团列表'
            },
            {
              path: 'info',
              component: () => import('@/views/mo/info'),
              name: '社团信息'
            },
          ]
        },
        {
          path: 'activity',
          component: () => import('@/views/mo/index'),
          redirect: '/activity/list',
          name: '活动',
          children: [
            {
              path: 'list',
              component: () => import('@/views/activity/list'),
              name: '活动列表'
            },
            {
              path: 'info',
              component: () => import('@/views/activity/info'),
              name: '活动信息'
            },
          ]
        },
        {
          path: 'person',
          component: () => import('@/views/person/index'),
          redirect: '/person/account',
          name: '个人中心',
          children: [
            {
              path: 'account',
              component: () => import('@/views/person/account'),
              name: '账户管理'
            },
            {
              path: 'mo',
              component: () => import('@/views/person/mo'),
              name: '我的社团'
            },
            {
              path: 'mo-activity',
              component: () => import('@/views/person/mo-activity'),
              name: '发布活动'
            },
          ]
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = getStore('USER_TOKEN')

  if (!token && to.path !== '/login') {
    next({ path: '/login' })
    return false
  }
  next()
})
export default router
