<template>
    <div>
        <h6 class="text-center mt-0">Contactos Ingresados</h6>
        <div id="my-chart" ></div>   
    </div>
     
</template>

<script>
    export default {
        mounted(){

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
                    size: '100%',
                    startAngle: 0,
                    endAngle: 360,
                    background: {
                        backgroundColor: '#EEE',
                        innerRadius: '60%',
                        outerRadius: '100%',
                        shape: 'arc'
                    }
                },
                tooltip: {
                    enabled: false
                },
                // the value axis
                yAxis: {
                    stops: [
                        [0.1, '#55BF3B'], // green
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#DF5353'] // red
                    ],
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickInterval: null,
                    tickAmount: 2,
                    labels: {
                        enabled: false
                    }
                },

                plotOptions: {
                    solidgauge: {
                        dataLabels: {
                            y: 0,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
    
            }

            // eslint-disable-next-line no-undef
            Highcharts.chart('my-chart', Highcharts.merge(gaugeOptions, {
                yAxis: {
                    min: 0,
                    max: 200,
                    
                },

                credits: {
                    enabled: false
                },

                series: [{
                    name: 'Speed',
                    data: [80],
                    dataLabels: {
                       
                    },
                    tooltip: {
                        valueSuffix: ' km/h'
                    }
                }]

            }));

        }
    }
</script>