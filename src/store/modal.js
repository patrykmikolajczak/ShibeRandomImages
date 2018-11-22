import Vue from 'vue'

const state = { 
    modalShow: false,
    modalsList: {}
}

const getters = {
    isModalShowing: state => {
        let resp =  Object.keys(state.modalsList).filter(v => {
            return state.modalsList[v]['show'] === true
        })

        return resp.length > 0
    },
}

const actions = {}

const mutations = {
    showModal: (state, name) => {
        Vue.set(state.modalsList[name], 'show', true)
    },
    hideModal: (state, name) => {
        Vue.set(state.modalsList[name], 'show', false)
    },
    setModal: (state, name) => {
        Vue.set(state.modalsList, name, {})
        Vue.set(state.modalsList[name], 'show', false)
    },
    unsetModal: (state, name) => {
        delete state.modalsList[name]
    },
    setModalData: (state, data) => {
        Vue.set(state.modalsList[data.name], data.key, data.value)
        Vue.set(state.modalsList[data.name], 'show', true)
    },
    unsetModalData: (state, data) => {
        Object.keys(state.modalsList[data.name]).map( (k) => {
            Vue.set(state.modalsList[data.name], k, null)
        })
        Vue.set(state.modalsList[data.name], 'show', false)
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
