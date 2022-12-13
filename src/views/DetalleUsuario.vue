<template>
    <div>
        <b-container>
            <b-row class="mt-4">
				<b-col>
					<b-breadcrumb :items="items"></b-breadcrumb>
				</b-col>
			</b-row>

            <b-row>
                <b-col>
                    <CardUsuario :usuario="usuario" />
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="Zonas" active>
                                <GridZonas />
                            </b-tab>
                            <b-tab title="Accesos">
                                <TablaCrud :items="items_tabla" :fields="fields_tabla" showDelete deletePost @listar="listar()" :url_delete="url_delete">
                                    <template v-slot:button-add>
                                        <b-button variant="primary" @click="() => {
                                            showModal = true
                                            titleModal = 'Agregar Acceso'
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

        <Modal :showModal="showModal" :titleModal="titleModal" @closeModal="closeModal">
            <template v-slot:form>
                <FormAgregarAcceso @listar="listar" @closeModal="closeModal" />
            </template>
        </Modal>
    </div>    
</template>

<script>

    import CardUsuario from '@/components/Usuarios/CardUsuario.vue'
    import GridZonas from '@/components/Usuarios/GridZonas'
    import TablaCrud from '@/components/General/TablaCrud'
    import Modal from '@/components/General/Modal'
    import FormAgregarAcceso from '@/components/Usuarios/FormAgregarAcceso.vue'

    export default {
        components: {
            CardUsuario,
            GridZonas,
            TablaCrud,
            Modal,
            FormAgregarAcceso
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
                        href: '#/home/usuarios'
                    },
                    {
                        text: 'Usuario',
                        active: true
                    }
                ],
                usuario: {},
                items_tabla: [],
                fields_tabla: [],
                showModal: false,
                titleModal: null,
                url_delete: "eliminar_acceso"
            }
        },
        methods: {

            detalle(){

                this.axios
                .get(process.env.VUE_APP_API_URL + "detalle_usuario/" + this.$route.params.id)
                .then(response => {
                    this.usuario = response.data
                    this.items[2].text = response.data.nombre + " " + response.data.apellido
                });
            },
            listar(){

                this.axios
				.get(process.env.VUE_APP_API_URL + "obtener_accesos/" + this.$route.params.id)
				.then(response => {
					this.items_tabla = response.data.items
					this.fields_tabla = response.data.fields
				});

            },
            closeModal(){

                this.showModal = false

            }

        },
        mounted(){

            this.detalle()
            this.listar()

        }
    }
</script>