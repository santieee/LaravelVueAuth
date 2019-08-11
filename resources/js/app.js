require('./bootstrap');

import { store } from './vuex/store';
import { router } from './router/router';
import vuetify from './plugins/vuetify'

import App from './components/app'

const app = new Vue({
	store,
  	router,
  	vuetify,
  	beforeCreate(){
      this.$store.dispatch('startApp')
    },
  	render: h => h(App)
}).$mount('#app');