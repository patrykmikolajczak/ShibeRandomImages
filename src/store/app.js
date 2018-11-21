import Vue from 'vue'

const store = {
    profile: {}
}

const getters = {
    profile: store => store.profile
}

const actions = {
    stopLoading: () => {
        let loader = document.querySelector('#loader')
        let el = document.querySelector('#app')

        setTimeout( () => {
            loader.style.opacity = 0
            setTimeout( () => {
                el.style.opacity = 1
                loader.style.display = 'none'
            }, 1000)
        }, 1000)
    },
}

const mutations = {
    setProfile: (store, data) => {
        Vue.set(store, 'profile', data)
    }
}

export default {
    store,
    getters,
    actions,
    mutations
}
