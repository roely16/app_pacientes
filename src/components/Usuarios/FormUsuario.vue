<template>
    <div>
		<b-form @submit.prevent="!editMode ? registrar() : editar()">
			<b-row>
				<b-col cols="12">
					<b-form-group label="Nombres" label-class="font-weight-bold">
						<b-form-input type="text" v-model="usuario.nombre" autocomplete="off" required></b-form-input>    
					</b-form-group>
				</b-col>
				<b-col cols="12">
					<b-form-group label="Apellidos" label-class="font-weight-bold">
						<b-form-input type="text" v-model="usuario.apellido" autocomplete="off" required></b-form-input>    
					</b-form-group>
				</b-col>
				<b-col cols="12">
					<b-form-group label="Usuario" label-class="font-weight-bold">
						<b-form-input type="text" v-model="usuario.usuario" autocomplete="off" required></b-form-input>    
					</b-form-group>
				</b-col>
				<b-col cols="12">
					<b-form-group label="Contraseña" label-class="font-weight-bold">
						<b-input-group>
							<template v-slot:append>
								<b-button @click="() => {
									showPass = !showPass}">
									<font-awesome-icon :icon="!showPass ? 'eye' : 'eye-slash'" />
								</b-button>
							</template>
							<b-form-input :type="showPass ? 'text' : 'password'" v-model="usuario.password" autocomplete="off" required></b-form-input>  
						</b-input-group>  
					</b-form-group>
				</b-col>
				<b-col cols="12">
					<b-form-group label="Repite Contraseña" label-class="font-weight-bold">
						<b-input-group>
							<template v-slot:append>
								<b-button @click="() => {
									showPass2 = !showPass2}">
									<font-awesome-icon :icon="!showPass2 ? 'eye' : 'eye-slash'" />
								</b-button>
							</template>
							<b-form-input :type="showPass2 ? 'text' : 'password'" v-model="usuario.repite_password" autocomplete="off" required></b-form-input>  
						</b-input-group>  
					</b-form-group>
				</b-col>
			</b-row>
			<b-row>
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
			idUsuario: Number
		},	
		data(){
			return{
				show: false,
				usuario: {},
				showPass: false,
				showPass2: false
			}
		},
		methods: {
			closeModal(){
				this.$emit('closeModal')
			},
			registrar(){

				this.axios
                .post(process.env.VUE_APP_API_URL + "registrar_usuario", this.usuario)
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
			obtenerDetalle(){

				this.axios
				.get(process.env.VUE_APP_API_URL + "detalle_usuario/" + this.idUsuario)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
					// eslint-disable-next-line no-undef
					this.usuario = response.data
				});

			},
			editar(){

				this.axios
                .post(process.env.VUE_APP_API_URL + "actualizar_usuario", this.usuario)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "El usuario ha sido actualizado!",
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

				this.obtenerDetalle()

			}

		}
    }
</script>