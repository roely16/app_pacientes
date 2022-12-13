<template>
    <div>
        <b-row align-v="center" align-h="center">
            <b-col cols="12">
                 <div id="container" style="width: 100%; height: 500px">
        
                </div> 
            </b-col>
            <!-- <b-col>
                <div style="background: lightblue; border-radius: 50%;">
                    <h2 class="text-center pt-3 pb-3">{{ grand_total }}</h2>
                </div>
            </b-col> -->
        </b-row>
    </div>
      
</template>

<script>

    // eslint-disable-next-line no-unused-vars
    import * as am4core from "@amcharts/amcharts4/core";
    // eslint-disable-next-line no-unused-vars
    import * as am4charts from "@amcharts/amcharts4/charts";

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
            return {

                data_chart: [],

            }
        },
        methods: {

            obtener_datos(){

                this.axios
                .post(process.env.VUE_APP_API_URL + "indicador_total_clasificacion", this.config_reporte)
                .then(response => {

                    this.data_chart = response.data.data
                    this.draw_chart()
                    
                });

            },
            draw_chart(){
                
                // eslint-disable-next-line no-undef
                // eslint-disable-next-line no-unused-vars
                // eslint-disable-next-line no-undef
                let chart = am4core.create("container", am4charts.SlicedChart);
                
                chart.hiddenState.properties.opacity = 0;
                chart.hideCredits = true

                chart.data = this.data_chart;

                let series = chart.series.push(new am4charts.FunnelSeries());

                // eslint-disable-next-line no-unused-vars
                this.data_chart.forEach(element => {
                    
                    series.colors.list.push(am4core.color(element.color))

                });

                series.dataFields.value = "total";
                series.dataFields.category = "name";
                series.alignLabels = false;
                series.orientation = "horizontal";
                series.bottomRatio = 1;
                series.tooltip.disabled = true

                series.labels.template.text = "{value.percent.formatNumber('#.0')}%";
                series.labels.template.html = "<h3 class='text-center'>{value.percent.formatNumber('#.0')}%</h3>" +  "<h4 class='text-center'>{value}</h4>"
                series.labels.template.rotation = 0

                // chart.legend = new am4charts.Legend();
                // chart.legend.position = "bottom";

                this.$emit('loadEnd')

            }

        },
        watch: {

            processChart: function(val){

                if (val) {
                    
                    this.obtener_datos()

                }

            }

        },
        computed: {

            grand_total: function(){

                let total = 0;

                this.data_chart.forEach(element => {
                    
                    total = total + element.total

                });

                return total

            }

        },
        mounted(){

            

        }
    }
</script>