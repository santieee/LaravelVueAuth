<template>
 <v-card
    max-width="444"
    class="mx-auto"
  >
    <v-layout align-center justify-center row fill-height>
      <v-card-title>
        Sign In
      </v-card-title>
    </v-layout>

    <!-- <v-layout align-center justify-center row fill-height>
        <img src="../../pic/authLogo.png" class="logo">
    </v-layout> -->
    <v-fade-transition>
      <v-alert 
        type="error"
        v-if="checkError()"
        outlined
      >
       {{ checkError() }}
      </v-alert>
    </v-fade-transition>
  
    <v-text-field
      label="Email"
      v-model="form.email"
      name="email"
      :error-messages="$v.form.email.$error ? 'Enter a valid email' : ''"
      autofocus
    ></v-text-field>

    <v-text-field
      label="Password"
      type="password"
      counter
      v-model="form.password"
      :error-messages="$v.form.password.$error ? 'Enter a valid password' : ''"
    ></v-text-field>

    <v-checkbox
      v-model="form.remember"
      label="Remember"
    ></v-checkbox>
    
    <v-layout align-center justify-center row fill-height>
      <v-btn color="primary" 
        large 
        @click="onLogin"
        :loading = "buttonLoading"
        :disabled = "buttonLoading"
      >
        Login
      </v-btn>
    </v-layout>

    <div class="links">
      Don't have an account? 
      <router-link 
        tag="a" 
        to="/signup"
      >
          Registration
      </router-link>
    </div>
  </v-card>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
    export default {
        data(){
          return{
             form:{
              email:'',
              password:'',
              remember: true
             }
          }
        },
        validations: {
          form:{
            email:{
              required,
              email
            },
            password:{
              required,
              minLength: minLength(6)
            }       
          }                 
        },
        mounted(){
        },
        methods: {
          onLogin: function () {
            this.validateForm()
            if(!this.$v.$error){
              this.$store.dispatch('authRequest', this.form)
            }
          },
          onKeyup(e) {
            if (e.code === "Enter") {
              this.login();
            }
          },
          checkError() {
            if(this.$store.state.errors.data.login == 'invalid_credentials'){
              return 'Password or login is incorrect'
            }
            if (this.$store.state.errors.data.login) {
              return this.$store.getters.getErrors.login 
            }              
          },
          validateForm(){
            this.$v.form.email.$touch()
            this.$v.form.password.$touch()
          },
          delrr(){
            this.$store.commit('errorsCleaner')
          }              
        },
        computed:{
          buttonLoading(){
            return this.$store.getters.isLoading
          }
        },

    }
</script>

<style scoped>

.v-input, .v-alert{
  margin-left: 25px;
  margin-right: 25px;
}

.v-card{
  top: 15%;
  box-shadow: 0 0 15px rgba(0,0,0,0.7);
}

.logo{
  width: 20%; 
  height: 20%;
  margin: 30px;
}

.links{
  padding: 20px;
}

</style>