<template>
	<div>
		<b-row>
			<b-col cols="4">
				<b-input-group class="mb-3">
                    <template v-slot:append>
						<b-input-group-text>
							<font-awesome-icon icon="search" />
						</b-input-group-text>
                    </template>
                    <b-form-input v-model="busqueda" autocomplete="off"></b-form-input>
                </b-input-group>
			</b-col>
			<b-col class="text-right">
				<slot name="button-add"></slot>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-table 
					:filter="busqueda"
					striped 
					hover 
					:items="items" 
					:fields="fields"
					show-empty
					:empty-text="table_empty_text"
					empty-filtered-text="No se han encontrado registros que coincidan con su búsqueda."
                    :perPage="perPage"
					:currentPage="currentPage"
					@filtered="onFiltered"
				>
					<template v-slot:cell(action)="data">

						<b-button v-if="showDetail" variant="secondary" size="sm" class="mr-2" :to="{ name: url_detail, params: {id: data.item.id}}">
							<font-awesome-icon icon="info-circle" />
						</b-button>

                        <b-button v-if="showEdit" variant="primary" size="sm" class="mr-2" @click="detalle(data.item.id)">
                            <font-awesome-icon icon="edit" />
                        </b-button>
                        <b-button v-if="showDelete" variant="danger" size="sm" @click="!deletePost ? eliminar(data.item.id) : eliminar_post(data.item)">
                            <font-awesome-icon icon="trash" />
                        </b-button>
                    </template>

					

				</b-table>
			</b-col>
		</b-row>

		<b-row v-if="items.length > perPage">
			<b-col>
				<b-pagination v-model="currentPage" :total-rows="items.length" :per-page="perPage" align="center"></b-pagination>
			</b-col>
		</b-row>

	</div>
</template>

<script>
    export default {
		props: {
			url_delete: {
				type: String,
				default: ""
			},
			message_delete: {
				type: String,
				default: "El registro ha sido eliminado!"
			},
			items: Array,
			fields: Array,
			url_detail: String,
			showDetail: {
				type: Boolean,
				default: false
			},
			showEdit: {
				type: Boolean,
				default: false
			},
			showDelete: {
				type: Boolean,
				default: false
			},
			deletePost: {
				type: Boolean,
				default: false
			},
			table_empty_text: {
				type: String,
				default: 'Aún no existen registros.'
			}
		},
        data(){
			return{
				
				busqueda: null,
				rows: null,
				perPage: 10,
				currentPage: 1
			}
		},
		methods: {
			detalle(id){

				this.$emit('editMode', id)

			},
			eliminar(id){

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
						.get(process.env.VUE_APP_API_URL + this.url_delete + "/" + id)
						// eslint-disable-next-line no-unused-vars
						.then(response => {
							// eslint-disable-next-line no-undef
							Swal.fire(
								"Excelente!",
								this.message_delete,
								"success"
							).then(() => {
								this.$emit('listar')
							});
						});

					}
				});
			},
			eliminar_post(item){

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
						.post(process.env.VUE_APP_API_URL + this.url_delete, item)
						// eslint-disable-next-line no-unused-vars
						.then(response => {
							// eslint-disable-next-line no-undef
							Swal.fire(
								"Excelente!",
								this.message_delete,
								"success"
							).then(() => {
								this.$emit('listar')
							});

						});

					}
				});

			},
			onFiltered(filteredItems) {
				this.rows = filteredItems.length;
				this.currentPage = 1;
			},
		},
    }
</script>