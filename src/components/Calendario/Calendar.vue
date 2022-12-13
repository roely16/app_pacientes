<template>
    <div>
        <VueCal :timeCellHeight="60" editable-events events-count-on-year-view :time="true" selected-date="2020-03-12" :events="events" todayButton defaultView="week" locale="es" style="height: 750px" :on-event-create="onEventCreate" :on-event-click="onEventClick" />    

        <Modal :titleModal="titleModal" :showModal="showModal" @closeModal="() => { 
            showModal = false 
            editMode = false
        }">
            <template v-slot:form>
                <FormRegistro :idEvento="idEvento" :editMode="editMode" @closeModal="() => { 
                    showModal = false 
                    editMode = false
                }" @listar="obtener_eventos" :event="event" />
            </template>
        </Modal>

    </div>    
</template>

<style>

    .vuecal__event {cursor: pointer;}

    .vuecal__event-title {
        font-size: 0.8em;
        font-weight: bold;
        margin: 1px 0 1px;
    }

    /* .vuecal__event-time {
        display: inline-block;
        margin-bottom: 50px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    } */

    /* .vuecal__event-content {
        font-style: italic;
        font-size: 0.6em;
    } */

    .vuecal__event.zona_1 {background-color: rgba(66, 135, 245, 0.9);border: 1px solid rgb(46, 115, 225);color: #fff;}

    .vuecal__event.zona_4 {background-color: rgba(93, 245, 66, 0.9);border: 1px solid rgb(73, 225, 46);color: #fff;}

    .vuecal__event.zona_5 {background-color: rgba(245, 120, 66, 0.9);border: 1px solid rgb(225, 100, 46);color: #fff;}

    .vuecal__event.zona_8 {background-color: rgba(245, 66, 75, 0.9);border: 1px solid rgb(225, 46, 55);color: #fff;}

    .vuecal__event.zona_9 {background-color: rgba(66, 69, 245, 0.9);border: 1px solid rgb(46, 49, 225);color: #fff;}

    .vuecal__event.zona_11 {background-color: rgba(66, 245, 135, 0.9);border: 1px solid rgb(46, 225, 115);color: #fff;}

</style>

<script>

    import VueCal from 'vue-cal'
    import 'vue-cal/dist/i18n/es.js'
    import 'vue-cal/dist/vuecal.css'

    import Modal from '@/components/General/Modal.vue'
    import FormRegistro from '@/components/Calendario/FormRegistro'

    export default {
        components: {
            VueCal,
            Modal,
            FormRegistro
        },
        props: {
            zonas_seleccionadas: Array
        },
        data(){
            return{
                events: [],
                showModal: false,
                titleModal: '',
                event: {},
                editMode: false,
                idEvento: null
            }
        },
        methods: {
            onEventClick(event){

                this.event = event
                this.showModal = true
                this.editMode = true

                this.idEvento = event.id

                let date_ = event.start.split(" ")

                let date = date_[0].split("-")

                this.titleModal = 'Editar Evento ' + date[2] + "/" + date[1] + "/" + date[0]

            },
            // eslint-disable-next-line no-unused-vars
            onEventCreate(event, deleteEventFunction){

                this.event = event
                this.showModal = true
                
                let date_ = event.start.split(" ")

                let date = date_[0].split("-")

                this.titleModal = 'Agregar Evento ' + date[2] + "/" + date[1] + "/" + date[0]

            },
            obtener_eventos(){

                this.axios
                .post(process.env.VUE_APP_API_URL + "obtener_eventos", this.zonas_seleccionadas)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    
                    this.events = response.data
                    
                });

            },
            listarEventos(){

                this.$emit('listarCalendario')

            }
        },
        mounted(){

            this.obtener_eventos()

        },
        watch: {

            zonas_seleccionadas(){

                this.obtener_eventos()

            }

        }
    }
</script>