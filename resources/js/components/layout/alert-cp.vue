<template>
    <v-snackbar 
        top 
        left 
        :timeout="info.timeout"
        v-model="info.show"
        color="primary"
    > 
        {{ info.text }}
        
        <v-btn 
            dark
            text
            @click.native="info.show = false"
        >X</v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        data: function() {
            return{
              
            }
        },
        computed:{
            info(){
                return this.$store.state.helpers.info
            }
        }
    }
</script>
