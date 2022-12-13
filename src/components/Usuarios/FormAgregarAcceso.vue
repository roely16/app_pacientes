<template>
    <div>
        <b-form @submit.prevent="registrar()">
        <!-- Categoria -->
            <b-card no-body class="mb-2" v-for="( categoria, key ) in categorias" :key="key">
                <b-card-header header-tag="header" class="p-1" role="tab">
                    <b-row align-v="center">
                        <b-col>
                            <!-- <h5>Test</h5> -->
                            <b-form-checkbox
                                v-model="categoria.check"
                                size="lg"
                            >
                                <strong>{{ categoria.nombre }}</strong>
                            </b-form-checkbox>
                        </b-col>
                        <b-col class="text-right">
                            <b-button href="#" variant="light" @click="() => {
                                categoria.expand = !categoria.expand    
                            }">
                                <font-awesome-icon icon="angle-down" />
                            </b-button>
                        </b-col>
                    </b-row>
                    
                </b-card-header>
                <b-collapse v-model="categoria.expand" role="tabpanel">
                    <b-card-body>
                        <b-row>
                            <b-col cols="12" v-for="( opcion, key ) in categoria.opciones" :key="key">
                                <b-form-checkbox
                                    v-model="opcion.check"
                                    size="lg"
                                >
                                    {{ opcion.nombre }}
                                </b-form-checkbox>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-collapse>
            </b-card>

            <b-row class="mt-4">
                <b-col>
                    <b-col class="text-center">
                        <b-button class="mr-2" size="lg" @click="closeModal()">
                            Cancelar
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                        <b-button variant="success" size="lg" type="submit">
                            Guardar
                            <font-awesome-icon icon="save" />
                        </b-button>
                    </b-col>
                </b-col>
            </b-row>
        </b-form>

    </div>    
</template>

<script>
    export default {
        props: {

        },
        data(){

            return{
                categorias: []
            }

        },
        methods: {

            obtener_menu(){

                this.axios
				.get(process.env.VUE_APP_API_URL + "menu_disponible_usuario/" + this.$route.params.id)
				.then(response => {
                    
                    this.categorias = response.data
					
				});

            },
            closeModal(){

                this.$emit('closeModal')

            },
            registrar(){

                let opciones = []

                this.categorias.forEach(categoria => {
                    
                    let selected = categoria.opciones.filter( opcion => opcion.check )
                    
                    selected.forEach(element => {
                        
                        opciones.push(element)

                    });

                });

                // eslint-disable-next-line no-unused-vars
                let data = {
                    id_usuario: this.$route.params.id,
                    opciones: opciones
                }

                this.axios
				.post(process.env.VUE_APP_API_URL + "registrar_accesos", data)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "Se le han brindado permisos a las opciones seleccionadas!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });

				});


            }

        },
        mounted(){

            this.obtener_menu()

        },
        watch: {

            categorias: function(val){

                console.log(val)

            }

        }
    }
</script>