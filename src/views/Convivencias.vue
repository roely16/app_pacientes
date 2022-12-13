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
                    <TablaCrud url_delete="eliminar_convivencia" :items="items_tabla" :fields="fields_tabla" showDelete showEdit @editMode="(value) => { 
						titleModal = 'Editar Convivencia'
						showModal = true 
						idConvivencia = value
						editMode = true
					}" @listar="obtener_datos" >
                        <template v-slot:button-add>
							<b-button variant="primary" @click="() => {
								showModal = true
								titleModal = 'Registrar Convivencia'
							}">
								Agregar
								<font-awesome-icon icon="plus" />
							</b-button>
						</template>
                    </TablaCrud>
                </b-col>
            </b-row>
        </b-container>
        <Modal :showModal="showModal" @closeModal="() => { 
            showModal = false 
            editMode = false
            idConvivencia =  null
        }" sizeModal="lg" :titleModal="titleModal">
            <template v-slot:form>
                <FormRegistro @closeModal="() => { showModal = false }" @listar="obtener_datos" :editMode="editMode" :idReunion="idConvivencia"></FormRegistro>
            </template>
        </Modal>
    </div>
</template>

<script>

    import TablaCrud from '@/components/General/TablaCrud.vue'
    import Modal from '@/components/General/Modal.vue'
    import FormRegistro from '@/components/Convivencias/FormRegistro.vue'

    export default {
        components: {
			TablaCrud,
            Modal,
            FormRegistro
		},
        data(){
            return{
                items: [
                    {
                        text: 'Home',
                        href: '#/home'
                    },
                    {
                        text: 'Reuniones con Actores Locales',
                        active: true
                    }
                ],
                items_tabla: [],
                fields_tabla: [],
                showModal: false,
                titleModal: null,
                editMode: false,
                idConvivencia: null,
                tipo_reunion: {}
            }
        },
        methods: {
            obtener_datos(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                let data = {

                    id_usuario: usuario.id,
                    id_categoria: this.$route.params.id
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + 'obtener_convivencias', data)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    this.items_tabla = response.data.items      
                    this.fields_tabla = response.data.fields          
                });

                // Obtener tipo
                this.axios
                .get(process.env.VUE_APP_API_URL + 'tipo_convivencia/' + this.$route.params.id )
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    this.items[1].text = response.data.nombre
                });

            }
        },
        mounted(){

            this.obtener_datos()

        }
    }
</script>