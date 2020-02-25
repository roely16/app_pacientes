<template>
    <div>
        <b-form @submit.prevent="!editMode ? registrar() : editar()">
            <b-row>
                <b-col cols="12">
                    <b-form-group label="Nombre" label-class="font-weight-bold">
						<b-form-input type="text" v-model="profesion.nombre" autocomplete="off" required></b-form-input>    
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
    export default {
        props: {
            editMode: {
				type: Boolean,
				default: false
			},
			idProfesion: Number
        },
        data(){
            return{
                profesion: {
                
                }
            }
        },
        methods: {
            registrar(){

                this.axios
				.post(process.env.VUE_APP_API_URL + "registrar_profesion", this.profesion)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "La profesión ha sido registrada!",
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
            detalle(){

                this.axios
				.get(process.env.VUE_APP_API_URL + "detalle_profesion/" + this.idProfesion)
				.then(response => {
                    this.profesion = response.data
                });

            },
            editar(){

                this.axios
				.post(process.env.VUE_APP_API_URL + "editar_profesion", this.profesion)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    //eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "La profesión ha sido editada!",
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

				this.detalle()

			}

        }
    }
</script>