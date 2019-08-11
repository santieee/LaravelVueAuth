import VueRouter from "vue-router";
window.Vue = require("vue");
Vue.use(VueRouter);

import {store} from '../vuex/store'
import Index from '../components/index'
import SignUp from '../components/auth/signUp'
import SignIn from '../components/auth/signIn'
import Profile from '../components/profile/profile'
import SellerPage from '../components/seller/seller-page'

const routes = [
	{
		path: '/',
		component: Index, 
		name: 'index',
	}, 	
	{ 
		path: '/signup', 
		component: SignUp, 
		name: 'signUp',
		beforeEnter: (to, from, next) => {  
        	store.getters.isAuthenticated ? next('/') : next()
      	}
	}, 	
	{
		path: '/signin', 
		component: SignIn, 
		name: 'signIn',
		beforeEnter: (to, from, next) => {  
        	store.getters.isAuthenticated ? next('/') : next()
      	}
	}, 	
	{
		path: '/logout', 
		name: 'logout',
		beforeEnter: (to, from, next) => {  
        	if(store.getters.isAuthenticated){
        		store.dispatch('authLogout');
        		next("/");
        	}else{
        		next("/");
        	}
      	}
	}, 
	{
		path: '/profile', 
		component: Profile, 
		name: 'profile',
		beforeEnter: (to, from, next) => {  
        	!store.getters.isAuthenticated ? next('/') : next()
      	}
	}
];

export const router = new VueRouter({
    routes,
    mode: "history"
});
