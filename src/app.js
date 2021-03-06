import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import metaMixin from './Utils/meta-mixin'
import filters from './Utils/filters'
import raw from './Utils/raw'
import slugify from './Utils/slug-mixin'

Vue.mixin(metaMixin)
Vue.mixin(raw)
Vue.mixin(slugify)
Vue.use(filters)


export function createApp () {
	const router = createRouter()
	const store = createStore()

	// synchroniser pour que l'état de la route soit disponible en tant que donnée du store
	sync(store, router)

	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})

	return { app, router, store }
}
