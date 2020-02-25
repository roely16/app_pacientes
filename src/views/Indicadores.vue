<template>
    <div>
        <b-container>
            <b-row class="mt-4">
                <b-col>
                    <b-breadcrumb :items="items"></b-breadcrumb>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12">
                    <b-card>
                        <b-row>
                            <b-col cols="2">
                                <b-form-group label="Zonas" label-class="font-weight-bold">
                                    <b-form-select v-model="reporte.zonas" :options="zonas">
                                        <template v-slot:first>
                                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                        </template>
                                    </b-form-select>
                                </b-form-group>
                            </b-col>
                            <b-col cols="6">
                                <b-form-group label="Indicadores" label-class="font-weight-bold">

                                    <b-form-select v-model="reporte.indicadores" :options="indicadores" value-field="id" text-field="nombre">
                                        <template v-slot:first>
                                            <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                        </template>
                                    </b-form-select>

                                </b-form-group>
                            </b-col>
                            <b-col cols="2">
                                <b-form-group label="De" label-class="font-weight-bold">
                                    <date-picker v-model="reporte.de" :config="options"></date-picker>
                                </b-form-group>
                            </b-col>
                            <b-col cols="2">
                                <b-form-group label="Hasta" label-class="font-weight-bold">
                                    <date-picker v-model="reporte.hasta" :config="options"></date-picker>
                                </b-form-group>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col class="text-center">
                                <b-button class="mr-2">
                                    Limpiar
                                    <font-awesome-icon icon="times-circle" />
                                </b-button>
                                <b-button variant="success" type="submit">
                                    Generar
                                    <font-awesome-icon icon="save" />
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="4">
                    <Indicador />
                </b-col>
            </b-row>
        </b-container>
    </div>    
</template>

<script>

    import Indicador from '@/components/Indicadores/Indicador'
    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
    // import VSelect from '@alfsnd/vue-bootstrap-select'

    export default {
        components: {
            Indicador,
            datePicker
            // VSelect
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
                    zonas: {},
                    indicadores: {},
                    de: null,
                    hasta: null
                },
                options: {
                    format: 'MM/YYYY',
                    useCurrent: false,
                    locale: 'es'
                }
            }

        },
        methods: {

            grafica(){

               

            },
            obtener_zonas(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.axios
				.get(process.env.VUE_APP_API_URL + "zonas_usuario/" + usuario.id)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
					// eslint-disable-next-line no-undef
                    this.zonas = response.data
				});

            },
            obtener_indicadores(){

                this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_indicadores")
				// eslint-disable-next-line no-unused-vars
				.then(response => {
					// eslint-disable-next-line no-undef
                    this.indicadores = response.data
                });
                
            }

        },
        mounted(){

             this.obtener_zonas()
             this.obtener_indicadores()
            
        }
    }
</script>