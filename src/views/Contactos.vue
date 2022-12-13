<template>
	<div>
		<b-container fluid>

			<b-row class="mt-4">
                <b-col>
                    <b-breadcrumb :items="items"></b-breadcrumb>
                </b-col>
            </b-row>

			<b-row>
				<b-col cols="4">
					<b-input-group>
						<template v-slot:append>
						<b-input-group-text>
							<font-awesome-icon icon="search" />
						</b-input-group-text>
						</template>
						<b-form-input v-model="busqueda"></b-form-input>
					</b-input-group>
				</b-col>
				<b-col class="text-right">
					<b-button variant="primary" @click="() => {
						showModal = true
						editMode = false
						titleModal = 'Agregar Paciente'
					}">
						Agregar Paciente
						<font-awesome-icon icon="plus" />
					</b-button>
				</b-col>
			</b-row>

			<b-row class="mt-4">
				<b-col>
					<b-table
						:filter="busqueda"
						striped
						hover
						:items="personas"
						:fields="fields"
						show-empty
						empty-text="Aún no se han registrado personas."
						empty-filtered-text="No se han encontrado registros que coincidan con su búsqueda."
						:perPage="perPage"
						:currentPage="currentPage"
						@filtered="onFiltered"
						stacked="lg"
						:busy="isLoading"
					>

						<template v-slot:table-busy>
							<div class="text-center text-secondary my-2">
							<b-spinner class="align-middle"></b-spinner>
							<br>
							<strong>Cargando...</strong>
							</div>
						</template>

						<template v-slot:cell(estado)="data">							
							<b-badge v-if="data.item.status == 'S'" variant="warning">SÍNTOMA</b-badge>

							<b-badge v-if="data.item.status == 'C'" variant="danger">CONFIRMADO</b-badge>
						</template>

						<template v-slot:cell(clasificacion)="data">
							<div :style="'background-color: ' + data.item.color + '; width: 20px; height: 20px; display: inline-block'"></div>
						</template>

						<template v-slot:cell(action)="data">
							<!-- <b-button variant="secondary" size="sm" class="mr-2" :to="{ name: 'detalle_contacto', params: {id: data.item.id}}">
								<font-awesome-icon icon="info-circle" />
							</b-button> -->
							<b-button variant="primary" size="sm" class="mr-2" @click="detalle(data.item.id)">
								<font-awesome-icon icon="edit" />
							</b-button>
							<b-button variant="danger" size="sm" @click="eliminar(data.item.id)">
								<font-awesome-icon icon="trash" />
							</b-button>
						</template>
					</b-table>
				</b-col>
			</b-row>

			<b-row v-if="rows > perPage">
				<b-col>
					<b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center"></b-pagination>
				</b-col>
			</b-row>
		</b-container>

		<FormRegistro :showModal="showModal"  @closeModal="closeModal" :editMode="editMode" :idPersona="id_persona" @listar="listar" :titleModal="titleModal" />

	</div>
</template>

<script>

	import FormRegistro from '@/components/Contactos/FormRegistro'

	export default {

		components: {
			FormRegistro
		},

		data() {
			return {
				busqueda: "",
				personas: [],
				fields: [],
				showModal: false,
				editMode: false,
				id_persona: null,
				currentPage: 1,
				rows: null,
				perPage: 10,
				isLoading: false,
				titleModal: '',
				items: [
                    {
                        text: 'Home',
                        href: '#/home'
                    },
                    {
                        text: 'Pacientes',
                        active: true
                    }
                ],
			};
		},
		methods: {
			listar() {

				this.isLoading = true

				let usuario = JSON.parse(localStorage.getItem('usuario'));

				this.axios
				.get(process.env.VUE_APP_API_URL + "listar_personas/" + usuario.id)
				.then(response => {
					this.personas = response.data.items;
					this.fields = response.data.fields;
					this.rows = this.personas.length;
					this.isLoading = false
				});

			},
			eliminar(id) {

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
						.get(process.env.VUE_APP_API_URL + "eliminar_persona/" + id)
						// eslint-disable-next-line no-unused-vars
						.then(response => {
							// eslint-disable-next-line no-undef
							Swal.fire(
								"Excelente!",
								"La persona ha sido eliminada!",
								"success"
							).then(() => {
								this.listar();
							});
						});

					}
				});

			},
			detalle(id){
				this.showModal = true
				this.editMode = true
				this.id_persona = id
				this.titleModal = 'Editar Paciente'
			},
			onFiltered(filteredItems) {
				// Trigger pagination to update the number of buttons/pages due to filtering
				this.rows = filteredItems.length;
				this.currentPage = 1;
			},
			closeModal(){
				this.showModal = false
				this.editMode = false
				this.id_persona = null
			}
		},
		mounted() {
			this.listar();
		}
	};
</script>
