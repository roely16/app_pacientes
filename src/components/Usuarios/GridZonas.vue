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
                    <b-form-input v-model="busqueda"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col class="text-right">
                <b-button variant="primary" @click="() => {
                        showModal = true
                        titleModal = 'Agregar Zonas'
                    }">
                    Agregar
                    <font-awesome-icon icon="plus" />
                </b-button>
            </b-col>
        </b-row>  

        <b-row>
            <b-col cols="2" v-for="(zona, key) in zonas" :key="key" class="mb-2">
                <b-card no-body bg-variant="secondary" text-variant="white" class="p-0 text-center">
                    <b-card-body class="p-0">
                        <b-row>
                            <b-col cols="12">
                                <h1>{{ zona.zona }}</h1>
                            </b-col>
                            
                        </b-row>
                    </b-card-body>
                    <b-card-footer class="p-0 text-right pr-2"><font-awesome-icon icon="trash" @click="eliminar(zona)" /></b-card-footer>
                </b-card>
            </b-col>
        </b-row>  

        <Modal :showModal="showModal" @closeModal="closeModal" :titleModal="titleModal">
            <template v-slot:form>
                <FormAgregarZona  @closeModal="closeModal" @listar="obtener_zonas()"></FormAgregarZona>
            </template>
        </Modal>

    </div>    
</template>

<script>

    import Modal from '@/components/General/Modal.vue'
    import FormAgregarZona from '@/components/Usuarios/FormAgregarZona.vue'

    export default {
        components: {
            Modal,
            FormAgregarZona
        },
        data(){
            return{
                busqueda: null,
                zonas: [],
                showModal: false,
                titleModal: null
            }
        },
        methods: {
            obtener_zonas(){

                this.axios
                .get(process.env.VUE_APP_API_URL + "t_zonas_usuario/" + this.$route.params.id)
                .then(response => {
                    this.zonas = response.data.items
                });

            },
            eliminar(zona){

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
						.post(process.env.VUE_APP_API_URL + "eliminar_zona_usuario", zona)
						// eslint-disable-next-line no-unused-vars
						.then(response => {
							//eslint-disable-next-line no-undef
							Swal.fire(
								"Excelente!",
								"El medio de contacto ha sido eliminado!",
								"success"
							).then(() => {
								this.obtener_zonas()
                            });
						});

					}
				});
            },
            closeModal(){

                this.showModal = false

            }
        },
        mounted(){
            
            this.obtener_zonas()

        }
    }
</script>