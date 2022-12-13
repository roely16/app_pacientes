<template>
    <div>
        <h6 class="text-center mt-0">{{ title_chart }}</h6>

        <b-row>
            <b-col cols="12">
                <div :id="id_container"></div>   
            </b-col>
            <b-col class="text-center" style="cursor: pointer" @click="mostrar_detalle()">
                <b-badge variant="danger">TOTAL: {{ grafica.meta }}</b-badge>
                <b-badge variant="success" class="ml-2">INGRESADOS: {{ grafica.registrados }}</b-badge>
            </b-col>
        </b-row>
        
        <Modal sizeModal="xl" :titleModal="'Detalle de ' + title_chart" @closeModal="() => { showModal = false }" :showModal="showModal">
            <!-- <template v-slot:form>
                <DetalleIndicador :id_clasificacion="id_clasificacion" :id_indicador="id_indicador" :url_data="url_data" :config_reporte="config_reporte"></DetalleIndicador>
            </template> -->
        </Modal>

    </div>
     
</template>

<script>

    import Modal from '@/components/General/Modal.vue'
    // import DetalleIndicador from '@/components/Indicadores/DetalleIndicador.vue'

    export default {
        name: 'IndicadorCirculo',
        components: {
            Modal,
            // DetalleIndicador
        },
        props: {
            showDetail: {
                type: Boolean,
                default: false
            },
            id_container: String,
            title_chart: String,
            processChart: {
                type: Boolean,
                default: false
            },
            config_reporte: {
                type: Object,
                default: null
            },
            url_data: String,
            id_clasificacion: Number,
            id_dependencia: Number,
            
        },
        data(){

            return{
                grafica: {},
                isLoading: false,
                showModal: false
            }

        },
        methods: {

            obtener_datos(){

                this.isLoading = true

                let data = JSON.parse(JSON.stringify(this.config_reporte))
                
                data.id_dependencia = this.id_dependencia

                this.axios
                .post(process.env.VUE_APP_API_URL + this.url_data, data)
                .then(response => {
                    
                    console.log(response.data)
                    this.grafica = response.data
                    this.isLoading = false
                    this.draw_chart()

                    this.$emit('loadEnd')
                    
                });

            },
            draw_chart(){

                // eslint-disable-next-line no-undef
                var gaugeOptions = {

                    chart: {
                        type: 'solidgauge',
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        height: 150,
                    },

                    title: 'Contactos Ingresados',

                    pane: {
                        startAngle: 0,
                        endAngle: 360,
                        background: {
                            outerRadius: '112%',
                            innerRadius: '100%',
                            borderWidth: 0
                        }
                    },
                    tooltip: {
                        enabled: false
                    },
                    // the value axis
                    yAxis: {
                        stops: [
                            [0.1, '#DF5353'], // green
                            [0.5, '#DDDF0D'], // yellow
                            [0.9, '#55BF3B'] // red
                        ],
                        min: 0,
                        max: 100,
                        lineWidth: 0,
                        tickPositions: [],
                        labels: {
                            enabled: false
                        }
                    },

                    plotOptions: {
                        solidgauge: {
                            dataLabels: {
                                borderWidth: 0,
                                useHTML: true,
                                verticalAlign: 'middle',
                                formatter: function(){

                                    return "<h3>" + this.y +  "%</h3>"
                                }
                            }
                        }
                    }
        
                }

                // eslint-disable-next-line no-undef
                Highcharts.chart(this.id_container, Highcharts.merge(gaugeOptions, {
                    yAxis: {
                        min: 0,
                        max: 100,
                        
                    },

                    credits: {
                        enabled: false
                    },

                    series: [{
                        data: [{
                            y: this.grafica.porcentaje
                        }],
                        dataLabels: {
                        
                        },

                    }]

                }));

            },
            mostrar_detalle(){

                if (this.showDetail) {
                    
                    this.showModal = true

                }
            }

        },
        watch: {

            processChart: function(val){

                if(val){

                    this.obtener_datos()

                }

            }

        },
        mounted(){

            

        }
    }
</script>