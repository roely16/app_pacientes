<template>
    <div>
        <b-row>
            <b-col>
                <b-input-group class="mb-3">
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
                }">
					Agregar
                    <font-awesome-icon icon="plus" />
                </b-button>
            </b-col>
        </b-row>
       <b-row>
           <b-col>
               <b-table 
                    :filter="busqueda"
					striped 
					hover 
					:items="medios_contacto" 
					:fields="fields"
					show-empty
					empty-text="Aún no se han registrado medios de contacto."
					empty-filtered-text="No se han encontrado registros que coincidan con su búsqueda."
                    :perPage="perPage"
					:currentPage="currentPage"
                    @filtered="onFiltered"
				>
                   <template v-slot:cell(estado)="data">
                        <!-- {{ data }} -->
                        <b-badge v-if="data.item.estado == 'A'" variant="success">ACTIVO</b-badge>
                        <b-badge v-if="data.item.estado == 'I'" variant="danger">INACTIVO</b-badge>

                    </template>

					<template v-slot:cell(action)="data">

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

       <FormRegistro :showModal="showModal" @closeModal="closeModal" :editMode="editMode" :idMedioContacto="idMedioContacto" @listar="listar"/>
       
    </div> 

</template>

<script>

    import FormRegistro from '@/components/MediosContacto/FormRegistro'

    export default {
        components: {
            FormRegistro
        },
        data() {
            return {
                medios_contacto: [],
                fields: [],
                busqueda: null,
                showModal: false,
                editMode: false,
                idMedioContacto: null,
                currentPage: 1,
                rows: null,
                perPage: 5
            }
        },
        methods: {
            closeModal(){
                this.showModal = false
                this.editMode = false,
                this.idMedioContacto = null
            },
            listar(){

                this.axios
                .get(process.env.VUE_APP_API_URL + "obtener_medios_contacto/" + this.$route.params.id)
                .then(response => {
                    this.medios_contacto = response.data.items
                    this.fields = response.data.fields
                    this.rows = this.medios_contacto.length
                });

			},
			detalle(id){

                this.showModal = true
                this.editMode = true
                this.idMedioContacto = id

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
						.get(process.env.VUE_APP_API_URL + "eliminar_medio_contacto/" + id)
						// eslint-disable-next-line no-unused-vars
						.then(response => {
							// eslint-disable-next-line no-undef
							Swal.fire(
								"Excelente!",
								"El medio de contacto ha sido eliminado!",
								"success"
							).then(() => {
								this.listar();
							});
						});

					}
				});

            },
            onFiltered(filteredItems) {
				// Trigger pagination to update the number of buttons/pages due to filtering
				this.rows = filteredItems.length;
				this.currentPage = 1;
			},
        },
        mounted(){
            this.listar()
        }
    }
</script>