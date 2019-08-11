<template>
	<div>
		<v-navigation-drawer
	      v-model="drawer"
	      app
	      right
	    >
	    	<v-list v-if="!isAuth">
	    		<template v-for="tab in guestBar">
	    			<v-list-item :to="tab.path" :key="tab.name">
			        <v-list-item-content>
			          <v-list-item-title>
			          	{{tab.name}} <v-icon>{{tab.icon}}</v-icon>
			      	</v-list-item-title>
			        </v-list-item-content>
	    	  	</v-list-item>
	    		</template>      
	    	</v-list>
			
			<v-list v-else>
				<template>
	    			<v-list-item :to="{name: 'profile'}">
			        <v-list-item-content>
			          <v-list-item-title>{{userProfile.name}} <v-icon>mdi-account</v-icon></v-list-item-title>
			        </v-list-item-content>
	    	  	</v-list-item>
	    	  	<template v-for="tab in userBar">
	    	  		<template v-if="userProfile.status >= tab.access">
		    	  		<v-list-item :to="tab.path" :key="tab.name">
				      		<v-list-item-content>
				      		  <v-list-item-title>{{tab.name}} <v-icon>{{tab.icon}}</v-icon></v-list-item-title>
				      		</v-list-item-content>
		    	  		</v-list-item>
		    	  	</template>
	    	  	</template>        	
	    		</template>      		  	
			</v-list>

			<template v-slot:append>
	    	  <div>
	    	  	<v-layout align-center justify-center row fill-height>
		    	    <v-btn
		    	    	block
		    	    	@click="changeTheme"
		    	    >
		    	    	<v-icon size="2em">
		    	    		mdi-brightness-4
		    	    	</v-icon>
		    	    </v-btn>
	    		</v-layout>
	    	  </div>
	    	</template>
	    </v-navigation-drawer>

	    <v-app-bar
	      dark
	      app
	      color="secondary"
	    >
	        <router-link 
		        tag="v-toolbar-title" 
		        to="/" 
		        class='logo'
		    >
	        	Market
	        </router-link>   	     
  
	        <v-spacer></v-spacer>
	      	<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
	    </v-app-bar>
    </div>
</template>


<script>
    export default {
        data(){
            return{
              drawer: null,
              guestBar:[
              	{name: "Login",icon: "mdi-login", path: {name: 'signIn'}},
              	{name: "Registration",icon: "mdi-account-plus", path: {name: 'signUp'}},
              ],
              userBar:[
              	{name: 'Logout', icon: "mdi-exit-to-app", path: {name: 'logout'}, access: 0},
              ],
            }
        },
        computed:{
        	isAuth(){
        		return this.$store.getters.isAuthenticated;
        	},
        	userProfile(){
        		return this.$store.getters.getProfile
        	}    	
        },
        methods:{
        	changeTheme(){
        		this.$store.dispatch('changeTheme')
        	}
        }
    }
</script>
<style scoped>
.logo:hover{
	cursor: pointer;
}
	
</style>