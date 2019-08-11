<template>
 <v-app id="inspire">

    <app-bar></app-bar>
    <alert-cp></alert-cp>

    <v-content>
      <router-view></router-view>
    </v-content>

    <footer-bar></footer-bar>

  </v-app>
</template>

<script>
import appBar from "./layout/app-bar.vue"
import footerBar from "./layout/footer-bar.vue"
import alertCp from "./layout/alert-cp.vue"
    export default {
        data(){
            return{
            
            }
        },
        components:{
            appBar,
            alertCp,
            footerBar
        }
    }
</script>