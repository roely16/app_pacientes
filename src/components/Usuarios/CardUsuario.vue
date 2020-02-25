<template>
    <div>
        <b-card>
            <b-row>
                <b-col cols="4">
                    <b-form-group label="Nombre" label-class="font-weight-bold">
                        <label>{{ usuario.nombre }} {{ usuario.apellido }}</label>
                    </b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Usuario" label-class="font-weight-bold">
                        <label>{{ usuario.usuario }}</label>
                    </b-form-group>
                </b-col>
            </b-row>
        </b-card>
    </div>
</template>

<script>
    export default {
        props: {
            usuario: Object
        }
    }
</script>