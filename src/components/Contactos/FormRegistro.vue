<template>
        <b-modal
            ref="modal"
            id="modal"
            :title="titleModal"
            size="xl"
            hide-footer
            v-model="showModal5"
            @hidden="closeModal"
        >
            <b-form @submit.prevent="!editMode ? registrar() : editar()">
                <b-row>
                    <b-col cols="4">
                        <b-form-group label="Tipo" label-class="font-weight-bold">
                            <template v-slot:label>
                                Tipo
                                <strong class="text-danger">*</strong>
                            </template>
                            <b-form-select
                                v-model="persona.id_tipo"
                                :options="select_tipo"
                                :disabled="readOnly"
                                value-field="id"
                                text-field="nombre"
                                required
                            >
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled
                                        >-- Seleccione una opción
                                        --</b-form-select-option
                                    >
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Nombres" label-class="font-weight-bold">
                            <template v-slot:label>
                                Nombres
                                <strong class="text-danger">*</strong>
                            </template>
                            <b-form-input
                                type="text"
                                v-model="persona.nombre"
                                autocomplete="off"
                                :disabled="readOnly"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Apellidos" label-class="font-weight-bold">
                            <template v-slot:label>
                                Apellidos
                                <strong class="text-danger">*</strong>
                            </template>
                            <b-form-input
                                type="text"
                                v-model="persona.apellido"
                                autocomplete="off"
                                :disabled="readOnly"
                                required
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Apellido de Casada" label-class="font-weight-bold">
                            <b-form-input
                                type="text"
                                v-model="persona.apellido_casada"
                                autocomplete="off"
                                :disabled="readOnly"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Estado Civil" label-class="font-weight-bold">
                            <template v-slot:label>
                                Estado Civil
                                <strong class="text-danger">*</strong>
                            </template>
                            <b-form-select
                                v-model="persona.estado_civil"
                                :options="select_estado"
                                :disabled="readOnly"
                                required
                            >
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled
                                        >-- Seleccione una opción
                                        --</b-form-select-option
                                    >
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Genero" label-class="font-weight-bold">
                            <template v-slot:label>
                                Género
                                <strong class="text-danger">*</strong>
                            </template>
                            <b-form-select
                                v-model="persona.genero"
                                :options="select_genero"
                                :disabled="readOnly"
                                required
                            >
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled
                                        >-- Seleccione una opción
                                        --</b-form-select-option
                                    >
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Fecha de Nacimiento" label-class="font-weight-bold">
                            <b-form-input
                                type="date"
                                autocomplete="off"
                                v-model="persona.fecha_nacimiento"
                                :disabled="readOnly"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="No. de DPI" label-class="font-weight-bold">
                            <b-form-input
                                type="text"
                                v-model="persona.no_dpi"
                                :disabled="readOnly"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Dirección" label-class="font-weight-bold">
                            <b-form-textarea
                                type="text"
                                v-model="persona.direccion"
                                :disabled="readOnly"
                                autocomplete="off"
                            ></b-form-textarea>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="No. de Casa" label-class="font-weight-bold">
                            <b-form-input
                                type="text"
                                v-model="persona.no_casa"
                                :disabled="readOnly"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Zona" label-class="font-weight-bold">
                            <template v-slot:label>
                                Zona
                                <strong class="text-danger">*</strong>
                            </template>
                            <b-form-select
                                v-model="persona.zona"
                                :options="select_zona"
                                :disabled="readOnly"
                                @change="zona_select()"
                                required
                            >
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled
                                        >-- Seleccione una opción
                                        --</b-form-select-option
                                    >
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Colonia" label-class="font-weight-bold">
                            <b-form-input
                                type="text"
                                v-model="persona.colonia"
                                :disabled="readOnly"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Habitantes" label-class="font-weight-bold">
                            <b-form-input
                                type="number"
                                v-model="persona.habitantes"
                                :disabled="readOnly"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Referido por" label-class="font-weight-bold">
                            <b-form-input
                                type="text"
                                v-model="persona.referido_por"
                                :disabled="readOnly"
                                autocomplete="off"
                            ></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Profesión u Oficio" label-class="font-weight-bold">
                            <!-- <b-form-input type="text" v-model="persona.profesion" autocomplete="off"></b-form-input> -->
                            <b-form-select
                                v-model="persona.profesion"
                                :options="profesiones"
                                :disabled="readOnly"
                            >
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled
                                        >-- Seleccione una opción
                                        --</b-form-select-option
                                    >
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Via de Contacto" label-class="font-weight-bold">
                            <template v-slot:label>
                                Via de Contacto
                                <strong class="text-danger">*</strong>
                            </template>
                            <!-- <b-form-textarea required v-model="persona.motivo"></b-form-textarea> -->
                            <b-form-select
                                v-model="persona.motivo"
                                :options="vias_contacto"
                                :disabled="readOnly"
                                required
                            >
                                <template v-slot:first>
                                    <b-form-select-option :value="null" disabled
                                        >-- Seleccione una opción
                                        --</b-form-select-option
                                    >
                                </template>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="4">
                        <b-form-group label="Estado" label-class="font-weight-bold">
                            <b-form-select
                                v-model="persona.status"
                                :options="select_status"
                                :disabled="readOnly"
                            ></b-form-select>
                        </b-form-group>
                    </b-col>
                    <b-col cols="3">
                        <b-form-group label="Clasificación" label-class="font-weight-bold">
                            <b-dropdown text="Seleccione una opción" variant="outline-secondary" toggle-class="text-decoration-none" no-caret block>
                                <template v-slot:button-content>
                                    <span v-if="!persona.clasificacion">Seleccione una opción</span>
                                    <b-row v-if="persona.clasificacion">
                                        <b-col cols="2">
                                            <div :style="'background-color: ' + persona.clasificacion.color + '; width: 10px; height: 10px; display: inline-block'"></div>
                                        </b-col>
                                        <b-col class="text-left">
                                            {{ persona.clasificacion.nombre }}
                                        </b-col>
                                    </b-row>
                                </template>
                                <b-dropdown-item v-for="(clasificacion, key) in clasificaciones_zona" :key="key" @click="select_clasificacion(clasificacion)">
                                    <b-row>
                                        <b-col cols="2">
                                            <div :style="'background-color: ' + clasificacion.color + '; width: 10px; height: 10px; display: inline-block'"></div>
                                        </b-col>
                                        <b-col>
                                            {{ clasificacion.nombre }}
                                        </b-col>
                                    </b-row>
                                    
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row v-if="!readOnly">
                    <b-col>
                        <strong class="text-danger"
                            >Campos Obligatorios *</strong
                        >
                    </b-col>
                </b-row>
                <b-row class="mt-4" v-if="!readOnly">
                    <b-col class="text-center">
                        <b-button class="mr-2" size="lg" @click="closeModal()">
                            Cancelar
                            <font-awesome-icon icon="times-circle" />
                        </b-button>
                        <b-button variant="success" size="lg" type="submit">
                            Guardar
                            <font-awesome-icon icon="save" />
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-modal>
</template>

