<template>
	<v-content>
	    <v-card
		    max-width="444"
		    class="mx-auto"
		    v-if="userProfile.name"
	  	>
	  		<v-card-title>Profile</v-card-title>
	  		<hr>
	  		<v-card-text>
	  			<p><v-icon color="primary">mdi-account</v-icon> Name: {{ userProfile.name }}</p>		
	  			<p><v-icon color="primary">mdi-mail</v-icon> Email: {{ userProfile.email }}</p>
	  			<p><v-icon color="primary">mdi-account-details</v-icon> Status: {{ userProfile.status }}</p>
	  			<p><v-icon color="primary">mdi-calendar</v-icon> Date of registration: {{ userProfile.created_at.split(' ')[0] }}</p>
	  		</v-card-text>


	   
		</v-card>
  </v-content>
</template>

<script>
    export default {
        data(){
            return{
            
            }
        },
        methods:{
        	
        },
        computed: {
        	userProfile(){
        		let profile = Object.assign({}, this.$store.getters.getProfile)
        		switch (profile.status){
        			case 1: 
        				profile.status = "Buyer";
        				break;
        			case 2:
        				profile.status = "Seller"
        				break;
        			case 3:
        				profile.status = "Admin";
        				break;
        		}
        		return profile
        	}
        }
    }
</script>