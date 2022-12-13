<template>
    <div>
        <b-row class="mt-3" align-v="center">
            <b-col cols="3">
                <b-row>
                    <b-col class="mb-3" cols="12">
                        <b-card class="shadow-lg p-3 bg-white rounded">
                            <h1 style="font-size: 5rem" class="text-center text-danger">{{ confirmados }}</h1>
                            <h3 class="text-center"><b-badge variant="danger">CONFIRMADOS</b-badge></h3>
                        </b-card>
                    </b-col>
                    <b-col cols="12">
                        <b-card class="shadow-lg p-3 bg-white rounded">
                             <h1 style="font-size: 5rem" class="text-center text-warning">{{ sintomas }}</h1>
                            <h3 class="text-center"><b-badge variant="warning">SÍNTOMAS</b-badge></h3>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="6">
                <b-card class="shadow-lg p-3 bg-white rounded">
                    <div id="grafica_totales"></div>
                </b-card>
            </b-col>
            <b-col b-cols="3">
                <b-row>
                    <b-col class="mb-3" cols="12">
                        <b-card class="shadow-lg p-3 bg-white rounded">
                            <b-row>
                                <b-col cols="6" style="padding-right:20px; border-right: 1px solid #ccc;">
                                    <h1 style="font-size: 5rem" class="text-center text-danger">{{ confirmados_detalle.vecino }}</h1>
                                    <h5 class="text-center"><b-badge variant="primary">VECINOS</b-badge></h5>
                                </b-col>
                                <b-col cols="6">
                                   <h1 style="font-size: 5rem" class="text-center text-danger">{{ confirmados_detalle.empleado }}</h1>
                                    <h5 class="text-center"><b-badge variant="success">EMPLEADOS</b-badge></h5>
                                </b-col>
                            </b-row>
                            
                        </b-card>
                    </b-col>
                    <b-col cols="12">
                        <b-card class="shadow-lg p-3 bg-white rounded">
                             <b-row>
                                <b-col cols="6" style="padding-right:20px; border-right: 1px solid #ccc;">
                                    <h1 style="font-size: 5rem" class="text-center text-warning">{{ sintomas_detalle.vecino }}</h1>
                                    <h5 class="text-center"><b-badge variant="primary">VECINOS</b-badge></h5>
                                </b-col>
                                <b-col cols="6">
                                   <h1 style="font-size: 5rem" class="text-center text-warning">{{ sintomas_detalle.empleado }}</h1>
                                    <h5 class="text-center"><b-badge variant="success">EMPLEADOS</b-badge></h5>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>

        <b-row class="mt-3 mb-4">
            <b-col>
                <b-card class="shadow-lg p-3 bg-white rounded">
                    <div id="grafica_zonas"></div>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        props: {
            config_reporte: Object,
            processChart: Boolean
        },
        data(){
            return{
                confirmados: 0,
                sintomas: 0,
                confirmados_detalle: {},
                sintomas_detalle: {}
            }
        },
        methods: {
            total_confirmados(){

                this.axios
				.post(process.env.VUE_APP_API_URL + "indicador_confirmados", this.config_reporte)
				.then(response => {
                    this.confirmados = response.data
                });

            },
            total_sintomas(){

                this.axios
				.post(process.env.VUE_APP_API_URL + "indicador_sintomas", this.config_reporte)
				.then(response => {
                    this.sintomas = response.data
                });

            },  
            grafica_confirmados_sintomas(){

                this.axios
				.post(process.env.VUE_APP_API_URL + "grafica_totales", this.config_reporte)
				.then(response => {

                    // eslint-disable-next-line no-undef
                    Highcharts.chart('grafica_totales', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'TOTAL DE PACIENTES'
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: false
                        },
                        xAxis: {
                            type: 'category',
                            labels: {
                                style: {
                                    fontSize: "24px",
                                    fontWeight: 'bold',
                                }
                            }
                        },
                        yAxis: {
                            min: 0,
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0
                            }
                        },
                        series: [
                            {
                            name: "Personas",
                            colorByPoint: true,
                            data: response.data
                            }
                        ]
                    });
                    
                });

            },
            total_conf_v_e(){

                this.axios
				.post(process.env.VUE_APP_API_URL + "indicador_confirmados_d", this.config_reporte)
				.then(response => {
                    this.confirmados_detalle = response.data
                });

            },
            total_sint_v_e(){

                 this.axios
				.post(process.env.VUE_APP_API_URL + "indicador_sintomas_d", this.config_reporte)
				.then(response => {
                    this.sintomas_detalle = response.data
                });

            },
            grafica_zonas(){

                 this.axios
				.post(process.env.VUE_APP_API_URL + "grafica_zonas", this.config_reporte)
				.then(response => {

                    // eslint-disable-next-line no-undef
                    Highcharts.chart('grafica_zonas', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'PACIENTES POR ZONA'
                        },
                        credits: {
                            enabled: false
                        },
                        xAxis: {
                            categories: response.data.categories,
                            labels: {
                                style: {
                                    fontSize: "24px",
                                    fontWeight: 'bold',
                                }
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'CANTIDAD'
                            },
                            stackLabels: {
                                enabled: true,
                                style: {
                                    fontWeight: 'bold',
                                    fontSize: "30px"
                                }
                            }
                        },
                        legend: {
                            align: 'right',
                            x: -30,
                            verticalAlign: 'top',
                            y: 25,
                            floating: true,
                            borderColor: '#CCC',
                            borderWidth: 1,
                            shadow: false
                        },
                        tooltip: {
                            headerFormat: '<b>{point.x}</b><br/>',
                            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                        },
                        plotOptions: {
                            column: {
                                stacking: 'normal',
                                dataLabels: {
                                    enabled: true,
                                    style: {
                                        fontSize: "20px"
                                    }
                                }
                            }
                        },
                        series: response.data.series
                    });
                })    
                
                this.$emit('loadEnd')

            }
        },
        mounted(){

        },
        watch: {
            processChart(val){

                if (val) {
                    
                    this.total_confirmados()
                    this.total_sintomas()
                    this.grafica_confirmados_sintomas()
                    this.total_conf_v_e()
                    this.total_sint_v_e()
                    this.grafica_zonas()

                }

            }
        } 
    }
</script>