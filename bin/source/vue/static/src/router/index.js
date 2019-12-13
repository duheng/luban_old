
import Vue from 'vue'
import VueRouter from 'vue-router'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')
const about = r => require.ensure([], () => r(require('../pages/about')), 'about')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: home,
      alias: '/',
      meta: { 
        keepAlive: false 
      } 
    },
    {
      path: '/about',
      name: 'about',
      component: about,
      meta: { 
        keepAlive: false 
      } 
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return { x: 0, y: to.meta.savedPosition || 0 }
        }
    }
})

export default router
