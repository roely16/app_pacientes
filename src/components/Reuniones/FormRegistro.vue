<template>
    <div>
        <b-form @submit.prevent="!editMode ? registrar() : editar()">
            <b-row>
                <b-col cols="4">
                    <b-form-group label="Fecha" label-class="font-weight-bold">						
                        <date-picker v-model="reunion.fecha" :config="options" required></date-picker>
					</b-form-group>
                </b-col>
                <b-col cols="8">
                    <b-form-group label="Motivo" label-class="font-weight-bold">
						<b-form-input v-model="reunion.motivo" type="text" autocomplete="off" required></b-form-input>    
					</b-form-group>
                </b-col>
                <b-col cols="8">
                    <b-form-group label="Resumen" label-class="font-weight-bold">
						<b-form-textarea v-model="reunion.resumen" type="text" autocomplete="off" required></b-form-textarea>    
					</b-form-group>
                </b-col>
                <b-col cols="4">
                    <b-form-group label="Zona" label-class="font-weight-bold">
                        <b-form-select
                            v-model="reunion.zona"
                            :options="select_zonas"
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
            </b-row>

            <b-row class="mt-4">
               <b-col>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="Imagenes" active>
                                <b-row>
                                    <b-col cols="8">
                                        <b-form-file
                                            v-model="images" 
                                            multiple
                                            placeholder="Seleccione o arrastre los archivos..."
                                            drop-placeholder="Drop file here..."
                                            browse-text="Buscar"
                                            accept="image/*"
                                        ></b-form-file>
                                    </b-col>
                                    <b-col>
                                        <b-button :disabled="images.length <= 0" variant="outline-primary" @click="agregarImagenes()"><font-awesome-icon icon="plus" /></b-button>
                                    </b-col>
                                    <b-col cols="3" class="text-right">
                                        
                                        <b-button variant="outline-success" @click=" () => {
                                            grip_mode = !grip_mode    
                                        }"><font-awesome-icon :icon="!grip_mode ? 'grip-horizontal' : 'eye'" /></b-button>
                                        
                                        <!-- Delete -->

                                        <b-button @click="remover_imagen()" :disabled="imagenes_seleccionadas.length <= 0" class="ml-2" variant="outline-danger">
                                            <font-awesome-icon icon="trash-alt" /> 
                                            <b-badge variant="light" v-if="imagenes_seleccionadas.length > 0"> {{ imagenes_seleccionadas.length }}</b-badge>
                                        </b-button>

                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col class="mt-4" cols="2" v-for="( imagen, key ) in imagesSrc" :key="key">
                                        <b-img class="shadow p-3 bg-white rounded" thumbnail :src="imagen" fluid alt="Fluid image"></b-img>
                                    </b-col>
                                </b-row>

                                <hr>

                                <!-- Imagenes ya subidas -->
                                <b-row v-if="grip_mode">
                                    <b-col cols="2" v-for="(imagen_subida, key) in reunion.imagenes" :key="key">
                                        <div class="container-image">
                                            <b-card @click="() => { 
                                                imagen_subida.selected = !imagen_subida.selected 

                                                if(imagen_subida.border_color === 'primary'){
                                                    imagen_subida.border_color = null
                                                }else{
                                                    imagen_subida.border_color = 'primary'
                                                }
                                                
                                            }" no-body class="shadow bg-white rounded" :border-variant="imagen_subida.border_color">
                                                <b-img class="image-reunion" thumbnail :src="imagen_subida.url" fluid alt="Fluid image"></b-img>
                                                
                                            </b-card>
                                        </div>
                                    </b-col>
                                </b-row>

                                <!-- Carousel -->
                                <b-row  v-if="!grip_mode" class="text-center" align-h="center">
                                    <b-col cols="6" >
                                        <b-carousel
                                            v-model="slide"
                                            :interval="4000"
                                            controls
                                            indicators
                                            background="white"  
                                            img-fluid-grow                                
                                        >
                                            <b-carousel-slide
                                                v-for="(imagen_subida, key) in reunion.imagenes" 
                                                :key="key" 
                                                :img-src="imagen_subida.url"
                                                style="height: 300px"
                                                img-fluid-grow
                                            ></b-carousel-slide>
                                        </b-carousel>
                                    </b-col>
                                </b-row>

                            </b-tab>
                            <b-tab title="Documentos">
                                
                                <b-row class="mb-4">

                                    <b-col cols="4" align-self="center">
                                        <b-input-group>
                                            <template v-slot:append>
                                                <b-input-group-text>
                                                    <font-awesome-icon icon="search" />
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="busqueda_documento" autocomplete="off"></b-form-input>
                                        </b-input-group>
                                    </b-col>

                                    <b-col cols="4" offset-md="3">
                                        <b-form-file
                                            v-model="documents" 
                                            multiple
                                            placeholder="Seleccione o arrastre los archivos..."
                                            drop-placeholder="Drop file here..."
                                            browse-text="Buscar"
                                        ></b-form-file>
                                    </b-col>
                                    <b-col>
                                        <b-button :disabled="documents.length <= 0" variant="outline-primary" @click="agregarDocumentos()"><font-awesome-icon icon="plus" /></b-button>
                                    </b-col>
                                    
                                </b-row>

                                <b-row>
                                    <b-col cols="12">
                                        <b-table show-empty empty-text="No existen registros que mostrar" empty-filtered-text="No existen registros que coincidan con su criterio de búsqueda" :filter="busqueda_documento" striped hover :fields="reunion.fields_documentos" :items="reunion.documentos">
                                            <template v-slot:cell(action)="data">

                                                <b-button :href="data.item.download_link" v-if="data.item.id" variant="primary" size="sm">
                                                    <font-awesome-icon icon="download" />
                                                </b-button>

                                                <b-button @click="eliminar_documento(data.item, data.index)" class="ml-2" variant="danger" size="sm">
                                                    <font-awesome-icon icon="trash" />
                                                </b-button>
                                            </template>

                                            <template v-slot:cell(estado)="data">

                                                <font-awesome-icon v-if="data.item.id" icon="save" />

                                                <font-awesome-icon v-if="!data.item.id" icon="upload" />

                                            </template>

                                        </b-table>
                                    </b-col>
                                </b-row>
                                
                            </b-tab>
                            <b-tab title="Participantes">
                                
                                <b-row class="mb-3" align-v="center">

                                    <b-col cols="4" align-self="center">
                                        <b-input-group>
                                            <template v-slot:append>
                                                <b-input-group-text>
                                                    <font-awesome-icon icon="search" />
                                                </b-input-group-text>
                                            </template>
                                            <b-form-input v-model="busqueda_participante" autocomplete="off"></b-form-input>
                                        </b-input-group>
                                    </b-col>

                                    <b-col cols="4" offset-md="3">
                                            <multiselect :closeOnSelect="false" required deselectLabel="" selectLabel="" selectedLabel="Seleccionada" :multiple="true" v-model="participantes" :options="personas" label="nombre_completo" placeholder="" trackBy="id" :searchable="true"></multiselect>
                                    </b-col>
                                    <b-col >
                                        <b-button :disabled="participantes.length <= 0" variant="outline-primary" @click="agregar_participantes()"><font-awesome-icon icon="plus" /></b-button>
                                    </b-col>
                                </b-row>

                                <b-row>
                                    <b-col>
                                        <b-table show-empty empty-text="No existen registros que mostrar" empty-filtered-text="No existen registros que coincidan con su criterio de búsqueda" :filter="busqueda_participante" striped hover :fields="reunion.fields_participantes" :items="reunion.participantes">
                                            <template v-slot:cell(action)="data">

                                                <b-button @click="eliminar_participante(data.item, data.index)" class="ml-2" variant="danger" size="sm">
                                                    <font-awesome-icon icon="trash" />
                                                </b-button>

                                            </template>

                                            <template v-slot:cell(estado)="data">

                                                <font-awesome-icon v-if="data.item.upload" icon="save" />

                                                <font-awesome-icon v-if="!data.item.upload" icon="upload" />

                                            </template>

                                        </b-table>
                                    </b-col>
                                </b-row>

                            </b-tab>
                        </b-tabs>
                    </b-card>
               </b-col>
            </b-row>

            <b-row class="mt-4">
				<b-col>
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
				</b-col>
			</b-row>
        </b-form>
    </div>    