<script>
export default {
    name: 'FormRegistro',
    props: {
        showModal: {
            type: Boolean,
            default: false
        },
        editMode: {
            type: Boolean,
            default: false
        },
        idPersona: {
            type: Number,
            default: null
        },
        readOnly: {
            type: Boolean,
            default: false
        },
        titleModal: {
            type: String,
            default: ''
        }
    },
    data(){
        return{
            showModal5: false,
            profesiones: [],
			vias_contacto: [],
			persona: {
                id_tipo: null,
				nombre: null,
				apellido: null,
				apellido_casada: null,
				estado_civil: null,
				genero: null,
				fecha_nacimiento: null,
				no_dpi: null,
				direccion: null,
				no_casa: null,
				zona: null,
				colonia: null,
				habitantes: null,
				referido_por: null,
				profesion: null,
				motivo: null,
				status: "A",
                edit: false,
                clasificacion: {}
			},
			select_estado: [
				{ value: "S", text: "Soltero(a)" },
				{ value: "C", text: "Casado(a)" }
			],
			select_genero: [
				{ value: "M", text: "Masculino" },
				{ value: "F", text: "Femenino" }
			],
			select_status: [
				{ value: "A", text: "Activo" },
				{ value: "I", text: "Inactivo" }
			],
            select_zona: [],
            select_tipo: [],
            clasificaciones_zona: []
        }
    },
    methods: {
        reset() {
            this.persona = {
                id_tipo: null,
                nombre: null,
                apellido: null,
                apellido_casada: null,
                estado_civil: null,
                genero: null,
                fecha_nacimiento: null,
                no_dpi: null,
                direccion: null,
                no_casa: null,
                zona: null,
                colonia: null,
                habitantes: null,
                referido_por: null,
                profesion: null,
                motivo: null,
                status: "A",
                edit: false,
            };
        },
        registrar() {

            this.axios
            .post(process.env.VUE_APP_API_URL + "registrar", this.persona)
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                // eslint-disable-next-line no-undef
                Swal.fire(
                    "Excelente!",
                    "La persona ha sido registrada!",
                    "success"
                ).then(() => {
                    this.listar()
                    this.closeModal()
                });
            });
        },
        editar() {
            this.axios
            .post(
                process.env.VUE_APP_API_URL + "actualizar_persona",
                this.persona
            )
            // eslint-disable-next-line no-unused-vars
            .then(response => {
                // eslint-disable-next-line no-undef
                Swal.fire(
                    "Excelente!",
                    "La persona ha sido actualizada!",
                    "success"
                ).then(() => {
                    this.listar()
                    this.closeModal()
                });
            });
        },
        closeModal() {
            this.$emit('closeModal')
        },
        detalle(id) {

            this.axios
            .get(process.env.VUE_APP_API_URL + "detalle_persona/" + id)
            .then(response => {
                this.persona = response.data.detalle;
                this.clasificaciones_zona = response.data.clasificacion
                this.persona.edit = true;
            });

        },
        listar(){
            this.$emit('listar')
        },
        zona_select(){

            this.axios
            .get(process.env.VUE_APP_API_URL + "obtener_clasificaciones/" + 1)
            .then(response => {
                this.clasificaciones_zona = response.data
            });

        },
        select_clasificacion(id){

            this.persona.clasificacion = id

        }
    },
    watch: {
        showModal(val) {

            if (val) {
                
                this.reset()

                this.axios
                .get(process.env.VUE_APP_API_URL + "profesiones")
                .then(response => {
                    this.profesiones = response.data;
                });

                // Obtener vias de contacto

                this.axios
                .get(process.env.VUE_APP_API_URL + "vias_contacto")
                .then(response => {
                    this.vias_contacto = response.data;
                });

                // Zonas del usuario

                let usuario = JSON.parse(localStorage.getItem('usuario'));

                this.axios
                .get(process.env.VUE_APP_API_URL + "zonas_usuario/" + usuario.id)
                .then(response => {
                    this.select_zona = response.data
                });

                // Tipos de contactos
                 this.axios
                .get(process.env.VUE_APP_API_URL + "tipos_contactos")
                .then(response => {
                    this.select_tipo = response.data
                });

                if (this.idPersona) {
                    
                    this.detalle(this.idPersona)

                }
            }

            this.showModal5 = val;
        }
    },
};
</script>
