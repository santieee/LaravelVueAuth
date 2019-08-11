const state = {
    data: [],
}

const getters = {
	getErrors: state => state.data
}

const mutations = {
    errorsReceiver: (state, err) => {
        state.data = err
    },
    errorsCleaner: (state) => {
        state.data = []
    }
}

export default {
    state,
    mutations,
    getters
}