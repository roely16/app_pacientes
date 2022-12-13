import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

// Boostrap 
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import {
	BootstrapVue
} from 'bootstrap-vue'

Vue.use(BootstrapVue)

// Axios

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// Fontawesome
import {
	library
} from '@fortawesome/fontawesome-svg-core'
import {
	faEdit,
	faTrash,
	faSearch,
	faPlus,
	faTimesCircle,
	faSave,
	faInfoCircle,
	faUser,
	faEye,
	faEyeSlash,
	faSignInAlt,
	faUsers,
	faExclamationTriangle,
	faAngleDown,
	faAngleUp,
	faGripHorizontal,
	faDownload,
	faUpload
} from '@fortawesome/free-solid-svg-icons'
import {
	FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'

library.add(faEdit, faTrash, faSearch, faPlus, faTimesCircle, faSave, faInfoCircle, faUser, faEye, faEyeSlash, faSignInAlt, faUsers, faExclamationTriangle, faAngleDown, faAngleUp, faGripHorizontal, faDownload, faUpload)

Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')