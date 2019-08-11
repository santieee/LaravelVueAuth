import Cookies from 'js-cookie'
import vuetify from '../../plugins/vuetify.js'

const state = {
	info: {
        timeout: 3000,
        show: false,
        text: null,
        button_loading: false,       
    },
}

const getters = {
    isLoading: state => state.info.button_loading
}

const actions = {
	changeLoader: (context, payload) => { 
        //commit('errorsCleaner') 
        setTimeout(function(){context.commit('setBtnLoad', payload)}, 100)        
    },
    changeTheme: (context, payload)=>{    
        vuetify.framework.theme.dark = !vuetify.framework.theme.dark
        Cookies.set('dark_theme', vuetify.framework.theme.dark, { expires: 365 });      
    },
    setTheme: (context, payload) => {
        if(Cookies.get('dark_theme')){
            let theme = JSON.parse( Cookies.get('dark_theme') )
            theme ? vuetify.framework.theme.dark = true : vuetify.framework.theme.dark = false    
        }    
    },
    startApp: ({getters, dispatch}, payload) => {
        dispatch('setTheme')
        if (getters.isAuthenticated) {
            dispatch('userRequest');
        }

    }
}

const mutations = {
    showInfo(state, message) {
        state.info.text = message;
        state.info.show = true;
    },
    setBtnLoad(state, status){        
        state.info.button_loading = status 
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}