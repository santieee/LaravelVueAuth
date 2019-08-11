<template>
  <v-layout justify-space-around>
    <v-icon large color="green darken-2">business</v-icon>
   <v-btn class="ma-2" color="primary" @click="ch">Hello World!
        <v-icon right>check_circle</v-icon>
    </v-btn>

  </v-layout>
</template>

<script>
    export default {
        data(){
            return{
               
            }
        },
        methods:{
          ch(){
            axios.get("/api/user")
             .then((data)=>console.log(this.$store.getters.isAuthenticated))
          }
        }
    }
</script>
