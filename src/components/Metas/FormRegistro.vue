<template>
    <div>
        <b-container>
            <b-form @submit.prevent="!editMode ? registrar() : editar()">
                
                <b-row>
                    <b-col cols="12">
                        <b-form-group label="Indicador" label-class="font-weight-bold">
                            <b-form-select v-model="meta.id_indicador" :options="indicadores" value-field="id" text-field="nombre">
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group label="Zona" label-class="font-weight-bold">
                            <b-form-select v-model="meta.zona" :options="zonas">
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled>-- Seleccione una opción --</b-form-select-option>
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="6">
                        <b-form-group label="Mes/Año" label-class="font-weight-bold">
                            <date-picker v-model="meta.fecha" :config="options"></date-picker>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12">
                        <b-form-group label="Meta" label-class="font-weight-bold">
                            <b-form-input v-model="meta.meta" autocomplete="off"></b-form-input>
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
                            <b-button variant="success" size="lg" type="submit">
                                Guardar
                                <font-awesome-icon icon="save" />
                            </b-button>
                        </b-col>
                    </b-col>
                </b-row>
            </b-form>
        </b-container>    
    </div>    
</template>

<script>

    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        components: {
            datePicker
        },
        props: {
            editMode: {
				type: Boolean,
				default: false
			},
			idMeta: Number
        },
        data(){
            return{
                indicadores: [],
                zonas: [],
                date: new Date(),
                options: {
                    format: 'MM/YYYY',
                    useCurrent: false,
                    locale: 'es'
                },
                meta: {
                    id_indicador: null,
                    zona: null,
                    fecha: null,
                    meta: null
                }  
            }
        },
        methods: {

            closeModal(){

                this.$emit('closeModal')

            },
            obtener_indicadores(){

                this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_indicadores")
				// eslint-disable-next-line no-unused-vars
				.then(response => {
					// eslint-disable-next-line no-undef
                    this.indicadores = response.data
				});

            },
            zonas_usuario(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.axios
				.get(process.env.VUE_APP_API_URL + "zonas_usuario/" + usuario.id)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
					// eslint-disable-next-line no-undef
                    this.zonas = response.data
				});

            },
            registrar(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.meta.registrado_por = usuario.id

                this.axios
				.post(process.env.VUE_APP_API_URL + "registrar_meta", this.meta)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "El usuario ha sido registrado!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
					});
                });
                

            },
            detalle(){

                this.axios
				.get(process.env.VUE_APP_API_URL + "detalle_meta/" + this.idMeta)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    // eslint-disable-next-line no-undef
                    this.meta = response.data
                });
                
            },
            editar(){

                this.axios
				.post(process.env.VUE_APP_API_URL + "editar_meta", this.meta)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "La meta ha sido actualizada!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });

                });

            }

        },
        mounted(){

            this.obtener_indicadores()
            this.zonas_usuario()

            const $ = require('jquery')

            $.extend(true, $.fn.datetimepicker.defaults, {
                icons: {
                    time: 'far fa-clock',
                    date: 'far fa-calendar',
                    up: 'fas fa-arrow-up',
                    down: 'fas fa-arrow-down',
                    previous: 'fas fa-chevron-left',
                    next: 'fas fa-chevron-right',
                    today: 'fas fa-calendar-check',
                    clear: 'far fa-trash-alt',
                    close: 'far fa-times-circle'
                }
            });

            if (this.editMode) {

                this.detalle()

            }

        }
    }
</script>