</template>

<style scoped>
    .container-image {
        position: relative;
    }

    .image-reunion {
        width: 100%;
        height: auto;
    }

    .img-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: right;
        
    }

    .img-bottom {
        position: absolute;
        top: 100;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: left;
        
    }

</style>

<script>

    import datePicker from 'vue-bootstrap-datetimepicker';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
    import Multiselect from 'vue-multiselect'

    // eslint-disable-next-line no-unused-vars
    const base64Encode = data =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
    });

    export default {
        props: {
            editMode: {
                type: Boolean,
                default: false
            },
            idReunion: Number
        },  
        components: {
            datePicker,
            Multiselect
        },
        data(){

            return{
                options: {
                    format: 'DD/MM/YYYY',
                    useCurrent: false,
                    locale: 'es'
                },
                reunion: {
                    fecha: null,
                    zona: null,
                    documentos: [],
                    fields_documentos: [],
                    participantes: []
                },
                select_zonas: [],
                images: [],
                imagesSrc: [],
                slide: 0,
                grip_mode: true,
                documents: [],
                personas: [],
                participantes: [],
                busqueda_participante: null,
                busqueda_documento: null
            }

        },
        methods: {
            closeModal(){

                this.$emit('closeModal')

            },
            registrar(){

                this.reunion.id_categoria = this.$route.params.id

                this.axios
                .post(process.env.VUE_APP_API_URL + "registrar_reunion", this.reunion)
                // eslint-disable-next-line no-unused-vars
                .then(response => {

                    this.subirImagenes(response.data)
                    this.subirDocumentos(response.data)

                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "La reunion ha sido registrada!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });

                });

            },
            obtener_detalle(){

                this.axios
                .get(process.env.VUE_APP_API_URL + "detalle_reunion/" + this.idReunion)
                .then(response => {
                    this.reunion = response.data

                    // Por cada documento
                    this.reunion.documentos.forEach(documento => {
                        
                        documento.download_link = process.env.VUE_APP_API_URL + documento.link

                    });
                });

            },
            editar(){

                this.axios
                .post(process.env.VUE_APP_API_URL + "editar_reunion", this.reunion)
                // eslint-disable-next-line no-unused-vars
                .then(response => {
                    
                    this.subirImagenes(this.reunion.id)
                    this.subirDocumentos(this.reunion.id)

                    // eslint-disable-next-line no-undef
                    Swal.fire(
                        "Excelente!",
                        "La reunion ha sido editada!",
                        "success"
                    ).then(() => {
                        this.$emit('listar')
                        this.closeModal()
                    });
                    
                });

            },
            agregarImagenes(){

                this.images.forEach(element => {
                    
                    base64Encode(element)
                    .then(value => {
                        this.imagesSrc.push(value);
                    })
                    .catch(() => {
                        // this.imageSrc = null;
                    });

                });

                //this.images = null

            },
            subirImagenes(id_reunion){

                if (this.images.length > 0) {
                    
                    this.images.forEach(image => {
                    
                        let formData = new FormData()
                        formData.append('file', image)
                        formData.append('id_reunion', id_reunion)

                        this.axios
                        .post(process.env.VUE_APP_API_URL + "subir_imagen_reunion", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        // eslint-disable-next-line no-unused-vars
                        .then(response => {
                
                          
                        });

                    });

                }

            },
            subirDocumentos(id_reunion){

                 if (this.documents.length > 0) {
                    
                    this.documents.forEach(document => {
                    
                        let formData = new FormData()
                        formData.append('file', document)
                        formData.append('id_reunion', id_reunion)

                        this.axios
                        .post(process.env.VUE_APP_API_URL + "subir_documento_reunion", formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        })
                        // eslint-disable-next-line no-unused-vars
                        .then(response => {
                            
                          
                        });

                    });

                }

            },
            remover_imagen(){

                // eslint-disable-next-line no-undef
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "Las imagenes se marcaran para ser eliminadas!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, ELIMINAR!',
                    cancelButtonText: 'Cancelar'
                // eslint-disable-next-line no-unused-vars
                }).then((result) => {

                     if (result.value) {

                        let imagenes = this.reunion.imagenes

                        imagenes.forEach(imagen => {
                            
                            if (imagen.border_color === 'primary') {
                                
                                imagen.border_color = 'danger'

                            }

                        });

                        this.reunion.imagenes = imagenes

                    }

                })

            },
            agregarDocumentos(){
                
                this.documents.forEach(document => {
                    
                    let data = {
                        id: null,
                        nombre: document.name,
                        _rowVariant: null
                    }

                    this.reunion.documentos.unshift(data)

                });

            },
            eliminar_documento(documento, index){

                // Eliminar si aún no se ha subido
                if (!documento.id) {
                   
                    this.reunion.documentos.splice(index, 1)
                    this.documents.splice((this.documents.length - 1) - index, 1)

                }

                //console.log(documento)
                if (documento._rowVariant === 'danger') {
                    
                    documento._rowVariant = null

                }else{

                    documento._rowVariant = 'danger'

                }
                

            },
            descargar_documento(documento){

                console.log(documento)

            },
            agregar_participantes(){

                // eslint-disable-next-line no-unused-vars
                this.participantes.forEach(participante => {
                    
                    participante.upload = false
                    participante._rowVariant = null
                    this.reunion.participantes.unshift(participante)

                });

                this.participantes = []

            },
            // eslint-disable-next-line no-unused-vars
            eliminar_participante(participante, index){
                
                if (!participante.upload) {
                    
                    this.reunion.participantes.splice(index, 1)

                }else{

                    if (participante._rowVariant == 'danger') {
                    
                        participante._rowVariant = null

                    }else{

                        participante._rowVariant = 'danger'

                    }
                }
                

            }
        },
        computed: {

            imagenes_seleccionadas(){

                let result = []

                if (this.reunion.imagenes) {
                    
                    result = this.reunion.imagenes.filter( imagen => imagen.selected )

                }

                 return result

            }

        },
        mounted(){

            if (this.editMode) {

				this.obtener_detalle()

			}else{

                this.reunion.fields_documentos = [
                    {
                        key: 'id',
                        label: 'ID'
                    },
                    {
                        key: 'nombre',
                        label: 'Nombre',
                    },
                    {
                        key: 'estado',
                        label: 'Estado',
                        class: 'text-center'
                    },
                    {
                        key: 'action',
                        label: 'Acción',
                        class: 'text-center'
                    }
                ];

                this.reunion.fields_participantes = [
                    {
                        key: 'id',
                        label: 'ID'
                    },
                    {
                        key: 'nombre_completo',
                        label: 'Nombre',
                    },
                    {
                        key: 'zona',
                        label: 'Zona',
                    },
                    {
                        key: 'estado',
                        label: 'Estado',
                        class: 'text-center'
                    },
                    {
                        key: 'action',
                        label: 'Acción',
                        class: 'text-center'
                    }
                ];

            }

            let usuario = JSON.parse(localStorage.getItem('usuario'));

            this.axios
            .get(process.env.VUE_APP_API_URL + "zonas_usuario/" + usuario.id)
            .then(response => {
                this.select_zonas = response.data
            });

            // Obtener personas
            this.axios
            .get(process.env.VUE_APP_API_URL + "listar_personas/" + usuario.id)
            .then(response => {
                this.personas = response.data.items
            });

        }
    }
</script>