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
                    <CardContacto :contacto="contacto" />
                </b-col>
            </b-row>

            <b-row class="mt-4">
                <b-col>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="Medio de Contacto" active>
                                <Tabla />
                            </b-tab>
                            <!-- <b-tab title="Historial"><p>Historial</p></b-tab> -->
                        </b-tabs>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>    
    </div>    
</template>

<script>

    import CardContacto from '@/components/Contactos/CardContacto'
    import Tabla from '@/components/MediosContacto/Tabla'

    export default {
        components: {
            CardContacto,
            Tabla
        },
        data() {
            return {
                items: [
                    {
                        text: 'Home',
                        href: '#/home'
                    },
                    {
                        text: 'Contactos',
                        href: '#/home/contactos'
                    },
                    {
                        text: 'Library',
                        active: true
                    }
                ],
                contacto: {}
            }
        },
        methods: {
            detalle(){
                
                this.axios
                .get(process.env.VUE_APP_API_URL + "detalle_persona/" + this.$route.params.id)
                .then(response => {
                    this.contacto = response.data.detalle
                    this.items[2].text = response.data.detalle.nombre + " " + response.data.detalle.apellido
                });

            }
        },
        mounted(){
            this.detalle()
        }
    }
</script>