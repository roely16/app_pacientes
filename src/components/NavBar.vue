<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top" sticky>
			<b-navbar-brand href="#">MONITOREO</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
			

			<!-- Right aligned nav items -->
			<b-navbar-nav class="ml-auto">
				
				<b-nav-item-dropdown right>
					<!-- Using 'button-content' slot -->
					<template v-slot:button-content>
						<!-- <em>User</em> -->
						<font-awesome-icon icon="user" /> {{ usuario.nombre }} {{ usuario.apellido }}
					</template>
					<b-dropdown-item href="#">Perfil</b-dropdown-item>
					<b-dropdown-item @click="logout">Salir</b-dropdown-item>

				</b-nav-item-dropdown>
			</b-navbar-nav>
			</b-collapse>
		</b-navbar>    
    </div>    
</template>

<script>

	import { mapActions } from 'vuex';

    export default {
		data(){
            return{
                usuario: JSON.parse(localStorage.getItem('usuario'))
            }
        },
        methods: {

			...mapActions([
				'logout'
			]),
			
		}
    }
</script>