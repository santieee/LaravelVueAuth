import Cookies from 'js-cookie'
import { router } from '../../router/router.js';

const state = {
    access_token: Cookies.get('access_token') || '',
    status: '',
    hasLoadedOnce: false,
}

const getters = {
    isAuthenticated: state => !!state.access_token,
    authStatus: state => state.status,
}

const actions = {
    authRequest: ({commit, dispatch, rootState}, payload) => {
        dispatch('changeLoader', true)
        let remember = payload.remember ? payload.remember : false;
        let data = {
            'email':payload.email,
            'password':payload.password
        }
        return new Promise((resolve, reject) => {
            commit('authRequest');
            axios.post('/api/login', data)
                .then((resp) => {
                    let access_token = resp.data.access_token;
                    Cookies.set('access_token', access_token, { expires: remember ? 135 : 1 });
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
                    commit('authSuccess', access_token);
                    dispatch('userRequest');
                    resolve(access_token);        
                    router.push("/");
                    commit('showInfo', `Hello ${rootState.user.profile.name}!`); 
                    commit('errorsCleaner'); 
                })
                .catch((err) => {
                    let arr = [];
                    arr['login'] = err.response.data.error;
                    commit('errorsReceiver', arr);
                    Cookies.remove('access_token');
                    reject(err);
                })
                .finally(() => dispatch('changeLoader', false))
        })
    },

    authRegister: ({commit, dispatch}, payload) => {
        dispatch('changeLoader', true)
        let data = {
            'email':payload.email,
            'name':payload.name,
            'password':payload.password,
            'password_confirmation': payload.password_confirmation,  
            'remember': false,  
        }
        axios
        .post("/api/register", data)
            .then(resp => {
                if (resp.data.success) {
                  dispatch('authRequest', data)
                }
            })
            .catch(err => {
                let arr = []
                arr['register'] = err.response.data.errors
                commit('errorsReceiver', arr)
            })
    },
    
    authLogout: ({commit, dispatch}) => {
        Cookies.remove('access_token');
        return new Promise((resolve, reject) => {
            axios.post('/api/logout')
                .then((resp) => {
                    commit('authLogout');
                    resolve();
                    commit('showInfo', "Goodbye!")  
                })
                .catch((err) => {
                    reject(err);
                });
        })
    }
}

const mutations = {
    authRequest: (state) => {
        state.status = 'loading';
    },
    authSuccess: (state, access_token) => {
        state.status = 'success';
        state.access_token = access_token;
        state.hasLoadedOnce = true;
    },
    authLogout: (state) => {
        state.access_token = '';
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}