<template>
    <div>
        <b-form @submit.prevent="registrar()">
            <b-row>
                <b-col v-for="(zona, key) in zonas" :key="key" cols="2" class="mb-2">
                    <b-button :variant="!zona.selected ? 'outline-secondary' : 'success'" :pressed="zona.selected" block @click="() => {
                        zona.selected = !zona.selected    
                    }">{{ zona.zona }}</b-button>
                </b-col>
            </b-row>
            <b-row class="mt-4" v-if="!loading">
                <b-col>
                    <b-col class="text-center">
                        <b-button class="mr-2" size="lg" @click="closeModal()">
                            Cancelar
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                        <b-button variant="success" size="lg" type="submit" :disabled="zonas_seleccionadas.length <= 0">
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
        data(){
            return{
                zonas: [],
                loading: false
            }
        },
        methods: {

            zonas_disponibles(){

                this.loading = true

                this.axios
                .get(process.env.VUE_APP_API_URL + "zonas_disponibles_usuario/" + this.$route.params.id)
                .then(response => {
                    this.zonas = response.data
                    this.loading = false
                });

            },
            closeModal(){

                this.$emit('closeModal')

            },
            registrar(){

                let data = {
                    zonas: this.zonas_seleccionadas,
                    id_usuario: this.$route.params.id
                }

                this.axios
                .post(process.env.VUE_APP_API_URL + "registrar_zonas_usuario", data)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "Se le han brindado permisos a las zonas seleccionadas!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
					});
                });

            }

        },
        computed: {

            zonas_seleccionadas: function(){

                let result = []
                    
                result = this.zonas.filter( zona => zona.selected == true )

                return result

               
            }

        },
        mounted(){

            this.zonas_disponibles()

        }
    }
</script>