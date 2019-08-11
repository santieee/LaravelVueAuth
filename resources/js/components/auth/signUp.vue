<template>
  <v-card
    max-width="444"
    class="mx-auto"
  >
    <v-layout align-center justify-center row fill-height>
      <v-card-title>
        Sign Up
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
      label="Name"
      v-model="form.name"
      :error-messages="$v.form.name.$error ? 'Name is required' : ''"
      autofocus
    ></v-text-field>
    
    <v-text-field
      label="Email"
      v-model="form.email"
      :error-messages="$v.form.email.$error ? 'Enter a correct email' : ''"
    ></v-text-field>

    <v-text-field
      label="Password"
      type="password"
      counter
      v-model="form.password"
      :error-messages="$v.form.password.$error ? 'Enter a correct password' : ''"
    ></v-text-field>

    <v-text-field
      label="Repeat password"
      type="password"
      counter
      v-model="form.password_confirmation"
      :error-messages="$v.form.password_confirmation.$error ? 'Re-enter the password correctly' : ''"
    ></v-text-field>
    
    <v-layout align-center justify-center row fill-height>
      <v-btn 
        color="primary" 
        large 
        @click="onRegister"
      >
        Registration
      </v-btn>
    </v-layout>

    <div class="links">
      Have an account?
      <router-link 
        tag="a" 
        to="/signin">
          Login
      </router-link>
    </div>
  </v-card>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
    export default {
        data(){
            return{
                form:{
                    name:'',
                    email:'',
                    password:'',
                    password_confirmation:''
                }
               
            }
        },
        validations: {
          form:{
            name:{
              required
            },
            email:{
              required,
              email
            },
            password:{
              required,
              minLength: minLength(6)
            },
            password_confirmation:{
              required,
              sameAs: sameAs('password')
            }       
          }                 
        },
        mounted(){
        },
        methods:{
          onRegister() {
            this.validate()        
            if(!this.$v.$error){
              this.$store.dispatch('authRegister', this.form)    
            }
          },
          checkError() {
            if (this.$store.state.errors.data.register) {
              return this.$store.getters.getErrors.register.email[0] 
            }              
          },
          validate(){
            this.$v.form.name.$touch()
            this.$v.form.email.$touch()
            this.$v.form.password.$touch()
            this.$v.form.password_confirmation.$touch()
          }
        }
    }
</script>

<style scoped>
.v-card{
    top: 15%;
    box-shadow: 0 0 15px rgba(0,0,0,0.7);
}

.v-input, .v-alert{
    margin-left: 25px;
    margin-right: 25px;
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