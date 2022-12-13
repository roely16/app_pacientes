<template>
    <div>
        <b-container fluid>
            <b-row class="mt-4">
                <b-col>
                    <b-breadcrumb :items="items"></b-breadcrumb>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12">
                    <b-card>
                        <b-form @submit.prevent="generar_graficas">
                            <b-row align-v="center">
                                <b-col cols="6">
                                    <b-form-group label="Zonas" label-class="font-weight-bold">
                                        <multiselect :closeOnSelect="false" required deselectLabel="" selectLabel="" selectedLabel="Seleccionada" :multiple="true" v-model="reporte.zonas" :options="zonas" :searchable="false"></multiselect>
                                    </b-form-group>
                                </b-col>
                               
                                <b-col cols="2" class="text-left">
                                    <b-button variant="success" type="submit">
                                        Generar
                                        <font-awesome-icon icon="save" />
                                    </b-button>
                                </b-col>
                                
                            </b-row>
                        </b-form>
            
                    </b-card>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <IndicadoresPacientes :processChart="processChart" @loadEnd="() => { processChart = false }" :config_reporte="reporte" />
                </b-col>
            </b-row>

        </b-container>
    </div>    
</template>

<script>

    // import Indicador from '@/components/Indicadores/Indicador'
    import Multiselect from 'vue-multiselect'
    import IndicadoresPacientes from '@/components/Indicadores/IndicadoresPacientes.vue'

    export default {
        components: {
          
            Multiselect,
            IndicadoresPacientes
           
        },
        data(){

            return{
                 items: [
                    {
                        text: 'Home',
                        href: '#/home'
                    },
                    {
                        text: 'Indicadores',
                        active: true
                    }
                ],
                zonas: [],
                indicadores: [],
                selected: null,
                reporte: {
                    zonas: {}
                },
                options: {
                    format: 'MM/YYYY',
                    useCurrent: false,
                    locale: 'es'
                },
                processChart: false,
                loadingIndicadores: false
            }

        },
        methods: {

            generar_graficas(){

                this.processChart = true

            },
            obtener_zonas(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.axios
				.get(process.env.VUE_APP_API_URL + "zonas_usuario/" + usuario.id)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    // eslint-disable-next-line no-undef
                    this.reporte.zonas = response.data
                    this.zonas = response.data
                    this.processChart = true
				});

            },
            obtener_indicadores(){

                this.loadingIndicadores = true

                this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_dependencias_datos")
				.then(response => {
                    this.indicadores = response.data
                    this.loadingIndicadores = false
                });
                
            },
            detalle_contactos_ingresados(){

            },
            loadEnd(){

                this.processChart = false

            },

        },
        computed: {

            grand_total: function(){

                // array.forEach(element => {
                    
                // });

                return 10

            }

        },
        mounted(){

            this.obtener_zonas()
            this.obtener_indicadores()
            
        }
    }
</script>