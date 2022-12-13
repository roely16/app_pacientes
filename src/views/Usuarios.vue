<template>
    <div>
		<b-container fluid>
			<b-row class="mt-4">
				<b-col>
					<b-breadcrumb :items="items"></b-breadcrumb>
				</b-col>
			</b-row>

			<b-row>
				<b-col>
					<TablaCrud :url_delete="this.url_delete" :items="items_tabla" :fields="fields_tabla" @listar="listar()" showDetail showEdit showDelete url_detail="detalle_usuario" @editMode="(value) => { 
						titleModal = 'Editar Usuario'
						showModal = true 
						idUsuario = value
						editMode = true
					}">
						<template v-slot:button-add>
							<b-button variant="primary" @click="() => {
								showModal = true
								titleModal = 'Agregar Usuario'
							}">
								Agregar
								<font-awesome-icon icon="plus" />
							</b-button>
						</template>
					</TablaCrud>
				</b-col>
			</b-row>
		</b-container>

		<Modal 
			:showModal="showModal" 
			:titleModal="titleModal"
			@closeModal="() => {
				showModal = false
				editMode = false
				idUsuario = null
			}
		">
			<template v-slot:form>
				<FormUsuario ref="formUsuario" @closeModal="() => { showModal = false }" @listar="listar()" :editMode="editMode" :idUsuario="idUsuario"/>
			</template>
		</Modal>

	</div>    
</template>

<script>

	import TablaCrud from '@/components/General/TablaCrud.vue'
	import Modal from '@/components/General/Modal.vue'
	import FormUsuario from '@/components/Usuarios/FormUsuario.vue'

    export default {
		components: {
			TablaCrud,
			Modal,
			FormUsuario
		},
        data(){
			return{
				items: [
                    {
                        text: 'Home',
                        href: '#/home'
                    },
                    {
                        text: 'Usuarios',
                        active: true
                    }
				],
				url_delete: "eliminar_usuario",
				showModal: false,
				titleModal: null,
				items_tabla: [],
				fields_tabla: [],
				editMode: false,
				idUsuario: null
			}
		},
		methods: {
			
			listar(){

				let usuario = JSON.parse(localStorage.getItem('usuario'))

				this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_usuarios/" + usuario.id)
				.then(response => {
					this.items_tabla = response.data.items
					this.fields_tabla = response.data.fields
				});

			}
			
		},
		mounted(){

			this.listar()

		}
    }
</script>