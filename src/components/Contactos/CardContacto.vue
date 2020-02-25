<template>
    <div>
        <b-card>
            <b-row>
                <b-col cols="4">
                    <b-form-group label="Nombre" label-class="font-weight-bold">
                        <label>{{ contacto.nombre }} {{ contacto.apellido }}</label>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Dirección" label-class="font-weight-bold">
                        <label>{{ contacto.direccion }}</label>
                    </b-form-group>
                </b-col>
                 <b-col cols="3">
                    <b-form-group label="Colonia" label-class="font-weight-bold">
                        <label>{{ contacto.colonia }}</label>
                    </b-form-group>
                </b-col>
                <b-col cols="1">
                    <b-form-group label="Zona" label-class="font-weight-bold">
                        <label>{{ contacto.zona }}</label>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col>
                    <b-button size="sm" @click="detalle()">Mostrar Detalle 
                        <font-awesome-icon icon="info-circle" />
                    </b-button>
                </b-col>
            </b-row>
        </b-card>

        <FormRegistro :showModal="showModal" titleModal="Detalle de Contacto" :idPersona="id_persona" @closeModal="closeModal" :readOnly="readOnly"/>

    </div>
</template>

<script>

    import FormRegistro from '@/components/Contactos/FormRegistro'

    export default {
        data(){
            return{
                showModal: false,
                id_persona: null,
                readOnly: true
            }
        },
        props: {
            contacto: Object
        },
        components: {
            FormRegistro
        },
        methods: {
        
            detalle(){

                this.showModal = true
                this.id_persona = parseInt(this.$route.params.id)

            },
            closeModal(){

                this.showModal = false
                this.id_persona = null

            }

        }

    }
</script>