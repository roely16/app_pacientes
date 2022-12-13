<template>
    <div>
        <h6 class="text-center mt-0">Total Ponderado</h6>
        <b-row>
            <b-col cols="12">
                <div id="ponderada"></div>
            </b-col>
            <b-col class="text-center" style="cursor: pointer" @click="mostrar_detalle()">
                <b-badge variant="primary">MOSTRAR DETALLE</b-badge>
            </b-col>
        </b-row>

        <Modal sizeModal="lg" titleModal="Detalle" @closeModal="() => { this.showModal = false }" :showModal="showModal">
            <template v-slot:form>
                <div>
                    <b-table striped hover :items="detalle_grafica" :fields="fields_grafica"></b-table>
                </div>
            </template>
        </Modal>
    </div>    
</template>

<script>

    import Modal from '@/components/General/Modal.vue'

    export default {
        props: {
            config_reporte: {
                type: Object,
                default: null
            },
            processChart: {
                type: Boolean,
                default: false
            }
        },
        components: {
            Modal
        },
        data(){
            return{
                grafica: {},
                detalle_grafica: [],
                fields_grafica: [],
                showModal: false
            }
        },
        methods: {
            obtener_datos(){

                let data = JSON.parse(JSON.stringify(this.config_reporte))
                
                this.axios
                .post(process.env.VUE_APP_API_URL + 'total_ponderado', data)
                .then(response => {
                    
                   this.grafica = response.data.chart
                   this.detalle_grafica = response.data.detail
                   this.fields_grafica = response.data.fields_detail
                   this.draw_chart()
                    
                });

            },
            draw_chart(){

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
                Highcharts.chart('ponderada', Highcharts.merge(gaugeOptions, {
                    yAxis: {
                        min: 0,
                        max: 100,
                        
                    },

                    credits: {
                        enabled: false
                    },

                    series: [{
                        data: [{
                            y: this.grafica.y
                        }],
                        dataLabels: {
                        
                        },

                    }]

                }));

            },
            mostrar_detalle(){

                this.showModal = true

            }
        },
         watch: {

            processChart: function(val){

                if(val){

                    this.obtener_datos()

                }

            }

        }
    }
</script>