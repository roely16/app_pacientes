<template>
    <div>
        <h6 class="text-center mt-0">Comparativo Metas vs Ingresado</h6>
        <b-row>
            <b-col>
                <div id="donut"></div>
            </b-col>
        </b-row>
        
    </div>
    
</template>

<script>
    export default {
        props: {
            processChart: {
                type: Boolean,
                default: false
            },
            config_reporte: {
                type: Object,
                default: null
            }
        },
        data(){
            return{
                data_chart: []
            }
        },
        methods: {

            obtener_datos(){

                this.axios
                .post(process.env.VUE_APP_API_URL + 'indicador_total_indicadores', this.config_reporte)
                .then(response => {
                    
                    this.data_chart = response.data
                    this.drawChart()
                    
                });

            },
            drawChart(){

                // eslint-disable-next-line no-undef
                Highcharts.chart('donut', {
                    chart: {
                        type: 'pie',
                        marginTop: 0,
                        marginBottom: 10,
                        marginLeft: 0,
                        marginRight: 0,
                        height: 250,
                    },
                    legend: {
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'proximate',
                        shadow: true
                    },
                    title: {
                        text: null
                    },
                    tooltip: {
                        enabled: false,
                        headerFormat: '',
                        pointFormat:    '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>'
                    },
                    series: [{
                        innerSize: '50%',
                        name: 'countries',
                        data: this.data_chart
                    }],
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    align: 'center',
                                    enabled: true,
                                    useHTML: true,
                                    format: '{point.percentage:.1f} %',                                    
                                    color: 'black',
                                    style: {
                                        fontSize: "24px"
                                    }
                                },
                                showInLegend: true
                        }
                    },
                    credits: {
                        enabled: false
                    },

                })

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

            //this.obtener_datos()

            // eslint-disable-next-line no-undef
            

        }
    }
</script>