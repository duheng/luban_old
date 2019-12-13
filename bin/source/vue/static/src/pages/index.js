import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import router  from '../router/index'
import store from '../store/index'

/*Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	mode: 'history',
	strict: process.env.NODE_ENV !== 'production',
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
})*/
let app = new Vue({
	router,
	store,
	 components: { App },
  template: '<App />'
}).$mount('#app')
export default app;
/*window.$app = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App />'
})
*/
