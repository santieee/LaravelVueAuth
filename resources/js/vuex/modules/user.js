import Cookies from 'js-cookie'

const state = {
    status: '',
    profile: JSON.parse( Cookies.get('profile') ) || ''
}

const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => !!state.profile.name,
}

const actions = {
    userRequest: ({commit, dispatch, rootState}) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + rootState.auth.access_token

        commit('userRequest')
        axios.get('/api/user')
            .then((resp) => {
                console.log('AuthOk')
                dispatch('setProile', resp.data)
            })
            .catch((err) => {
                console.log('AuthErr')
                commit('userError');
                // if resp is unauthorized, logout, to
                dispatch('authLogout')
            })
    },
    setProile: (context, profile) => {
        state.status = 'success';
        state.profile = profile;
        Cookies.set('profile', JSON.stringify(profile), { expires: 365 });
    }
}

const mutations = {
    userRequest: (state) => {
        state.status = 'loading';
    },
    userError: (state) => {
        state.status = 'error';
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}