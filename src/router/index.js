import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Contactos from '../views/Contactos.vue'
import DetalleContacto from '../views/DetalleContacto'

// Login
import Login from '../views/Login'

// Usuarios
import Usuarios from '../views/Usuarios'
import DetalleUsuario from '../views/DetalleUsuario'

// Catálogos
import Catalogos from '../views/Catalogos.vue'

// Indicadores
import Indicadores from '../views/Indicadores.vue'

// Reportes
import Reportes from '../views/Reportes.vue'

// Metas
import Metas from '../views/Metas.vue'

// eslint-disable-next-line no-unused-vars
import store from '../store/index.js';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/home',
		name: 'home',
		component: Home,
		children: [
			// Administración de contactos
			{
				path: '/home/contactos',
				name: 'contactos',
				component: Contactos
			},
			{
				path: '/home/detalle_contacto/:id',
				name: 'detalle_contacto',
				component: DetalleContacto
			},
			// Usuarios
			{
				path: '/home/usuarios',
				name: 'usuarios',
				component: Usuarios
			},
			{
				path: '/home/usuarios/detalle_usuario/:id',
				name: 'detalle_usuario',
				component: DetalleUsuario
			},
			// Catálogos
			{
				path: '/home/catalogos',
				name: 'catalogos',
				component: Catalogos
			},
			// Indicadores
			{
				path: '/home/indicadores',
				name: 'indicadores',
				component: Indicadores
			},
			// Reportes
			{
				path: '/home/reportes',
				name: 'reportes',
				component: Reportes
			},
			// Metas
			{
				path: '/home/metas',
				name: 'metas',
				component: Metas
			},
		]
	}
]

const router = new VueRouter({
	routes
})

router.beforeEach((to, from, next) => {
	
	store.dispatch('fetchAccessToken');

	if (to.name != 'login') {
		
		if (store.state.accessToken == null) {
			return next('/');
		}

	}
	if (to.name == 'login') {

		if (store.state.accessToken != null) {
			
			return next('/home');
		}

	}

	next();

});

export default router