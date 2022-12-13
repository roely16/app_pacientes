<template>
    <div>
        <b-form @submit.prevent="!editMode ? registrar() : editar()">
            <b-row>
                <b-col cols="4">
                    <b-form-group label="Fecha" label-class="font-weight-bold">						
                        <date-picker v-model="reunion.fecha" :config="options"></date-picker>
					</b-form-group>
                </b-col>
                <b-col cols="8">
                    <b-form-group label="Motivo" label-class="font-weight-bold">
						<b-form-input v-model="reunion.motivo" type="text" autocomplete="off" required></b-form-input>    
					</b-form-group>
                </b-col>
                <b-col cols="8">
                    <b-form-group label="Resumen" label-class="font-weight-bold">
						<b-form-textarea v-model="reunion.resumen" type="text" autocomplete="off" required></b-form-textarea>    
					</b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Zona" label-class="font-weight-bold">
						<!-- <b-form-input type="text" autocomplete="off" required></b-form-input>     -->
                        <b-form-select
                            v-model="reunion.zona"
                            :options="select_zonas"
                            required
                        >
                            <template v-slot:first>
                                <b-form-select-option :value="null" disabled
                                    >-- Seleccione una opción
                                    --</b-form-select-option
                                >
                            </template>
                        </b-form-select>
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
    </div>    
</template>

<script>

    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    export default {
        props: {
            editMode: {
                type: Boolean,
                default: false
            },
            idReunion: Number
        },  
        components: {
            datePicker
        },
        data(){

            return{
                options: {
                    format: 'DD/MM/YYYY',
                    useCurrent: false,
                    locale: 'es'
                },
                reunion: {
                    fecha: null,
                    zona: null
                },
                select_zonas: []
            }

        },
        methods: {
            closeModal(){

                this.$emit('closeModal')

            },
            registrar(){

                this.reunion.id_categoria = this.$route.params.id

                this.axios
                .post(process.env.VUE_APP_API_URL + "registrar_convivencia", this.reunion)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "La convivencia ha sido registrada!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });
                });

            },
            obtener_detalle(){

                this.axios
                .get(process.env.VUE_APP_API_URL + "detalle_convivencia/" + this.idReunion)
                .then(response => {
                    this.reunion = response.data
                });

            },
            editar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + "editar_convivencia", this.reunion)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "La convivencia ha sido editada!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });
                    
                });

            }
        },
        mounted(){

            if (this.editMode) {

				this.obtener_detalle()

			}

            let usuario = JSON.parse(localStorage.getItem('usuario'));

            this.axios
            .get(process.env.VUE_APP_API_URL + "zonas_usuario/" + usuario.id)
            .then(response => {
                this.select_zonas = response.data
            });

        }
    }
</script>