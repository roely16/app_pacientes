<template>
    <div>
        <b-form @submit.prevent="!editMode ? registrar() : editar()">
            <b-row v-if="editMode" class="mb-3">
                <b-col class="text-right">
                    <b-button @click="editable = !editable" size="sm" variant="primary">
                        <font-awesome-icon icon="edit" />
                    </b-button>
                    <b-button @click="eliminar()" size="sm" class="ml-2" variant="danger">
                        <font-awesome-icon icon="trash-alt" />
                    </b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col cols="6">
                    <b-form-group label-class="font-weight-bold">
                        <template v-slot:label>
                            Fecha de Inicio
                            <strong class="text-danger">*</strong>
                        </template>
                        <date-picker :disabled="!editable" v-model="evento.fecha_inicio" required :config="options"></date-picker>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label-class="font-weight-bold">
                        <template v-slot:label>
                            Fecha de Finalización
                            <strong class="text-danger">*</strong>
                        </template>
                        <date-picker :disabled="!editable" v-model="evento.fecha_fin" required :config="options"></date-picker>
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label-class="font-weight-bold">
                        <template v-slot:label>
                            Hora de Inicio
                            <strong class="text-danger">*</strong>
                        </template>
                        <date-picker :disabled="!editable" v-model="evento.hora_inicio" required :config="options_hora"></date-picker> 
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label-class="font-weight-bold">
                        <template v-slot:label>
                            Hora de Finalización
                            <strong class="text-danger">*</strong>
                        </template>
                        <date-picker :disabled="!editable" v-model="evento.hora_fin" required :config="options_hora"></date-picker> 
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label-class="font-weight-bold">
                        <template v-slot:label>
                            Titulo
                            <strong class="text-danger">*</strong>
                        </template>
                        <b-form-input :disabled="!editable" v-model="evento.titulo" type="text" autocomplete="off" required></b-form-input>    
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label-class="font-weight-bold">
                        <template v-slot:label>
                            Detalle
                            <strong class="text-danger">*</strong>
                        </template>
                        <b-form-textarea :disabled="!editable" v-model="evento.detalle" rows="3" autocomplete="off" required></b-form-textarea>    
                    </b-form-group>
                </b-col>
                <b-col cols="12">
                    <b-form-group label-class="font-weight-bold">
                        <template v-slot:label>
                            Observación
                        </template>
                        <b-form-textarea :disabled="!editable" v-model="evento.observacion" rows="3" autocomplete="off"></b-form-textarea>    
                    </b-form-group>
                </b-col>
                <b-col cols="6">
                    <b-form-group label-class="font-weight-bold">
                        <template v-slot:label>
                            Zona
                            <strong class="text-danger">*</strong>
                        </template>
                        <!-- <b-form-textarea v-model="evento.observacion" rows="3" autocomplete="off"></b-form-textarea>     -->
                        <b-form-select :disabled="!editable" v-model="evento.zona" :options="zonas" required>
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
						<b-button class="mr-2" size="lg" @click="() => { this.$emit('closeModal') }">
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
        components: {
            datePicker
        },
        props: {
            event: {
                type: Object,
            },
            editMode: Boolean,
            idEvento: Number
        },
        data(){
            return{
                options: {
                    format: 'DD/MM/YYYY',
                    useCurrent: false,
                    locale: 'es'
                },
                options_hora: {
                    format: 'HH:mm',
                    useCurrent: false,
                    locale: 'es'
                },
                evento: {
                    fecha_inicio: null,
                    fecha_fin: null,
                    hora_inicio: null,
                    hora_fin: null,
                    titulo: null,
                    detalle: null,
                    observacion: null,
                    zona: null
                },
                zonas: [],
                editable: false
            }
        },
        methods: {
            registrar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + "registrar_evento", this.evento)
                // eslint-disable-next-line no-unused-vars
                .then(response => {

                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "El evento ha sido registrado!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });
                    
                });

            },
            detalle(){

                this.axios
                .get(process.env.VUE_APP_API_URL + "detalle_evento/" + this.idEvento)
                // eslint-disable-next-line no-unused-vars
                .then(response => {

                    this.evento = response.data
                    
                });

            },
            editar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + "editar_evento", this.evento)
                // eslint-disable-next-line no-unused-vars
                .then(response => {

                    console.log(response.data)
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "El evento ha sido editado!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });
                    
                });

            },
            closeModal(){

                this.$emit('closeModal')

            },
            eliminar(){

                // eslint-disable-next-line no-undef
                Swal.fire({
					title: "¿Está seguro?",
					text: "Una vez eliminado no se podrá recuperar!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#3085d6",
					cancelButtonColor: "#d33",
					confirmButtonText: "Si, ELIMINAR!",
					cancelButtonText: "Cancelar"
				}).then(result => {
					if (result.value) {

						this.axios
						.get(process.env.VUE_APP_API_URL + 'eliminar_evento/' + this.evento.id)
						// eslint-disable-next-line no-unused-vars
						.then(response => {
                            
							// eslint-disable-next-line no-undef
							Swal.fire(
								"Excelente!",
								this.message_delete,
								"success"
							).then(() => {
                                this.$emit('listar')
                                this.closeModal()
							});

						});

					}
				});
                
            }
        },
        mounted(){

            if(this.editMode){

                this.detalle()
               

            }else{

                this.editable = true

                let date = this.event.start.split("-")

                this.evento.fecha_inicio = date[2] + "/" + date[1] + "/" + date[0]
                this.evento.fecha_fin = date[2] + "/" + date[1] + "/" + date[0]

                let hours = this.event.start.split(" ")
                let hour = hours[1].split(":")

                this.evento.hora_inicio = hour[0] + ":" + "00"
                this.evento.hora_fin = hour[0] + ":" + "00"

            }

            // Obtener las zonas 
            let usuario = JSON.parse(localStorage.getItem('usuario'))

            this.axios
            .get(process.env.VUE_APP_API_URL + "zonas_usuario/" + usuario.id)
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                // eslint-disable-next-line no-undef
                this.zonas = response.data
            });
        }
    }
</script>