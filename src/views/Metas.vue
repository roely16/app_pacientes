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
                    <TablaCrud :items="metas" :fields="fields" :url_delete="this.url_delete" showEdit showDelete @listar="listar" @editMode="(value) => { 
						titleModal = 'Editar Meta'
						showModal = true 
						idMeta = value
						editMode = true
					}">
                        <template v-slot:button-add>
							<b-button variant="primary" @click="() => {
								showModal = true
								titleModal = 'Agregar Metas'
							}">
								Agregar
								<font-awesome-icon icon="plus" />
							</b-button>
						</template>
                    </TablaCrud>
                </b-col>
            </b-row>
        </b-container>
        <Modal :showModal="showModal" :titleModal="titleModal" sizeModal="md" @closeModal="closeModal">
            <template v-slot:form>
                <FormRegistro @closeModal="closeModal" @listar="listar" :editMode="editMode" :idMeta="idMeta" />
            </template>
        </Modal>
    </div>    
</template>

<script>

    import TablaCrud from '@/components/General/TablaCrud'
    import Modal from '@/components/General/Modal'
    import FormRegistro from '@/components/Metas/FormRegistro.vue'

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
                        text: 'Metas',
                        active: true
                    }
                ],
                metas: [],
                fields: [],
                showModal: false,
                titleModal: null,
                url_delete: 'eliminar_meta',
                editMode: false,
                idMeta: null
            }
        },
        methods: {

            closeModal(){

                this.showModal = false

            },
            listar(){

                let usuario = JSON.parse(localStorage.getItem('usuario'))

                this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_metas/" + usuario.id)
				// eslint-disable-next-line no-unused-vars
				.then(response => {
                    this.metas = response.data.items
                    this.fields = response.data.fields
				});

            }

        },
        mounted(){

            this.listar()

        }
    }
</script>