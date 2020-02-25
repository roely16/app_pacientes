import Vue from 'vue'
import Vuex from 'vuex'
// eslint-disable-next-line no-unused-vars
import router from '../router/index.js';

Vue.use(Vuex)

import axios from 'axios'

export default new Vuex.Store({
	state: {
		accessToken: null,
		loggingIn: false,
		loginError: null
	},
	mutations: {

		loginStart: state => state.loggingIn = true,
		loginStop: (state, errorMessage) => {

			state.loggingIn = false;
			state.loginError = errorMessage;

		},
		updateAccessToken: (state, accessToken) => {

			state.accessToken = accessToken;

		},
		logout: (state) => {

			state.accessToken = null;
			
		}

	},
	actions: {

		// eslint-disable-next-line no-unused-vars
		doLogin({ commit }, loginData){

			commit('loginStart')

			axios
            .post(process.env.VUE_APP_API_URL + "login", loginData)
            // eslint-disable-next-line no-unused-vars
            .then(response => {
				// eslint-disable-next-line no-undef
				if (!response.data.login) {
					
					commit('loginStop', (null, response.data.message));

				}else{

					localStorage.setItem('usuario', JSON.stringify(response.data.data));
					commit('loginStop', null);
					router.push('/home');

				}
                
            });

		},
		fetchAccessToken({ commit }) {

			commit('updateAccessToken', localStorage.getItem('usuario'));

		},
		logout({ commit }) {

			localStorage.removeItem('usuario');
			commit('logout');
			router.push('/');
			
		}

	},
	modules: {
	}
})
