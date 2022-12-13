<template>
    <div>
		<b-modal v-model="show" @hidden="closeModal" :title="titleModal" :size="sizeModal" hide-footer>
            <slot name="form">
				
            </slot>
		</b-modal>
	</div>
</template>

<script>
    export default {
        props:{
			showModal: {
				type: Boolean,
				default: false
            },
            titleModal: {
                type: String,
                default: ""
			},
			sizeModal: {
				type: String,
				default: 'md'
			}
		},
		data(){
			return{
				show: false
			}
		},
		methods: {
			closeModal(){
				this.$emit('closeModal')
			}
		},	
		watch: {
			showModal(val){
				
				this.show = val
				
			}
		},
    }
</script>