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
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="Profesiones" active>
                                <TablaCrud :items="items_profesiones" :fields="fields_profesiones" showDelete showEdit :url_delete="url_delete_profesion" @listar="obtener_profesiones" @editMode="(value) => {
                                    showModal = true
                                    titleModal = 'Editar Profesión'
                                    form = 'profesion'
                                    idProfesion = value
                                    editMode = true
                                }">
                                    
                                    <template v-slot:button-add>
                                        <b-button variant="primary" @click="() => {
                                            showModal = true
                                            titleModal = 'Agregar Profesión'
                                            form = 'profesion'
                                            titleModal = 'Agregar Profesión'
                                        }">
                                            Agregar
                                            <font-awesome-icon icon="plus" />
                                        </b-button>
                                    </template>
                                
                                </TablaCrud>
                            </b-tab>
                            <b-tab title="Vías de Contacto">
                                <TablaCrud :items="items_vias" :fields="fields_vias" showDelete showEdit :url_delete="url_delete_vias_contacto" @listar="obtener_vias_contacto" @editMode="(value) => {
                                    showModal = true
                                    titleModal = 'Editar Vía de Contacto'
                                    form = 'via_contacto'
                                    idVia = value
                                    editMode = true
                                }">
                                    <template v-slot:button-add>
                                        <b-button variant="primary" @click="() => {
                                            showModal = true
                                            titleModal = 'Agregar Via de Contacto'
                                            form = 'via_contacto'
                                            titleModal = 'Agregar Via de Contacto'
                                        }">
                                            Agregar
                                            <font-awesome-icon icon="plus" />
                                        </b-button>
                                    </template>
                                </TablaCrud>
                            </b-tab>
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>

		</b-container>    

        <Modal :showModal="showModal" @closeModal="closeModal" :titleModal="titleModal">
            <template v-slot:form>
                <FormRegistroP @closeModal="closeModal" @listar="obtener_profesiones" v-if="form == 'profesion'" :editMode="editMode" :idProfesion="idProfesion" />
                <FormRegistroV @closeModal="closeModal" @listar="obtener_vias_contacto" v-if="form == 'via_contacto'" :editMode="editMode" :idVia="idVia" />
            </template>
        </Modal>
	</div>    
</template>

<script>

    import TablaCrud from '@/components/General/TablaCrud.vue'
    import Modal from '@/components/General/Modal.vue'
    import FormRegistroP from '@/components/Profesiones/FormRegistro.vue'
    import FormRegistroV from '@/components/ViaContacto/FormRegistro.vue'

    export default {
        components: {
            TablaCrud,
            Modal,
            FormRegistroP,
            FormRegistroV
        },
        data(){
			return{
				items: [
                    {
                        text: 'Home',
                        href: '#/home'
                    },
                    {
                        text: 'Catálogos',
                        active: true
                    }
                ],
                items_profesiones: [],
                fields_profesiones: [],
                items_vias: [],
                fields_vias: [],
                url_delete_profesion: 'eliminar_profesion',
                url_delete_vias_contacto: 'eliminar_via_contacto',
                form: null,
                showModal: false,
                titleModal: null,
                idProfesion: null,
                idVia: null,
                editMode: false
			}
        },
        methods: {
            obtener_profesiones(){

                this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_profesiones")
				.then(response => {
                    this.items_profesiones = response.data.items
                    this.fields_profesiones = response.data.fields
                });
                
            },
            obtener_vias_contacto(){

                this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_vias_contacto")
				.then(response => {
                    this.items_vias = response.data.items
                    this.fields_vias = response.data.fields
                });

            },
            closeModal(){

                this.showModal = false

            }
        },
        mounted(){

            this.obtener_profesiones()
            this.obtener_vias_contacto()

        }
    }
</script>