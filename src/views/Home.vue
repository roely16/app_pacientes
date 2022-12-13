<template>
    <div>
        <NavBar />

        <!-- Home -->
        <b-container fluid v-if="home">
            <b-row class="mt-4" v-if="categorias.length > 0">

                <b-col sm="12" md="6" lg="4" v-for="( categoria, key ) in categorias" :key="key">
                    <b-card
                        class="mb-2 text-primary"
                        no-body	
                    >
                        <b-card-body class="pt-2">
                            
                            <b-card-text>
                                {{ categoria.nombre }}
                            </b-card-text>
                            <b-row>
                                <b-col cols="6">
                                    <b-img  width="100" :src="'./img/' + categoria.icon" fluid></b-img>
                                </b-col>
                                <b-col >
                                    <b-button v-for="(opcion, key) in categoria.opciones" :key="key" block size="sm" variant="outline-primary" :to="{ name: opcion.url, params: {id: opcion.id_clasificacion} }" >{{ opcion.nombre }}</b-button>                                    
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card>
                </b-col>

            </b-row>

            <b-row class="mt-4" v-if="categorias.length <= 0">
                <b-col>
                    <b-alert variant="danger" class="text-center" show>
                        <h2>Solicite al Administración Acceso a la Plataforma 
                            <font-awesome-icon icon="exclamation-triangle" />
                        </h2>
                    </b-alert>
                </b-col>
            </b-row>

        </b-container>

        <!-- Others -->
        <b-container fluid v-if="!home">
            <router-view ></router-view>
        </b-container>

    </div>    
</template>

<script>

    import NavBar from '@/components/NavBar'

    export default {
        components: {
            NavBar
        },
        data(){

            return{

                categorias: []

            }

        },
        methods: {

            obtener_menu(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.axios
				.get(process.env.VUE_APP_API_URL + "menu_usuario/" + usuario.id)
				.then(response => {
                    
                    this.categorias = response.data
					
				});

            }

        },
        computed:{
			home(){

                let is_home = false

				if (this.$route.name == 'home') {
					
                    is_home = true
                    
                }
                
                return is_home

			}
        },
        mounted(){

            this.obtener_menu()

        }
    }
</script>