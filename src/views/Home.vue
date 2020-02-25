<template>
    <div>
        <NavBar />

        <!-- Home -->
        <b-container v-if="home">
            <b-row class="mt-4">
                <b-col sm="12" md="6" lg="4">
                    <b-card
                        class="mb-2 text-primary"
                        no-body	
                    >
                        <b-card-body class="pt-2">
                            
                            <b-card-text>
                                Contactos
                            </b-card-text>
                            <b-row>
                                <b-col cols="6">
                                    <b-img  width="100" src="./img/contacts.png" fluid></b-img>
                                </b-col>
                                <b-col>
                                    <b-button block size="sm" variant="outline-primary" :to="{ name: 'contactos' }">Administración</b-button>
                                    
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card>
                </b-col>

                <b-col sm="12" md="6" lg="4">
                    <b-card
                        class="mb-2 text-primary"
                        no-body
                    >
                        <b-card-body class="pt-2">
                             <b-card-text>
                                Indicadores
                            </b-card-text>
                            <b-row>
                                <b-col cols="6">
                                    <b-img  width="100" src="./img/dashboard.png" fluid></b-img>
                                </b-col>
                                <b-col>
                                    <b-button block size="sm" variant="outline-primary" :to="{ name: 'indicadores' }">Indicadores</b-button>
                                    <b-button block size="sm" variant="outline-primary">Reportes</b-button>
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card>
                </b-col>

                <b-col sm="12" md="6" lg="4">
                    <b-card
                        class="mb-2 text-primary"
                        no-body
                    >   
                        <b-card-body class="pt-2">
                            <b-card-text>
                                Configuración
                            </b-card-text>
                            <b-row>
                                <b-col cols="6">
                                    <b-img  width="100" src="./img/system.png" fluid></b-img>
                                </b-col>
                                <b-col>
                                    <b-button block size="sm" variant="outline-primary" :to="{ name: 'usuarios' }">Usuarios 
                                        <!-- <font-awesome-icon icon="users" /> -->
                                    </b-button>
                                    <b-button block size="sm" variant="outline-primary" :to="{ name: 'catalogos' }">Catálogos</b-button>
                                    <b-button block size="sm" variant="outline-primary" :to="{ name: 'metas' }">Metas</b-button>
                                    
                                </b-col>
                            </b-row>
                        </b-card-body>
                    </b-card>
                </b-col>

            </b-row>
        </b-container>

        <!-- Others -->
        <b-container v-if="!home">
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
        methods: {

            obtener_menu(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.axios
				.get(process.env.VUE_APP_API_URL + "menu_usuario/" + usuario.id)
				.then(response => {
                    
                    console.log(response.data)
					
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