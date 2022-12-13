<template>
    <div>
        
        <b-row>
            <b-col class="mb-4" cols="4" v-for="(zona, key) in config_reporte.zonas" :key="key">                
                <b-card class="shadow-lg p-3 bg-white rounded">
                    <CircleChart :config_reporte="config_reporte" :id_clasificacion="id_clasificacion" :title_chart="'Zona ' + zona" :url_data="url_data" :processChart="processChart" :id_container="'zona_' + zona" :zona="zona" :id_indicador="id_indicador"  />
                </b-card>

            </b-col>
        </b-row>
    </div>    
</template>

<script>

    import CircleChart from '@/components/Indicadores/CircleZona.vue'

    export default {
        props:{
            config_reporte: {
                type: Object,
                default: null
            },
            url_data: String,
            id_clasificacion: Number,
            id_indicador: Number
        },
        components: {
            CircleChart
        },
        data(){

            return{
                processChart: false
            }

        },
        watch: {

            config_reporte(val){

                if(val){

                    console.log('test')

                    this.processChart = true
                }

            }

        }
    }
</script>