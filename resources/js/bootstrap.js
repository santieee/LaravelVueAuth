window._ = require('lodash');
window.Vue = require("vue");
window.axios = require('axios');

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
Vue.use(Vuetify)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Vuex from "vuex";

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}