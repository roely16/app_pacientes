<template>
    <div>
        <b-container fluid>

            <b-row class="mt-4">
				<b-col>
					<b-breadcrumb :items="items"></b-breadcrumb>
				</b-col>
			</b-row>

            <b-row>
                <b-col cols="8">
                </b-col>
                <b-col cols="4" class="text-right">
                   
                     <b-button-group>
                        <b-button @click="() => { zona.pressed = !zona.pressed }" v-for="(zona, key) in zonas" :key="key" :style=" zona.pressed ? 'background-color: rgba' + zona.pressed_color : 'background-color: rgba' + zona.released_color ">{{ zona.zona }}</b-button>                        
                    </b-button-group>
                </b-col>
            </b-row>

            <b-row class="mt-3">
                <b-col>
                    <Calendar :zonas_seleccionadas="zonas_seleccionadas" />    
                </b-col>
            </b-row>
           
        </b-container>
        
    </div>    
</template>

<script>

    import Calendar from '@/components/Calendario/Calendar.vue'
    // import Modal from '@/components/General/Modal'

    export default {
        components: {
            Calendar,
            // Modal
        },
        data(){

            return{
                items: [
                    {
                        text: 'Home',
                        href: '#/home'
                    },
                    {
                        text: 'Calendario',
                        active: true
                    }
                ],
                showModal: false,
                zonas: []
            }

        },
        methods: {

            obtener_zonas(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.axios
                .get(process.env.VUE_APP_API_URL + "zonas_completas_usuario/" + usuario.id)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    
                    this.zonas = response.data
                    
                });

            }

        },
        computed: {

            zonas_seleccionadas(){

                let zonas_s = this.zonas.filter( zona => zona.pressed )

                let zonas = []

                zonas_s.forEach(zona_s => {
                    zonas.push(zona_s.zona)
                });

                return zonas

            }

        },
        mounted(){

            this.obtener_zonas()

        }
    }
</script>