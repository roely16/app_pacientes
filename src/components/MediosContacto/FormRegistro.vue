<template>
    <div>
        <b-modal v-model="show" :title="editMode ? 'Editar Medio de Contacto' : 'Agregar Medio de Contacto'" @hidden="closeModal" hide-footer>
            <b-form @submit.prevent="!editMode ? registrar() : editar()">
                <b-row align-h="center" class="text-center">
                    <b-col cols="8">
                        <b-form-group label="Tipo" label-class="font-weight-bold">
                            <b-form-select v-model="medio_contacto.id_tipo" :options="tipos_contacto" value-field="id" text-field="nombre">
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="8" v-if="medio_contacto.id_tipo">
                        <b-form-group label="Medio de Contacto" label-class="font-weight-bold">
                            <b-form-input type="text" v-model="medio_contacto.medio" autocomplete="off" required></b-form-input>    
                        </b-form-group>
                    </b-col>
                    <b-col cols="8" v-if="medio_contacto.medio">
                        <b-form-group label="Estado" label-class="font-weight-bold">
                            <b-form-select v-model="medio_contacto.estado" :options="select_status">
                            </b-form-select>
                            <!-- <b-form-input type="text" v-model="medio_contacto.medio" autocomplete="off" required></b-form-input>     -->
                        </b-form-group>
                    </b-col>
                </b-row>

                <b-row class="mt-4">
                    <b-col>
                        <b-col class="text-center">
                            <b-button class="mr-2" size="lg" @click="closeModal()">
                                Cancelar
                                <font-awesome-icon icon="times-circle" />
                            </b-button>
                            <b-button variant="success" size="lg" type="submit" :disabled="!medio_contacto.medio">
                                Guardar
                                <font-awesome-icon icon="save" />
                            </b-button>
                        </b-col>
                    </b-col>
                </b-row>
            </b-form>
        </b-modal>
    </div>    
</template>

<script>
    export default {
        props: {
            showModal: {
                type: Boolean,
                default: false
            },
            editMode: {
                type: Boolean,
                default: false
            },
            idMedioContacto: {
                type: Number,
                default: null
            }
        },
        data(){
            return{
                show: false,
                tipos_contacto: [],
                medio_contacto: {
                    id_tipo: null,
                    medio: null,
                    id_persona: this.$route.params.id,
                    estado: "A"
                },
                select_status: [
                    { value: "A", text: "Activo" },
                    { value: "I", text: "Inactivo" }
                ],
            }
        },
        methods: {
            closeModal(){

                this.$emit('closeModal')

            },
            reset(){
                this.medio_contacto = {
                    id_tipo: null,
                    medio: null,
                    estado: "A",
                    id_persona: this.$route.params.id
                }
            },
            registrar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + "registrar_medio_contacto", this.medio_contacto)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "El medio de contacto ha sido registrado!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });
                });
            },
            obtener_tipos(){

                this.axios
                .get(process.env.VUE_APP_API_URL + "medios_contacto")
                .then(response => {
                    this.tipos_contacto = response.data
                });

            },
            obtener_detalle(){

                this.axios
                .get(process.env.VUE_APP_API_URL + "detalle_medio_contacto/" + this.idMedioContacto)
                .then(response => {
                    this.medio_contacto = response.data
                });

            },
            editar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + "editar_medio_contacto", this.medio_contacto)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "El medio de contacto ha sido actualizado!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });
                });

            }
        },
        watch: {
            showModal(val){

                if(val){

                    this.reset()
                    this.obtener_tipos()

                }

                if (this.idMedioContacto) {
                    this.obtener_detalle()
                }

                this.show = val

            }
        }
    }
</script>